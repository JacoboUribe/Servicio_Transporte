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
import java.util.HashMap;
import java.util.List;

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
    public HashMap<String,Object> login(@RequestBody User theNewUser,
                                        final HttpServletResponse response)throws IOException {
        HashMap<String,Object> theResponse=new HashMap<>();
        String token="";
        User theActualUser=this.theUserRepository.getUserByEmail(theNewUser.getEmail());
        if(theActualUser!=null &&
                theActualUser.getPassword().equals(theEncryptionService.convertSHA256(theNewUser.getPassword()))){
            token=theJwtService.generateToken(theActualUser);
            theActualUser.setPassword("");
            theResponse.put("token",token);
            theResponse.put("user",theActualUser);
            return theResponse;
        }else{
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            return  theResponse;
        }

    }

    @PostMapping("login/2FA/{idUser}")
    public String secondFactor(@RequestBody Session theNewSession, @PathVariable String idUser, final HttpServletResponse response) throws IOException {

        User theUser = this.theUserRepository.findById(idUser).orElse(null);
        Session theOldSession = this.theSessionRepository.getSession(theUser.get_id(), theNewSession.getCode2fa());

        if (theUser != null && theOldSession != null) {
            if (theNewSession.getCode2fa().equals(theOldSession.getCode2fa()) && !theOldSession.isActive()) {
                String token = theJwtService.generateToken(theUser);
                theOldSession.setActive(true);
                this.theSessionRepository.save(theOldSession);
                response.setStatus(HttpServletResponse.SC_OK);
                return "message: "+ token;
            } else {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            }
        }

        return null;
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/singout/session/{idSession}")
    public void closeSession(@PathVariable String idUser, @PathVariable String idSession, final HttpServletResponse response)throws IOException {
        Session theSession = this.theSessionRepository.findById(idSession).orElse(null);
        if (theSession != null) {
            this.theSessionRepository.delete(theSession);
        }
    }
    @PostMapping("/resetpassword/{userId}")
    public String resetPassword(@PathVariable String userId, final HttpServletResponse response) throws IOException{
        User theActualUser = this.theUserRepository.findById(userId).orElse(null);
        if (theActualUser != null){
            String number = this.generateRandom();
            theActualUser.setResetCode(number);
            this.theUserRepository.save(theActualUser);
            theNotificationsService.sendResetLink(theActualUser, number);
        }else{
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            return "message: User not found";
        }
        return "message: Reset code sent";

    }


    @PostMapping("/resetpassword/{userId}/{code}")
    public String resetPassword(@PathVariable String userId , @PathVariable String code, @RequestBody String password, final HttpServletResponse response) throws IOException{
        User theActualUser = this.theUserRepository.findById(userId).orElse(null);
        if (theActualUser.getResetcode().equals(code)){
            theActualUser.setPassword(theEncryptionService.convertSHA256(password));
            theActualUser.setResetCode("");
            this.theUserRepository.save(theActualUser);
            return "message: Password reseted";
        }
        return "message: algo salio mal";

    }

    @PostMapping("permissions-validation")
    public boolean permissionsValidation(final HttpServletRequest request, @RequestBody Permission thePermission){
        boolean succes = this.theValidatorsService.validationRolePermission(request, thePermission.getUrl(), thePermission.getMethod());
        return succes;
    }

    public String generateRandom() {
        int number = (int)(Math.random()*90000+10000);
        return String.valueOf(number);
    }
}
