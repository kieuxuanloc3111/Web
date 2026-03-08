package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("SELECT u FROM User u ORDER BY u.age ASC")
    List<User> getUsersOrderByAgeAsc();
}