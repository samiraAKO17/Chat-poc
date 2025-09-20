package com.yourcaryourway.Backend.DTOs;

import java.time.LocalDateTime;

public class ChatMessage {
    private String from;
    private String content;
    private String sessionId;
    private LocalDateTime timestamp;

    public ChatMessage() {}
    public ChatMessage(String from, String content) {
        this.from = from;
        this.content = content;
        this.timestamp = LocalDateTime.now();
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp() { this.timestamp = LocalDateTime.now(); }
}