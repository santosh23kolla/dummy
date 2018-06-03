import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-custom-textbox',
  templateUrl: './custom-textbox.component.html',
  styleUrls: ['./custom-textbox.component.css']
})
export class CustomTextboxComponent implements OnInit {

  @Input() data;

  constructor() { }

  ngOnInit() {
  }

}
