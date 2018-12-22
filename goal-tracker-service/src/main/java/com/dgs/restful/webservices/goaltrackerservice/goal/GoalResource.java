package com.dgs.restful.webservices.goaltrackerservice.goal;

import java.net.URI;
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

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class GoalResource {
	
	@Autowired
	private GoalHardCodedService goalService;

	@GetMapping("/users/{username}/goals")
	public List<Goal> getAllGoals(@PathVariable String username) {
		return goalService.findAll();
	}
	
	@GetMapping("/users/{username}/goals/{id}")
	public Goal getGoal(
			@PathVariable String username, @PathVariable long id) {
		return goalService.findById(id);
	}
	
	@DeleteMapping("/users/{username}/goals/{id}")
	public ResponseEntity<Void> deleteGoal(
			@PathVariable String username, @PathVariable long id) {
		
		Goal goal = goalService.deleteById(id);
		if (goal != null) {
			return ResponseEntity.noContent().build();
		}
		
		return ResponseEntity.notFound().build();
	}
	
	@PutMapping("/users/{username}/goals/{id}")
	public ResponseEntity<Goal> updateGoal(
			@PathVariable String username, @PathVariable long id, @RequestBody Goal goal) {
		
		// If you use @RequestBody you need to add a default constructor
		Goal updatedGoal = goalService.save(goal);
		return new ResponseEntity<Goal>(goal, HttpStatus.OK);
	}
	
	@PostMapping("/users/{username}/goals")
	public ResponseEntity<Void> createGoal(@PathVariable String username, @RequestBody Goal goal) {
		
		Goal createdGoal = goalService.save(goal); 
		
		// We're taking the current request path and appending "/id"
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
			.path("/{id}").buildAndExpand(createdGoal.getId()).toUri(); 
		
		// Return the location:
		return ResponseEntity.created(uri).build();
	}
	
}
