/**
 * Created by Jinkai on 2016/5/20.
 */
var spotCategoryId = 0;
var listMode = 0;
//history search框功能
var searchString = "wishCount";





angular.module('myApp.controllers', [])
.controller('TutorialCtrl', function($scope, $state, $ionicViewService, $rootScope) {
        //首次登陆
        window.localStorage['didTutorial'] = false;

        var startApp = function(){
            $ionicViewService.clearHistory();
            $state.go('tabs.home');
            window.localStorage['didTutorial'] = true;
        }

        $scope.goMain = function() {
            startApp();
        }

        $rootScope.spotCategoryId = 0;
})

.controller('HomeTabCtrl', function($scope) {
    console.log('HomeTabCtrl');
    // 百度地图API功能
    var map = new BMap.Map("allmap");
    map.centerAndZoom(new BMap.Point(121.484, 31.195), 11);
    map.addControl(new BMap.MapTypeControl());
    map.setCurrentCity("上海");
    map.enableScrollWheelZoom(true);

    //搜索框功能
    $scope.homeSearch = function(){
        var searchFor = $("#homeSearchKeyword").val();
        // 百度地图API功能
        var map = new BMap.Map("allmap");          
        map.centerAndZoom(new BMap.Point(121.484, 31.195), 11);
        var local = new BMap.LocalSearch(map, {
            renderOptions:{map: map}
        });
        local.search(searchFor);
    }









    $scope.button1ClickTime = 0;
    $scope.button2ClickTime = 0;
    $scope.keys1 = [];
    $scope.keys2 = [];

    $scope.showPrintSpot = function(index){
        if (index == 1){
            if ($scope.button1ClickTime == 0){
                //从数据库中提取categoryId为1的spot
                //categoryId搜索spot
                $scope.keys1 = [];
                $.ajax({
                    type : "GET",
                    url : "/spot/category/1",
                    processData : false,
                    contentType : "application/json; charset=utf-8",
                    success : function(data) {// data is list<spot>
                        for(var i=0; i<data.length; i++){
                            var spotName = data[i].spotName;
                            // TODO
                            $scope.keys1.push(spotName);
                        }
                        // 百度地图API功能
                        var map = new BMap.Map("allmap");            // 创建Map实例
                        map.centerAndZoom(new BMap.Point(121.484, 31.195), 11);
                        var local = new BMap.LocalSearch(map, {
                            renderOptions:{map: map},
                            pageCapacity:1
                        });
                        local.searchInBounds($scope.keys1, map.getBounds());
                        $scope.button1ClickTime = 1;
                    },
                }); 
            }
            else{
                if ($scope.button2ClickTime == 1){
                    // 百度地图API功能
                    var map = new BMap.Map("allmap");            // 创建Map实例
                    map.centerAndZoom(new BMap.Point(121.484, 31.195), 11);
                    //var myKeys = ["中山公园", "世纪公园", "锦江乐园", "复兴公园"];
                    var local = new BMap.LocalSearch(map, {
                        renderOptions:{map: map},
                        pageCapacity:1
                    });
                    local.searchInBounds($scope.keys2, map.getBounds());
                    $scope.button1ClickTime = 0;
                }
                else{
                    // 百度地图API功能
                    var map = new BMap.Map("allmap");
                    map.centerAndZoom(new BMap.Point(121.484, 31.195), 11);
                    map.addControl(new BMap.MapTypeControl());
                    map.setCurrentCity("上海");
                    map.enableScrollWheelZoom(true);
                    $scope.button1ClickTime = 0;
                }
            }
        }else if (index == 2){
            if ($scope.button2ClickTime == 0){
                //从数据库中提取categoryId为1的spot
                //categoryId搜索spot
                $scope.keys2 = [];
                $.ajax({
                    type : "GET",
                    url : "/spot/category/2",
                    processData : false,
                    contentType : "application/json; charset=utf-8",
                    success : function(data) {// data is list<spot>
                        for(var i=0; i<data.length; i++){
                            var spotName = data[i].spotName;
                            // TODO
                            $scope.keys2.push(spotName);
                        }
                        // 百度地图API功能
                        var map = new BMap.Map("allmap");            // 创建Map实例
                        map.centerAndZoom(new BMap.Point(121.484, 31.195), 11);
                        var local = new BMap.LocalSearch(map, {
                            renderOptions:{map: map},
                            pageCapacity:1
                        });
                        local.searchInBounds($scope.keys2, map.getBounds());
                        $scope.button2ClickTime = 1;
                    },
                }); 
            }
            else{
                if ($scope.button1ClickTime == 1){
                    // 百度地图API功能
                    var map = new BMap.Map("allmap");            // 创建Map实例
                    map.centerAndZoom(new BMap.Point(121.484, 31.195), 11);
                    var local = new BMap.LocalSearch(map, {
                        renderOptions:{map: map},
                        pageCapacity:1
                    });
                    local.searchInBounds($scope.keys1, map.getBounds());
                    $scope.button2ClickTime = 0;
                }
                else{
                    // 百度地图API功能
                    var map = new BMap.Map("allmap");
                    map.centerAndZoom(new BMap.Point(121.484, 31.195), 11);
                    map.addControl(new BMap.MapTypeControl());
                    map.setCurrentCity("上海");
                    map.enableScrollWheelZoom(true);
                    $scope.button2ClickTime = 0;
                }
            }
        }
    };
})

