package com.example.maven.project.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.maven.project.model.User;

public interface UserRepository extends JpaRepository<User,Integer> {
    
}
