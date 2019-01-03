package com.dgs.restful.webservices.goaltrackerservice.basic.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.dgs.restful.webservices.goaltrackerservice.user.MyUserDetailsService;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfigurationBasicAuth extends WebSecurityConfigurerAdapter {
	
	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
	 	return new BCryptPasswordEncoder();
	}
	
	@Autowired
	private MyUserDetailsService userDetailsService;
	
	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		System.out.println("Here 223"); 
	    DaoAuthenticationProvider authProvider
	      = new DaoAuthenticationProvider();
	    authProvider.setUserDetailsService(userDetailsService);
	    authProvider.setPasswordEncoder(bCryptPasswordEncoder());
	    return authProvider;
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		System.out.println("Here 999");
		
		// We disable form login
		// Also we disable CSRF, the CSRF will force our POST and PUT requests, they would need to start having something called
		// a CSRF token. At a later point in time I'll be using JWT as authentication, so the option I choose to prevent 
		// cross site forgery request is to use JWT token. I'll not use the CSRF token so I'll disable it. 
		
		// I'll allow the preflight request to all the urls. It is an OPTIONS request. So any OPTIONS method to any URL. 
		// So we want to enable any OPTIONS requests without authentication, authenticate all the other requests and use
		// http basic authentication.

		http
			.csrf().disable()
			.authorizeRequests()
			.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
			.antMatchers("/allusers").permitAll()
				.anyRequest().authenticated()
				.and()
			// .formLogin().and()
			.httpBasic();
		}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
	    auth.authenticationProvider(authenticationProvider());
	}
}
