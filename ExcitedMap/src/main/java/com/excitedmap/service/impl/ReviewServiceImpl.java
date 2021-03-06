package com.excitedmap.service.impl;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.excitedmap.dao.ReviewMapperImpl;
import com.excitedmap.dao.ReviewPhotoMapperImpl;
import com.excitedmap.dao.SpotPhotoMapperImpl;
import com.excitedmap.pojo.Review;
import com.excitedmap.pojo.ReviewImpl;
import com.excitedmap.pojo.ReviewPhoto;
import com.excitedmap.pojo.SpotPhoto;
import com.excitedmap.service.ReviewService;

@Service("reviewService")
public class ReviewServiceImpl implements ReviewService {
	@Resource
	private ReviewMapperImpl reviewDao;
	@Resource
	private ReviewPhotoMapperImpl reviewPhotoDao;
	@Resource
	private SpotPhotoMapperImpl spotPhotoDao;

	@Override
	public List<Review> getReviewListByUserId(int userId) {
		return reviewDao.selectByUserId(userId);
	}

	@Override
	public List<Review> getReviewListBySpotId(int spotId) {
		return reviewDao.selectBySpotId(spotId);
	}

	@Override
	@Transactional
	public void addReview(ReviewImpl review) {
		reviewDao.insertSelective(review);
		List<ReviewPhoto> reviewPhotoList = review.getReviewPhotoList();
		for (int i = 0; i < reviewPhotoList.size(); i++) {
			ReviewPhoto reviewPhoto = reviewPhotoList.get(i);
			reviewPhoto.setReviewId(review.getReviewId());
			reviewPhotoDao.updateByPrimaryKeySelective(reviewPhoto);
			SpotPhoto spotPhoto = new SpotPhoto();
			spotPhoto.setSpotId(review.getSpotId());
			spotPhoto.setSpotPhotoPath(reviewPhoto.getReviewPhotoPath());
			spotPhotoDao.insertSelective(spotPhoto);
		}
	}

	@Override
	public ReviewPhoto addReviewPhoto(HttpServletRequest request, MultipartFile file) {
		String uploadRootPath = request.getServletContext().getRealPath("img/upload");
		File uploadRootDir = new File(uploadRootPath);
		if (!uploadRootDir.exists()) {
			uploadRootDir.mkdirs();
		}
		String name = UUID.randomUUID().toString();
		try {
			byte[] bytes = file.getBytes();
			File serverFile = new File(uploadRootDir.getAbsolutePath() + File.separator + name);
			BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
			stream.write(bytes);
			stream.close();
		} catch (Exception e) {
			System.out.println("Error Write file: " + name);
		}
		ReviewPhoto reviewPhoto = new ReviewPhoto();
		reviewPhoto.setReviewPhotoPath("img/upload" + File.separator + name);
		reviewPhotoDao.insertSelective(reviewPhoto);
		return reviewPhoto;
	}

}