.controller('NearByTabCtrl', function($scope, $rootScope) {
        // 百度地图API功能
        // var map = new BMap.Map("nearmap");
        // map.centerAndZoom(new BMap.Point(121.484, 31.195), 11);
        // map.addControl(new BMap.MapTypeControl());
        // map.setCurrentCity("上海");
        // map.enableScrollWheelZoom(true);


        // 百度地图API功能
        var map = new BMap.Map("nearmap");
        //var point = new BMap.Point(116.331398,39.897445);
        map.centerAndZoom(new BMap.Point(121.484, 31.195), 11);

        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                var mk = new BMap.Marker(r.point);
                map.addOverlay(mk);
                map.panTo(r.point);
                //alert('您的位置：'+r.point.lng+','+r.point.lat);
                $rootScope.userCoordinateX = r.point.lng;
                $rootScope.userCoordinateY = r.point.lat;
            }
            else {
                alert('failed'+this.getStatus());
            }        
        },{enableHighAccuracy: true})
})

.controller('AppCtrl', function ($scope, $state, $ionicPopover,$location, $ionicPopup, $rootScope) {

        $scope.login = function(user) {

            if(typeof(user)=='undefined'){
                $scope.showAlert('Please fill username and password to proceed.');
                return false;
            }

            if(user.username=='gjk' && user.password=='gjk'){
                $location.path('/tab/mine');
            }else{
                $scope.showAlert('Invalid username or password.');
            }

        };

        $ionicPopover.fromTemplateUrl('partials/popover.html', function (popover) {
            $scope.popover = popover;

            

        });

        $scope.showAlert = function(msg) {
            var alertPopup = $ionicPopup.alert({
                title: 'Warning Message',
                template: msg
            });
        };


        
        


        $scope.spotList = [];


        //排序方法
        $scope.listSpots = function(){
            console.log("listMode = " + listMode);
            if (listMode == 1){
                $scope.getSpotListOrderByAverageReviewRating();
            }
            else if(listMode == 2){
                $scope.getSpotListOrderByFavoriteCount();
            }
            else if(listMode == 3){
                $scope.getSpotListOrderByFootprintCount();
            }
            else if(listMode == 4){
                $scope.getSpotListOrderByWishCount();
            }
            else if(listMode == 5){
                $scope.getSpotListOrderByPopularity();
            }
        };

        //5种排序方法
        //根据平均评论分数获取spotlist，有limit数量限制
        $scope.getSpotListOrderByAverageReviewRating = function(){
            $scope.spotList = [];
            $.ajax({
                type : "GET",
                url : "/spot/category/"+$rootScope.spotCategoryId+"/spotListOrderByAverageReviewRatingWithLimit?limit=3",
                processData : false,
                contentType : "application/json; charset=utf-8",
                success : function(data) {// data is list<spot>
                    for(var i=0; i<data.length; i++){
                        var spot = {};
                        spot.spotId = data[i].spotId;
                        spot.spotCategoryId = data[i].spotCategoryId;
                        spot.spotName = data[i].spotName;
                        spot.spotAddress = data[i].spotAddress;
                        spot.spotDescription = data[i].spotDescription;
                        spot.rating = data[i].averageReviewRating;
                        spot.nameString = "评分：";
                        // TODO
                        $scope.spotList.push(spot);
                        //console.log(spotName);
                    }
                    console.log($scope.spotList);
                    $state.go('tabs.list.detail_list1');
                },
            });
        };

        //根据收藏数获取spotlist，有limit数量限制
        $scope.getSpotListOrderByFavoriteCount = function(){
            $scope.spotList = [];
            $.ajax({
                type : "GET",
                url : "/spot/category/"+$rootScope.spotCategoryId+"/spotListOrderByFavoriteCountWithLimit?limit=3",
                processData : false,
                contentType : "application/json; charset=utf-8",
                success : function(data) {// data is list<spot>
                    for(var i=0; i<data.length; i++){
                        var spot = {};
                        spot.spotId = data[i].spotId;
                        spot.spotCategoryId = data[i].spotCategoryId;
                        spot.spotName = data[i].spotName;
                        spot.spotAddress = data[i].spotAddress;
                        spot.spotDescription = data[i].spotDescription;
                        spot.rating = data[i].spotFavoriteCount;
                        spot.nameString = "收藏：";
                        // TODO
                        $scope.spotList.push(spot);
                    }
                    console.log($scope.spotList);
                    $state.go('tabs.list.detail_list1');
                },
            });
        };


        //根据足迹数获取spotlist，有limit数量限制
        $scope.getSpotListOrderByFootprintCount = function(){
            $scope.spotList = [];
            $.ajax({
                type : "GET",
                url : "/spot/category/"+$rootScope.spotCategoryId+"/spotListOrderByFootprintCountWithLimit?limit=3",
                processData : false,
                contentType : "application/json; charset=utf-8",
                success : function(data) {// data is list<spot>
                    for(var i=0; i<data.length; i++){
                        var spot = {};
                        spot.spotId = data[i].spotId;
                        spot.spotCategoryId = data[i].spotCategoryId;
                        spot.spotName = data[i].spotName;
                        spot.spotAddress = data[i].spotAddress;
                        spot.spotDescription = data[i].spotDescription;
                        spot.rating = data[i].spotFootprintCount;
                        spot.nameString = "足迹：";
                        // TODO
                        $scope.spotList.push(spot);
                    }
                    console.log($scope.spotList);
                    $state.go('tabs.list.detail_list1');
                },
            });
        };

        //根据心愿数获取spotlist，有limit数量限制
        $scope.getSpotListOrderByWishCount = function(){
            $scope.spotList = [];
            $.ajax({
                type : "GET",
                url : "/spot/category/"+$rootScope.spotCategoryId+"/spotListOrderByWishCountWithLimit?limit=3",
                processData : false,
                contentType : "application/json; charset=utf-8",
                success : function(data) {// data is list<spot>
                    for(var i=0; i<data.length; i++){
                        var spot = {};
                        spot.spotId = data[i].spotId;
                        spot.spotCategoryId = data[i].spotCategoryId;
                        spot.spotName = data[i].spotName;
                        spot.spotAddress = data[i].spotAddress;
                        spot.spotDescription = data[i].spotDescription;
                        spot.rating = data[i].spotWishCount;
                        spot.nameString = "心愿：";
                        // TODO
                        $scope.spotList.push(spot);
                    }
                    console.log($scope.spotList);
                    $state.go('tabs.list.detail_list1');
                },
            });
        };

        //根据popularity获取spotlist，有limit数量限制
        $scope.getSpotListOrderByPopularity = function(){
            $scope.spotList = [];
            $.ajax({
                type : "GET",
                url : "/spot/category/"+$rootScope.spotCategoryId+"/spotListOrderByPopularityWithLimit?limit=3",
                processData : false,
                contentType : "application/json; charset=utf-8",
                success : function(data) {// data is list<spot>
                    for(var i=0; i<data.length; i++){
                        var spot = {};
                        spot.spotId = data[i].spotId;
                        spot.spotCategoryId = data[i].spotCategoryId;
                        spot.spotName = data[i].spotName;
                        spot.spotAddress = data[i].spotAddress;
                        spot.spotDescription = data[i].spotDescription;
                        spot.rating = data[i].spotPopularity;
                        spot.nameString = "热门度：";
                        // TODO
                        $scope.spotList.push(spot);
                    }
                    console.log($scope.spotList);
                    $state.go('tabs.list.detail_list1');
                },
            });
        };

        //历史搜索页面的显示
        //根据关键字进行搜索
        $scope.doSearch = function(){
            $scope.spotList = [];

            var keyword = $("#keyword").val();
            console.log(keyword);

            var mode = 0;
            if (searchString == "averageReviewRating")
                mode = 1;
            else if (searchString == "favoriteCount")
                mode = 2;
            else if (searchString == "footprintCount")
                mode = 3;
            else if (searchString == "wishCount")
                mode = 4;
            else if (searchString == "popularity")
                mode = 5;


            $.ajax({
                type : "GET",
                url : "/search/spotList?keyword="+ keyword +"&limit=3&orderby="+ searchString,
                processData : false,
                contentType : "application/json; charset=utf-8",
                success : function(data) {// data is list<spot>
                    console.log("00990909090");
                    console.log(keyword + " " + searchString);
                    console.log(data);
                    for(var i=0; i<data.length; i++){
                        var spot = {};
                        spot.spotId = data[i].spotId;
                        spot.spotName = data[i].spotName;
                        //console.log(spotName);
                        if (mode == 1){
                            spot.rating = data[i].averageReviewRating;
                            spot.nameString = "评分：";
                            // TODO
                            $scope.spotList.push(spot);
                        }
                        else if(mode == 2){
                            spot.rating = data[i].spotFavoriteCount;
                            spot.nameString = "收藏：";
                            // TODO
                            $scope.spotList.push(spot);
                        }
                        else if(mode == 3){
                            spot.rating = data[i].spotFootprintCount;
                            spot.nameString = "足迹：";
                            // TODO
                            $scope.spotList.push(spot);
                        }
                        else if(mode == 4){
                            spot.rating = data[i].spotWishCount;
                            spot.nameString = "心愿：";
                            // TODO
                            $scope.spotList.push(spot);
                        }
                        else if(mode == 5){
                            spot.rating = data[i].spotPopularity;
                            spot.nameString = "热门度：";
                            // TODO
                            $scope.spotList.push(spot);
                        }
                    }
                    //console.log(data);
                    $state.go('tabs.history.detail_list2');
                },
            });
    
        };






        $scope.goSpot = function(spot){
            console.log("yyyyyy");
            console.log(spot.spotId);
            console.log(spot.spotName);
            console.log(spot.spotDescription);
            
            //获取景点问卷
            $scope.questionnaireList = {};
            $scope.questionnaireList.spotQuestionList = [];
            $scope.getSpotQuestionnaireList(spot.spotId);
            //跳转到具体景观页面
            $state.go('tabs.list.detail');

            $scope.spotId = spot.spotId;
            $scope.spotName = spot.spotName;
            $scope.spotDescription = spot.spotDescription;

            $scope.addFavoriteButton = "+ 收藏";
            $scope.addFootprintButton = "+ 足迹";
            $scope.addWishButton = "+ 心愿单";


            //获取该地点评分列表
            $scope.getReviewRating(spot.spotId);
            //获取该地点的详细信息
            $scope.spotDetailList = {};
            $scope.getSpotDetail(spot.spotId);
            //获取其他用户评价
            $scope.getSpotReviewList(spot.spotId);
            
        };

        $scope.getReviewRating = function(thisspotId){
            $.ajax({
                type : "GET",
                url : "/spot/"+thisspotId+"/reviewRating",
                processData : false,
                contentType : "application/json; charset=utf-8",
                success : function(data) {// data is list<spot>
                    console.log(data);
                    console.log(data[1]);
                    console.log(data[1][0].review_rating);


                    $scope.averageRating = data[0];
                    $scope.oneNum = 0;
                    $scope.twoNum = 0;
                    $scope.threeNum = 0;
                    $scope.fourNum = 0;
                    $scope.fiveNum = 0;

                    
                    for(var i=0; i<data[1].length; i++){
                        if (data[1][i].review_rating == 1){
                            $scope.oneNum = data[1][i].review_rating_count;
                        }
                        else if (data[1][i].review_rating == 2){
                            $scope.twoNum = data[1][i].review_rating_count;
                        }
                        else if (data[1][i].review_rating == 3){
                            $scope.threeNum = data[1][i].review_rating_count;
                        }
                        else if (data[1][i].review_rating == 4){
                            $scope.fourNum = data[1][i].review_rating_count;
                        }
                        else if (data[1][i].review_rating == 5){
                            $scope.fiveNum = data[1][i].review_rating_count;
                        }
                    }
                },
            });
        };

        $scope.getSpotDetail = function(thisspotId){
            $.ajax({
                type : "GET",
                url : "/spot/"+thisspotId,
                processData : false,
                contentType : "application/json; charset=utf-8",
                success : function(data) {// data is list<spot>
                    
                    $scope.spotAddress = data.spotAddress;
                    $scope.spotDescription = data.spotDescription;

                    $scope.spotDetailList.spotAddress = data.spotAddress;
                    $scope.spotDetailList.spotDescription = data.spotDescription;
                    $scope.spotDetailList.spotCoordinateX = data.spotCoordinateX;
                    $scope.spotDetailList.spotCoordinateY = data.spotCoordinateY;
                },
            });
        };

        //获取其他用户评论
        $scope.getSpotReviewList = function(thisspotId){
            $.ajax({
                type : "GET",
                url : "/spot/"+thisspotId+"/reviewList",
                processData : false,
                contentType : "application/json; charset=utf-8",
                success : function(data) {// data is list<spot>
                    var review = "";
                    for(var i=0;i<data.length;i++){
                        var userId = data[i].userId;
                        var reviewRating = data[i].reviewRating;
                        var reviewContent = data[i].reviewContent;
                        review += "用户ID："+ userId + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp景观评分："+ reviewRating +"<br>用户评价：" + reviewContent + "<br>";
                    }
                    //$scope.spotReview = review;
                    $("#spotReviewList").html(review);
                },
            });
        };

        //获取本景点问卷id
        $scope.getSpotQuestionnaireList = function(thisspotId){
            $.ajax({
                type : "GET",
                url : "/spot/"+thisspotId+"/questionnaireList",
                processData : false,
                contentType : "application/json; charset=utf-8",
                success : function(data) {// data is list<spot>
                    console.log(data);
                    console.log($.isEmptyObject(data));
                    $scope.questionnaireList = {};
                    if (!$.isEmptyObject(data)){
                        $scope.questionnaireList.spotQuestionnaireId = data[0].spotQuestionnaireId;
                        console.log("id : "+ data[0].spotQuestionnaireId);
                        $scope.questionnaireList.spotQuestionnaireTitle = data[0].spotQuestionnaireTitle;
                        $scope.questionnaireList.spotQuestionnaireDescription = data[0].spotQuestionnaireDescription;

                        $scope.getSpotQuestionnaireQuestionList($scope.questionnaireList.spotQuestionnaireId);
                        console.log("问卷id："+$scope.questionnaireList.spotQuestionnaireId);
                    }
                },
            });
        };
        
        //获取景点问卷题目
        $scope.getSpotQuestionnaireQuestionList = function(thisquestionnaireId){
            $.ajax({
                type : "GET",
                url : "/spotQuestionnaire/"+thisquestionnaireId+"/questionList",
                processData : false,
                contentType : "application/json; charset=utf-8",
                success : function(data) {// data is list<spot>
                    console.log(data);
                    $scope.questionnaireList.spotQuestionList = [];
                    $scope.questionnaireList.spotQuestionnaireLength = data.length;
                    for(var i=0; i<data.length; i++){
                        var questionList = {};
                        questionList.spotQuestionId = data[i].spotQuestionId;
                        questionList.spotQuestionContent = data[i].spotQuestionContent;
                        questionList.spotQuestionChoiceContent1 = data[i].spotQuestionChoiceContent1;
                        questionList.spotQuestionChoiceContent2 = data[i].spotQuestionChoiceContent2;
                        questionList.spotQuestionChoiceContent3 = data[i].spotQuestionChoiceContent3;
                        questionList.spotQuestionChoiceContent4 = data[i].spotQuestionChoiceContent4;
                        $scope.questionnaireList.spotQuestionList.push(questionList);
                    }
                    console.log("12121212");
                    console.log($scope.questionnaireList.spotQuestionList);
                },
            });
        };


        //提交问题答案
        $scope.submitQuestionAnswer = function(){
            var answer1 =$('input:radio[name="group1"]:checked').val();
            var answer2 =$('input:radio[name="group2"]:checked').val();
            if (answer1 != undefined && answer2 != undefined){
                var answerListLength = $scope.questionnaireList.spotQuestionnaireLength;
                console.log("no choice " + $scope.questionnaireList.spotQuestionList[0].spotQuestionId);
                var answerList = [];
                for (var i=0; i<answerListLength;i++){
                    var answer = {};
                    answer.spotQuestionId = $scope.questionnaireList.spotQuestionList[i].spotQuestionId;
                    answer.choice = $('input:radio[name="group'+$scope.questionnaireList.spotQuestionList[i].spotQuestionId+'"]:checked').val();;
                    answerList.push(answer);
                }
                $.ajax({
                    type : "PUT",
                    url : "/spotQuestionAnswer",
                    data : JSON.stringify(answerList),
                    contentType : "application/json; charset=utf-8",
                    dataType : "json",
                    success : function(data) {
                        console.log("answer submit!");
                    },
                });
            }
            else{
                alert("请填写完问卷再提交！");
            }
        }

        $scope.changeButton = function(){
            $scope.addFavoriteButton = "取消收藏";
        }
        //按钮功能

        //＋收藏
        $scope.addFavorite = function(){
            //$scope.addFavoriteButton = "取消收藏";
            $.ajax({
                type : "PUT",
                url : "/favorite",
                data : JSON.stringify({spotId: $scope.spotId}),
                contentType : "application/json; charset=utf-8",
                dataType : "json",
                statusCode : {
                    201 : function() {
                        console.log("收藏成功");
                        $scope.addFavoriteButton = "取消收藏";
                        $scope.$apply();
                        //console.log($scope.addFavoriteButton);
                    },
                    409 : function() {
                        console.log("conflit!");
                        //$scope.addFavoriteButton = "+ 收藏";
                        $scope.deleteFavorite();
                    }
                }
            });
        };

        //取消收藏
        $scope.deleteFavorite = function(){
            $scope.addFavoriteButton = "+ 收藏";
            $scope.$apply();
            $.ajax({
                type : "DELETE",
                url : "/favorite",
                data : JSON.stringify({spotId: $scope.spotId}),
                contentType : "application/json; charset=utf-8",
                dataType : "json",
                success : function(data) {// data is list<spot>
                },
                statusCode : {
                    200 : function() {
                        console.log("取消收藏成功");
                    },
                    404 : function() {
                        console.log("Not found!");
                    }
                }
            });
        };


        //＋足迹
        $scope.addFootprint = function(){
            $.ajax({
                type : "PUT",
                url : "/footprint",
                data : JSON.stringify({spotId: $scope.spotId}),
                contentType : "application/json; charset=utf-8",
                dataType : "json",
                statusCode : {
                    201 : function() {
                        console.log("添加足迹成功");
                        $scope.addFootprintButton = "取消足迹";
                        $scope.$apply();
                        //console.log($scope.addFavoriteButton);
                    },
                    409 : function() {
                        console.log("conflit!");
                        $scope.deleteFootprint();
                    }
                }
            });
        };

        //取消足迹
        $scope.deleteFootprint = function(){
            $scope.addFootprintButton = "+ 足迹";
            $scope.$apply();
            $.ajax({
                type : "DELETE",
                url : "/footprint",
                data : JSON.stringify({spotId: $scope.spotId}),
                contentType : "application/json; charset=utf-8",
                dataType : "json",
                success : function(data) {// data is list<spot>
                },
                statusCode : {
                    200 : function() {
                        console.log("取消足迹成功");
                    },
                    404 : function() {
                        console.log("Not found!");
                    }
                }
            });
        };


        //＋心愿
        $scope.addWish = function(){
            //$scope.addFavoriteButton = "取消收藏";
            $.ajax({
                type : "PUT",
                url : "/wish",
                data : JSON.stringify({spotId: $scope.spotId}),
                contentType : "application/json; charset=utf-8",
                dataType : "json",
                statusCode : {
                    201 : function() {
                        console.log("心愿成功");
                        $scope.addWishButton = "取消心愿";
                        $scope.$apply();
                        //console.log($scope.addFavoriteButton);
                    },
                    409 : function() {
                        console.log("conflit!");
                        //$scope.addFavoriteButton = "+ 收藏";
                        $scope.deleteWish();
                    }
                }
            });
        };

        //取消心愿
        $scope.deleteWish = function(){
            $scope.addWishButton = "+ 心愿单";
            $scope.$apply();
            $.ajax({
                type : "DELETE",
                url : "/wish",
                data : JSON.stringify({spotId: $scope.spotId}),
                contentType : "application/json; charset=utf-8",
                dataType : "json",
                success : function(data) {// data is list<spot>
                },
                statusCode : {
                    200 : function() {
                        console.log("取消心愿成功");
                    },
                    404 : function() {
                        console.log("Not found!");
                    }
                }
            });
        };


        //到这去
        $scope.goThere = function(){
            var goalName = $scope.spotName;
            console.log("go " + goalName);
            $state.go('tabs.management');
            $scope.endPlace = goalName;
        };

        //用户发表评论
        $scope.submitReview = function(photoList){
            //获取评价星数
            var starClassName = $("ul#zero_star").attr("class");
            var starNum = 0;
            if (starClassName == "rating zerostar"){
                starNum = 0;
            }
            else if (starClassName == "rating onestar"){
                starNum = 1;
            }
            else if (starClassName == "rating twostar"){
                starNum = 2;
            }
            else if (starClassName == "rating threestar"){
                starNum = 3;
            }
            else if (starClassName == "rating fourstar"){
                starNum = 4;
            }
            else if (starClassName == "rating fivestar"){
                starNum = 5;
            }
            console.log(starNum);

            //获取评论内容
            var thisReviewContent = $("#spotReviewFromUser").val();
            console.log(thisReviewContent);

            $.ajax({
                type : "PUT",
                url : "/review",
                data : JSON.stringify({
                    "spotId" : $scope.spotId,
                    "reviewRating" : starNum,
                    "reviewContent" : thisReviewContent,
                    "reviewPhotoList" : photoList
                }),
                contentType : "application/json; charset=utf-8",
                dataType : "json",
                success : function(data) {
                    console.log(data);
                },
                statusCode : {
                    201 : function() {
                        console.log("评论成功");
                    }
                }
            });

        }

        //上传照片
        $scope.uploadFile = function() {
            var file = document.getElementById('file').files[0];
            console.log(file);
            if (file != undefined){
                var form = new FormData();
                form.append("file", file);

                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "http://localhost:8080/review/photo",
                    "method": "POST",
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data",
                    "data": form
                }

                $.ajax(settings).done(function (response) {
                    console.log(response);
                    console.log(response.reviewPhotoPath);
                    console.log("09876");
                    //执行添加评论
                    var photoList = [];
                    photoList.push(response);

                    $scope.submitReview(photoList);
                });
            }else{
                var photoList = [];
                $scope.submitReview(photoList);
                console.log("No file");
            }
        };



        //nearby页面景点列举
        $scope.doNearbySearch = function(index){
            $scope.spotList = [];

            console.log("index = " + index);
            var nearbySearchString = "popularity";
            if (index == 1)
                nearbySearchString = "averageReviewRating";
            else if (index == 2)
                nearbySearchString = "favoriteCount";
            else if (index == 3)
                nearbySearchString = "footprintCount";
            else if (index == 4)
                nearbySearchString = "wishCount";
            else if (index == 5)
                nearbySearchString = "popularity";

            //当前x,y坐标
            console.log($rootScope.userCoordinateX + " " + $rootScope.userCoordinateY);
            console.log("searchString = " + nearbySearchString);


            $.ajax({
                type : "GET",
                url : "/search/adjacentSpot?userCoordinateX="+ $rootScope.userCoordinateX +"&userCoordinateY="+ $rootScope.userCoordinateY +"&limit=6&radius=0.06&orderby="+ nearbySearchString,
                processData : false,
                contentType : "application/json; charset=utf-8",
                success : function(data) {// data is list<spot>
                    console.log("nearby页面景点列举");
                    console.log(data);
                    for(var i=0; i<data.length; i++){
                        var spot = {};
                        spot.spotId = data[i].spotId;
                        spot.spotName = data[i].spotName;
                        //console.log(spotName);
                        if (index == 1){
                            spot.rating = data[i].averageReviewRating;
                            spot.nameString = "评分：";
                            // TODO
                            $scope.spotList.push(spot);
                        }
                        else if(index == 2){
                            spot.rating = data[i].spotFavoriteCount;
                            spot.nameString = "收藏：";
                            // TODO
                            $scope.spotList.push(spot);
                        }
                        else if(index == 3){
                            spot.rating = data[i].spotFootprintCount;
                            spot.nameString = "足迹：";
                            // TODO
                            $scope.spotList.push(spot);
                        }
                        else if(index == 4){
                            spot.rating = data[i].spotWishCount;
                            spot.nameString = "心愿：";
                            // TODO
                            $scope.spotList.push(spot);
                        }
                        else if(index == 5){
                            spot.rating = data[i].spotPopularity;
                            spot.nameString = "热门度：";
                            // TODO
                            $scope.spotList.push(spot);
                        }
                    }
                    //console.log(data);
                    $state.go('tabs.nearby.detail_list3');
                    console.log("加载完成");
                },
            });
    
        };

})

