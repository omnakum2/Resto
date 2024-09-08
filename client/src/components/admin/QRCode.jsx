import React, { useEffect, useState } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function QRCode() {
  const [qrcode, setQRCode] = useState("");
  const [error, setError] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/QRCode/");
        if (response.status === 200) setQRCode(response.data);
      } catch (error) {
        setError(error.response.data.msg);
      }
    };
    fetchQRCode();
  }, []);

  const handleSubmit = async () => {
    setError("");
    setIsDownloading(true);
    try {
      const response = await axios.post("http://localhost:3001/api/QRCode/");
      if (response.status === 200) {
        alert(response.data.msg);
        setQRCode(response.data);
      }
    } catch (error) {
      setError(error.response.data.msg);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("qr_image");

    html2canvas(input, { useCORS: true })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait", // or 'landscape' if you need landscape orientation
          unit: "mm",
          format: "a4",
        });

        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Center the image vertically on the A4 page
        const marginTop = (pdf.internal.pageSize.height - imgHeight) / 2;

        pdf.addImage(imgData, "PNG", 0, marginTop, imgWidth, imgHeight);
        pdf.save("qrcode.pdf");
      })
      .catch((err) => {});
  };

  return (
    <div>
      <div className="container mt-4">
        <div className="text-end m-3">
          <button
            className="adminbtn text-decoration-none adminbtn-success adminbtn-sm ms-2"
            onClick={handleSubmit}
            disabled={isDownloading}
          >
            <span>{isDownloading ? "Generating..." : "New"}</span>
          </button>
          <button
            className="adminbtn text-decoration-none adminbtn-dark adminbtn-sm ms-2"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
          >
            <span>{isDownloading ? "Downloading..." : "Download PDF"}</span>
          </button>
        </div>
        <div id="qr_image" className="text-center mb-5">
          {error && <div className="mt-3 alert alert-danger">{error}</div>}
          {qrcode.url && (
            <img
              src={qrcode.url}
              alt="QR Code"
              style={{
                maxWidth: '100%',    
                height: 'auto',      
                border: '4px solid', 
                display: 'block',    
                margin: '0 auto'     
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default QRCode;
