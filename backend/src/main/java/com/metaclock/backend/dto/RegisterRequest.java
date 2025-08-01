package com.metaclock.backend.dto;

import com.metaclock.backend.model.UserTheme;
import lombok.Getter;

@Getter
public class RegisterRequest {
    private String username;
    private String password;
    private String registrationDate;
    private String timeZone;
    UserTheme userTheme;
}
