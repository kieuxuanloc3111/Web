package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import com.example.demo.service.UserService;
import com.example.demo.entity.User;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }
    // GET /users
    @GetMapping
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    // POST /users
    @PostMapping
    public User create(@RequestBody User user) {
        return userService.createUser(user);
    }
    @GetMapping("/sort-by-age")
    public List<User> sortByAge() {
        return userService.getUsersOrderByAgeAsc();
    }
}