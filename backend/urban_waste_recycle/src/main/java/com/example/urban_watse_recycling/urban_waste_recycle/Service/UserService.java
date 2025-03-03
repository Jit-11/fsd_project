package com.example.urban_watse_recycling.urban_waste_recycle.Service;

import com.example.urban_watse_recycling.urban_waste_recycle.Model.User;

import java.util.List;

public interface UserService {
    String add(User user);
    User getById(int id);
    List<User> getAll();
    String login(User user);
}
