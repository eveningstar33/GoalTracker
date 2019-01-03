package com.dgs.restful.webservices.goaltrackerservice.user;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

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
	
	@PostMapping("/allusers")
	public ResponseEntity<Void> createUser(@RequestBody User user) {
		user.setPassword(encoder.encode(user.getPassword())); 
		User createdUser = userJpaRepository.save(user);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
		.path("/{id}").buildAndExpand(createdUser.getId()).toUri(); 
		
		return ResponseEntity.created(uri).build();
	}
}
