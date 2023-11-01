import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StaticConfig } from '../../../config.static';


@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.sass']
})
export class ColorPickerComponent implements OnInit {

  @Output() clickedEvent = new EventEmitter();


  constructor(public staticConfig: StaticConfig) {
  }

  ngOnInit() {
  }

  onSelect(color: string) {
    this.clickedEvent.emit(color);
  }

}
