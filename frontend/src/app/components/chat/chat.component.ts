import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChatService } from '../../service/chat.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, NgClass, DatePipe],
  templateUrl: './chat.component.html',
  styleUrls:  ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  newMessage = '';
  usernameInput = '';
  username = 'Client';
  usernameSet = false;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    
        // on n'ouvre la websocket que si pseudo déjà défini (ou après validation)
     this.chatService.messages$.subscribe(msg => {
      // push et éventuellement limiter taille
      this.messages.push(msg);
    });
  }

  submitUsername() {
    this.username = this.usernameInput.trim() || `Client-${Math.floor(Math.random()*1000)}`;
    this.usernameSet = true;
    // Charger l'historique puis connecter
    this.chatService.getHistory().subscribe(history => {
      this.messages = history || [];
      // enfin connexion au realtime
      this.chatService.connect();
    }, err => {
      console.error('Impossible de charger l\'historique', err);
      // on connecte quand même
      this.chatService.connect();
    });
  }

  send() {
    console.log('send clicked', this.newMessage);
    if (this.newMessage.trim()) {
      this.chatService.sendMessage(this.username, this.newMessage);
      this.newMessage = '';
    }
  }
}
