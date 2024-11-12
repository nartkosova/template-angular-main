import { PRELOAD_CONFIG } from "../main";
import { Player2 } from "../entities/Player";
import { SpriteWithDynamicBody } from "../types";
import { GameScene } from "./GameScene";
import { EventBus } from "../EventBus";

// import Phaser from "phaser";
class PlayScene extends GameScene {
  
    player2: Player2;
    startTrigger: SpriteWithDynamicBody;
    ground: Phaser.GameObjects.TileSprite
    clouds: Phaser.GameObjects.Group
    obstacles: Phaser.Physics.Arcade.Group

    
    gameOverContainer: Phaser.GameObjects.Container
    scoreText: Phaser.GameObjects.Text
    highScoreText: Phaser.GameObjects.Text
    gameOverText: Phaser.GameObjects.Image
    restartText: Phaser.GameObjects.Image

    spawnInterval: number = 1500
    spawnTime: number = 0
    gameSpeed: number = 10
    gameSpeedModifier: number = 1

    score: number = 0
    scoreInterval: number = 50
    scoreDeltaTime: number = 0
    colors: string[] = [
      '#FFB3A1', '#B3FFB3', '#A1B3FF', '#E4E633', '#FFB3E6', '#E6B3FF',
      '#FFB3D1', '#B3FFE0', '#E4D1A0', '#A0A1FF', '#FFB366', '#D133FF',
      '#B3FF99', '#FFD966', '#FFB3A1', '#D9F2A6', '#B5A6D9', '#FFB2B3',
      '#C6A3D9', '#E74C7A', '#A3D4E6', '#A5E6A3', '#F1D133', '#E6A366',
      '#B3E6FF', '#D1A6FF', '#7FB3D5', '#B6D4E6', '#A9D8E1', '#F5F3F1',
      '#E1D6D1', '#F0B2B3', '#D98D7A', '#C1B4D6', '#F6D9E1', '#F5D6A6',
      '#F1E3A6', '#E6A3D9', '#D1B2B0', '#F1A3C0'
    ]
    
  
    lastColorChangeScore: number = 0; 

    progressSound: Phaser.Sound.HTML5AudioSound

  constructor() {
    
    super("PlayScene");
  }
  create() {
    this.createEnvironment()
    this.createPlayer()
    this.createObstacles()
    this.createGameoverContainer()
    this.createAnimations()
    this.createScore()
    this.handleGameStart()
    this.handleObstacleCollisions()
    this.handleGameRestart()
    this.cameras.main.setBackgroundColor('#F5D6A6')

    this.progressSound = this.sound.add("progress", {volume: 0.4}) as Phaser.Sound.HTML5AudioSound
    EventBus.emit('current-scene-ready', this);
  }

 override update(time: number, delta: number): void {
  if(!this.isGameRunning) { return }

     this.spawnTime += delta
      this.scoreDeltaTime += delta

    if (this.scoreDeltaTime >= this.scoreInterval) {
      this.score++
      this.scoreDeltaTime = 0 

      if (this.score % 100 === 0) {
        const random = Math.random()
        this.spawnInterval /=1.08
        this.gameSpeedModifier +=.5
        console.log(this.spawnInterval)
        // if(random>.38) {
        //   this.spawnInterval /=2
        //   this.gameSpeedModifier +=.3
        // }else {
        //   this.spawnInterval +=200
        //   this.gameSpeedModifier -=.2
        // }
       
        this.progressSound.play()

        this.changeScoreColor();
        this.changeBackgroundColor(); 

        this.tweens.add({
          targets: this.scoreText,
          duration: 100,
          repeat: 3,
          alpha: 0,
          yoyo: true
        })
      }
    }

     if (this.spawnTime > this.spawnInterval) {
      this.spawnTime = 0
      this.spawnObstacle()
     }

    Phaser.Actions.IncX(this.obstacles.getChildren(), -this.gameSpeed * this.gameSpeedModifier)
    Phaser.Actions.IncX(this.clouds.getChildren(), -.5)

    const score = Array.from(String(this.score), Number)

    for (let i = 0; i < 5 - String(this.score).length; i++ ) {
      score.unshift(0)
    }

    this.scoreText.setText(score.join(""))

    this.obstacles.getChildren().forEach((obstacle) => {
      const spriteObstacle = obstacle as SpriteWithDynamicBody;
      if (spriteObstacle.getBounds().right < 0) {
        this.obstacles.remove(spriteObstacle);
      }
    })
    this.clouds.getChildren().forEach((cloud) => {
      const spriteCloud = cloud as SpriteWithDynamicBody;
      if (spriteCloud.getBounds().right < 0) {
        spriteCloud.x = this.gameWidth + 30;
      }
    })

    this.ground.tilePositionX += (this.gameSpeed * this.gameSpeedModifier)
 }

 createPlayer() {
   this.player2 = new Player2(this, 0, this.gameHeight);
 }

