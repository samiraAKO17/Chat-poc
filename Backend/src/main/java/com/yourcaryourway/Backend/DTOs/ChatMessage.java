package com.yourcaryourway.Backend.DTOs;

public class ChatMessage {
    private String from;
    private String content;
    private String sessionId;

    public ChatMessage() {}
    public ChatMessage(String from, String content) {
        this.from = from;
        this.content = content;
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
}