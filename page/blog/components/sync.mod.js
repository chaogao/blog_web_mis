/**
 * markdown 同步功能
 */
var Sync = jsmod.util.klass({
    /**
     * @param {object} option        配置项目
     * @param {string} option.editor 编辑器
     */
    initialize: function (option) {
        this.option = option;

        // 初始化编辑器各个功能
        this.initAce();
    },
    /**
     * 为编辑器初始化 ace 功能
     */
    initAce: function () {
        var editor,
            option = this.option;

        editor = ace.edit(option.editor);
        editor.setFontSize(14);
        editor.setTheme("ace/theme/monokai");
        
        editor.getSession().setMode("ace/mode/markdown");
        editor.getSession().setTabSize(2);
        editor.setShowPrintMargin(false);
        editor.commands.addCommand({
            name: 'myCommand',
            bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
            exec: function (editor) {
                // todo 出发同步
                // $("#sync").click();
            },
            readOnly: true
        });

        // 设置编辑器内容
        option.value && editor.setValue(option.value);

        this.editor = editor;
    },
    /**
     * 获取 html 内容
     */
    getHTML: function (argument) {
        return marked(this.editor.getValue());
    },
    /**
     * 获取markdown 原始数据
     */
    getValue: function (argument) {
        return this.editor.getValue();
    }
});

module.exports = Sync;


/**
 * 同步 mk 和 html 数据

 */
// var Sync = function (option) {
    
// }

// $.extend(Sync.prototype, {
//     initAce: function (argument) {

//     }
// });

/**
 * 日志编辑功能
 */
// (function () {
//     var editor, tag;
//     /**
//      * markdown 同步
//      */
//     $("#sync").click(function () {
//         var html;

//         html = marked(editor.getValue());
//         $(".dis-marked-view").html(html);
//     });

//     /**
//      * 初始化ace
//      */
//     if ($("#editor").length > 0) {
//         var val;

//         $(".editor-content").height($(window).height());
//         $(".dis-marked-view").height($(window).height() - 50);

//         editor = ace.edit("editor");
//         editor.setTheme("ace/theme/monokai");
//         editor.getSession().setMode("ace/mode/markdown");
//         editor.setShowPrintMargin(false);
//         editor.commands.addCommand({
//             name: 'myCommand',
//             bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
//             exec: function(editor) {
//                 $("#sync").click();
//             },
//             readOnly: true
//         });
//         editor.getSession().addEventListener("changeScrollTop", function (top) {
//             var sHeight = editor.getSession().getLength() * editor.renderer.lineHeight,
//                 sPer = top / sHeight,
//                 height, top;

//             height = $(".dis-marked-view").get(0).scrollHeight;
//             top = height * sPer;
//             $(".dis-marked-view").scrollTop(parseInt(top));
//         });

//         val = $(".blog-form .editor-textarea").val();
//         editor.setValue(val);
//     }

//     $(".blog-form input[type=submit]").on("click", function () {
//         var val = editor.getValue();

//         $(".blog-form .editor-textarea").val(val);
//         $(".blog-form").submit();
//         return false;
//     });

//     /** 新增标签 */
//     $(".blog-form .tag-add").on("click", function () {
//         if (!tag) {
//             tag = new (require("admin/blog/components/tags"))(function (name) {
//                 $(".blog-form .tags-container").append('<label><input name="blog[tags][]" value="' + name + '"><a class="tag-remove glyphicon glyphicon-remove-circle" href="javascript:void(0)"></a></label>');
//             });
//         }

//         tag.open();
//     });

//     $(".blog-form .tags-container").on("click", ".tag-remove", function () {
//         $(this).parents("label").remove();
//     });
// })();