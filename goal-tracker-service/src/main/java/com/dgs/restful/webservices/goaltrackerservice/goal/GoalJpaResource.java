package com.dgs.restful.webservices.goaltrackerservice.goal;

import java.net.URI;
import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.dgs.restful.webservices.goaltrackerservice.user.User;
import com.dgs.restful.webservices.goaltrackerservice.user.UserJpaRepository;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class GoalJpaResource {
	
	private Long userId;
	
	@Autowired
	private GoalJpaRepository goalJpaRepository;
	
	@Autowired
	private UserJpaRepository userJpaRepository;

	@GetMapping("/jpa/users/{username}/goals")
	public List<Goal> getAllGoals(@PathVariable String username, Principal principal) {
		userId = getUserIdFromUsername(username, principal);
	    return goalJpaRepository.findByUserId(userId);
	}
	
	@GetMapping("/jpa/users/{username}/goals/{id}")
	public Goal getGoal(
			@PathVariable String username, @PathVariable long id, Principal principal) {
		userId = getUserIdFromUsername(username, principal);
		if (goalJpaRepository.findById(id).get().getUserId() == userId) {
			return goalJpaRepository.findById(id).get();
		} else {
			throw new UserNotAcceptableException("Bad goal id");
		}
	}
	
	@DeleteMapping("/jpa/users/{username}/goals/{id}")
	public ResponseEntity<Void> deleteGoal(
			@PathVariable String username, @PathVariable long id, Principal principal) {
		userId = getUserIdFromUsername(username, principal);
		if (goalJpaRepository.findById(id).get().getUserId() == userId) {
			goalJpaRepository.deleteById(id);
			return ResponseEntity.noContent().build();
		} else {
			throw new UserNotAcceptableException("Bad goal id");
		}
	}
	
	@PutMapping("/jpa/users/{username}/goals/{id}")
	public ResponseEntity<Goal> updateGoal(
			@PathVariable String username, @PathVariable long id, @RequestBody Goal goal, Principal principal) {
		
		// If you use @RequestBody you need to add a default constructor
		userId = getUserIdFromUsername(username, principal);
		Goal dbGoal = goalJpaRepository.findById(id).get();
		
		if (dbGoal.getUserId() == goal.getUserId() && userId == goal.getUserId()) { 
			Goal updatedGoal = goalJpaRepository.save(goal);
			return new ResponseEntity<Goal>(goal, HttpStatus.OK);
		} else {
			throw new UserNotAcceptableException("Bad goal id"); 
		}

	}
	
	@PostMapping("/jpa/users/{username}/goals")
	public ResponseEntity<Void> createGoal(
			@PathVariable String username, @RequestBody Goal goal, Principal principal) {
		System.out.println("goal id = " + goal.getId()); 
		System.out.println("goal user id = " + goal.getUserId()); 
		userId = getUserIdFromUsername(username, principal);
		if ((goal.getId() != null)) {
			if (goalJpaRepository.findById(goal.getId()).isPresent()) { 
				if (goalJpaRepository.findById(goal.getId()).get().getUserId() != userId) {
					throw new UserNotAcceptableException("Bad goal id");
				} 
			}
		}
		goal.setUserId(userId); 
		Goal createdGoal = goalJpaRepository.save(goal); 

		// We're taking the current request path and appending "/id"
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
			.path("/{id}").buildAndExpand(createdGoal.getId()).toUri(); 
		
		// Return the location:
		return ResponseEntity.created(uri).build();
	}
	
	public Long getUserIdFromUsername(String username, Principal principal) {
		if (username.equals(principal.getName())) {
		    User user = userJpaRepository.findByUsername(username);
		    userId = user.getId(); 
		    return userId;
		} else {
			throw new UserNotAcceptableException("Bad username-" + username);
		}
	}
	
}
