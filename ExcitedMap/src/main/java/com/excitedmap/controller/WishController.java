package com.excitedmap.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.excitedmap.pojo.Wish;
import com.excitedmap.service.WishService;

@RestController
@RequestMapping("/wish")
public class WishController {
	@Resource
	private WishService wishService;

	// 插入心愿，SQL处还没有做Duplicate限制，先假装有限制。
	@RequestMapping(method = RequestMethod.PUT)
	public ResponseEntity<Void> executeAddWish(@RequestBody Wish wish) {
		try {
			wishService.addWish(wish);
			return new ResponseEntity<Void>(HttpStatus.CREATED);
		} catch (DuplicateKeyException e) {
			return new ResponseEntity<Void>(HttpStatus.CONFLICT);
		}
	}

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Wish>> executeGetWishByUserId(@RequestParam int userId) {
		return new ResponseEntity<List<Wish>>(wishService.getWishByUserId(userId), HttpStatus.OK);
	}

	// 删除Wish等待实现。
	@RequestMapping(method = RequestMethod.DELETE)
	public ResponseEntity<Void> executeDeleteWish(@RequestBody Wish wish) {
		return null;
	}

}