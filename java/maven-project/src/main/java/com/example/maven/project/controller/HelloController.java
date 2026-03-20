package com.example.maven.project.controller;

import org.springframework.web.bind.annotation.*;

import com.example.maven.project.service.UserService;


@RestController
@RequestMapping("/api")
public class HelloController {
    private final UserService userService;

    public HelloController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping("/hello")
    public String getUser() {
        return userService.getName();
    
    }
}