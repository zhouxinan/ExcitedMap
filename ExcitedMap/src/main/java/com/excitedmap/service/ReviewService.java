package com.excitedmap.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;

import com.excitedmap.pojo.Review;
import com.excitedmap.pojo.ReviewImpl;
import com.excitedmap.pojo.ReviewPhoto;

public interface ReviewService {
	public List<Review> getReviewListByUserId(int userId);

	public List<Review> getReviewListBySpotId(int spotId);

	public ReviewPhoto addReviewPhoto(HttpServletRequest request, MultipartFile file);

	void addReview(ReviewImpl review);

}