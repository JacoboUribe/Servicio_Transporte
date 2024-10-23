package com.ucaldas.ms_security.Services;


import com.ucaldas.ms_security.Entities.EmailContent;
import com.ucaldas.ms_security.Entities.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class RequestService {
    @Autowired
    private RestTemplate theRestTemplate;

    @Value("${api.ms_notification_url}")
    private String notificationUrl;

    public List<UserEntity> getUsers() {
        String endpointName = "get-users";
        String url = notificationUrl + endpointName;
        ResponseEntity<UserEntity[]> response = theRestTemplate.getForEntity(url, UserEntity[].class);
        UserEntity[] users = response.getBody();
        return Arrays.asList(users);
    }

    public void sendEmail(EmailContent content) {
        String endpointName = "send-email";
        String url = notificationUrl + endpointName;
        theRestTemplate.postForObject(url, content, String.class);

    }
}
