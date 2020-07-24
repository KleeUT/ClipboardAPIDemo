// Copy //
function handleCopy(e) {
  console.log("Copy Event", e);
  try {
    var selection = window.getSelection().toString();
    var patchedText =
      "Oh you're stealing the content are you!?\nWell let's see how you like this content!\n\n-------------\n" +
      window.btoa(selection);
    navigator.clipboard.writeText(patchedText);
    e.preventDefault();
  } catch (er) {
    console.error(er);
  }
}
document.body.addEventListener("copy", handleCopy);

// Cut //
function handleCut(e) {
  try {
    var selection = window.getSelection().toString();
    var patchedText =
      "How do you cut the sea in half? With a sea-saw\n\nNo Garbling this time\n-------------\n" +
      selection;
    navigator.clipboard.writeText(patchedText);
    // e.preventDefault();
  } catch (er) {
    console.error(er);
  }
}
document.body.addEventListener("cut", handleCut);

// PASTE //
function messWithPaste() {
  const colors = [
    "red",
    "green",
    "blue",
    "purple",
    "pink",
    "yellow",
    "orange",
    "maroon",
    "aqua",
    "coral",
  ];
  function handlePaste(e) {
    // As of now I cant seem to find the data in the event.
    e.target.style.backgroundColor = colors[Math.floor(Math.random() * 10)];
    // e.preventDefault(); // Be a pain and stop the paste
  }
  document.body.addEventListener("paste", handlePaste);
}
document.getElementById("pasteButton").addEventListener("click", messWithPaste);

// Inject //

function addToClipboard() {
  try {
    navigator.clipboard
      .writeText("This text was injected into the clipboard")
      .then(console.log)
      .catch(console.error);
  } catch (e) {
    console.error(e);
  }
  console.log("something");
}
document
  .getElementById("addToClipboard")
  .addEventListener("click", addToClipboard);

// Inject image //
async function writeClipImg() {
  // This is copied from MDN https://developer.mozilla.org/en-US/docs/Web/API/ClipboardItem
  try {
    const imgURL = "/copy.png";
    const data = await fetch(imgURL);
    const blob = await data.blob();

    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);
    console.log("Fetched image copied.");
  } catch (err) {
    console.error(err.name, err.message);
  }
}
document.getElementById("copyImage").addEventListener("click", writeClipImg);

// Read //
function readClipboard() {
  navigator.clipboard
    .readText()
    .then((t) => console.log("Current Clipboard", t));
}
document
  .getElementById("readClipboard")
  .addEventListener("click", readClipboard);
