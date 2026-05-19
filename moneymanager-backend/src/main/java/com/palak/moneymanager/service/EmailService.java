package com.palak.moneymanager.service;

import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.Attachment;
import com.resend.services.emails.model.CreateEmailOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.Base64;
import java.util.List;

@Service
public class EmailService {

    @Value("${resend.api.key}")
    private String resendApiKey;

    @Value("${spring.mail.properties.mail.smtp.from}")
    private String fromEmail;

    public void sendEmail(String to, String subject, String body) {
        try {
            Resend resend = new Resend(resendApiKey);
            CreateEmailOptions params = CreateEmailOptions.builder()
                    .from(fromEmail)
                    .to(to)
                    .subject(subject)
                    .html(body)
                    .build();
            resend.emails().send(params);
        } catch (ResendException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public void sendEmailWithAttachment(String to, String subject, String body, byte[] attachment, String filename) {
        try {
            Resend resend = new Resend(resendApiKey);
            Attachment resendAttachment = Attachment.builder()
                    .fileName(filename)
                    .content(Base64.getEncoder().encodeToString(attachment))
                    .build();
            CreateEmailOptions params = CreateEmailOptions.builder()
                    .from(fromEmail)
                    .to(to)
                    .subject(subject)
                    .html(body)
                    .attachments(List.of(resendAttachment))
                    .build();
            resend.emails().send(params);
        } catch (ResendException e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}