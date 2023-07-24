const fs = require("fs");
const path = require("path");

function readFileAsBase64(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error("File not found");
  }

  const fileExtension = path.extname(filePath).toLowerCase();

  if (![".pdf", ".jpg", ".jpeg", ".png"].includes(fileExtension)) {
    throw new Error("Unsupported file extension");
  }

  const fileData = fs.readFileSync(filePath, { encoding: "base64" });

  return fileData;
}

module.exports.templateTags = [
  {
    name: "base64fileparser",
    displayName: "Base64 - Encode any File",
    description: "Encode a file as base64",
    args: [
      {
        displayName: "File",
        type: "file",
      },
      {
        displayName: "Quote",
        description: "Enclose the result in quotes",
        defaultValue: false,
        type: "boolean",
      },
    ],
    run(context, path, quote) {
      console.log("PATH: ", path, quote);
      let ret;
      try {
        ret = readFileAsBase64(path);
      } catch (err) {
        throw new Error(`Cannot encode: ${err.message}`);
      }

      if (quote) {
        return JSON.stringify(ret);
      }

      return ret;
    },
  },
];
