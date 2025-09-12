package com.yourcaryourway.Backend.Service;

import com.yourcaryourway.Backend.DTOs.ChatMessage;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class ChatHistoryService {

    private final List<ChatMessage> messages = new CopyOnWriteArrayList<>();

    public void addMessage(ChatMessage msg) {
        messages.add(msg);
    }

    public List<ChatMessage> getMessages() {
        // renvoyer une copie pour éviter toute modification externe
        return new ArrayList<>(messages);
    }
}
