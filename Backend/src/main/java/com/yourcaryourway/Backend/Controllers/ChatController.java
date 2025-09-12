package com.yourcaryourway.Backend.Controllers;

import com.yourcaryourway.Backend.DTOs.ChatMessage;
import com.yourcaryourway.Backend.Service.ChatHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    private final ChatHistoryService chatHistoryService;

    @Autowired
    public ChatController(ChatHistoryService chatHistoryService) {
        this.chatHistoryService = chatHistoryService;
    }

    @MessageMapping("/chat.send")
    @SendTo("/topic/messages")
    public ChatMessage send(ChatMessage message, SimpMessageHeaderAccessor headerAccessor) {
        // Ajout de l’ID de session pour tracer l’expéditeur
        message.setSessionId(headerAccessor.getSessionId());

        // Sauvegarde dans l’historique en mémoire (POC)
        chatHistoryService.addMessage(message);

        // Diffusion du message à tous les abonnés
        return message;
    }
}
