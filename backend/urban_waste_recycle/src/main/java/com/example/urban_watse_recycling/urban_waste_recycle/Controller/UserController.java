package com.example.urban_watse_recycling.urban_waste_recycle.Controller;

import com.example.urban_watse_recycling.urban_waste_recycle.Model.User;
import com.example.urban_watse_recycling.urban_waste_recycle.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public String userAdd(@RequestBody User user) {
        userService.add(user);
        return "User added successfully";
    }

    @GetMapping("/{uid}")
    public User userGet(@PathVariable int uid) {
        return userService.getById(uid);
    }

    @GetMapping("/")
    public List<User> userList() {
        return userService.getAll();
    }

    @PostMapping("/login")
    public String userLogin(@RequestBody User user) {
        return userService.login(user);
    }
}
