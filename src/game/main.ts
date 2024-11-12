
import { AUTO, Game } from 'phaser';
import PreloadScene from './scenes/Preloader';
import PlayScene from './scenes/PlayScene';

export const PRELOAD_CONFIG = {
    cactusesCount: 6,
    birdsCount: 1
  }
  

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1000,
    height: 340,
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'game-container',
        width: 1000,  
        height: 340,  
    },
    transparent: false,
    backgroundColor: '#ffffff',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [
        PreloadScene,
        PlayScene
    ]
};


const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
