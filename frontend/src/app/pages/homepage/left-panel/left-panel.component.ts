import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit {

  occasionArray: { name: string; checked: boolean; }[] = [];
  tagsArray: {name: string, checked: boolean}[] = [];
  favorites: boolean = false;


  @Output() tagsEvent = new EventEmitter<Object>();

  @Output() occasionEvent = new EventEmitter<Object>();

  @Output() favoritesEvent=new EventEmitter<Object>();

  constructor() {

  }

  ngOnInit(): void {
    this.occasionArray = [
      {name: "Breakfast", checked: false},
      {name: "Lunch", checked: false},
      {name: "Dinner", checked: false},
      {name: "Snack", checked: false},
      {name: "Dessert", checked: false}
    ]

    this.tagsArray = [
      {name: "Vegan", checked: false},
      {name: "Low Calories", checked: false},
      {name: "High Protein", checked: false},
      {name: "Quick & Easy", checked: false}
    ];

    this.defaultOccasion(Number(moment().format('HH')));
  }

  ngAfterViewInit(): void {
    this.defaultOccasion(Number(moment().format('HH')));
  }

  updateTagsArray(event: any) {
    for (let tag of this.tagsArray) {
      if (tag.name === event.target.id) {
        tag.checked = event.target.checked;
      }
    }
    this.tagsEvent.emit(this.tagsArray);
  }

  updateOccasionArray(event: any) {
    for (let occasion of this.occasionArray) {
      if (occasion.name === event.target.id) {
        occasion.checked = true;
        document.getElementById(occasion.name)?.classList.replace('btn-light', 'btn-warning');
      }
      else {
        occasion.checked = false;
        document.getElementById(occasion.name)?.classList.replace('btn-warning', 'btn-light');
      }

    }
    this.occasionEvent.emit(this.occasionArray);
  }

  updateFavorites(event: any){

    this.favorites=event.target.checked;

  this.favoritesEvent.emit(this.favorites);

}


  defaultOccasion(hours: number) {
    let k = -1;
    if (hours >= 4 && hours < 12) {
      k = 0;
    }
    else if (hours >= 12 && hours < 17) {
      k = 1;
    }
    else {
      k = 2;
    }
    this.occasionArray[k].checked = true;
    document.getElementById(this.occasionArray[k].name)?.classList.replace('btn-light', 'btn-warning');
    this.occasionEvent.emit(this.occasionArray);
  }

}
