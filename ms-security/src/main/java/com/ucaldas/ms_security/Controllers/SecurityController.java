package com.ucaldas.ms_security.Controllers;

import com.ucaldas.ms_security.Entities.EmailContent;
import com.ucaldas.ms_security.Models.SecondFactor;
import com.ucaldas.ms_security.Models.Session;
import com.ucaldas.ms_security.Models.User;
import com.ucaldas.ms_security.Repositories.SessionRepository;
import com.ucaldas.ms_security.Repositories.UserRepository;
import com.ucaldas.ms_security.Services.EncryptionService;
import com.ucaldas.ms_security.Services.JwtService;
import com.ucaldas.ms_security.Services.RequestService;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api/public/security")
public class SecurityController {
    @Autowired
    private UserRepository theUserRepository;
    @Autowired
    private EncryptionService theEncryptionService;
    @Autowired
    private JwtService theJwtService;
    @Autowired
    private RequestService theRequestService;
    @Autowired
    private SessionRepository theSessionRepository;

    @PostMapping("/login")
    public ResponseEntity<HashMap<String, Object>> login(@RequestBody User theNewUser, final HttpServletResponse response) throws IOException {
        HashMap<String, Object> theResponse = new HashMap<>();
        Optional<User> optionalUser = this.theUserRepository.getUserByEmails(theNewUser.getEmail());

        if (optionalUser.isPresent()) {
            User theActualUser = optionalUser.get();
            if (theActualUser.getPassword().equals(theEncryptionService.convertSHA256(theNewUser.getPassword()))) {
                int code2fa = (int) (Math.random() * 900000) + 100000;
                String token = theJwtService.generateToken(theActualUser);
                String expiration = LocalDateTime.now().plusMinutes(10).toString();
                Session session = new Session(token, expiration);
                session.setUser(theActualUser);
                session.setcode2fa(code2fa);
                theSessionRepository.save(session);

                EmailContent emailContent = new EmailContent();
                emailContent.setRecipients(theActualUser.getEmail());;
                emailContent.setSubject("Código de autenticación");
                emailContent.setContent(String.valueOf(code2fa));

                ResponseEntity<String> emailResponse = sendEmail(emailContent);
                if (emailResponse.getStatusCode() != HttpStatus.OK) {
                    return new ResponseEntity<>(new HashMap<>() {{
                        put("message", "Error al enviar el correo.");
                    }}, HttpStatus.INTERNAL_SERVER_ERROR);
                }

                theResponse.put("message", "Se ha enviado un código de verificación a tu correo.");
                return new ResponseEntity<>(theResponse, HttpStatus.OK);
            }
        }

        return new ResponseEntity<>(new HashMap<>() {{
            put("message", "Credenciales inválidas.");
        }}, HttpStatus.UNAUTHORIZED);
    }

    /*
    @PostMapping("/2fa")
    public ResponseEntity<HashMap<String, Object>> verifyTwoFactor(@RequestBody SecondFactor SecondFactor) {
        HashMap<String, Object> theResponse = new HashMap<>();
        Optional<User> user = this.theUserRepository.getUserByEmails(SecondFactor.getEmail());

        if (user.isPresent()) {
            User theActualUser = user.get();
            List<Session> sessions = this.theSessionRepository.getSessionsByUser(theActualUser.get_id());

            if (!sessions.isEmpty()) {
                for (Session session : sessions) {
                    if (session.getcode2fa() == (SecondFactor.getcode2fa())) {
                        theActualUser.setPassword("");  
                        theResponse.put("token", session.getToken());  
                        theResponse.put("user", theActualUser);
                        return new ResponseEntity<>(theResponse, HttpStatus.OK);
                    }
                }
                return new ResponseEntity<>(new HashMap<>() {{
                    put("message", "Código de verificación incorrecto.");
                }}, HttpStatus.UNAUTHORIZED);
            } else {
                return new ResponseEntity<>(new HashMap<>() {{
                    put("message", "Sesión no encontrada.");
                }}, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>(new HashMap<>() {{
                put("message", "Usuario no encontrado.");
            }}, HttpStatus.UNAUTHORIZED);
        }
    }

    public ResponseEntity<String> sendEmail(EmailContent emailContent) {
        theRequestService.sendEmail(emailContent);
        return new ResponseEntity<>("Email sent", HttpStatus.OK);
    }

*/
    @PostMapping("/2fa")
    public ResponseEntity<Object> verifyTwoFactor(@RequestBody SecondFactor secondFactor) {
        Optional<User> userOptional = theUserRepository.getUserByEmails(secondFactor.getEmail());

        if (userOptional.isEmpty()) {
            return createErrorResponse("Usuario no encontrado.", HttpStatus.UNAUTHORIZED);
        }

        User theActualUser = userOptional.get();
        List<Session> sessions = theSessionRepository.getSessionsByUser(theActualUser.get_id());

        if (sessions.isEmpty()) {
            return createErrorResponse("Sesión no encontrada.", HttpStatus.UNAUTHORIZED);
        }

        // Verifica si existe un código de 2FA válido
        for (Session session : sessions) {
            if (session.getcode2fa() != null && session.getcode2fa().equals(secondFactor.getcode2fa())) {
                theActualUser.setPassword(""); // Limpia la contraseña antes de enviar la respuesta
                HashMap<String, Object> successResponse = new HashMap<>();
                successResponse.put("token", session.getToken());
                successResponse.put("user", theActualUser);

                return new ResponseEntity<>(successResponse, HttpStatus.OK);
            }
        }

        return createErrorResponse("Código de verificación incorrecto.", HttpStatus.UNAUTHORIZED);
    }

