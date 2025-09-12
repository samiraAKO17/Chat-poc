import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface ChatMessage {
  from: string;
  content: string;
  sessionId?: string;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private stompClient!: Client;
  private messageSubject = new Subject<ChatMessage>();
  messages$ = this.messageSubject.asObservable();

  constructor(private http: HttpClient) {}

  connect() {
    console.log('Opening WebSocket...');
    this.stompClient = new Client({
      brokerURL: 'ws://localhost:8080/chat-websocket',
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      webSocketFactory: () => new WebSocket('ws://localhost:8080/chat-websocket')
    });

    this.stompClient.onConnect = () => {
      console.log(' WebSocket connecté au backend');
      this.stompClient.subscribe('/topic/messages', (msg: Message) => {
        console.log(' Message reçu:', msg.body);
        try {
          this.messageSubject.next(JSON.parse(msg.body));
        } catch (e) {
          console.error('Erreur parsing message', e, msg.body);
        }
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('!!! Broker error: ', frame.headers['message']);
      console.error('Details: ', frame.body);
    };

    this.stompClient.onWebSocketError = (error) => {
      console.error('!!! WebSocket error: ', error);
    };

    this.stompClient.activate();
  }

  sendMessage(from: string, content: string) {
    if (!this.stompClient?.active) {
      console.warn('! WebSocket non connecté, connexion en cours...');
      this.connect();
      setTimeout(() => this.sendMessage(from, content), 1000);
      return;
    }

    this.stompClient.publish({
      destination: '/app/chat.send',
      body: JSON.stringify({ from, content })
    });
  }

  // récupérer l’historique
  getHistory(): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>('http://localhost:8080/api/chat/history');
  }
}
