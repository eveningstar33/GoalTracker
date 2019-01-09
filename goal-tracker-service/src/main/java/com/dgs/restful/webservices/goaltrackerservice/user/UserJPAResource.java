package com.dgs.restful.webservices.goaltrackerservice.user;

import java.net.URI;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.dgs.restful.webservices.goaltrackerservice.goal.Goal;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class UserJPAResource {
	
	@Autowired
	private UserJpaRepository userJpaRepository;
	
	@Autowired
	private BCryptPasswordEncoder encoder;

	@GetMapping("/allusers")
	public List<User> getAllUsers() {
		return userJpaRepository.findAll();
	}
	
	@PostMapping("/register")
	public ResponseEntity<User> createUser(@RequestBody User user) {
		user.setPassword(encoder.encode(user.getPassword())); 
		User createdUser = new User();		
		try {
		    createdUser = save(user);
		} catch (DataIntegrityViolationException e) {
			if (e.getMessage().contains("email")) {
				User duplicatedUser = new User(null, null, "duplicated", null);
				return new ResponseEntity<User>(duplicatedUser, HttpStatus.CONFLICT);
			} else if (e.getMessage().contains("username")) {
				User duplicatedUser = new User(null, "duplicated", null, null);
				return new ResponseEntity<User>(duplicatedUser, HttpStatus.CONFLICT);
			}
		}
		return new ResponseEntity<User>(createdUser, HttpStatus.OK);
	}
	
	@DeleteMapping("/allusers/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable long id) {
		userJpaRepository.deleteById(id); 
		return ResponseEntity.noContent().build();
	}
	
	public User save(User user) throws DataIntegrityViolationException {
		User newUser = userJpaRepository.save(user);
		return newUser;
	}
}
