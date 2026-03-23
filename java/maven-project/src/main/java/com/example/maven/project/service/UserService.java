package com.example.maven.project.service;
import com.example.maven.project.exception.DuplicateEmailException;
import com.example.maven.project.exception.UserNotFoundException;
import com.example.maven.project.model.User;
import com.example.maven.project.repository.UserRepository;

import java.util.*;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // CREATE
    public User create(User user) {
        return userRepository.save(user);
    }

    // GET ALL
    public List<User> getAll() {
        return userRepository.findAll();
    }

    // GET BY ID
    public User getById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // UPDATE
    public User update(Integer id, User newUser) {
        User user = getById(id);

        user.setName(newUser.getName());
        user.setEmail(newUser.getEmail());
        user.setAge(newUser.getAge());

        return userRepository.save(user);
    }

    // DELETE
    public void delete(Integer id) {
        userRepository.deleteById(id);
    }
}
