package com.ucaldas.ms_security.Entities;


public class EmailContent {
    private String subject;
    private String content;
    private String recipients;

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getRecipients() {
        return recipients;
    }

    public void setRecipients(String recipient) {
        this.recipients = recipient;
    }
}