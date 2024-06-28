package com.iaura.controller;


import com.iaura.dto.LoginRequest;
import com.iaura.dto.LoginResponse;
import com.iaura.entity.User;
import com.iaura.repository.UserRepository;

import com.iaura.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository repository;



    @PostMapping("/save")
    public ResponseEntity saveUser(@RequestBody User user) {
        userService.createUser(user);
        return ResponseEntity.ok("user saved to database");
    }

    @GetMapping("/getalluser")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginService(@RequestBody LoginRequest loginRequest) {
        System.out.println(loginRequest);
        User user = userService.login(loginRequest.getUsername(),loginRequest.getPassword());
        return new ResponseEntity<>(user,HttpStatus.OK);
    }


    @GetMapping("/getuserbyname/{username}")
    public ResponseEntity<User> getUserByName(@PathVariable("username") String username){
        User user = repository.findByUsername(username);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/getuserbyid/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
        User user = repository.findById(id).get();
        return ResponseEntity.ok(user);
    }

}
