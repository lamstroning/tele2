import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-voice-helper',
  templateUrl: './voice-helper.component.html'
})
export class VoiceHelperComponent implements OnInit {
  @Output() openChat = new EventEmitter();
  @Input() small: boolean;

  error: string;
  voice = false;
  audioContext = new AudioContext();
  src: MediaStreamAudioSourceNode;
  analyser: AnalyserNode;

  constructor() {}

  startRecord() {
    this.error = '';
    this.openChat.emit('voice');
    this.voice = !this.voice;
    if (!this.voice) {
      return;
    }
    this.analyser = this.audioContext.createAnalyser();
    navigator.mediaDevices.getUserMedia({
      audio: true
    }).then(stream => {
      this.src = this.audioContext.createMediaStreamSource(stream);
      this.src.connect(this.analyser);
    }).catch(() => {
      this.error = 'Разрешите использование микрофона';
      this.voice = false;
    });

  }

  animation() {

  }

  ngOnInit(): void {
  }
}

