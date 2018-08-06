import React, { Component } from 'react';

export default class Status extends Component{
    render(){
        return (
            <p className='status'>
                {this.props.message}
            </p>
        );
    }
};
