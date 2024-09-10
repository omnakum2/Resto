const QRCode = require("qrcode");
const path = require("path");
const fs = require("fs");
const os = require("os");
const dotenv = require("dotenv");
dotenv.config();

const URI = process.env.IMAGE_URI;

// get the local ip of the device
function getLocalIP() {
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName in networkInterfaces) {
    for (const iface of networkInterfaces[interfaceName]) {
      // Check if the interface is IPv4 and not a loopback address
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  // Return null if no local IP address is found
  return null;
}

// Function to generate QR code
function generateQRCode() {
  const localIP = getLocalIP();
  return new Promise((onSuccess, onError) => {
    const url = `http://${localIP}:3000/`;
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
      res.status(404).send("Something went Wrong");
    }
    const URL = `${URI}QR/qrcode.png`;
    if (!URL) {
      res.status(404).send("Something went Wrong");
    }
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
    if (!URL) {
      res.status(404).send("Something went Wrong");
    }
    res.status(200).send({ url: URL });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

module.exports = { makeQRCode, getQRCode };
