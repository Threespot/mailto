# MailTo

[![Build Status](https://travis-ci.org/Threespot/mailto.svg?branch=master)](https://travis-ci.org/Threespot/mailto)

Replaces obscured element with a mailto link

Looks for all elements with a `data-email` attribute and converts them to mailto links, using the value of that attribute as the email address. Inner HTML is preserved and any occurrences of `[at]` are converted to `@`.

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
