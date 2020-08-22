import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChatPageComponent} from './views/pages/chat-page/chat-page.component';
import {ChatComponent} from './views/components/chat/chat.component';



const routes: Routes = [
  {
    path: '',
    component: ChatPageComponent,
    children: [
      {
        path: '',
        redirectTo: '/chat',
        pathMatch: 'full'
      },
      {
        path: 'chat',
        component: ChatComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
