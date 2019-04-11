import React, {Component} from 'react';
import TheHeader from '../components/TheHeader';
import {Link} from "react-router-dom";

export default class EditSavePage extends Component {
    render() {
        return (
            <div>
                <TheHeader title='Edit your save file'/>
                <div className='container'>
                    <div className='row'>
                        <Link to={'/'}>
                            <i className='fa fa-arrow-left mr-2'/> Back to save selection
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
