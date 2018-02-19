const MailToLink = require("../index");

const validObscuredEmail = "hello[at]threespot.com";
const validEmail = "hello@threespot.com";
const validInnerHTMLObscuredEmail = "<b>hello[at]threespot.com</b>";
const validInnerHTMLEmail = "<b>hello@threespot.com</b>";

test('replaces "[at]" with "@"', () => {
  expect(MailToLink.prototype.replaceObscuredString(validObscuredEmail)).toBe(
    validEmail
  );
  expect(typeof MailToLink.prototype.replaceObscuredString).toBe('function');
  // Non string param
  expect(() => {
    MailToLink.prototype.replaceObscuredString(false);
  }).toThrowError();
  // Empty param
  expect(() => {
    MailToLink.prototype.replaceObscuredString();
  }).toThrowError();
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
  expect(typeof MailToLink.prototype.createLinkReplacement).toBe('function');
  expect(link.tagName).toEqual("A");
  expect(link.getAttribute("href")).toEqual(href);
  expect(link.getAttribute("class")).toEqual(classNames);
  expect(link.innerHTML).toEqual(validInnerHTMLEmail);

  const link2 = MailToLink.prototype.createLinkReplacement(
    href, linkHtml
  );
  expect(link2.getAttribute("class")).toEqual(null);
});

test("replace span with mailto link", () => {
  const href = `mailto:${validEmail}`;
  const linkHtml = validInnerHTMLObscuredEmail;
  const classNames = "TestLink";

  // Create parent element
  const parent = document.createElement("div");
  // create init email element, span and anchor
  let elem = document.createElement("span");
  // set element body
  elem.innerHTML = "string without obscured character";
  // update elment attributes
  elem.setAttribute("data-email", validObscuredEmail);
  elem.setAttribute("class", classNames);
  // Add child to parent
  parent.appendChild(elem);

  const link = new MailToLink(elem).el;
  expect(link.tagName).toEqual("A");
  expect(link.getAttribute("href")).toEqual(href);
  expect(link.getAttribute("class")).toEqual(classNames);
  expect(link.innerHTML).toEqual("string without obscured character");
});

test("update anchor with mailto value", () => {
  const href = `mailto:${validEmail}`;
  const linkHtml = validInnerHTMLObscuredEmail;
  const classNames = "TestLink";

  // Create parent element
  const parent = document.createElement("div");
  // create init email element, span and anchor
  let elem = document.createElement("a");
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

test("exit early", () => {
  expect(() => {
    new MailToLink()
  }).toThrowError()
})
