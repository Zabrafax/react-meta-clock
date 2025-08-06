package com.metaclock.backend.controller;

import com.metaclock.backend.core.timezones.PopularTimeZones;
import com.metaclock.backend.dto.ApiResponse;
import com.metaclock.backend.dto.ColorThemeRequest;
import com.metaclock.backend.dto.RegisterRequest;
import com.metaclock.backend.dto.UserResponse;
import com.metaclock.backend.model.UserTheme;
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
public class UserController {
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService) {
        this.userService = userService;
        this.jwtUtil = new JwtUtil();
    }

    @PostMapping("/save-color-theme")
    public ResponseEntity<?> saveColorTheme(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody ColorThemeRequest request
    ) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ApiResponse<>(false, "Missing or invalid Authorization header", null)
            );
        }

        UserTheme userTheme = request.getUserTheme();

        if (userTheme == null || userTheme.getFirstThemeColor() == null || userTheme.getAccentThemeColor() == null &&
            userTheme.getTextThemeColor() == null || userTheme.getTextThemeColor() == null
        ) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ApiResponse<>(false, "Missing or invalid userTheme", null)
            );
        }

        try {
            String token = authHeader.replace("Bearer ", "");
            String username = jwtUtil.extractUsername(token);

            userService.saveUserTheme(username, userTheme);
            return ResponseEntity.ok(new ApiResponse<>(true, "User theme saved", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ApiResponse<>(false, e.getMessage(), null)
            );
        }
    }

    @PostMapping("/save-timezone")
    public ResponseEntity<?> saveTimeZone(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, String> body
    ) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ApiResponse<>(false, "Missing or invalid Authorization header", null)
            );
        }

        String timeZone = body.get("timeZone");

        if (timeZone == null || !PopularTimeZones.getTIMEZONES().contains(timeZone)) {
            return ResponseEntity.ok(new ApiResponse<>(false, "Invalid timezone", null));
        }

        try {
            String token = authHeader.replace("Bearer ", "");
            String username = jwtUtil.extractUsername(token);

            userService.saveTimeZone(username, timeZone);
            return ResponseEntity.ok(new ApiResponse<>(true, "Time zone saved", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ApiResponse<>(false, e.getMessage(), null)
            );
        }
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
            if (username == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                        new ApiResponse<>(false, "Invalid or expired token", null)
                );
            }

            String newToken = jwtUtil.generateToken(username);
            UserResponse response = userService.loginByUserName(username);

            return ResponseEntity.ok(new ApiResponse<>(true, "Successful token login", Map.of(
                    "token", newToken,
                    "username", response.getUsername(),
                    "registrationDate", response.getRegistrationDate(),
                    "timeZone", response.getTimeZone() != null ? response.getTimeZone() : Map.of(),
                    "userTheme", response.getUserTheme() != null ? response.getUserTheme() : Map.of()
            )));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ApiResponse<>(false, e.getMessage(), null)
            );
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
                    "registrationDate", response.getRegistrationDate(),
                    "timeZone", response.getTimeZone() != null ? response.getTimeZone() : Map.of(),
                    "userTheme", response.getUserTheme() != null ? response.getUserTheme() : Map.of()
            )));
        } catch (RuntimeException e) {
            return ResponseEntity.ok(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        String username = request.getUsername();
        String password = request.getPassword();
        String dateStr = request.getRegistrationDate();
        String userTimeZone = request.getTimeZone();
        UserTheme userTheme = request.getUserTheme();

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
            UserResponse response = userService.registerUser(username, password, registrationDate, userTimeZone, userTheme);
            String token = jwtUtil.generateToken(username);

            return ResponseEntity.ok(new ApiResponse<>(true, "Successful user registration", Map.of(
                    "token", token,
                    "username", response.getUsername(),
                    "registrationDate", response.getRegistrationDate(),
                    "timeZone", response.getTimeZone(),
                    "userTheme", response.getUserTheme()
            )));
        } catch (RuntimeException e) {
            return ResponseEntity.ok(new ApiResponse<>(false, e.getMessage(), null));
        }
    }
}
