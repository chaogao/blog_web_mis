(function () {
    var Sync = require("../components/sync.mod.js"),
        Upload = require("../components/upload.mod.js"),
        sync;

    /**
     * 创建同步控件
     */
    sync = new Sync({
        editor: "editor-create",
        value: window.APP_DATA && window.APP_DATA.content
    });

    upload = new Upload();

    $(".btn-upload").on("click", function () {
        upload.show();
    });

    $(".create-style a").on("click", function () {
        $(this).parents("li")
            .addClass("active")
            .siblings().removeClass("active");
    });

    $(".create-style").delegate(".active-markdown", "click", function () {
        $("#editor-html").hide();
        $("#editor-create").show();
        $(".actions-result").removeClass("action-result-normal");
    }).delegate(".active-html", "click", function () {
        var html = sync.getHTML();

        $("#editor-html").html(html).show()
                .find('pre code').each(function(i, block) {
                    hljs.highlightBlock(block);
                });

        $("#editor-create").hide();
        $(".actions-result").addClass("action-result-normal");
    });

    /**
     * article create app
     */
    angular.module("article-create", [])
        .controller("articleController", function ($scope) {
            var self = this;

            $scope.submit = function () {
                var val = sync.getValue();

                $(".create-blog-form .editor-textarea").val(val);
                $(".create-blog-form").submit();
            }

            // 如果是编辑则有此份数据
            if (window.APP_DATA) {
                self.data = window.APP_DATA;
            }
        });


// angular.module("blogService", [])
//     .factory('articleData', ["$http", function ($http) {
//         var GET_ARTICLE = '/article';

//         /**
//          * 获取数据
//          * @return {[type]} [description]
//          */
//         var get = function () {

//         };

//         $http.get(GET_ARTICLE, {

//         });
//     }]);
})();