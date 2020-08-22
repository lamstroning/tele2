import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollZone', {static: true})
  scrollZone: ElementRef;
  stageCount = 0;
  request: any;
  response: string;
  voiceSmallIcon = false;
  sendMsgList: Message[] = [];
  showTariffs = false;

  constructor() { }

  openChat(e: any) {
  }

  nextStage() {
    this.response = stageBlocksResponse[this.stageCount];
    this.request = stageBlocksRequest[this.stageCount++].textBlock;
  }
  ngOnInit(): void {
    this.nextStage();
  }



  sendMsg(text: string) {
    if (!this.request || !this.response) {
      this.showTariffs = true;
      return;
    }
    this.voiceSmallIcon = true;
    this.sendMsgList.push({
      text,
      direct: 'right'
    });
    this.sendMsgList.push({
      text: this.response,
      direct: 'left'
    });
    this.scrollAnimate();
    this.nextStage();
  }

  scrollAnimate() {
    let startPos = this.scrollZone.nativeElement.scrollTop;
    let i = 100;
    while (i--) {
      setTimeout(() => {
        this.scrollZone.nativeElement.scroll(0, startPos + 1);
        startPos += 1;
      }, 130);
    }
  }
}


const stageBlocksResponse = [
  'Сколько минут вам нужно?',
  'Выберите интернет трафик?',
  'Пакет минут расходуется на городские номера?'
];

const stageBlocksRequest = [
  {
    textBlock: [
      'Настроить для себя',
      'Выберите тариф',
    ]
  },
  {
    textBlock: [
      '200',
      '500',
      '800',
      '1000',
    ]
  },
  {
    textBlock: [
      '4Гб',
      '15Гб',
      '30Гб',
      '40Гб',
    ]
  },
  {
    textBlock: [
      'Да',
      'Нет'
    ]
  }
];


interface Message {
  text: string;
  direct: string;
}
