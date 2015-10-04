fis.hook("commonjs");

fis.match('*', {
    useHash: false
});

fis.match('*.less', {
    parser: fis.plugin('less'),
    rExt: '.css'
});

fis.match('::packager', {
    postpackager: fis.plugin('loader')  
});

// 目录编译规范
fis.match(/^\/page\/(.*\.(tpl|html))/i, {
    release: '/views/mis/$1'
});

// 目录编译规范
fis.match(/^\/page\/(.*\.(js|css|less))/i, {
    release: '/public/mis/page/$1',
    isMod: false
});

// *.mod.js 为模块化代码
fis.match(/^\/page\/(.*\.mod\.js)/i, {
    release: '/public/mis/page/$1',
    isMod: true
});

fis.match(/^\/public\/(.*\..*)$/i, {
    release: '/public/mis/$1'
});

/**
 * prod 产品环境配置 js、css 打包配置
 */
// 增加md5
fis.media('prod').match('*.{js,css,less,png}', {
    useHash: true
});

// js 、css 压缩配置
fis.media('prod').match('*.js', {
    optimizer: fis.plugin('uglify-js')
});
fis.media('prod').match('*.{css,less}', {
    optimizer: fis.plugin('clean-css')
});

/**
 * prod 环境打包配置
 */
fis.media('prod').match('::packager', {
    postpackager: fis.plugin('loader')
});

fis.media('prod').match('/public/libs/third/bootstrap.css', {
        packTo: '/public/pkg/aio.css'
    }).media('prod').match('/public/libs/third/highlight/docco.css', {
        packTo: '/public/pkg/aio.css'
    }).media('prod').match('/public/libs/core/core.less', {
        packTo: '/public/pkg/aio.css'
    }).media('prod').match('/public/libs/third/jsmod-extend.less', {
        packTo: '/public/pkg/aio.css'
    });

fis.media('prod').match('/public/libs/third/angular.js', {
      packTo: '/public/pkg/aio.js'
    })
    .media('prod').match('/public/libs/third/jquery.js', {
      packTo: '/public/pkg/aio.js'
    })
    .media('prod').match('/public/libs/third/jsmod.js', {
      packTo: '/public/pkg/aio.js'
    })
    .media('prod').match('/public/libs/third/jsmod-extend.js', {
      packTo: '/public/pkg/aio.js'
    })
    .media('prod').match('/public/libs/third/marked.js', {
      packTo: '/public/pkg/aio.js'
    })
    .media('prod').match('/public/libs/third/highlight/highlight.pack.js', {
      packTo: '/public/pkg/aio.js'
    })
    .media('prod').match('/public/libs/third/ace/src/ace.js', {
      packTo: '/public/pkg/aio.js'
    });