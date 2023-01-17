package com.fruitable.fileResponse;

import java.util.List;

import com.fruitable.UserOrderModel.Ship;
import com.fruitable.model.User;


public class UserPageableResponse {
	
	private List<User> content;
	private int pageNumber;
	private int pageeSize;
	private Long totalElements;
	private int totalPages;
	private boolean lastPage;
	
	
	
	public UserPageableResponse() {
		super();
	}

	public UserPageableResponse(List<User> content, int pageNumber, int pageeSize, Long totalElements,
			int totalPages, boolean lastPage) {
		super();
		this.content = content;
		this.pageNumber = pageNumber;
		this.pageeSize = pageeSize;
		this.totalElements = totalElements;
		this.totalPages = totalPages;
		this.lastPage = lastPage;
	}

	public List<User> getContent() {
		return content;
	}

	public void setContent(List<User> content) {
		this.content = content;
	}

	public int getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(int pageNumber) {
		this.pageNumber = pageNumber;
	}

	public int getPageeSize() {
		return pageeSize;
	}

	public void setPageeSize(int pageeSize) {
		this.pageeSize = pageeSize;
	}

	public Long getTotalElements() {
		return totalElements;
	}

	public void setTotalElements(Long totalElements) {
		this.totalElements = totalElements;
	}

	public int getTotalPages() {
		return totalPages;
	}

	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}

	public boolean isLastPage() {
		return lastPage;
	}

	public void setLastPage(boolean lastPage) {
		this.lastPage = lastPage;
	}
	
	
	
}
