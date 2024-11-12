import { ScoreService } from "../../app/score.service";

export class GameScene extends Phaser.Scene {
    private scoreService: ScoreService

    isGameRunning: boolean = false
    baseWidth: number = 1000
    baseHeight: number = 340

    get gameHeight() {
        return this.game.config.height as number
    }

    get gameWidth() {
        return this.game.config.width as number
    }

    get scaleFactor() {
        const widthRatio = this.gameWidth / this.baseWidth
        const heightRatio = this.gameHeight / this.baseHeight
        return Math.min(widthRatio, heightRatio) // Maintain aspect ratio
    }

    constructor(key: string) {
        super(key)
    }
}
