package com.fruitable.fileResponse;

import com.fruitable.model.Impression;

public class ImpressionResponse {
	
	private Impression content;
	private String message;
		
	public ImpressionResponse() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ImpressionResponse(Impression content, String message) {
		super();
		this.content = content;
		this.message = message;
	}

	public Impression getContent() {
		return content;
	}

	public void setContent(Impression content) {
		this.content = content;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	
	
	
}
