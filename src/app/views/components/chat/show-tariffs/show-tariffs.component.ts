import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-tariffs',
  templateUrl: './show-tariffs.component.html'
})
export class ShowTariffsComponent implements OnInit {

  tariffs: Tariffs[] = [
    {
      name: 'Везде онлайн+',
      gb: 40,
      minutes: 600,
      cost: 540,
      cityNumbers: false
    },
    {
      name: 'Везде онлайн+',
      gb: 40,
      minutes: 600,
      cost: 540,
      cityNumbers: false
    },
    {
      name: 'Везде онлайн+',
      gb: 40,
      minutes: 600,
      cost: 540,
      cityNumbers: false
    },
    {
      name: 'Везде онлайн+',
      gb: 40,
      minutes: 600,
      cost: 540,
      cityNumbers: false
    },
    {
      name: 'Везде онлайн+',
      gb: 40,
      minutes: 600,
      cost: 540,
      cityNumbers: false
    },
    {
      name: 'Везде онлайн+',
      gb: 40,
      minutes: 600,
      cost: 540,
      cityNumbers: false
    },
    {
      name: 'Везде онлайн+',
      gb: 40,
      minutes: 600,
      cost: 540,
      cityNumbers: false
    },
    {
      name: 'Везде онлайн+',
      gb: 40,
      minutes: 600,
      cost: 540,
      cityNumbers: false
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}

interface Tariffs {
  name: string;
  gb: number;
  minutes: number;
  cost: number;
  cityNumbers: boolean;
}
