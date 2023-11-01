import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppInitService } from '../../../app.init.service';


@Component({
  selector: 'app-icon-picker',
  templateUrl: './icon-picker.component.html',
  styleUrls: ['./icon-picker.component.sass']
})
export class IconPickerComponent implements OnInit {
  @Output() clickedEvent = new EventEmitter();


  constructor(public appInitService: AppInitService) {
  }

  ngOnInit() {
  }

  onSelect(icon: string) {
    this.clickedEvent.emit(icon);
  }
}
