import React, {Component} from 'react';
import {classes} from "../styles/images";
import '../styles/saveSelector.scss';
import {Link} from 'react-router-dom';

const fs = window.require('fs');
const homedir = window.require('os').homedir();
const spawn = window.require("child_process").spawn;
const crypto = window.require('crypto');

export default class SaveSelector extends Component {
    state = {
        saveFiles: [],
        savePath: homedir + '/.local/share/aspyr-media/borderlands 2/willowgame/savedata/',
        tempDir: '/tmp/b2saves/',
        loaded: false
    };

    componentDidMount() {
        // We want to move inside the folder with the steamId
        fs.readdir(this.state.savePath, (err, files) => {
            //handling error
            if (err) {
                console.log('Init: Unable to scan directory: ' + err);
                return;
            }

            if (files.length === 1) {
                this.setState({savePath: this.state.savePath + files[0]}, () => {
                    this.loadSaves()
                });
            }
        });
    }

    loadSaves = () => {
        this.setState({saveFiles: []}); // TODO Make afterward a callback

        if (!fs.existsSync(this.state.tempDir))
            fs.mkdirSync(this.state.tempDir, {recursive: true});

        // Clear the temp dir
        fs.readdir(this.state.tempDir, (err, files) => {
            if (err) {
                console.log('Unable to scan temp directory: ', err);
                return;
            }

            files.forEach((file) => {
                fs.unlinkSync(this.state.tempDir + file);
            });
        });

        // Extract saves to temp dir
        fs.readdir(this.state.savePath, (err, files) => {
            //handling error
            if (err) {
                console.log('Unable to scan directory: ', err);
                alert('Could not read directory');
                return;
            }

            files.forEach((file) => {
                // Do whatever you want to do with the file
                if (/^([Ss])ave\d{4}\.sav$/.test(file)) {
                    let tmp = this.state.savePath + '/' + file;
                    tmp.replace('//', '/');
                    this.extractSaveData(tmp);
                }
            });

        });
    };

    extractSaveData = (path) => {
        const rand = crypto.randomBytes(4).readUInt32LE(0);
        const tempfile = this.state.tempDir + rand + '.json';
        const pythonProcess = spawn("public/savefile.py", ['-d', '-j', '-p', path, tempfile]);

        pythonProcess.on('data', (data) => {
            console.log('[Python] ', data);
        });
        pythonProcess.on('exit', () => {
            console.log('[Python] Extraction complete for', path, tempfile);
            fs.readFile(tempfile, 'utf8', (err, data) => {
                const parsedSave = JSON.parse(data);
                this.formatSaveGame(parsedSave, rand);
            })
        });
    };

    /**
     * data is the parsed content you can find in /tmp/b2saves/unique.json
     * TODO: Add support for more classes in the switch statement
     *
     * @param data
     * @param unique
     */
    formatSaveGame = (data, unique) => {
        const name = data.appearance.name;
        const level = data.level;
        let char_class = data.class;
        let image = null;

        switch (char_class) {
            case 'GD_Assassin.Character.CharClass_Assassin':
                char_class = 'zero';
                image = classes.zero;
                break;
            case 'GD_Tulip_Mechromancer.Character.CharClass_Mechromancer':
                char_class = 'mechromancer';
                image = classes.mechromancer;
                break;

            default:
                image = classes.zero;
                char_class = 'unknown_class';
                break;
        }
        const obj = {name, char_class, unique, image, level};

        // TODO: mutex or semaphore or whatever
        let saves = this.state.saveFiles;
        saves.push(obj);
        this.setState({saveFiles: saves});
    };

    renderSaveFiles = () => {
        return this.state.saveFiles.map(s => (
            <Link style={{all: 'unset'}} to='/edit'>
                <div key={s.unique} className='save-card'>
                    <div>
                        <img src={s.image} alt='class thumbnail' height={50} width={50}/>
                    </div>
                    <div>
                        <h3>{s.name}</h3>
                        <div>Level {s.level}</div>
                    </div>
                </div>
            </Link>
            )
        );
    };

    render() {
        return (
            <div className='w-100'>
                <div className='form-inline'>
                    <input className='form-control mr-1' type='text' value={this.state.savePath}
                           onChange={(e) => this.setState({savePath: e.target.value})} style={{flex: 1}}/>
                    <button type='button' className='btn btn-info' onClick={this.loadSaves}><i
                        className='fa fa-redo mr-2'/> Refresh
                    </button>
                </div>
                <hr/>
                <div>
                    {this.renderSaveFiles()}
                </div>
            </div>
        );
    }
}
