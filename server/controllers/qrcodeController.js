const QRCode = require("qrcode");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const URI = process.env.IMAGE_URI;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Function to generate QR code
function generateQRCode() {
  return new Promise((onSuccess, onError) => {
    // QR Code points to the menu page
    const url = `${FRONTEND_URL}/menu`;
    const filename = "qrcode.png";
    const filePath = path.join("uploads", "QR", filename);

    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    // Generate the QR code and save it to the file
    QRCode.toFile(filePath, url, (err) => {
      if (err) {
        onError(err);
      } else {
        onSuccess(filename);
      }
    });
  });
}

const makeQRCode = async (req, res) => {
  try {
    const qrCode = await generateQRCode();
    if (!qrCode) {
      return res.status(404).send({ msg: "Something went Wrong" });
    }
    const URL = `${URI}QR/qrcode.png`;
    res
      .status(200)
      .send({ msg: "QR Code Generated Successfully...", url: URL });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

const getQRCode = async (req, res) => {
  try {
    const URL = `${URI}QR/qrcode.png`;
    res.status(200).send({ url: URL });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

module.exports = { makeQRCode, getQRCode };
