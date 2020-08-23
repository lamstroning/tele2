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

  readAnswer(e: string) {
    const header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    // const res = e.toLowerCase();
    this.http.post('http://194.67.113.101:8086/match', {
      text: e,
      type: this.keys
    }, {headers: header}).subscribe(res => {
      this.sendMsg(res.title);

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

const keyWords = [
  {
    0: ['Настроить для себя'],
    1: ['Выберите тариф'],
  },
  {
    200: ['200', 'двести', 'два'],
    500: ['500', 'пятьсот', 'пять'],
    800: ['800', 'восемьсот', 'восемь'],
    1000: ['1000', 'тысеяча', 'тыс']
  },
  {
    vk: ['вк', 'вконтакте', 'контакте'],
    facebook: ['фейсбук', 'facebook'],
    ok: ['одноклассники', 'однокласники'],
    instagram: ['инстаграм', 'инстаграмм', 'instagram']
  },
  {
    viber: ['вайбер', 'viber'],
    whatsapp: ['whatsapp', 'вотсап', 'ватсап'],
    tamtam: ['тамтам', 'tamtam'],
  },
  {
    yandexmap: ['яндекс', 'мап', 'карты', 'карта'],
    tele2tv: ['теледва', 'тв']
  },
  {
    20: ['два', 'двадцать'],
    100: ['100', 'сто'],
    300: ['300', 'триста', 'тристо']
  }
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
