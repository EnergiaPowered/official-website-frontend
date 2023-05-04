import React from "react";
import pic from "../../../modules/GenerateCertificates/assets/cert10.png";
import algoPic from "../../../modules/GenerateCertificates/assets/algo.png";
import { BlackFont } from "../../../modules/GenerateCertificates/assets/BlackFont";  
import { BoldFont } from "../../../modules/GenerateCertificates/assets/BoldFont";
import { LightFont } from "../../../modules/GenerateCertificates/assets/LightFont.js";
import { Handwriting } from "../../../modules/GenerateCertificates/assets/Handwriting";
import { SemiboldFont } from "../../../modules/GenerateCertificates/assets/SemiboldFont";
import { useEffect } from "react";
import jsPDF from "jspdf";
import QRCode from "react-qr-code";
import { jsxToPng } from "jsx-to-png";
const Response = ({ found,  certificateData }) => {
  const certificate = certificateData;


  function generateQR(serialNumber) {
      const picture = jsxToPng(
        <QRCode
          size={256}
          style={{ height: "550px", width: "550px" }}
          value={`https://www.energia-powered.com/verify/${serialNumber}`}
        />,
        { height: 80, width: 80 }
      );

 
    return picture;
  }

  async function generateCertificate(
    name,
    course,
    sessionsCount,
    projectName,
    ViceName,
    headName,
    serialNumber
  ) {
   
        const qr = await generateQR(serialNumber);
        const doc = new jsPDF("landscape");

        console.log("in generateCertificate", name, course, sessionsCount, projectName, ViceName, headName);


        // Add background color
        doc.setFillColor("#2c3e50");
        doc.rect(0, 0, 297, 210, "F");

        // Add signature
        if (course === "Algorithms") {
          doc.addImage(algoPic, "PNG", 0, 0, 297, 210);
        } else {
          doc.addImage(pic, "PNG", 0, 0, 297, 210);
        }

        doc.addImage(qr, 245, 120, 0, 0);

        doc.addFileToVFS("Raleway-Black.ttf", BlackFont);
        doc.addFont("Raleway-Black.ttf", "Raleway", "black");
        doc.addFileToVFS("Raleway-Bold.ttf", BoldFont);
        doc.addFont("Raleway-Bold.ttf", "Raleway", "bold");
        doc.addFileToVFS("Raleway-Light.ttf", LightFont);
        doc.addFont("Raleway-Light.ttf", "Raleway", "light");
        doc.addFileToVFS("Sacramento-Regular.ttf", Handwriting);
        doc.addFont("Sacramento-Regular.ttf", "Sacramento", "regular");
        doc.addFileToVFS("Raleway-Semibold.ttf", SemiboldFont);
        doc.addFont("Raleway-Semibold.ttf", "Raleway", "semibold");

        doc.setFont("Raleway", "black");
        doc.setFontSize(36);
        doc.setTextColor("#0044e3");
        doc.text(name.toUpperCase(), 20.5, 60, { align: "left" });

        doc.setFont("Raleway", "bold");
        doc.setFontSize(26);
        doc.setTextColor("#494949");
        doc.text(course.toUpperCase(), 20.5, 90, {
          align: "left",
        });

        doc.setFont("Raleway", "semibold");
        doc.setFontSize(24);
        doc.setTextColor("#494949");
        doc.text(sessionsCount, 72, 78, {
          align: "left",
        });

        doc.setFont("Raleway", "semibold");
        doc.setFontSize(22);
        doc.setTextColor("#494949");
        doc.text(projectName, 75, 117, {
          align: "left",
        });

        doc.setFont("Sacramento", "regular");
        doc.setFontSize(22);
        doc.setTextColor("#494949");
        doc.text("Ziad Emad", 38, 188, {
          align: "center",
        });

        doc.setFont("Sacramento", "regular");
        doc.setFontSize(22);
        doc.setTextColor("#494949");
        doc.text(ViceName, 97, 188, {
          align: "center",
        });

        doc.setFont("Sacramento", "regular");
        doc.setFontSize(22);
        doc.setTextColor("#494949");
        doc.text(headName, 156, 188, {
          align: "center",
        });

        doc.setFont("Raleway", "light");
        doc.setFontSize(15);
        doc.setTextColor("#494949");
        doc.text(`awarded on May 2023`, 20.5, 148, { align: "left" });

        doc.setFont("Time");
        doc.setFontSize(9);
        doc.setTextColor("#494949");
        doc.text(
          `Verifiy at energia-powered.com/verify/${serialNumber}`,
          224,
          148,
          { align: "left" }
        );

        doc.setFont("Time", "italic");
        doc.setFontSize(7);
        doc.setTextColor("#494949");
        doc.text(
          `Energia Powered confirmed the participation of this individual \nin the workshop.`,
          254.5,
          152,
          { align: "center" }
        );

        doc.setFont("Courier");
        doc.setFontSize(9);
        doc.setTextColor("#0044e3");
        doc.text(`${serialNumber}`, 246, 203, { align: "left" });

        // Save document
        doc.save(`${serialNumber}-${name}-${course}.pdf`);
        // handleAddingCertificate();
        console.log("Donne");
   
  }

  return (
    <section className="py-24 dark:bg-transparent">
      <div className="flex flex-col py-8 lg:py-16 px-4 mx-auto max-w-screen-md items-center content-center">
        {found ? <>
          <h2 className="mb-4 text-5xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Certificate is{" "}
            <span className="underline underline-offset-3 decoration-8 decoration-green-400 dark:decoration-green-600">
              verified.
            </span>
          </h2>
          <button onClick={() => {generateCertificate(certificate.name, certificate.workshop, certificate.sessionsCount, certificate.projectName, certificate.ViceName, certificate.headName, certificate.serialNumber)}} className="py-3 px-5 text-sm mx-auto font-medium text-center text-white rounded-lg sm:w-fit hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-800 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Download Certificate
        </button>
        </>
         : (
          <h2 className="mb-4 text-5xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Certificate is{" "}
            <span className="underline underline-offset-3 decoration-8 decoration-red-400 dark:decoration-red-600">
              not found.
            </span>
          </h2>
        )}{" "}
    

<a href="/verify/0" className="p-12 font-medium text-blue-600 dark:text-blue-500 hover:underline">Go Back</a>

      </div>
    </section>
  );
};

export default Response;
