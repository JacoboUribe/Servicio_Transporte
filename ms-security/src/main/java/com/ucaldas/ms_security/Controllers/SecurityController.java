package com.ucaldas.ms_security.Controllers;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;
import com.ucaldas.ms_security.Models.Permission;
import com.ucaldas.ms_security.Models.Session;
import com.ucaldas.ms_security.Models.User;
import com.ucaldas.ms_security.Repositories.SessionRepository;
import com.ucaldas.ms_security.Repositories.UserRepository;
import com.ucaldas.ms_security.Services.EncryptionService;
import com.ucaldas.ms_security.Services.JwtService;
import com.ucaldas.ms_security.Services.NotificationsService;
import com.ucaldas.ms_security.Services.ValidatorsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import java.io.IOException;
import java.security.SecureRandom;

@CrossOrigin
@RestController
@RequestMapping("/api/public/security")
public class SecurityController {
    @Autowired
    private SessionRepository theSessionRepository;
    @Autowired
    private UserRepository theUserRepository;
    @Autowired
    private EncryptionService theEncryptionService;
    @Autowired
    private JwtService theJwtService;
    @Autowired
    private NotificationsService theNotificationsService;
    @Autowired
    private ValidatorsService theValidatorsService;

    @PostMapping("/login")
    public User login(@RequestBody User theNewUser, final HttpServletResponse response) throws IOException {
        User theActualUser = this.theUserRepository.getUserByEmail(theNewUser.getEmail());
        if (theActualUser != null && theActualUser.getPassword().equals(theEncryptionService.convertSHA256(theNewUser.getPassword()))) {
            String number = this.generateRandom();
            Session theSession = new Session(number, theActualUser);
            this.theSessionRepository.save(theSession);
            theNotificationsService.sendCodeByEmail(theActualUser, number);
            response.setStatus(HttpServletResponse.SC_OK);
            return theActualUser;
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            return null;
        }
    }

    @PostMapping("login/2FA/{idUser}")
    public String secondFactor(@RequestBody Session theNewSession, @PathVariable String idUser, final HttpServletResponse response) throws IOException {
        User theUser = this.theUserRepository.findById(idUser).orElse(null);
        if (theUser != null) {
            Session theOldSession = this.theSessionRepository.getSession(theUser.get_id(), theNewSession.getCode2fa());
            if (theOldSession != null && !theOldSession.isActive()) {
                if (theNewSession.getCode2fa().equals(theOldSession.getCode2fa())) {
                    String token = theJwtService.generateToken(theUser);
                    theOldSession.setActive(true);
                    this.theSessionRepository.save(theOldSession);
                    response.setStatus(HttpServletResponse.SC_OK);
                    return "message: " + token;
                } else {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
                    return "message: Código 2FA incorrecto.";
                }
            } else {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
                return "message: Sesión ya activa o código incorrecto.";
            }
        }
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
        return "message: Usuario no encontrado.";
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/singout/session/{idSession}")
    public void closeSession(@PathVariable String idSession, final HttpServletResponse response) throws IOException {
        Session theSession = this.theSessionRepository.findById(idSession).orElse(null);
        if (theSession != null) {
            this.theSessionRepository.delete(theSession);
        }
    }

    @PostMapping("/resetpassword/{userId}")
    public String resetPassword(@PathVariable String userId, final HttpServletResponse response) throws IOException {
        User theActualUser = this.theUserRepository.findById(userId).orElse(null);
        if (theActualUser != null) {
            String number = this.generateRandom();
            theActualUser.setResetCode(number);
            this.theUserRepository.save(theActualUser);
            theNotificationsService.sendResetLink(theActualUser, number);
            return "message: Reset code sent";
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            return "message: User not found";
        }
    }

    @PostMapping("/resetpassword/{userId}/{code}")
    public String resetPassword(@PathVariable String userId, @PathVariable String code, @RequestBody String password, final HttpServletResponse response) throws IOException {
        User theActualUser = this.theUserRepository.findById(userId).orElse(null);
        if (theActualUser != null && theActualUser.getResetcode().equals(code)) {
            theActualUser.setPassword(theEncryptionService.convertSHA256(password));
            theActualUser.setResetCode("");
            this.theUserRepository.save(theActualUser);
            return "message: Password reseted";
        }
        response.sendError(HttpServletResponse.SC_BAD_REQUEST);
        return "message: Código incorrecto o error al restablecer";
    }

    @PostMapping("permissions-validation")
    public boolean permissionsValidation(final HttpServletRequest request, @RequestBody Permission thePermission) {
        return this.theValidatorsService.validationRolePermission(request, thePermission.getUrl(), thePermission.getMethod());
    }

    public String generateRandom() {
        SecureRandom random = new SecureRandom();
        int number = 10000 + random.nextInt(90000);
        return String.valueOf(number);
    }
}
