package com.example.urban_watse_recycling.urban_waste_recycle.Service;

import com.example.urban_watse_recycling.urban_waste_recycle.Model.Admin;

import java.util.List;

public interface AdminService {
    String add(Admin admin);
    Admin getById(int id);
    List<Admin> getAll();
    String login(Admin admin);
}
