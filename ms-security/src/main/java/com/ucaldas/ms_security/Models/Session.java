package com.ucaldas.ms_security.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

public class Session {
    @Id
    private String _id;
    private String token;
    private String expiration;
    private int code2fa;
    @DBRef
    private User user;

    public Session(String token, String expiration) {
      this.token = token;
      this.expiration = expiration;
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

  public int getcode2fa() {
      return code2fa;
  }

  public void setcode2fa(int code2fa) {
      this.code2fa = code2fa;
  }
}
