import React, { Component } from 'react';
import Tile from './Tile';
import Status from './Status';
import ImageViewer from './ImageViewer';
import _ from 'lodash';
const imagesToShown = ['/images/1.jpg', '/images/2.jpg', '/images/3.jpg', '/images/4.jpg'];
export default class GameApp extends Component {
    constructor(props) {
        super(props);
        this.timer = 0;
        this.randomImageTimer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.randomImageCountDown = this.randomImageCountDown.bind(this);
        this.startRandomImageTimer = this.startRandomImageTimer.bind(this);
        this.state = ({
            allTiles: this.generateTiles(),
            message: 'Welcome to memory game',
            isWaiting: false,
            randomImage: '',
            seconds: 5,
            randomImageSeconds: 10,
        });
        this.onTileClick = this.onTileClick.bind(this);
    }

    componentWillMount(){
        this.startTimer();
    }

    startTimer() {
        if (this.timer === 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    startRandomImageTimer() {
        if (this.randomImageTimer === 0) {
            let items = this.getUnAttemptedImages();
            if (items.length > 0) {
                this.setState({randomImage: items[Math.floor(Math.random() * items.length)]});
                this.randomImageTimer = setInterval(this.randomImageCountDown, 1000);
            } else {
                clearInterval(this.randomImageTimer);
                this.setState({randomImage:''});
                setTimeout(function(){
                    alert('Game finished');
                    if (window.confirm("Restart Again ?")) {
                        window.location.reload();
                    }
                }, 2000);

            }
        }
    }

    countDown() {
        let seconds = this.state.seconds - 1;
        this.setState({
            seconds: seconds,
        });

        if (seconds === 0) {
            clearInterval(this.timer);
            this.hideImages();
            this.startRandomImageTimer();
        }
    }

    randomImageCountDown() {
        let seconds = this.state.randomImageSeconds - 1;
        this.setState({
            randomImageSeconds: seconds,
        });

        if (seconds === 0) {
            this.restartRandomImageTimer();
        }
    }

    restartRandomImageTimer() {
        clearInterval(this.randomImageTimer);
        this.randomImageTimer = 0;
        this.setState({
            randomImageSeconds: 10,
        });
        this.startRandomImageTimer();
    }

    generateTiles() {
        let _tiles = [];
        let images = _.shuffle(imagesToShown);
        for (let i = 0; i < images.length; i++) {
            _tiles.push({
                flipped: true,
                matched: false,
                image: images[i],
                attempted: false
            });
        }
        return _tiles;
    }

    hideImages() {
        let temp = this.state.allTiles;
        for (let i = 0; i < temp.length; i++) {
            temp[i].flipped = false;
        }
        this.setState({allTiles: temp});
    }

    onTileClick (index) {
        let temp = this.state.allTiles;
        if (!temp[index].flipped) {
            temp[index].matched = temp[index].image === this.state.randomImage;
            temp[index].flipped = true;
            temp[index].attempted = true;
            this.setState({allTiles: temp});
            this.restartRandomImageTimer();
        }
    }

    statusGenerator() {
        let temp = this.state.allTiles;
        const status = {matched: 0, attempted: 0};
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].matched) {
                status.matched++;
            }
            if (temp[i].attempted) {
                status.attempted++;
            }
        }
        return status;
    }

    getUnAttemptedImages() {
        let temp = this.state.allTiles;
        let attemptedImages = [];
        for (let i = 0; i < temp.length; i++) {
            if (!temp[i].attempted) {
                attemptedImages.push(temp[i].image);
            }
        }
        return attemptedImages;
    }

    render() {if (Object.keys(this.state.allTiles).length < 1) {
            return null;
        }
        let allTiles = this.state.allTiles;
        let tiles = [];
        for (let id in allTiles) {
            id = parseInt(id, 8);
            tiles.push(<Tile key={id} onTileClick={this.onTileClick} id={id} image={allTiles[id].image} flipped={allTiles[id].flipped} />);
        }
        let message = 'Find this image in above tiles (' + this.state.randomImageSeconds + ')';
        let status = this.state.seconds > 0 ? this.state.seconds + ' s' : 'Find Correct Image';
        let statusObj = this.statusGenerator();
        if (statusObj.attempted > 0) {
            status = ' [ ' + 'Attempted: ' + statusObj.attempted + ', Corrected: ' + statusObj.matched + ' ]';
        }
        return (
            <section id="main">
                <Status message={status} />
                {tiles}
                <ImageViewer message={this.state.randomImage !=='' ? message : ''} image={this.state.randomImage}/>
            </section>
        );
    }
}