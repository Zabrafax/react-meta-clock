package com.metaclock.backend.dto;

import com.metaclock.backend.model.UserTheme;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class UserResponse {
    private String username;
    private LocalDate registrationDate;
    private String TimeZone;
    private UserTheme userTheme;
}
