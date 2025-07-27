package com.metaclock.backend.dto;

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

    public UserResponse(String username, LocalDate registrationDate) {
        this.username = username;
        this.registrationDate = registrationDate;
        this.TimeZone = null;
    }
}