    /**
     * Método auxiliar para crear respuestas de error.
     */
    private ResponseEntity<Object> createErrorResponse(String message, HttpStatus status) {
        return new ResponseEntity<>(new HashMap<>() {{
            put("message", message);
        }}, status);
    }

    
    /*
    @PostMapping("/RestPassword/{userId}")
    public ResponseEntity<String> resetPassword(@PathVariable String userId) {
        Optional<User> optionalUser = this.theUserRepository.findById(userId);
        
        if (optionalUser.isPresent()) {
            User theActualUser = optionalUser.get();
            String newPassword = this.generateRandomPassword();
            String encryptedPassword = this.theEncryptionService.convertSHA256(newPassword);
            theActualUser.setPassword(encryptedPassword);
            this.theUserRepository.save(theActualUser);
            
            EmailContent emailContent = new EmailContent();
            emailContent.setRecipients(theActualUser.getEmail());
            emailContent.setSubject("Nueva contraseña");
            emailContent.setContent("Tu nueva contraseña es: " + newPassword + ". Por favor, cambiala después de iniciar sesión.");
            
            ResponseEntity<String> emailResponse = sendEmail(emailContent);
            if (emailResponse.getStatusCode() != HttpStatus.OK) {
                return new ResponseEntity<>("Error al enviar el correo.", HttpStatus.INTERNAL_SERVER_ERROR);
            }
            
            return new ResponseEntity<>("Contraseña restablecida y enviada al correo.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Usuario no encontrado.", HttpStatus.UNAUTHORIZED);
        }
    }

    private String generateRandomPassword() {
        return UUID.randomUUID().toString().substring(0, 8); 
    }
}
*/
    @PostMapping("/RestPassword/{userId}")
    public ResponseEntity<String> resetPassword(@PathVariable String userId) {
        Optional<User> optionalUser = theUserRepository.findById(userId);

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario no encontrado.");
        }

        User theActualUser = optionalUser.get();

        // Generar nueva contraseña segura
        String newPassword = generateSecurePassword();
        String encryptedPassword = theEncryptionService.convertSHA256(newPassword);

        // Actualizar la contraseña del usuario
        theActualUser.setPassword(encryptedPassword);

        try {
            theUserRepository.save(theActualUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar la contraseña.");
        }

        // Preparar el contenido del correo
        EmailContent emailContent = new EmailContent();
        emailContent.setRecipients(theActualUser.getEmail());
        emailContent.setSubject("Nueva contraseña");
        emailContent.setContent("Tu nueva contraseña es: " + newPassword + ". Por favor, cámbiala después de iniciar sesión.");

        // Enviar correo
        ResponseEntity<String> emailResponse = sendEmail(emailContent);
        if (emailResponse.getStatusCode() != HttpStatus.OK) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al enviar el correo.");
        }

        return ResponseEntity.ok("Contraseña restablecida y enviada al correo.");
    }

    private String generateSecurePassword() {
        // Generar contraseña con caracteres alfanuméricos y especiales
        int passwordLength = 12;
        String allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";
        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder(passwordLength);

        for (int i = 0; i < passwordLength; i++) {
            int index = random.nextInt(allowedChars.length());
            password.append(allowedChars.charAt(index));
        }

        return password.toString();
    }
