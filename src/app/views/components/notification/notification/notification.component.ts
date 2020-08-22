import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnInit {
  @Input() type: string;
  @Input() title: string;
  constructor() { }

  ngOnInit(): void {
  }

}
