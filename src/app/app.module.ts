import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './views/components/chat/chat-msg/chat.component';
import { ChatPageComponent } from './views/pages/chat-page/chat-page.component';
import { VoiceHelperComponent } from './views/components/chat/voice-helper/voice-helper.component';
import { NotificationComponent } from './views/components/notification/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ChatPageComponent,
    VoiceHelperComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
