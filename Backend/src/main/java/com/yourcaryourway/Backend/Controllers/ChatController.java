package com.yourcaryourway.Backend.Controllers;

import com.yourcaryourway.Backend.DTOs.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/chat.send")
    @SendTo("/topic/messages")
    public ChatMessage send(ChatMessage message) {
        return message; // renvoie le message à tous les abonnés
    }
}

