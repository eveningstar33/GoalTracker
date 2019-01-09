package com.dgs.restful.webservices.goaltrackerservice.goal;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

@Service
public class GoalHardCodedService {

	// This will act as a database
	private static List<Goal> goals = new ArrayList<>();   
	private static long idCounter = 0;
	
	// Create a static initializer block:
//	static {
//		goals.add(new Goal(++idCounter, 5L, "Learn to Dance", new Date(), false));
//		goals.add(new Goal(++idCounter, 5L, "Learn French", new Date(), false));
//		goals.add(new Goal(++idCounter, 5L, "Learn to Play Piano", new Date(), false));
//	}
	
	public List<Goal> findAll() {
		return goals;
	}
	
//	public Goal save(Goal goal) {
//		if (goal.getId() == -1 || goal.getId() == 0) {
//			goal.setId(++idCounter);
//			goals.add(goal); 
//		} else { 
//			deleteById(goal.getId());
//			goals.add(goal);
//		}
//		return goal;
//	}
	
//	public Goal deleteById(long id) {
//		Goal goal = findById(id);
//		if (goal == null) return null;
//		if (goals.remove(goal)) {    // remove() uses the equals() method, so we need to define it in the Goal class
//			return goal;
//		}
//		return null;
//	}
	
	public Goal findById(long id) {
		for (Goal goal : goals) {
			if (goal.getId() == id) {
				return goal;
			}
		}
		return null;
	}
	
}
