package com.excitedmap.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

public class User {
	private Integer userId;

	private String userName;

	@JsonProperty(access = Access.WRITE_ONLY)
	private String userPassword;

	private String userAvatarPath;

	private String userEmail;

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName == null ? null : userName.trim();
	}

	public String getUserPassword() {
		return userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword == null ? null : userPassword.trim();
	}

	public String getUserAvatarPath() {
		return userAvatarPath;
	}

	public void setUserAvatarPath(String userAvatarPath) {
		this.userAvatarPath = userAvatarPath == null ? null : userAvatarPath.trim();
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail == null ? null : userEmail.trim();
	}
}