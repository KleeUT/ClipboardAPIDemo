# Clipboard API example

This repo includes a rather minimal set of example code for interacting with the clipboard API.

## Running

Install dependencies using `npm install`
Serve using the `http-serve` package `npm start`

## Using

The example is broken into 4 sections
Use a Chrome based browser for the most reliable results as of July 2020

### Copying / Cutting to the clipboard

Copy the text and paste it into the text area and it will be base 64 encoded with extra context added

Cut the text from the text area and paste the text, more text will be added and the content will be left the same.

### Pasting from the clipboard

Click the button in the paste section to enable paste modification
Paste something into the text area and the background colour of that element will change.

### Adding to the clipboard

The two buttons in this section will add text and an image (from [undraw](https://undraw.co/)) to the clipboard

### Reading the clipboard

Click the button to read the clipboard, The browser will need to be granted permissions. The clipboard contents will be output in the console.
