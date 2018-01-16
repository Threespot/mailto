# MailTo

[![Build Status](https://travis-ci.org/Threespot/mailto.svg?branch=master)](https://travis-ci.org/Threespot/mailto)

Replaces obscured element with a mailto link

## Install

```
npm install @threespot/mailto
```

Mailto uses the `data-email` attribute of an element and converts them to mailto links. It uses the value of that attribute as the email address. Inner HTML is preserved and any occurrences of `[at]` are converted to `@`.

**Exmaple:**

```html
<span data-email="hello[at]threespot.com">Contact Us</span>
```

**Becomes:**

```html
<a href="mailto:hello@threespot.com">Contact Us</a>
```

Works with inner HTML

**Exmaple:**

```html
<span data-email="hello[at]threespot.com">
  <b>hello[at]threespot.com</b>
</span>
```

**Becomes:**

```html
<a href="mailto:hello@threespot.com">
  <b>hello@threespot.com</b>
</a>
```

## Usage

**html**

```html
<span id="mailtoLink" data-email="hello[at]threespot.com">Contact Us</span>
```

**js**

```js
import MailToLink from "mailto";

const linkElem = document.getElementById("mailtoLink");

new MailToLink(linkElem);
```

## License

Mailto is free software, and may be redistributed under the terms of the [MIT license](https://github.com/Threespot/frontline-sass/blob/master/LICENSE.md).

## About Threespot

Threespot is a design and development agency from Washington, DC. We work for organizations that we believe are making a positive change in the world. Find out more [about us](https://www.threespot.com), [our projects](https://www.threespot.com/work) or [hire us](https://www.threespot.com/agency/hire-us)!

[![Threespot](https://avatars3.githubusercontent.com/u/370822?v=3&s=100)](https://www.threespot.com)
