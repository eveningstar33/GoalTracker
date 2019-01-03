package com.dgs.restful.webservices.goaltrackerservice.goal;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GoalJpaRepository extends JpaRepository<Goal, Long> {

	List<Goal> findByUserId(Long userId);
}
