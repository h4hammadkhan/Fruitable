package com.fruitable.Service;

import com.fruitable.model.Impression;

public interface ImpressionService {

		// vote up user impression
		public Impression voteUp(Impression impression);
		
		// vote down user impression
		public Impression voteDown(Impression impression);
}
