package com.ucaldas.ms_security.Models;

public class SecondFactor {
    private String email;
    private int code2fa;

    // Constructor
    public SecondFactor(String email, int code2fa) {
        this.email = email;
        this.code2fa = code2fa;
    }

    // Getters y Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getcode2fa() {
        return code2fa;
    }

    public void setcode2fa(int twoFactorCode) {
        this.code2fa = twoFactorCode;
    }
}
