//Angular Gallery Controller
app.controller('angularGalleryController', function PostController($scope, imageService) {
    $scope.searchTag = '';
    $scope.IsLoading = true;
    var loading = "Loading...";
    $scope.msgText = loading;
    var errorMessage = "There is some issue while parsing json data."
    var noData = "No Images has been found for this query";
    $scope.photos = {};
    $scope.Search = function () {
        $scope.msgText = loading;
        $scope.photos.items = [];
        var tagQS = "";
        $scope.IsLoading = true;
        if ($scope.searchTag != "")
            tagQS = "&tags=" + $scope.searchTag;
        imageService.getList(tagQS).then(function (d) {
            if (d.data.items.length <= 0)
                $scope.msgText = noData;
            else {
                $scope.photos = d.data;
                $scope.IsLoading = false;
            }
        }, function (error) {
            $scope.msgText = errorMessage
            $scope.photos.items = [];
        });
    }
    imageService.getList("").then(function (d) {
        if (d.data.items.length <= 0)
            $scope.msgText = noData;
        else {
            $scope.photos = d.data;
            $scope.IsLoading = false;
        }
    }, function (error) {
        $scope.msgText = errorMessage
        $scope.photos.items = [];
    });
})
//Angular service to get data from node js app.
app.service('imageService', function ($http) {
    var images = {};
    images.getList = function (d) {
        return $http({
            url: 'http://localhost:1337?' + d
        });
    }
    return images;
});