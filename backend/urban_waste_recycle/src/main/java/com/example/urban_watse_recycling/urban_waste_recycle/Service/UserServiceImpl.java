package com.example.urban_watse_recycling.urban_waste_recycle.Service;

import com.example.urban_watse_recycling.urban_waste_recycle.Dao.UserDao;
import com.example.urban_watse_recycling.urban_waste_recycle.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public String add(User user) {
        Optional<User> existingUser = userDao.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            System.out.println("User already exists: " + existingUser.get());
            return "Error: Email already exists";
        }
        System.out.println("Saving new user: " + user);
        userDao.save(user);
        return "User added successfully";
    }


    @Override
    public List<User> getAll() {
        return userDao.findAll();
    }

    @Override
    public User getById(Long id) {
        return userDao.findById(id).orElse(null);
    }

    @Override
    public String login(User user) {
        Optional<User> foundUser = userDao.findByEmail(user.getEmail());

        if (foundUser.isPresent() && foundUser.get().getPassword().equals(user.getPassword())) {
            return "Login successful";
        } else {
            return "Invalid user";
        }
    }
}
