"use strict";

const obscureString = "[at]";

/**
 * MailTo Link
 * replaces obscured element with a mailto link
 * Looks for all elements with a "data-email" attribute and converts them to
 * mailto links, using the value of that attribute as the email address.
 * Inner HTML is preserved and any occurrences of "[at]" are converted to "@".
 * Exmaple: <span data-email="hello[at]threespot.com">Contact Us</span>
 * Becomes: <a href="mailto:hello@threespot.com">Contact Us</a>
 * Works with inner HTML
 * Exmaple: <span data-email="hello[at]threespot.com"><b>hello[at]threespot.com</b></span>
 * Becomes: <a href="mailto:hello@threespot.com"><b>hello@threespot.com</b></a>
 */
class MailToLink {
  constructor(el) {
    this.el = el;
    let link;
    // Generate mailto href
    const dataAttr = el.getAttribute("data-email");
    const href = `mailto:${this.replaceObscuredString(dataAttr)}`;

    // Replace [at] with @ in link text
    let linkHtml = el.innerHTML;
    if (linkHtml.indexOf(obscureString)) {
      linkHtml = this.replaceObscuredString(linkHtml);
      el.innerHTML = linkHtml;
    }

    // Add mailto href to link tags
    if (el.nodeName === "A") {
      el.setAttribute("href", href);
    } else {
      // Create link tag, remove original element
      const classNames = el.getAttribute("class") || "";
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
   * @param {object} link - DOM element
   */
  createLinkReplacement(href, body, classNames = "") {
    let link = document.createElement("a");
    link.setAttribute("href", href);
    link.setAttribute("class", classNames);
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

// Get any existing elements that should be unobscured
const nodes = document.querySelectorAll("[data-email]");
for (var i = 0; i < nodes.length; i++) {
  // create a new link from each element
  new MailToLink(nodes[i]);
}

export default MailToLink;
