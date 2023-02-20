import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss']
})
export class CountdownTimerComponent implements OnInit {

  @Input()
  timer!: number;
  @Input() start!: boolean;
  @Input() step!: number;
  @Output() finishedEvent = new EventEmitter<Number>();
  minutes!: number;
  seconds: number;
  intervalId: any;
  alarm: HTMLAudioElement = new Audio();
  counting: string = 'not started'

  constructor() {
    this.seconds = 0;
    // this.startTimer();
  }

  ngOnInit(): void {
    this.minutes = this.timer;
    this.alarm.src = '/assets/sounds/timer_sound.mp3';
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      if (this.seconds > 0) {
        this.counting = 'counting'
        this.seconds--;
      } else if (this.minutes > 0) {
        this.counting = 'counting';
        this.minutes--;
        this.seconds = 59;
      } else {
        this.alarm.play();
        this.counting = 'end';
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.intervalId);
    this.counting = 'paused';
  }

  resetTimer() {
    // Might need change to 0
    this.minutes = this.timer;
    this.seconds = 0;
    this.counting = 'not started'
    clearInterval(this.intervalId);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

}
