package com.dgs.restful.webservices.goaltrackerservice.goal;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GoalResource {
	
	@Autowired
	private goalHardCodedService goalService;

	@GetMapping("/users/{username}/goals")
	public List<Goal> getAllGoals(@PathVariable String username) {
		return goalService.findAll();
	}
}
