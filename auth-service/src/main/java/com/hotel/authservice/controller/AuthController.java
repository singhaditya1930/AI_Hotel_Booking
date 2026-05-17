package com.hotel.authservice.controller;

import com.hotel.authservice.entity.User;
import com.hotel.authservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public User register(@RequestBody User user) {

        BCryptPasswordEncoder encoder =
                new BCryptPasswordEncoder();

        user.setPassword(
                encoder.encode(user.getPassword())
        );

        return userRepository.save(user);
    }

    @GetMapping("/test")
    public String test() {
        return "Auth Service Running";
    }
}