# Intro

I got interested in the clipboard after reading a [blog](https://andrewyoon.art/blog/ft-clipboard) recently about certain publications limiting peoples ability to copy content and replacing it with links to purchase the articles and/or sharing rights to the article. The author was perturbed enough to de-minify the code and look at what they were doing. It turned out that they were making use of the browsers clipboard API to do this injection.

I also remembered reading/hearing about some mobile apps creeping on your clipboard to read it without your knowledge. One of those was TikTok and maybe that's par for the course with them but the other was LinkedIn. Is it possible that there are website's out there creeping on my clipboard as I move around the internet? So I figured I'd have a bit of a look at the Clipboard APIs and see what could be done with it.

# Overview

Clipboard API is an experimental API that exists to replace [Document.execCommand](<[https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand)>)

There are three parts to the API

## Clipboard

An object that provides methods to interact with the clipboad. It exists on `window.navigator.clipboard`.

It provides four asynchronous methods:

- `read`
- `readText`
- `write`
- `writeText`

## ClipboardItem

A class for interacting with the `read` and `write` methods of Clipboard using `Blob` objects to represent binary data. This allows images and other non text data to be added to the clipboard.

## ClipboardEvent

DOM events that fire on `cut`, `copy`, and `paste` clipboard interactions.

# Sample Code

I've put together a [sample application](https://github.com/KleeUT/ClipboardAPIDemo) making use of these different events. The only dependency is `http-serve` so that the code can be served on [localhost](http://localhost).

## Clipboard manipulation

Adding and reading from the clipboard are single line calls.

### Adding

To add text to the clipboard it's a mater of calling the `writeText` method on the clipboard.

```javascript
await navigator.clipboard.writeText(text);
```

Adding image data to the clipboard is a little more complex. In this case I have borrowed heavily from the [MDN article on `ClipboardItem`](https://developer.mozilla.org/en-US/docs/Web/API/ClipboardItem).

The code brings in an image via the `fetch` API. Reads the response as a `Blob` object. Uses that blob to create a `ClipboardItem` passing the blob in as part of an options object with the property name determined by the blobs type. This `ClipboardItem` instance is then written to the clipboard.

```javascript
const imgURL = "/copy.png";
// fetch the image
const data = await fetch(imgURL);
// read the response as a Blob;
const blob = await data.blob();

// Add the blob to the clipboard
await navigator.clipboard.write([
  new ClipboardItem({
    [blob.type]: blob,
  }),
]);
```

### Reading

Reading from the clipboard is another one line call. Note that the user will need to allow access to the clipboard to read the contents.

```javascript
const clipboardData = await navigator.clipboard.readText();
```

All I've done with the data is to write it out to the console. I couldn't think of a good reason why a web page should be reading the clipboard rather than interacting with the `paste` event.

## Event handling

To demonstrate working with clipboard events handlers are registered for each of the `cut`, `copy` and `paste` events.

```javascript
document.body.addEventListener("cut", handleCut);
document.body.addEventListener("copy", handleCopy);
document.body.addEventListener("paste", handlePaste);
```

For cut and copy the functions take the data selected in the document and modify the content before adding it to the clipboard with:

```javascript
await navigator.clipboard.writeText(text);
```

I couldn't think of anything The paste event sets the background colour of the paste target element.

# Issues

It's still experimental and I've fund that it's stable but that not all the features are implemented as expected. In particular events don't include clipboard data. The `cut`, `copy`, and `paste` events should include a `clipboardData` property that contains the data affected by the user-initiated cut, copy, or paste operation, along with its MIME type. My experience is that this [DataTransfer Object](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer) is unpopulated.

I tested my sample application in Brave (which is a Chromium based browser) and Firefox on Windows.

## Brave

Using Version 1.11.97 C hromium: 84.0.4147.89 (Official Build) (64-bit)

Other than the unpopulated `clipboardData` property everything seems to be working as I would expect.

## Firefox

Using 78.0.2 (64-bit) on Windows

There were a couple of inconsistencies in the way I would expect the APIs to behave in Firefox

I was able to write to the clipboard on cut and copy events but was unable to get the selected data from text boxes or text areas. I was able to get the data selected within `<p>` elements.

Reading from the clipboard appears not to be implemented when calling `navigator.clipboard.readText` I had the following error thrown `navigator.clipboard.readText is not a function`.

# Conclusion

I'm yet to work out what a good and genuine reason for using the clipboard API's. like a lot of things in software development it's a tool that is good to have available and is going to be useful for a specific problems and pretty useless for the rest of the time. There is no need to go looking to find nails to hit with the clipboard API hammer just because you want to use it.

Thankfully it looks like Firefox and Chrome (Brave) have my back as far as stopping webpages from creeping on me.
