package com.example.urban_watse_recycling.urban_waste_recycle.Dao;

import com.example.urban_watse_recycling.urban_waste_recycle.Model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminDao extends JpaRepository<Admin, Integer> {
    Optional<Admin> findByEmail(String email);
    Admin findByName(@Param("name") String name);

    @Query(value = "SELECT * FROM admin a WHERE a.email = :email AND a.password = :password", nativeQuery = true)
    Admin findAdminByEmailAndPassword(@Param("email") String email, @Param("password") String password);
}
