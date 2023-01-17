package com.fruitable;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.fruitable.helper.UserFoundException;
import com.fruitable.Service.UserService;
import com.fruitable.model.Role;
import com.fruitable.model.User;
import com.fruitable.model.UserRole;

@SpringBootApplication
public class FruitableServerApplication implements CommandLineRunner {

	@Autowired
	private UserService userService;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public static void main(String[] args) {
		SpringApplication.run(FruitableServerApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("starting code...");
		
		try {
			User user = new User();
			
			user.setFirst_name("Hammad");
			user.setLast_name("Khan");
			user.setUserName("h4hammad");
			user.setPassword(this.bCryptPasswordEncoder.encode("hammad"));
			user.setEmail("abc@demo.com");
			user.setProfile_image("default.png");
			user.setPhone("1010101010");
			
			Role role1 = new Role();
			role1.setRoleId(44L);
			role1.setRoleName("ADMIN");
			
			Set<UserRole> userRoleSet = new HashSet<>();
			UserRole userRole = new UserRole();
			userRole.setRole(role1);
			userRole.setUser(user);
			
			userRoleSet.add(userRole);
			
			User user1 = this.userService.createUser(user, userRoleSet);
			System.out.println(user1.getUserName());
			
		}catch (UserFoundException e) {
			e.printStackTrace();
		}
		
	}
	
	

}
