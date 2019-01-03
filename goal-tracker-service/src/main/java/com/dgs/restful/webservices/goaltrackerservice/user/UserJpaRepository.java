package com.dgs.restful.webservices.goaltrackerservice.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserJpaRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
