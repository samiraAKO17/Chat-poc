package com.yourcaryourway.Backend.Controllers;

import com.yourcaryourway.Backend.DTOs.ChatMessage;
import com.yourcaryourway.Backend.Service.ChatHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:4200") // autorise ton front dev
public class ChatRestController {

    private final ChatHistoryService chatHistoryService;

    @Autowired
    public ChatRestController(ChatHistoryService chatHistoryService) {
        this.chatHistoryService = chatHistoryService;
    }

    @GetMapping("/history")
    public List<ChatMessage> history() {
        return chatHistoryService.getMessages();
    }
}
