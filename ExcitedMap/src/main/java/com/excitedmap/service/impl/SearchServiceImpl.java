package com.excitedmap.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import com.excitedmap.dao.SearchHistoryMapperImpl;
import com.excitedmap.dao.SpotMapperImpl;
import com.excitedmap.pojo.SearchHistory;
import com.excitedmap.pojo.Spot;
import com.excitedmap.pojo.SpotImpl;
import com.excitedmap.service.SearchService;

@Service("searchService")
public class SearchServiceImpl implements SearchService {
	@Resource
	private SearchHistoryMapperImpl searchHistoryDao;
	@Resource
	private SpotMapperImpl spotDao;

	@Override
	public List<SearchHistory> getSearchHistoryListByUserId(int userId, String keyword, int limit) {
		return searchHistoryDao.selectByUserIdAndKeywordWithLimit(userId, keyword, limit);
	}

	@Override
	public List<SpotImpl> searchSpotByKeywordOrderByPopularityWithLimit(String keyword, int limit) {
		return spotDao.selectBySpotNameKeywordOrderByPopularityWithLimit(keyword, limit);
	}

	@Override
	public List<SpotImpl> searchSpotByKeywordOrderByFavoriteCountWithLimit(String keyword, int limit) {
		return spotDao.selectBySpotNameKeywordOrderByFavoriteCountWithLimit(keyword, limit);
	}

	@Override
	public List<SpotImpl> searchSpotByKeywordOrderByFootprintCountWithLimit(String keyword, int limit) {
		return spotDao.selectBySpotNameKeywordOrderByFootprintCountWithLimit(keyword, limit);
	}

	@Override
	public List<SpotImpl> searchSpotByKeywordOrderByWishCountWithLimit(String keyword, int limit) {
		return spotDao.selectBySpotNameKeywordOrderByWishCountWithLimit(keyword, limit);
	}

	@Override
	public List<SpotImpl> searchSpotByKeywordOrderByAverageReviewRatingWithLimit(String keyword, int limit) {
		return spotDao.selectBySpotNameKeywordOrderByAverageReviewRatingWithLimit(keyword, limit);
	}

	@Override
	public List<SpotImpl> searchSpotByKeyword(String keyword, int limit) {
		return spotDao.selectBySpotNameKeyword(keyword, limit);
	}

	@Override
	public void addSearchHistory(int userId, String searchText) {
		SearchHistory searchHistory = new SearchHistory();
		searchHistory.setUserId(userId);
		searchHistory.setSearchText(searchText);
		try {
			searchHistoryDao.insertSelective(searchHistory);
		} catch (DuplicateKeyException e) {
		}
	}

	@Override
	public List<Spot> searchSpotByCoordinate(Double startCoordinateX, Double startCoordinateY, Double endCoordinateX,
			Double endCoordinateY) {
		Double midCoordinateX = (startCoordinateX + endCoordinateX) / 2;
		Double midCoordinateY = (startCoordinateY + endCoordinateY) / 2;
		Double radius = Math.sqrt(
				(Math.pow(startCoordinateX - midCoordinateX, 2) + Math.pow(startCoordinateY - midCoordinateY, 2)));
		return spotDao.selectByCenterPointAndRadius(midCoordinateX, midCoordinateY, radius);
	}

	@Override
	public List<SpotImpl> searchSpotByUserCoordinate(Double userCoordinateX, Double userCoordinateY, Double radius,
			int limit, String orderby) {
		if (orderby.equals("averageReviewRating")) {
			return spotDao.selectByUserCenterPointAndRadiusOrderByAverageReviewRatingWithLimit(userCoordinateX,
					userCoordinateY, radius, limit);
		} else if (orderby.equals("wishCount")) {
			return spotDao.selectByUserCenterPointAndRadiusOrderByWishCountWithLimit(userCoordinateX, userCoordinateY,
					radius, limit);
		} else if (orderby.equals("favoriteCount")) {
			return spotDao.selectByUserCenterPointAndRadiusOrderByFavoriteCountWithLimit(userCoordinateX,
					userCoordinateY, radius, limit);
		} else if (orderby.equals("footprintCount")) {
			return spotDao.selectByUserCenterPointAndRadiusOrderByFootprintCountWithLimit(userCoordinateX,
					userCoordinateY, radius, limit);
		} else if (orderby.equals("popularity")) {
			return spotDao.selectByUserCenterPointAndRadiusOrderByPopularityWithLimit(userCoordinateX, userCoordinateY,
					radius, limit);
		}
		return null;
	}

}
