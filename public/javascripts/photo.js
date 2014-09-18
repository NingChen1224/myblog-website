/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-12-26
 * Time: 下午8:28
 * To change this template use File | Settings | File Templates.
 */
(function ($) {
    var EventUtil = {
        addHandler: function (element, type, handler) {
            if (element.addEventListener)
                element.addEventListener(type, handler, false);
            else if (element.attachEvent)
                element.attachEvent("on" + type, handler);
            else
                element["on" + type] = handler;
        },
        removeHandler: function () {
            if (element.removeEventListener)
                element.removeEventListener(type, handler);
            else if (element.detachEvent)
                element.detach("on" + type, handler);
            else
                element['on' + type] = null;
        },
        getEvent: function (event) {
            return event ? event : window.event;
        },
        getTarget: function (event) {
            return event.target ? event.target : event.srcElement;
        },
        preventDefault: function (event) {
            if (event.preventDefault) {
                event.preventDefault();
            }
            else
                event.returnVale = false;
        },
        stopPropagation: function (event) {
            if (event.stopPropagation) {
                event.stopPropagation();
            }
            else
                event.cancelBubble = true;
        },
        gettoElement: function (event) {
            return event.relatedTarget || event.toElement;
        },
        getfromElement: function (event) {
            return event.relatedTarget || event.fromElement;
        },
        getPageWidth: function () {
            var width = window.innerWidth;//兼容IE8
            if (typeof width != "number") {
                if (document.compatMode == "CSS1Compat") {
                    return document.documentElement.clientWidth;
                }
                else
                    return document.body.clientWidth;
            }
            return width;
        },
        getPageHeight: function () {
            var height = window.innerHeight;
            if (typeof height != "number") {
                if (document.compatMode == "CSS1Compat")
                    return document.documentElement.clientHeight;
                else
                    return document.body.clientHeight;
            }
            return height;
        }
    }, height = EventUtil.getPageHeight(), width = EventUtil.getPageWidth();

    $(".column img").on("click", function (e) {
        var outsideDiv = document.createElement("div"),
            parentDiv = document.createElement("div"),
            headDiv = document.createElement("div"),
            closeSpan = document.createElement("span"),
            leftDiv = document.createElement("div"),
            rightDiv = document.createElement("div"),
            target = EventUtil.getTarget(e), parent = $(this).parent(),
            viewDiv = document.createElement('div'),
            btnLeft = document.createElement('input'),
            btnRight = document.createElement('input');
        var curIndex = $(this).index('.column img'), preIndex = curIndex - 1, nextIndex = curIndex + 1;
        outsideDiv.style.width = width + "px";
        outsideDiv.style.height = height + "px";
        outsideDiv.className += "outSide";
        parentDiv.style.height = height - 150 + "px";
        parentDiv.style.width = width - 200 + "px";
        parentDiv.style.left = 100 + 'px';
        parentDiv.style.top = 75 + "px";
        parentDiv.className += 'shadow';
        parentDiv.appendChild(headDiv);
        headDiv.className += "head";
        closeSpan.className += "close";
        closeSpan.title = "关闭";
        headDiv.appendChild(closeSpan);
        leftDiv.className += "left";
        var imgElement = document.createElement('img');
        imgElement.src = target.getAttribute('src');
        animateImg.call(imgElement, leftDiv, rightDiv);
        rightDiv.className += "right";
        rightDiv.innerHTML += "<fieldset><legend>图片信息</legend><p>标题: " + parent.attr('title') + "</p>" +
            "<p>相册: " + parent.attr('tag') +
            "</p>" + "<p>简介: " + parent.attr('intro') + "</p>" +
            "</p>" + "<p>上传者: " + parent.attr('owner') + "</p></fieldset>";
        leftDiv.appendChild(imgElement)
        parentDiv.appendChild(leftDiv);
        parentDiv.appendChild(rightDiv);
        parentDiv.appendChild(viewDiv);
        outsideDiv.appendChild(parentDiv);
        document.body.appendChild(outsideDiv);
        $(parentDiv).on("click", function (e) {
            var target = EventUtil.getTarget(e);
            if (target.className === "close")
                $(this).parent().remove();
        });
        viewDiv.className = "preview";
        btnLeft.type = "button";
        btnLeft.value = "前一个";
        btnLeft.className = "";
        btnRight.type = "button";
        btnRight.value = "后一个";
        rightDiv.appendChild(btnLeft);
        rightDiv.appendChild(btnRight);
        $(btnLeft).on('click', function () {
            if (preIndex == -1) {
                alert("已经到第一张了");
                return;
            }
            var curElement = $(".column img").get(preIndex);
            var _tempParent = $(curElement).parent();
            var cloneElement = $(curElement).clone(true);
            animateImg.call(cloneElement, leftDiv);
            $(leftDiv).html('').append(cloneElement);
            rightDiv.innerHTML = "";
            rightDiv.innerHTML += "<fieldset><legend>图片信息</legend><p>标题: " + _tempParent.attr('title') + "</p>" +
                "<p>相册: " + _tempParent.attr('tag') +
                "</p>" + "<p>简介: " + _tempParent.attr('intro') + "</p>" +
                "</p>" + "<p>上传者: " + _tempParent.attr('owner') + "</p></fieldset>";
            rightDiv.appendChild($(this).clone(true).get(0));
            rightDiv.appendChild($(btnRight).clone(true).get(0));
            curIndex = preIndex;
            preIndex = curIndex - 1;
            nextIndex = curIndex + 1;
        });

        $(btnRight).on('click', function () {
            if (nextIndex == $('.column img').size()) {
                alert("已经到最后一张了");
                return;
            }
            var curElement = $(".column img").get(nextIndex);
            var _tempParent = $(curElement).parent();
            var cloneElement = $(curElement).clone(true);
            animateImg.call(cloneElement, leftDiv);
            $(leftDiv).html('').append(cloneElement);
            rightDiv.innerHTML = "";
            rightDiv.innerHTML += "<fieldset><legend>图片信息</legend><p>标题: " + _tempParent.attr('title') + "</p>" +
                "<p>相册: " + _tempParent.attr('tag') +
                "</p>" + "<p>简介: " + _tempParent.attr('intro') + "</p>" +
                "</p>" + "<p>上传者: " + _tempParent.attr('owner') + "</p></fieldset>";
            rightDiv.appendChild($(btnLeft).clone(true).get(0));
            rightDiv.appendChild($(this).clone(true).get(0));
            curIndex = nextIndex;
            preIndex = curIndex - 1;
            nextIndex = curIndex + 1;
        });
    });

    function animateImg(leftDiv) {
        $(this).on('load', function () {
            var fWidth = leftDiv.offsetWidth - 40, fHeight = leftDiv.offsetHeight,
                imgWidth = $(this).width(), imgHeight = $(this).height();
            var factorX = imgWidth * 1.0 / imgHeight, factorY = imgHeight * 1.0 / imgWidth;
            if (factorX > 1) {
                if (imgWidth > fWidth * 0.6) {
                    imgWidth = fWidth * 0.6;
//                    imgHeight = imgHeight * 0.6;
                    imgHeight = imgWidth * factorY;
                }

                if (imgHeight > fHeight * 0.8) {
                    imgHeight = fHeight * 0.8;
                    imgWidth = imgHeight * factorX;
                }
                $(this).width(imgWidth);
                $(this).height(imgHeight);
            }
            else if (factorY > 1) {
                if ($(this).height() > fHeight * 0.8) {
                    $(this).height(fHeight * 0.8);
                    $(this).width($(this).height() * 1.0 / factorY);
                }
            }
            else {
                $(this).width(fWidth * 0.6);
                $(this).height($(this).width());
            }
            $(this).css({left: Math.abs(fWidth - $(this).width()) / 2 + "px",
                top: Math.abs(fHeight - $(this).height()) / 2 + "px"}).fadeIn(400);
        });
    }
})(jQuery);