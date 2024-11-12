import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private scoreSubject = new Subject<number>()
  private highScoreSubject = new Subject<number>()
  private currentScore = 0
  private highScore = 0

  score$ = this.scoreSubject.asObservable()
  highScore$ = this.highScoreSubject.asObservable()

  // Call this method to update the current score
  updateScore(newScore: number) {
    this.currentScore = newScore
    this.scoreSubject.next(this.currentScore)
    this.updateHighScore()
  }

  private updateHighScore() {
    if (this.currentScore > this.highScore) {
      this.highScore = this.currentScore
      this.highScoreSubject.next(this.highScore)
    }
  }

  resetScore() {
    this.currentScore = 0
  }
}
