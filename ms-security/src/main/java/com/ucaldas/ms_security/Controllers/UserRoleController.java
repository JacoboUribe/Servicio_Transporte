package com.ucaldas.ms_security.Controllers;

import com.ucaldas.ms_security.Models.Role;
import com.ucaldas.ms_security.Models.User;
import com.ucaldas.ms_security.Models.UserRole;
import com.ucaldas.ms_security.Repositories.RoleRepository;
import com.ucaldas.ms_security.Repositories.UserRepository;
import com.ucaldas.ms_security.Repositories.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/user_role")
public class UserRoleController {

    @Autowired
    UserRepository theUserRepository;
    @Autowired
    RoleRepository theRoleRepository;
    @Autowired
    UserRoleRepository theUserRoleRepository;

    @PostMapping("user/{userId}/role/{roleId}")
    public UserRole create(@PathVariable String userId,
                           @PathVariable String roleId) {

        User theUser = this.theUserRepository.findById(userId).orElse(null);
        Role theRole = this.theRoleRepository.findById(roleId).orElse(null);
        if (theUser!=null && theRole!=null) {
            UserRole newUserRole=new UserRole();
            //Enlaces  de la relación N-N
            newUserRole.setUser(theUser);
            newUserRole.setRole(theRole);
            this.theUserRoleRepository.save(newUserRole);
            return newUserRole;
        }else{
            return null;
        }
    }

    @GetMapping("user/{userId}")
    public List<UserRole> getUserRoleRepository(@PathVariable String userId) {
        return this.theUserRoleRepository.getRolesByUser(userId);
    }

    @GetMapping("role/{roleId}")
    public List<UserRole> getUsersByRole(@PathVariable String roleId) {
        return this.theUserRoleRepository.getUsersByRole(roleId);
    }
}