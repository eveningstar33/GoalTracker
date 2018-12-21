package com.dgs.restful.basic.auth;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfigurationBasicAuth extends WebSecurityConfigurerAdapter {

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
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
				.anyRequest().authenticated()
				.and()
			// .formLogin().and()
			.httpBasic();
	}
}
