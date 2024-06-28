package com.iaura.service;

import com.iaura.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    public void createUser(User user);

    public List<User> getAllUsers();

    public User login(String username, String password);


}
