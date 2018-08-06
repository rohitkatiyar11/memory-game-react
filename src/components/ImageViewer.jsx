import React, { Component } from 'react';
export default class ImageViewer extends Component{
    render () {

        const backStyle = {
            backgroundImage: 'url(' + this.props.image + ')',
            backgroundSize: 'cover'
        };

        return (
            <div style={backStyle} className="randomImage">
                <span>{this.props.message}</span>
            </div>
        );
    }
};
