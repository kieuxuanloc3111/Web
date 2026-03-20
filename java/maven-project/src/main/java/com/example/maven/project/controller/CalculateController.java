package com.example.maven.project.controller;

import org.springframework.web.bind.annotation.*;

import com.example.maven.project.service.CalculateService;
import com.example.maven.project.service.UserService;


@RestController
@RequestMapping("/api")
public class CalculateController {
    private final CalculateService calculateservice;
        public CalculateController(CalculateService calculateservice) {
        this.calculateservice = calculateservice;
    }

    @GetMapping("/sum")
    public String hello(@RequestParam int a, @RequestParam int b) {
        return "result: " + calculateservice.calculate(a, b);
    }
}
