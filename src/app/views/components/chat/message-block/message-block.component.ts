import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-message-block',
  templateUrl: './message-block.component.html'
})
export class MessageBlockComponent implements OnInit {
  @Input() text: string;

  constructor() { }

  ngOnInit(): void {
  }

}
