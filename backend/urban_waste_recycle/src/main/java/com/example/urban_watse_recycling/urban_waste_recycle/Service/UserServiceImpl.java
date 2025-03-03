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
        if (userDao.findByEmail(user.getEmail()).isPresent()) {
            return "Error: Email already exists";
        }
        userDao.save(user);
        return "User added successfully";
    }

    @Override
    public List<User> getAll() {
        return userDao.findAll();
    }

    @Override
    public User getById(int id) {
        return userDao.findById(id).orElse(null);
    }

    @Override
    public String login(User user) {
        Optional<User> foundUser = userDao.findByEmailAndPassword(user.getEmail(), user.getPassword());
        return foundUser.isPresent() ? "Login successful" : "Invalid user";
    }
}
