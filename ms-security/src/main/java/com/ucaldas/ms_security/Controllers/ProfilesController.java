package com.ucaldas.ms_security.Controllers;

import com.ucaldas.ms_security.Models.Profile;
import com.ucaldas.ms_security.Models.User;
import com.ucaldas.ms_security.Repositories.ProfileRepository;
import com.ucaldas.ms_security.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/profiles")
public class ProfilesController {
    @Autowired
    private ProfileRepository theProfileRepository;
    @Autowired
    private UserRepository theUserRepository;

    @GetMapping("")
    public List<Profile> find() {
        return this.theProfileRepository.findAll();
    }

    @GetMapping("{id}")
    public Profile findById(@PathVariable String id) {
        Profile theProfile = this.theProfileRepository.findById(id).orElse(null);
        return theProfile;
    }

    @PostMapping
    public Profile create(@RequestBody Profile newUser) {
        return this.theProfileRepository.save(newUser);
    }

    @PutMapping("{id}")
    public Profile update(@PathVariable String id, @RequestBody Profile newProfile) {
        Profile actualProfile = this.theProfileRepository.findById(id).orElse(null);
        if (actualProfile != null) {
            actualProfile.setPhone(newProfile.getPhone());
            actualProfile.setPhoto(newProfile.getPhoto());
            this.theProfileRepository.save(actualProfile);
            return actualProfile;
        } else {
            return null;
        }
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable String id) {
        Profile theUser = this.theProfileRepository.findById(id).orElse(null);
        if (theUser != null) {
            this.theProfileRepository.delete(theUser);
        }
    }

    @PostMapping("{profile_id}/user/{user_id}")
    public Profile matchUserWProfile(@PathVariable String profile_id,
                                     @PathVariable String user_id) {
        Profile thisProfile = this.theProfileRepository.findById(profile_id).orElse(null);
        User thisUser = this.theUserRepository.findById(user_id).orElse(null);

        if (thisProfile != null && thisUser != null) {
            if (thisProfile.getUser() == null) {
                thisProfile.setUser(thisUser);
                this.theProfileRepository.save(thisProfile);
                return thisProfile;
            }
        } else {
            return null;
        }
        //System.out.println(thisProfile);
        return thisProfile;
    }


    @GetMapping("user/{user_id}")
    public List<Profile> getProfileByUser(@PathVariable String user_id) {
        return this.theProfileRepository.getProfileByUser(user_id);
    }
}
