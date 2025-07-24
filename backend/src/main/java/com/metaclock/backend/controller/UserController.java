package com.metaclock.backend.controller;

import com.metaclock.backend.dto.ApiResponse;
import com.metaclock.backend.dto.UserResponse;
import com.metaclock.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDate;
import java.util.Map;

@Controller
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        if (username == null || password == null) {
            return ResponseEntity.ok(new ApiResponse<>(
                    false,
                    "Username and password are required",
                    null
            ));
        }

        try {
            UserResponse response = userService.loginUser(username, password);
            return ResponseEntity.ok(new ApiResponse<>(true, "Successful user login", response));
        } catch (RuntimeException e) {
            return ResponseEntity.ok(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        String dateStr = body.get("registrationDate");

        LocalDate registrationDate = LocalDate.parse(dateStr);


        if (username == null || password == null) {
            return ResponseEntity.ok(new ApiResponse<>(
                    false,
                    "Username and password are required",
                    null
            ));
        }

        if (username.length() < 4 || password.length() < 4) {
            return ResponseEntity.ok(new ApiResponse<>(
                    false,
                    "Username and password must be equal or longer than 4 symbols",
                    null
            ));
        }

        if (username.length() > 16 || password.length() > 16) {
            return ResponseEntity.ok(new ApiResponse<>(
                    false,
                    "Username and password must be equal or less than 16 symbols",
                    null
            ));
        }

        try {
            UserResponse response = userService.registerUser(username, password, registrationDate);
            return ResponseEntity.ok(new ApiResponse<>(true, "Successful user registration", response));
        } catch (RuntimeException e) {
            return ResponseEntity.ok(new ApiResponse<>(false, e.getMessage(), null));
        }
    }
}
