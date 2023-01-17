package com.fruitable.Repo;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.fruitable.model.User;


public interface UserRepository extends JpaRepository<User, Long> {

	//get user by UserName
	public User findByUserName(String username);
	
	
	// update only one column impression
	@Modifying
	@Transactional
	@Query("UPDATE User u SET u.impression = :impression WHERE u.userId = :userId")
	public void UpdateImpression(@Param("impression") Long impression, @Param("userId") Long userId);
		
	// update only one column enabled
	@Modifying
	@Transactional
	@Query("UPDATE User u SET u.enabled = :enabled WHERE u.userId = :userId")
	public void UpdateEnabled(@Param("enabled") Boolean enabled, @Param("userId") Long userId);
	
	// get user by role, buyer and seller, Admin
	@Transactional
	@Query("SELECT u FROM User u WHERE u.userId IN((SELECT ur.user.userId FROM UserRole ur WHERE ur.role.roleId = (SELECT r.roleId FROM Role r WHERE r.roleId = :roleId)))")
	public  Page<User> getUsersByRole(@Param("roleId") Long roleId,Pageable p);
}
