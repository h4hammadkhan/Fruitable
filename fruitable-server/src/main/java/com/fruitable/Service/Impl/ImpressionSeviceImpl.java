package com.fruitable.Service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fruitable.Repo.ImpressionRepository;
import com.fruitable.Service.ImpressionService;
import com.fruitable.model.Impression;


@Service
public class ImpressionSeviceImpl implements ImpressionService{

	@Autowired
	private ImpressionRepository impressionRepository;

	
	@Override
	public Impression voteUp(Impression impression) {
		return this.impressionRepository.save(impression);
	}

	@Override
	public Impression voteDown(Impression impression) {
		return this.impressionRepository.save(impression);
	}
	
	
	
}
