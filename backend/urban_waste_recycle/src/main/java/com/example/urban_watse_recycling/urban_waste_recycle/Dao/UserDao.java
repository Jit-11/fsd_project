package com.example.urban_watse_recycling.urban_waste_recycle.Dao;

import com.example.urban_watse_recycling.urban_waste_recycle.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;


public interface UserDao extends JpaRepository<User,Long> {
        Optional<User> findByEmail(String email);
}

