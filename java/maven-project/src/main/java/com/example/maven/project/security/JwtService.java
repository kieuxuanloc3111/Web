package com.example.maven.project.security;
import io.jsonwebtoken.*;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Service;

import com.example.maven.project.model.User;

import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
    private final String SECRET = "mysecretkeymysecretkeymysecretkey";
    private Key getKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    public String generateToken(User user){
        return Jwts.builder().setSubject(user.getEmail()).claim("role", user.getRole()).setIssuedAt(new Date()).setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)).signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    public String extractEmail(String token) {
        return Jwts.parserBuilder().setSigningKey(getKey()).build().parseClaimsJws(token).getBody().getSubject();
    }

    public Claims extractAllClaims(String token){
        return Jwts.parserBuilder().setSigningKey(getKey()).build().parseClaimsJws(token).getBody();
    }
    
}
