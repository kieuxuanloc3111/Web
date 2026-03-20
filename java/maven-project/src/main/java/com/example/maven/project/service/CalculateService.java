package com.example.maven.project.service;

import org.springframework.stereotype.Service;

@Service
public class CalculateService {
    public int calculate(int a , int b){
        return a+b;
    }
}
