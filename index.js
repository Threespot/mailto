"use strict";

const obscureString = "[at]";

/**
 * Replaces obscured element with a mailto link <br>
 * Uses an elements "data-email" attribute to convert them to mailto links, using
 * the value of that attribute as the email address.
 * Inner HTML is preserved and any occurrences of "[at]" are converted to "@".
 */
class MailToLink {
  /**
   * Create link from obscured element
   * @param {object} el - dom node
   */
  constructor(el) {
    this.el = el;
    let link, dataAttr, href;

    // Generate mailto href
    try {
      dataAttr = el.getAttribute("data-email");
      href = `mailto:${this.replaceObscuredString(dataAttr)}`;
    } catch (e) {
      throw Error("MailToLink: constructor requires a DOM node object");
    }

    // Replace [at] with @ in link text
    let linkHtml = el.innerHTML;
    if (linkHtml.indexOf(obscureString) > 0) {
      linkHtml = this.replaceObscuredString(linkHtml);
      el.innerHTML = linkHtml;
    }

    // Add mailto href to link tags
    if (el.nodeName === "A") {
      el.setAttribute("href", href);
    } else {
      // Create link tag, remove original element
      const classNames = el.getAttribute("class");
      link = this.createLinkReplacement(href, linkHtml, classNames);
      // Insert link and remove original element
      el.insertAdjacentHTML("beforebegin", link.outerHTML);
      el.parentNode.removeChild(el);

      // replace instance el with new element
      this.el = link;
    }
  }

  /**
   * Create link to replace the original element
   * @param {string} href - value to apply to link
   * @param {string} body - body to insert to link
   * @param {string} classNames - values to add to the link
   * @returns {object} link - DOM element
   */
  createLinkReplacement(href, body, classNames = "") {
    let link = document.createElement("a");
    link.setAttribute("href", href);
    if (classNames) {
      link.setAttribute("class", classNames);
    }
    link.innerHTML = body;
    return link;
  }

  /**
   * Replace obscured string with valid email address
   * @param {string} str - obscured email string
   * @return {string} newStr - valid email string
   */
  replaceObscuredString(str) {
    let newStr;
    try {
      newStr = str.replace(obscureString, "@");
    } catch (e) {
      throw Error(
        "MailToLink: `data-email` attribute for mailto replacement. Link not created"
      );
    }
    return newStr;
  }
}

export default MailToLink;
