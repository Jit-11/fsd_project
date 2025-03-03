package com.example.urban_watse_recycling.urban_waste_recycle.Service;

import com.example.urban_watse_recycling.urban_waste_recycle.Dao.AdminDao;
import com.example.urban_watse_recycling.urban_waste_recycle.Model.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminDao adminDao;

    @Override
    public String add(Admin admin) {
        if (adminDao.findByEmail(admin.getEmail()).isPresent()) {
            return "Error: Email already exists";
        }
        adminDao.save(admin);
        return "Admin added successfully";
    }

    @Override
    public List<Admin> getAll() {
        return adminDao.findAll();
    }

    @Override
    public Admin getById(int id) {
        return adminDao.findById(id).orElse(null);
    }

    @Override
    public String login(Admin admin) {
        Admin foundAdmin = adminDao.findAdminByEmailAndPassword(admin.getEmail(), admin.getPassword());
        return (foundAdmin != null) ? "Login successful" : "Invalid Admin";
    }
}
