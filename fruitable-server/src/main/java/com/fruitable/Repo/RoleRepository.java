package com.fruitable.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fruitable.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

}
