import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-send-msg',
  templateUrl: './send-msg.component.html'
})
export class SendMsgComponent implements OnInit {
  @Input() msg: Message;

  constructor() { }

  ngOnInit(): void {
  }

}

interface Message {
  text: string;
  direct: string;
}
