package com.metaclock.backend.controller;

import com.metaclock.backend.dto.ApiResponse;
import com.metaclock.backend.dto.UserResponse;
import com.metaclock.backend.service.UserService;
import com.metaclock.backend.util.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@Controller
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService) {
        this.userService = userService;
        this.jwtUtil = new JwtUtil();
    }

    @PostMapping("/verify-token")
    public ResponseEntity<?> verifyToken(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ApiResponse<>(false, "Missing or invalid Authorization header", null)
            );
        }

        try {
            String token = authHeader.replace("Bearer ", "");
            String username = jwtUtil.extractUsername(token);

            String newToken = jwtUtil.generateToken(username);
            UserResponse userResponse = userService.loginByUserName(username);

            return ResponseEntity.ok(new ApiResponse<>(true, "Successful token login", Map.of(
                    "token", newToken,
                    "username", userResponse.getUsername(),
                    "registrationDate", userResponse.getRegistrationDate()
            )));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse<>(false, e.getMessage(), null));
        }
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
            String token = jwtUtil.generateToken(username);

            return ResponseEntity.ok(new ApiResponse<>(true, "Successful user login", Map.of(
                    "token", token,
                    "username", response.getUsername(),
                    "registrationDate", response.getRegistrationDate()
            )));
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
            String token = jwtUtil.generateToken(username);

            return ResponseEntity.ok(new ApiResponse<>(true, "Successful user registration", Map.of(
                    "token", token,
                    "username", response.getUsername(),
                    "registrationDate", response.getRegistrationDate()
            )));
        } catch (RuntimeException e) {
            return ResponseEntity.ok(new ApiResponse<>(false, e.getMessage(), null));
        }
    }
}
