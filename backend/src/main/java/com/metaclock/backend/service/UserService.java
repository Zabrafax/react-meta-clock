package com.metaclock.backend.service;

import com.metaclock.backend.dto.UserResponse;
import com.metaclock.backend.model.User;
import com.metaclock.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public void saveTimeZone(String username, String timeZone) {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        user.setTimeZone(timeZone);
        userRepository.save(user);
    }

    public UserResponse registerUser(String username, String rawPassword, LocalDate registrationDate, String timeZone) {
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("Username already exists");
        }

        String hashedPassword = passwordEncoder.encode(rawPassword);
        User user = new User();
        user.setUsername(username);
        user.setPassword(hashedPassword);
        user.setRegistrationDate(registrationDate);
        user.setTimeZone(timeZone);

        try {
            userRepository.save(user);
            return new UserResponse(username, registrationDate, timeZone);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Username already taken");
        }
    }

    public UserResponse loginByUserName(String username) {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new RuntimeException("User not found");
        }
        
        return new UserResponse(user.getUsername(), user.getRegistrationDate(), user.getTimeZone());
    }

    public UserResponse loginUser(String username, String rawPassword) {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return new UserResponse(user.getUsername(), user.getRegistrationDate(), user.getTimeZone());
    }
}
