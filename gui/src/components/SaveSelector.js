import React, {Component} from 'react';
import fs from 'fs';

export default class SaveSelector extends Component {
    state = {
        saveFiles: [],
        savePath: '~/.local/share/aspyr-media/borderlands 2/willowgame/savedata/',
        loaded: false
    };

    loadSaves = () => {

    };

    renderSaveFiles = () => {

    }

    componentDidMount() {

    }

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
                <hr />
                <div>
                    {this.renderSaveFiles()}
                </div>
            </div>
        );
    }
}
