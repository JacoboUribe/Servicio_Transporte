package com.ucaldas.ms_security.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

public class Session {
    @Id
    private String _id;
    private String token;
    private String code2fa;
    private String expiration;
    private Boolean active = false;

    @DBRef
    private User user;

    public Session(String token, String expiration) {
      this.token = token;
      this.expiration = expiration;
  }

  public Session(String code2fa, User user) {
    this.code2fa = code2fa;
    this.user = user;
  }

  public Session(String code2fa) {
    this.code2fa = code2fa;
  }

  public Session(String code2fa, String token, Boolean active) {
    this.code2fa = code2fa;
    this.token = token;
    this.active = active;
  }

  public String get_id() {
      return _id;
  }

  public String getToken() {
      return token;
  }

  public String getExpiration() {
      return expiration;
  }

  public void set_id(String _id) {
      this._id = _id;
  }

  public void setToken(String token) {
      this.token = token;
  }

  public void setExpiration(String expiration) {
      this.expiration = expiration;
  }

  public User getUser() {
      return user;
  }

  public void setUser(User user) {
      this.user = user;
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
}
