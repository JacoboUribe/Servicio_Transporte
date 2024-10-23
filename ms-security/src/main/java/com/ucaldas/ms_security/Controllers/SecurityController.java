package com.ucaldas.ms_security.Controllers;



import com.ucaldas.ms_security.Models.Permission;
import com.ucaldas.ms_security.Models.Session;
import com.ucaldas.ms_security.Models.User;
import com.ucaldas.ms_security.Repositories.SessionRepository;
import com.ucaldas.ms_security.Repositories.UserRepository;
import com.ucaldas.ms_security.Services.EncryptionService;
import com.ucaldas.ms_security.Services.JwtService;
// import com.ucaldas.ms_security.Services.NotificationsService;
import com.ucaldas.ms_security.Services.ValidatorsService;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


import java.io.IOException;
import java.util.HashMap;

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


}
