package com.iaura.service.impl;

import com.iaura.entity.User;
import com.iaura.exceptions.UserIsEmptyException;
import com.iaura.repository.UserRepository;
import com.iaura.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void createUser(User user) {
        if(user==null && user.getUsername() == null && user.getPassword() == null)
            throw new UserIsEmptyException("empty user");
        else{
            userRepository.save(user);
        }
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User login(String username, String password) {
        User user = userRepository.findByUsernameAndPassword(username,password);
        return user;
    }
}
