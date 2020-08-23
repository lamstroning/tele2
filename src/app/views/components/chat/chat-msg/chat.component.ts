import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollZone', {static: true})
  scrollZone: ElementRef;
  stageCount = 0;
  request: any;
  keys: string;
  response: string;
  voiceSmallIcon = false;
  sendMsgList: Message[] = [];
  showTariffs = false;

  constructor(private http: HttpClient) { }

  openChat(e: any) {
  }

    nextStage() {
    this.response = stageBlocksResponse[this.stageCount];
    this.keys = stageBlocksRequest[this.stageCount].backend;
    this.request = stageBlocksRequest[this.stageCount++].textBlock;
  }

  ngOnInit(): void {
    this.nextStage();
  }



  sendMsg(text: string, direct?: string) {
    if (!this.request || !this.response) {
      this.showTariffs = true;
      return;
    }
    if (direct) {
      this.sendMsgList.push({
        text,
        direct
      });
      return;
    }
    this.voiceSmallIcon = true;
    if (text) {
      this.sendMsgList.push({
        text,
        direct: 'right'
      });
    }
    this.sendMsgList.push({
      text: this.response,
      direct: 'left'
    });
    this.scrollAnimate();
    this.nextStage();
  }

  readAnswer(e: string) {
    this.sendMsg(e, 'right');
    const header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    // const res = e.toLowerCase();
    this.http.post('http://194.67.113.101:8086/match', {
      text: e,
      type: this.keys
    }, {headers: header}).subscribe(res => {
      this.sendMsg(res.title, 'left');
        this.sendMsg('');
      },
      err => console.log(err));
    console.log(this.keys[this.stageCount]);

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
  'Какими соцсетями вы пользутесь?',
  'Какими мессенджерами  вы пользутесь?',
  'Дополнительные услуги',
  'количество СМС'
];

const stageBlocksRequest = [
  {
    backend: 'CHOOSE',
    textBlock: [
      'Настроить для себя',
      'Выберите тариф',
    ],
  },
  {
    backend: 'CALLS',
    textBlock: [
      '200',
      '500',
      '800',
      '1000'
    ]
  },
  {
    backend: 'INTERNET',
    textBlock: [
      '4Гб',
      '15Гб',
      '30Гб',
      '40Гб'
    ]
  },
  {
    backend: 'SOCIAL_NETWORK',
    textBlock: [
      'vk',
      'facebook',
      'ok',
      'instagram'
    ]
  },
  {
    backend: 'MESSENGERS',
    textBlock: [
      'whatsapp',
      'viber',
      'tamtam'
    ]
  },
  {
    backend: 'MORE_SERVICES',
    textBlock: [
      'yandexmap',
      'tele2tv'
    ]
  },
  {
    backend: 'PACKAGE_SMS',
    textBlock: [
      '20',
      '100',
      '300'
    ]
  }
];


interface Message {
  text: string;
  direct: string;
}
