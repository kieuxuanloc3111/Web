package com.example.maven.project.service;
import com.example.maven.project.dto.UserRequest;
import com.example.maven.project.dto.UserResponse;
import com.example.maven.project.exception.DuplicateEmailException;
import com.example.maven.project.exception.UserNotFoundException;
import com.example.maven.project.model.User;
import com.example.maven.project.repository.UserRepository;

import java.util.*;
import java.util.stream.Collectors;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // CREATE
    public UserResponse create(UserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateEmailException("Email already exists");
        }
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setAge(request.getAge());
        user.setPassword(passwordEncoder.encode(request.getP));
        user.setRole("USER");
        User saved = userRepository.save(user);

        return new UserResponse(
            saved.getId(),
            saved.getName(),
            saved.getEmail()
        );
    }

    // GET ALL
    public List<UserResponse> getAll() {
        return userRepository.findAll().stream().map(user -> new UserResponse(user.getId(),user.getName(),user.getEmail())).toList();
    }

    // GET BY ID
    public UserResponse getById(Integer id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail()
        );
    }

    // UPDATE
    public UserResponse update(Integer id, UserRequest newUser) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(newUser.getName());
        user.setEmail(newUser.getEmail());
        user.setAge(newUser.getAge());

        User updated = userRepository.save(user);

        return new UserResponse(updated.getId(),updated.getName(),updated.getEmail());
    }

    // DELETE
    public void delete(Integer id) {
        userRepository.deleteById(id);
    }
}
