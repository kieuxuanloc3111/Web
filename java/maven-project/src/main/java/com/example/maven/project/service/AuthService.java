package com.example.maven.project.service;

import com.example.maven.project.security.JwtService;
import org.springframework.stereotype.Service;

import com.example.maven.project.dto.LoginRequest;
import com.example.maven.project.model.User;
import com.example.maven.project.repository.UserRepository;
@Service
public class AuthService {
    private final JwtService jwtService;
    private final UserRepository userRepository;
    public AuthService(UserRepository userRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    public String login(LoginRequest request){

        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Wrong password");
        }

        return jwtService.generateToken(user);
    }
}
