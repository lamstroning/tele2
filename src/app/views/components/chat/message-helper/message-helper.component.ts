import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-message-helper',
  templateUrl: './message-helper.component.html'
})
export class MessageHelperComponent implements OnInit {
  @Output() openChat = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  startMessage() {
    this.openChat.emit('message');
  }
}
