var TPL = [
    '<form class="pic-component" method="post" action="/mis/upload" enctype="multipart/form-data" id="pic-component">',
        '<input type="file" name="image">',
        '<p><img height="200" class="pic-component-image"></p>',
        '<button class="btn submit">提交</button>',
        '<div class="info"></div>',
    '</form>'
].join("");

var Upload = jsmod.util.klass({
    initialize: function () {
        this.dialog = jsmod.ui.dialog({
            title: "上传图片",
            html: TPL,
            preventShow: true
        });

        this.initEvents();
    },

    show: function () {
        this.dialog.show();
    },

    hide: function () {
        this.dialog.hide();
    },

    initEvents: function () {
        var self = this;

        this.dialog.getElement().find("[name=image]").on("change", function (e) {
            var file = e.target.files[0],
                reader;

            self.file = file;
            reader = new FileReader();
            reader.onload = function (e) {
                var dataURL = e.target.result;

                self.dialog.getElement().find(".pic-component-image").prop("src", dataURL);
            }
            reader.readAsDataURL(file);
        }).on("click", function () {
            self.dialog.getElement().find(".info").html("");
            self.dialog.getElement().find(".pic-component-image").prop("src", "");
        });

        this.dialog.getElement().find(".submit").on("click", function (e) {
            if (self.file && self.file.size <= 102400 * 10 && /image/.test(self.file.type)) {
                self.dialog.status("loading", "正在上传中");

                self.upload(function (json) {
                    self.dialog.showContent();
                    if (!json || json.code) {
                        self.dialog.getElement().find(".info").html("error");
                    } else {
                        self.dialog.getElement().find(".info").html("![Alt text](" + json.url + ")");
                    }
                });
            } else {
                alert("图片参数或大小有误重新选择");
            }

            return false;
        });
    },

    upload: function (cb) {
        var xhr = new XMLHttpRequest(),
            fd = new FormData($("#pic-component").get(0));

        if (xhr.upload) {
            xhr.open("POST", "/mis/upload", true);
            xhr.onreadystatechange = function(e) {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        cb && cb(JSON.parse(xhr.responseText));
                    } else {
                        cb && cb(0);
                    }
                }
            };
            xhr.send(fd);
        }
    }
});

module.exports = Upload;