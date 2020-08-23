import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-voice-helper',
  templateUrl: './voice-helper.component.html'
})
export class VoiceHelperComponent implements OnInit {
  @Input() small: boolean;

  error: string;
  voice = false;
  mediaRecorder: MediaRecorder;

  constructor(private http: HttpClient) {}

  startRecord() {
    this.error = '';
    this.voice = !this.voice;

    if (!this.voice) {
      this.mediaRecorder.stop();
      return;
    }

    navigator.mediaDevices.getUserMedia({
      audio: true
    }).then(stream => {
      const records = [];
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.start();
      this.mediaRecorder.addEventListener('dataavailable', (event) => {
        records.push(event.data);
      });
      this.mediaRecorder.addEventListener('stop', () => {
        const voiceBlob = new Blob(records, {
          type: 'audio/wav'
        });
        const fd = new FormData();
        fd.append('file', voiceBlob, 'name');
        this.http.post('http://194.67.113.101:5000', fd).subscribe(
          res => console.log(res),
          err => console.warn(err)
        );
      });
    });
  }

  ngOnInit(): void {}
}

