import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  @Input() totalSteps: number = 0;
  @Input() currentStep: number = 0;
  percentage: number = 0;
  recipeDone: boolean = false;
  class: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(change: SimpleChanges) {
    if (change.hasOwnProperty('currentStep')) {
      this.currentStep = change['currentStep'].currentValue;
      this.percentage = Math.trunc(this.currentStep / this.totalSteps * 100);

      if (this.percentage === 100) {
        this.class = "bg-success";
      }
      else if (this.percentage === 0) {
        this.class = "";
      }
    }
  }
}