 createEnvironment() {
   this.ground = this.add
   .tileSprite(0,  this.gameHeight, 88, 26, "ground")
   .setOrigin(0, 1)

  this.clouds = this.add.group()

  this.clouds= this.clouds.addMultiple([
    this.add.image(this.gameWidth /2, 70, "cloud"),
    this.add.image(this.gameWidth -80, 130, "cloud"),
    this.add.image(this.gameWidth /1.3, 100, "cloud")
  ])

  this.clouds.setAlpha(0)
 }

createObstacles() {
  this.obstacles= this.physics.add.group() 
}
createGameoverContainer() {
  this.gameOverText = this.add.image(0, 0 , "game-over")
  this.restartText = this.add.image(0, 80, "restart").setInteractive()

  this.gameOverContainer = this.add
    .container(this.gameWidth / 2, (this.gameHeight / 2- 50))
    .add([this.gameOverText, this.restartText])
    .setAlpha(0)
}
  handleGameStart() {
    this.startTrigger = this.physics.add.sprite(0, 10, '')
    .setAlpha(0)
    .setOrigin(0, 1)

    
    this.physics.add.overlap(this.startTrigger, this.player2, () => {
      if (this.startTrigger.y === 10) {
        this.startTrigger.body.reset(0, this.gameHeight)
        return
      }
      this.startTrigger.body.reset(999, 999)
      
      
      const rollOutEvent = this.time.addEvent({
        delay: 16.6,
        loop: true,
        callback: () => {
          this.player2.playRunAnimation()
          this.player2.setVelocityX(80)
          this.ground.width += (17 * 2)           
          if (this.ground.width>= this.gameWidth) { 
            rollOutEvent.remove()
            this.ground.width = this.gameWidth
            this.player2.setVelocityX(0)
            this.isGameRunning = true
            this.clouds.setAlpha(1)
            this.scoreText.setAlpha(1)
            } 
        }
    })
})
  }
  handleObstacleCollisions() {
    this.physics.add.collider(this.obstacles, this.player2, () => {
      this.isGameRunning = false
      this.physics.pause()
      this.anims.pauseAll()

      this.player2.die()
      this.gameOverContainer.setAlpha(1)

      const newHighScore = this.highScoreText.text.substring(this.highScoreText.text.length - 5)
      const newScore = Number(this.scoreText.text)> Number(newHighScore) ? this.scoreText.text : newHighScore

      this.highScoreText.setText("HI " + newScore)
      this.highScoreText.setAlpha(1)

      this.spawnTime = 0
      this.scoreDeltaTime = 0
      this.score = 0
      this.gameSpeed= (this.gameSpeed * this.gameSpeedModifier)
      this.gameSpeedModifier = 1
    })
  }
  handleGameRestart() {
    this.restartText.on("pointerdown", () => {
      this.physics.resume()
      this.player2.setVelocityY(0)
      this.spawnInterval = 1500


      this.obstacles.clear(true, true)
      this.gameOverContainer.setAlpha(0)
      this.anims.resumeAll()
      this.highScoreText.setAlpha(0)
      this.isGameRunning = true
    })
  }
 spawnObstacle() {
    const obstacleCount = PRELOAD_CONFIG.cactusesCount + PRELOAD_CONFIG.birdsCount
    const obstacleNum = Math.floor(Math.random()* 
    obstacleCount) + 1

    const distance = Phaser.Math.Between(1000, 1300)
    let obstacle
    

    if (obstacleNum > PRELOAD_CONFIG.cactusesCount) {

      const enemyPossibleHeight = [20, 70]
      const enemyHeight = enemyPossibleHeight[Math.floor(Math.random() * 2)]
      obstacle = this.obstacles
      .create(distance, this.gameHeight - enemyHeight , `enemy-bird`)
      obstacle.play("enemy-bird-fly")
    } else {
      obstacle = this.obstacles
      .create(distance, this.gameHeight, `obstacle-${obstacleNum}`)
    }
    obstacle
    .setOrigin(0, 1)
    .setImmovable();
  }

  createAnimations() {
    this.anims.create({
      key: "enemy-bird-fly", 
      frames: this.anims.generateFrameNames("enemy-bird"),
      frameRate: 6,
      repeat: -1
    })
  }

  createScore() {
    this.scoreText = this.add.text(this.gameWidth, 0 , "00000", {
      fontSize: 30,
      fontFamily: "Arial",
      color: "1111",
      resolution: 3
    }).setOrigin(1,0).setAlpha(0)
    this.highScoreText = this.add.text(this.gameWidth- 0 , 0 , "00000", {
      fontSize: 30,
      fontFamily: "Arial",
      color: "1111",
      resolution: 3
    }).setOrigin(1,0).setAlpha(0)

    this.highScoreText.x = this.scoreText.getBounds().left - 20
  }

     changeScoreColor() {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    const newColor = this.colors[randomIndex];

    this.scoreText.setColor(newColor);
}

changeBackgroundColor() {
  const randomIndex = Math.floor(Math.random() * this.colors.length);
  const newColor = this.colors[randomIndex];

  this.cameras.main.setBackgroundColor(newColor);

}
}

export default PlayScene;