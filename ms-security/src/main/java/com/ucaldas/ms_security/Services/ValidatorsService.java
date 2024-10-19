package com.ucaldas.ms_security.Services;


import com.ucaldas.ms_security.Models.*;
import com.ucaldas.ms_security.Repositories.PermissionRepository;
import com.ucaldas.ms_security.Repositories.RolePermissionRepository;
import com.ucaldas.ms_security.Repositories.UserRepository;
import com.ucaldas.ms_security.Repositories.UserRoleRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

@Service
public class ValidatorsService {
    @Autowired
    private JwtService jwtService;

    @Autowired
    private PermissionRepository thePermissionRepository;
    @Autowired
    private UserRepository theUserRepository;
    @Autowired
    private RolePermissionRepository theRolePermissionRepository;
    @Autowired
    private UserRoleRepository theUserRoleRepository;

    private static final String BEARER_PREFIX = "Bearer ";
    public boolean validationRolePermission(HttpServletRequest request,
                                            String url,
                                            String method){
        //Por defecto debe haber un no ENTRAR(FALSE)
        //Hay que saber que usuario quiere entrar mediante al token
        //El usuario que esta en la base de datos
        //
        boolean success=false;
        User theUser=this.getUser(request);
        if(theUser!=null){

            System.out.println("Antes URL "+url+" metodo "+method);
            //Analiza la URL y si viene un interrogante lo reemplaza con un interrogante
            url = url.replaceAll("[0-9a-fA-F]{24}|\\d+", "?");
            System.out.println("URL "+url+" metodo "+method);
            //Ejecuta una consulta busca los permisos para ver si coinciden la URL y el method
            Permission thePermission=this.thePermissionRepository.getPermission(url,method);

            List<UserRole> roles=this.theUserRoleRepository.getRolesByUser(theUser.get_id());
            int i=0;
            while (i< roles.size() && success==false){
                UserRole actual=roles.get(i);
                Role theRole=actual.getRole();
                if(theRole!=null && thePermission!=null){
                    System.out.println("Rol "+theRole.get_id()+ " Permission "+thePermission.get_id());
                    RolePermission theRolePermission=this.theRolePermissionRepository.getRolePermission(theRole.get_id(),thePermission.get_id());
                    System.out.println("aqui> "+theRolePermission.get_id());
                    if (theRolePermission!=null){
                        success=true;
                    }
                }else{
                    success=false;
                }
            }
            }

        return success;
    }
    public User getUser(final HttpServletRequest request) {
        User theUser=null;
        String authorizationHeader = request.getHeader("Authorization");
        System.out.println("Header "+authorizationHeader);
        if (authorizationHeader != null && authorizationHeader.startsWith(BEARER_PREFIX)) {
            String token = authorizationHeader.substring(BEARER_PREFIX.length());
            System.out.println("Bearer Token: " + token);
            User theUserFromToken=jwtService.getUserFromToken(token);
            //Verifica si el usuario es diff de null(en el token se pudo decifrar algo)
            //Si no es diferente de null manda un usuario null y hace que no pueda acceder
            //Si el usuario es diferente de null busca por el id al usuario que esta en la base datos
            //y pase lo que pase la contraseña mandela en blanco
            if(theUserFromToken!=null) {
                theUser= this.theUserRepository.findById(theUserFromToken.get_id())
                        .orElse(null);
            }
        }
        return theUser;
    }
}
