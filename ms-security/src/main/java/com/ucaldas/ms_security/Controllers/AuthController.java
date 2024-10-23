package com.ucaldas.ms_security.Controllers;


import com.ucaldas.ms_security.Entities.EmailContent;
import com.ucaldas.ms_security.Entities.Recipient;
import com.ucaldas.ms_security.Entities.UserEntity;
import com.ucaldas.ms_security.Models.User;
import com.ucaldas.ms_security.Services.OAuth2Service;
import com.ucaldas.ms_security.Services.RequestService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private RequestService theRequestService;
    @Autowired
    private OAuth2Service theOAuth2Service;

    /*@PostMapping("/send-email")
    public ResponseEntity<String> sendEmail(@RequestBody EmailContent emailcontent) {
        for (Recipient recipient : emailcontent.getRecipients()) {
            System.out.println("Recipient name: " + recipient.getName());
            System.out.println("Recipient email: " + recipient.getEmail());
        }
        theRequestService.sendEmail(emailcontent);
        return new ResponseEntity<>("Email sent", HttpStatus.OK);
    }*/
    @PostMapping("/login")
    public ResponseEntity<String> sendEmail(@RequestBody EmailContent emailContent) {
        theRequestService.sendEmail(emailContent);
        return new ResponseEntity<>("Email sent", HttpStatus.OK);
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserEntity>> getUsers(){
        List<UserEntity> users = theRequestService.getUsers();
        return new ResponseEntity<List<UserEntity>>(users, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<String> home(){
        return new ResponseEntity<>("WELCOME TO USER HOME PAGE", HttpStatus.OK);
    }

    @GetMapping("/google")
    public RedirectView authenticateWithGoogle(HttpSession session){
        String state = UUID.randomUUID().toString();
        session.setAttribute("oauth_state", state);
        String authUrl = theOAuth2Service.getGoogleAuthUrl(state);
        return new RedirectView(authUrl);
    }

    @GetMapping("/github")
    public RedirectView authenticateWithGitHub(HttpSession session){
        String state = UUID.randomUUID().toString();
        session.setAttribute("oauth_state", state);
        String authUrl = theOAuth2Service.getGitHubAuthUrl(state);
        return new RedirectView(authUrl);
    }

    @GetMapping("/callback/{provider}")
    public ResponseEntity<?> callback(@PathVariable String provider, @RequestParam String code, @RequestParam String state, HttpSession session) {
        String sessionState = (String) session.getAttribute("oauth_state");
        if (sessionState == null || !sessionState.equals(state)) {
            return ResponseEntity.badRequest().body("Estado inválido");
        }
        if ("google".equalsIgnoreCase(provider)) {
            Map<String, Object> tokenResponse = theOAuth2Service.getGoogleAccessToken(code);
            String accessToken = (String) tokenResponse.get("access_token");
            Map<String, Object> userInfo = theOAuth2Service.getGoogleUserInfo(accessToken);
            return ResponseEntity.ok(userInfo);
        } else if ("github".equalsIgnoreCase(provider)) {
            Map<String, Object> tokenResponse = theOAuth2Service.getGitHubAccessToken(code);
            String accessToken = (String) tokenResponse.get("access_token");
            Map<String, Object> userInfo = theOAuth2Service.getGithubUserInfo(accessToken);
            return ResponseEntity.ok(userInfo);
        } else {
            return null;
        }

    }
}
