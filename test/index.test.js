const MailToLink = require("../dist/mailto.js");

const validObscuredEmail = "hello[at]threespot.com";
const validEmail = "hello@threespot.com";
const validInnerHTMLObscuredEmail = "<b>hello[at]threespot.com</b>";
const validInnerHTMLEmail = "<b>hello@threespot.com</b>";

test('replaces "[at]" with "@"', () => {
  expect(MailToLink.prototype.replaceObscuredString(validObscuredEmail)).toBe(
    validEmail
  );
});

test("create mailto link node", () => {
  const href = `mailto:${validEmail}`;
  const linkHtml = validInnerHTMLEmail;
  const classNames = "TestLink";

  const link = MailToLink.prototype.createLinkReplacement(
    href,
    linkHtml,
    classNames
  );
  expect(link.tagName).toEqual("A");
  expect(link.getAttribute("href")).toEqual(href);
  expect(link.getAttribute("class")).toEqual(classNames);
  expect(link.innerHTML).toEqual(validInnerHTMLEmail);
});

test("replace element with mailto link", () => {
  const href = `mailto:${validEmail}`;
  const linkHtml = validInnerHTMLEmail;
  const classNames = "TestLink";

  // Create parent element
  const parent = document.createElement("div");
  // create init email element
  let elem = document.createElement("span");
  // set element body
  elem.innerHTML = linkHtml;
  // update elment attributes
  elem.setAttribute("data-email", validObscuredEmail);
  elem.setAttribute("class", classNames);
  // Add child to parent
  parent.appendChild(elem);

  const link = new MailToLink(elem).el;

  expect(link.tagName).toEqual("A");
  expect(link.getAttribute("href")).toEqual(href);
  expect(link.getAttribute("class")).toEqual(classNames);
  expect(link.innerHTML).toEqual(validInnerHTMLEmail);
});
