
//var currentUserId;


angular.module('userController',['userService'])
  
   .controller('registerCtr',function($scope,$http,$window,$state,checkUser){
      var servurl='/user';
      $scope.user={};
      $scope.register=function(){
        
 

          var err=checkUser($scope.user,'signup');
          
          if(err==0){
              $window.alert(err);
      

          }else{           

               
              $http.put(servurl,JSON.stringify({"userName": $scope.user.username,"userEmail":$scope.user.email,"userPassword":$scope.user.password})
            ).then(function successCallback(response){
                               
                      //currentUserId = response.data.userId;
                      alert("恭喜您注册成功");
                      $state.go('tabs.login');
                  
              },function errorCallback(response){
                  if(response.status == 408){
                      alert("亲，网络不太给力哦~");
                      
                  } else if(response.status ==401){
                      alert("亲，验证码输错了哦~");
                  } else if(response.status == 403){
                      alert("亲，请先注册哦~");
                  } else  if(response.status == 400){
                      alert("400");
                  }

              });
          }
      };
  })
  //start here











  .controller('loginCtr',function($scope,$http,$window,$state,checkUser){
      var servurl='/user/login';
      $scope.user={};
      $scope.login=function(){
        
 

          var err=checkUser($scope.user,'signin');
          
          if(err==0){
              $window.alert(err);
      

          }else{
             $.ajax({
                 type:"POST",
                 url:servurl+"?userEmail="+$scope.user.username +"&userPassword="+$scope.user.password +"&userCaptchaCode="+$scope.user.captchacode,
                 processData : false,
                 contentType : "application/json; charset=utf-8",
                 success : function(data){
                     //currentUserId = data.userId;
                     window.sessionStorage.currentUserId = data.userId;
                     window.sessionStorage.currentUserName = data.userName;
                     window.sessionStorage.currentUserAvatarPath = data.userAvatarPath;
                     window.sessionStorage.currentUserEmail = data.userEmail;

                     alert("userId="+window.sessionStorage.currentUserId+"登录成功");
                     $scope.goMine();
                     //$state.go('tabs.mine');
                 },
                statusCode : {
                    408 : function() {
                        alert("亲，网络不太给力哦~");
                        var verify= document.getElementById('code');
                        verify.setAttribute('src','/captcha');
                    },
                    401 : function() {
                        alert("亲，验证码输错了哦~");
                        var verify= document.getElementById('code');
                        verify.setAttribute('src','/captcha');
                    },
                    400 : function() {
                        alert("400");
                    },
                     403 : function() {
                        alert("亲，输入信息有误，请重试或者先注册哦~");
                        var verify= document.getElementById('code');
                        verify.setAttribute('src','/captcha');
                    },
                }
            });

       /**         
              $http.post(servurl,JSON.stringify({"userEmail": $scope.user.username,"userPassword":$scope.user.password,"userCaptchaCode":$scope.user.captchacode})
            ).then(function successCallback(response){
                               
                      currentUserId = response.data.userId;
                      $state.go('tabs.home');
                  
              },function errorCallback(response){
                  if(response.status == 408){
                      alert("亲，网络不太给力哦~");
                  } else if(response.status ==401){
                      alert("亲，验证码输错了哦~");
                  } else if(response.status == 403){
                      alert("亲，请先注册哦~");
                  } else  if(response.status == 400){
                      alert("400");
                  }

              });*/
          }
      };
  });
  

