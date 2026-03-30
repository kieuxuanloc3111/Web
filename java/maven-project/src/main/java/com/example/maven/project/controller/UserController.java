package com.example.maven.project.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.maven.project.dto.UserRequest;
import com.example.maven.project.dto.UserResponse;
import com.example.maven.project.model.User;
import com.example.maven.project.service.UserService;

import jakarta.validation.Valid;



@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/register")
    public UserResponse create(@RequestBody @Valid UserRequest request) {
        return userService.create(request);
    }

    @GetMapping
    public List<UserResponse> getAll() {
        return userService.getAll();
    }
    
    @GetMapping("/{id}")
    public UserResponse getById(@PathVariable Integer id) {
        return userService.getById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public UserResponse update(@PathVariable Integer id,
                            @RequestBody @Valid UserRequest request) {
        return userService.update(id, request);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Integer id) {
        userService.delete(id);
        return "Deleted";
    }
}