.controller('DetailCtrl', function($scope) {

        // 百度地图API功能
        var map = new BMap.Map("detailmap");
        map.centerAndZoom(new BMap.Point(121.484, 31.195), 11);
        map.addControl(new BMap.MapTypeControl());
        //map.setCurrentCity("上海");
        map.enableScrollWheelZoom(true);

        var myKeys = [$scope.spotName];
        var local = new BMap.LocalSearch(map, {
            renderOptions:{map: map, panel:"r-result"},
            pageCapacity:1
        });
        local.searchInBounds(myKeys, map.getBounds());

})

.controller('ListCtrl', function($scope, $rootScope){
        $scope.onTabSelected = function(index){
            $rootScope.spotCategoryId = index;
            //spotCategoryId = index;
            console.log("success! : " + spotCategoryId);




        };

})

.controller('ManagementCtrl', function($scope) {

        // 百度地图API功能
        var map = new BMap.Map("manage_map");
        map.centerAndZoom(new BMap.Point(121.484, 31.195), 11);
        map.addControl(new BMap.MapTypeControl());
        map.setCurrentCity("上海");
        map.enableScrollWheelZoom(true);


})

.controller('HistoryCtrl', function($scope) {
        //添加搜索框监听
        $("#keyword").on("keyup", function() {
            if((event.keyCode!=38)&&(event.keyCode!=40)&&(event.keyCode!=13)){    //判断键盘事件，抛弃上下键跟回车键
                autoCom();
            }
        });
})

.controller('CommandCtrl', function($scope) {

        // 百度地图API功能
        var map = new BMap.Map("command_map");
        map.centerAndZoom(new BMap.Point(121.484, 31.195), 11);
        map.addControl(new BMap.MapTypeControl());
        map.setCurrentCity("上海");
        map.enableScrollWheelZoom(true);
})

.controller('HereCtrl', function($scope) {

        // 百度地图API功能
        var map = new BMap.Map("here_map");
        map.centerAndZoom(new BMap.Point(121.484, 31.195), 11);
        map.addControl(new BMap.MapTypeControl());
        map.setCurrentCity("上海");
})
