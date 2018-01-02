(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.mailto = factory());
}(this, (function () {

var obscureString = "[at]";
var MailToLink = function MailToLink(el) {
    this.el = el;
    var link;
    var dataAttr = el.getAttribute("data-email");
    var href = "mailto:" + (this.replaceObscuredString(dataAttr));
    var linkHtml = el.innerHTML;
    if (linkHtml.indexOf(obscureString)) {
        linkHtml = this.replaceObscuredString(linkHtml);
        el.innerHTML = linkHtml;
    }
    if (el.nodeName === "A") {
        el.setAttribute("href", href);
    } else {
        var classNames = el.getAttribute("class") || "";
        link = this.createLinkReplacement(href, linkHtml, classNames);
        el.insertAdjacentHTML("beforebegin", link.outerHTML);
        el.parentNode.removeChild(el);
        this.el = link;
    }
};
MailToLink.prototype.createLinkReplacement = function createLinkReplacement (href, body, classNames) {
        if ( classNames === void 0 ) classNames = "";

    var link = document.createElement("a");
    link.setAttribute("href", href);
    link.setAttribute("class", classNames);
    link.innerHTML = body;
    return link;
};
MailToLink.prototype.replaceObscuredString = function replaceObscuredString (str) {
    var newStr;
    try {
        newStr = str.replace(obscureString, "@");
    } catch (e) {
        throw Error("MailToLink: `data-email` attribute for mailto replacement. Link not created");
    }
    return newStr;
};
var nodes = document.querySelectorAll("[data-email]");
for (var i = 0;i < nodes.length; i++) {
    new MailToLink(nodes[i]);
}

return MailToLink;

})));
//# sourceMappingURL=mailto.umd.js.map
