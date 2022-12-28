package com.fruitable.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fruitable.Service.Impl.UserDetailsServiceImpl;

import io.jsonwebtoken.ExpiredJwtException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;
	
	// object that have token validation,generation,expiration method
	@Autowired
	private JwtUtil jwtUtil; 
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		final String requestTokenHeader = request.getHeader("Authorization");
		System.out.println(requestTokenHeader);
		String userName = null;
		String jwtToken = null;
		
		if(requestTokenHeader!=null && requestTokenHeader.startsWith("Bearer ")) {
			//yes has token
			
			jwtToken = requestTokenHeader.substring(7);
			System.out.println("token: "+jwtToken);
						
			try {
				
				userName = this.jwtUtil.extractUsername(jwtToken);
				System.out.println("username: "+userName);
				
			}catch (ExpiredJwtException e) {
				
				e.printStackTrace();
				System.out.println("jwt token has been expired !!");
			}catch (Exception e) {
				e.printStackTrace();
				System.out.println("Error");
			}
			
		}
		else {
			System.out.println("Invalid Token OR not start with bearer string");
		}
		
		
		// validate jwtToken
		if(userName!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
			
			 final UserDetails userDetails = this.userDetailsServiceImpl.loadUserByUsername(userName);
			 
			 // checking token is valid
			 if(this.jwtUtil.validateToken(jwtToken, userDetails)) {
				 
				 //set authentication in security context holder
				 UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new 
 					UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
				 
				 usernamePasswordAuthenticationToken.setDetails(new 
						 WebAuthenticationDetailsSource().buildDetails(request));
				 
				 SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
			 } 
		}
		else {
			System.out.println("Token is not Valid");
		}
		
		// Forward request 
		filterChain.doFilter(request, response);
				
	}

}
