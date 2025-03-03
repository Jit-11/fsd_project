package com.example.urban_watse_recycling.urban_waste_recycle.Controller;

import com.example.urban_watse_recycling.urban_waste_recycle.Model.Admin;
import com.example.urban_watse_recycling.urban_waste_recycle.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/add")
    public String addAdmin(@RequestBody Admin admin) {
        adminService.add(admin);
        return "success";
    }

    @GetMapping("/{uid}")
    public Admin getAdmin(@PathVariable int uid) {
        return adminService.getById(uid);
    }

    @GetMapping("/get")
    public List<Admin> getAllAdmins() {
        return adminService.getAll();
    }

    @PostMapping("/login")
    public String loginAdmin(@RequestBody Admin admin) {
        return adminService.login(admin);
    }
}
