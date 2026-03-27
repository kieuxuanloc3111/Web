package com.example.maven.project.dto;

import jakarta.validation.constraints.*;
public class UserRequest {
    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Email invalid")
    private String email;

    @Min(value = 1, message = "Age must be > 0")
    private int age;

    public String getName() { return name; }
    public String getEmail() { return email; }
    public int getAge() { return age; }

    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setAge(int age) { this.age = age; }
}
