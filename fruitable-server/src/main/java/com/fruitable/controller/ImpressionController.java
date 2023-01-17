package com.fruitable.controller;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fruitable.Repo.ImpressionRepository;
import com.fruitable.Repo.UserRepository;
import com.fruitable.Service.ImpressionService;
import com.fruitable.fileResponse.ImpressionResponse;
import com.fruitable.model.Impression;
import com.fruitable.model.User;

@RestController
@CrossOrigin("*")
@RequestMapping("/impression")
public class ImpressionController {

	
	@Autowired
	private ImpressionService impressionService;
	
	@Autowired
	private ImpressionRepository impressionRepository;
	
	@Autowired
	private UserRepository userRepository;

	
	// up vote
	@PostMapping("/up")
	public ResponseEntity<ImpressionResponse> upVoteUser(@RequestBody Impression impression) {
		//to store userID form impression
		Long UserId = impression.getUser().getUserId();
		// creating object of a user
		User user = new User();
		// set id 
		user.setUserId(UserId);
		Impression voteUp = null;
		// check if find by user AND sellerUserName is null 
		// check if a user already voteUp a specific user,
		// if yes prevent to voteUp 
		// if no allow to voteUp
		if(this.impressionRepository.findByUserAndSellerUserNameAndVote(
				user,impression.getSellerUserName(),"up") == null) {
			// vote up
			voteUp = this.impressionService.voteUp(impression);
			
			User findByUserName = this.userRepository.findByUserName(impression.getSellerUserName());
			Long incImpression = findByUserName.getImpression();
			incImpression++;
			// increment the value of impression
			this.userRepository.UpdateImpression(incImpression, findByUserName.getUserId());
					
			return new ResponseEntity<>(new ImpressionResponse(
					voteUp, "successfully VoteUp"),HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(new ImpressionResponse(
					null, "You can not voteUp because you alredy did."),HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@PostMapping("/down")
	public ResponseEntity<ImpressionResponse> downVoteUser(@RequestBody Impression impression) {
		//to store userID form impression
		Long UserId = impression.getUser().getUserId();
		// creating object of a user
		User user = new User();
		// set id 
		user.setUserId(UserId);
		Impression voteDown = null;
		// check if find by user AND sellerUserName is null 
		// check if a user already voteUp a specific user,
		// if yes prevent to voteDown 
		// if no allow to voteDown
		if(this.impressionRepository.findByUserAndSellerUserNameAndVote(
				user,impression.getSellerUserName(),"down") == null
		) {
			// vote up
			voteDown = this.impressionService.voteDown(impression);
			
			User findByUserName = this.userRepository.findByUserName(impression.getSellerUserName());
			Long incImpression = findByUserName.getImpression();
			incImpression--;
			// decrement the value of impression
			this.userRepository.UpdateImpression(incImpression, findByUserName.getUserId());
					
			return new ResponseEntity<>(new ImpressionResponse(
					voteDown, "successfully VoteDown"),HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(new ImpressionResponse(
					null, "You can not voteDown because you alredy did."),HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	
	
}
