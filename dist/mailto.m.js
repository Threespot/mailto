module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar obscureString = \"[at]\";\n\n/**\n * Replaces obscured element with a mailto link <br>\n * Uses an elements \"data-email\" attribute to convert them to mailto links, using\n * the value of that attribute as the email address.\n * Inner HTML is preserved and any occurrences of \"[at]\" are converted to \"@\".\n */\n\nvar MailToLink = function () {\n  /**\n   * Create link from obscured element\n   * @param {object} el - dom node\n   */\n  function MailToLink(el) {\n    _classCallCheck(this, MailToLink);\n\n    this.el = el;\n    var link = void 0,\n        dataAttr = void 0,\n        href = void 0;\n\n    // Generate mailto href\n    try {\n      dataAttr = el.getAttribute(\"data-email\");\n      href = \"mailto:\" + this.replaceObscuredString(dataAttr);\n    } catch (e) {\n      throw Error(\"MailToLink: constructor requires a DOM node object\");\n    }\n\n    // Replace [at] with @ in link text\n    var linkHtml = el.innerHTML;\n    if (linkHtml.indexOf(obscureString) > 0) {\n      linkHtml = this.replaceObscuredString(linkHtml);\n      el.innerHTML = linkHtml;\n    }\n\n    // Add mailto href to link tags\n    if (el.nodeName === \"A\") {\n      el.setAttribute(\"href\", href);\n    } else {\n      // Create link tag, remove original element\n      var classNames = el.getAttribute(\"class\");\n      link = this.createLinkReplacement(href, linkHtml, classNames);\n      // Insert link and remove original element\n      el.insertAdjacentHTML(\"beforebegin\", link.outerHTML);\n      el.parentNode.removeChild(el);\n\n      // replace instance el with new element\n      this.el = link;\n    }\n  }\n\n  /**\n   * Create link to replace the original element\n   * @param {string} href - value to apply to link\n   * @param {string} body - body to insert to link\n   * @param {string} classNames - values to add to the link\n   * @returns {object} link - DOM element\n   */\n\n\n  _createClass(MailToLink, [{\n    key: \"createLinkReplacement\",\n    value: function createLinkReplacement(href, body) {\n      var classNames = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : \"\";\n\n      var link = document.createElement(\"a\");\n      link.setAttribute(\"href\", href);\n      if (classNames) {\n        link.setAttribute(\"class\", classNames);\n      }\n      link.innerHTML = body;\n      return link;\n    }\n\n    /**\n     * Replace obscured string with valid email address\n     * @param {string} str - obscured email string\n     * @return {string} newStr - valid email string\n     */\n\n  }, {\n    key: \"replaceObscuredString\",\n    value: function replaceObscuredString(str) {\n      var newStr = void 0;\n      try {\n        newStr = str.replace(obscureString, \"@\");\n      } catch (e) {\n        throw Error(\"MailToLink: `data-email` attribute for mailto replacement. Link not created\");\n      }\n      return newStr;\n    }\n  }]);\n\n  return MailToLink;\n}();\n\nexports.default = MailToLink;\n\n//# sourceURL=webpack://%5Bname%5DLink/./index.js?");

/***/ })

/******/ });
//# sourceMappingURL=mailto.commonjs2.js.map