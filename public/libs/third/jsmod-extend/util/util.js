/**
 * 细粒度叫搞的工具模块
 */
$.extend(window.jsmod.util, (function () {
    var openBrowser = function(url) {
        if (typeof window.cefQuery === 'function') {
            window.cefQuery({
                request: 'Window.OpenUrl:' + url
            })
            return true
        }
        return false
    }

    var prop = function (data, key) {
        var ns, obj;

        if (!key) {
            return data;
        }

        ns = key.split(".");
        obj = data;

        for (var i = 0, l = ns.length; i < l && obj; i++)
            obj = obj[ns[i]];

        return obj;
    }

    return {
        openBrowser: openBrowser,
        prop: prop
    };
    
})());