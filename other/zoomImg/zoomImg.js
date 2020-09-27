(function ($) {
    $.fn.zoomImg = function (options) {
        var settings = $.extend({
            width: '60%',
            background: 'rgba(0,0,0,.3)'
        }, options);

        var mask = $('<div class="mask" style="display:none;position:fixed;background:' + settings.background + ';width:100vw;height:100vh;top:0"><img src= "" alt= "" style= "position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;width:' + (typeof settings.width === 'number' ? settings.width + "px" : settings.width) + '"></div >');
        mask.click(function () {
            $(this).hide();
        })
        $('body').append(mask);
        this.each(function () {
            //this在这jq会自动绑定调用的对象
            if (this.nodeName.toLowerCase() === 'img') {
                $(this).click(function () {
                    mask.show();
                    mask.find('img').attr('src', $(this).attr('src'));
                })
            }
        });
    }
}(jQuery));