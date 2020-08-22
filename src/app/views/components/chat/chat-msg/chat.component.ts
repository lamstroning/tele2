import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {
  textBlock = [
    'Выберите тариф',
    'Настройте для себя'
  ];
  chatType: string;
  constructor() { }

  openChat(e: any) {
    this.chatType = e;
  }

  ngOnInit(): void {
  }

}

