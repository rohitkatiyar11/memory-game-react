import React, { Component } from 'react';
export default class Tile extends Component{
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick () {
        this.props.onTileClick(this.props.id);
    }
    render () {

        const backStyle = {
            backgroundImage: 'url(' + this.props.image + ')',
            backgroundSize: 'cover'
        };

        return (
            <div className="flip-container">
                <div
                    className='flipper'
                    onClick={this.onClick}>
                    <div className="front"></div>
                    <div style={backStyle} className={this.props.flipped ? 'front' : 'back'}></div>
                </div>
            </div>
        );
    }
};
