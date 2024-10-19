package com.ucaldas.ms_security.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

public class Session {
    @Id
    private String _id;
    private String token;
    private String expiration;
    private String code2fa;
    private Boolean active = false;
    @DBRef
    private User user;

    public Session() {}

    public Session(String code2fa, User user) {
      this.code2fa = code2fa;
      this.user = user;
    }
  
    public Session(String code2fa) {
      this.code2fa = code2fa;
    }

    public Session(String token, String expiration,String code2fa, Boolean active) {
        this.token = token;
        this.code2fa = code2fa;
        this.active = active;
        this.expiration = expiration;
    }


    public String getCode2fa() {
        return this.code2fa;
      }
    
    public void setCode2fa(String code2fa) {
        this.code2fa = code2fa;
      }

    public Boolean isActive() {
        return this.active;
      }
    
    public void setActive(Boolean active) {
        this.active = active;
      }  

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getExpiration() {
        return expiration;
    }

    public void setExpiration(String expiration) {
        this.expiration = expiration;
    }
}
