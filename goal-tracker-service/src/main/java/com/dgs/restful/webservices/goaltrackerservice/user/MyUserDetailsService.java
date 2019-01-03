package com.dgs.restful.webservices.goaltrackerservice.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {
	
	public static String userName;
	
    @Autowired
    private UserJpaRepository userRepository;
 
    @Override
    public UserDetails loadUserByUsername(String username) {
    	userName = username;
    	System.out.println("11111111111111111"); 
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        return new MyUserPrincipal(user);
    }
    
}
