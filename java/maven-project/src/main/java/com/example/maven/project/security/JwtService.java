package com.example.maven.project.security;
import io.jsonwebtoken.*;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
    private final String SECRET = "mysecretkeymysecretkeymysecretkey";
    private Key getKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    public String generateToken(String email){
        return Jwts.builder().setSubject(email).setIssuedAt(new Date()).setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)).signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    public String extractEmail(String token) {
        return Jwts.parserBuilder().setSigningKey(getKey()).build().parseClaimsJws(token).getBody().getSubject();
    }
}
