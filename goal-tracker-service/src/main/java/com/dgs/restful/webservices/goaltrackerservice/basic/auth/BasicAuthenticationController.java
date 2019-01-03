package com.dgs.restful.webservices.goaltrackerservice.basic.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dgs.restful.webservices.goaltrackerservice.user.User;
import com.dgs.restful.webservices.goaltrackerservice.user.UserJpaRepository;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class BasicAuthenticationController {
	
	@Autowired
	private UserJpaRepository userJpaRepository;

	@GetMapping("/basicauth")
	public AuthenticationBean authWelcome() {
		
		return new AuthenticationBean("You are authenticated");
	}
}
