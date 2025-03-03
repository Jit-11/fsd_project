package com.example.urban_watse_recycling.urban_waste_recycle.Dao;

import com.example.urban_watse_recycling.urban_waste_recycle.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserDao extends JpaRepository<User, Integer> {
        Optional<User> findByEmail(String email);
        Optional<User> findByEmailAndPassword(String email, String password);

}
