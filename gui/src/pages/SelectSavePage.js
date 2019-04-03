import React, {Component} from 'react';
import TheHeader from '../components/TheHeader';
import SaveSelector from '../components/SaveSelector';

export default class SelectSavePage extends Component {
    render() {
        return (
            <div>
                <TheHeader title='Select a save file'/>
                <div className='container'>
                    <div className='row'>
                        <h3>Use this tool at your own risk</h3>
                    </div>
                    <div className='row'>
                        <SaveSelector/>
                    </div>
                </div>
            </div>
        );
    }
}
