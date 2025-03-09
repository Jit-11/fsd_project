package com.example.urban_watse_recycling.urban_waste_recycle.Controller;

import com.example.urban_watse_recycling.urban_waste_recycle.Model.User;
import com.example.urban_watse_recycling.urban_waste_recycle.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public String userAdd(@RequestBody User user) {
        return userService.add(user);
    }

    @GetMapping("/{uid}")
    public User userGet(@PathVariable Long uid) {
        return userService.getById(uid);
    }

    @GetMapping("/")
    public List<User> userList() {
        return userService.getAll();
    }

    @PostMapping("/login")
    public String userLogin(@RequestBody User user) {
        System.out.println("Received login request for email: " + user.getEmail());
        return userService.login(user);
    }
}
