import React, { useState } from "react";
import pic from "./assets/cert10.png";
import algoPic from "./assets/algo.png";
import { BlackFont } from "./assets/BlackFont.js";
import { BoldFont } from "./assets/BoldFont";
import { LightFont } from "./assets/LightFont.js";
import { Handwriting } from "./assets/Handwriting";
import { SemiboldFont } from "./assets/SemiboldFont";
import { useEffect } from "react";
import jsPDF from "jspdf";
import QRCode from "react-qr-code";
import { jsxToPng } from 'jsx-to-png';
import addCertificate from "./services";






function CertificateGenerator() {
  const [certificatesData, setCertificatesData] = useState([]);
  const [name, setName] = useState("");
  const [workshop, setWorkshop] = useState("");
  const [sessionsCount, setSessionsCount] = useState("");
  const [projectName, setProjectName] = useState("");
  const [headName, setHeadName] = useState("");
  const [viceName, setViceName] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [image, setImage] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState([]);

  const DATA = [
    {
        "serialNumber": "01ede8adae",
        "name": "Elaria youssef",
        "workshop": "SOLIDWORKS",
        "sessionsCount": "5",
        "projectName": "Two Cylinder Engine",
        "ViceName": "Zyad Ahmed",
        "headName": "Ghaida Ali"
    },
    {
        "serialNumber": "045b2e5fc0",
        "name": "Moamen Youssry",
        "workshop": "Front-End Development",
        "sessionsCount": "6",
        "projectName": "Social Media App",
        "ViceName": "Ali Hassan",
        "headName": "Yousef Gilany"
    },
    {
        "serialNumber": "07fcg114ad",
        "name": "Abdulrahman Abdelnasser Ibrahim",
        "workshop": "Digital Electronics",
        "sessionsCount": "7",
        "projectName": "MIPS Processor Project",
        "ViceName": "Zyad Ahmed",
        "headName": "Mahmoud Abdelhalim"
    },
    {
        "serialNumber": "07fd0a6109",
        "name": "Hager Ayman Spet",
        "workshop": "Data Science",
        "sessionsCount": "6",
        "projectName": "Exploratory Data Analysis",
        "ViceName": "Ali Hassan",
        "headName": "Mohammed Nasser"
    },
    {
        "serialNumber": "29f6a782f6",
        "name": "Nada Sayed",
        "workshop": "Digital Electronics",
        "sessionsCount": "7",
        "projectName": "MIPS Processor Project",
        "ViceName": "Zyad Ahmed",
        "headName": "Mahmoud Abdelhalim"
    },
    {
        "serialNumber": "2a7daef3f8",
        "name": "Ahmed Nader Ahmed Mohamed",
        "workshop": "Digital Electronics",
        "sessionsCount": "7",
        "projectName": "MIPS Processor Project",
        "ViceName": "Zyad Ahmed",
        "headName": "Mahmoud Abdelhalim"
    },
    {
        "serialNumber": "2b9ff1fg9c",
        "name": "Mohamed Ahmed Shawky",
        "workshop": "Digital Electronics",
        "sessionsCount": "7",
        "projectName": "MIPS Processor Project",
        "ViceName": "Zyad Ahmed",
        "headName": "Mahmoud Abdelhalim"
    },
    {
        "serialNumber": "389c94480d",
        "name": "Salma Tarek Mostafa",
        "workshop": "SOLIDWORKS",
        "sessionsCount": "5",
        "projectName": "Two Cylinder Engine",
        "ViceName": "Zyad Ahmed",
        "headName": "Ghaida Ali"
    },
    {
        "serialNumber": "39bfbe5ddb",
        "name": "Abdalrhman mohamed",
        "workshop": "Embedded Systems",
        "sessionsCount": "7",
        "projectName": "Smart Air Conditioning System",
        "ViceName": "Zyad Ahmed",
        "headName": "Ziad Shawkat"
    },
    {
        "serialNumber": "3c7f3109a8",
        "name": "Karim Ragab Mohamed abdelhalem",
        "workshop": "Digital Electronics",
        "sessionsCount": "7",
        "projectName": "MIPS Processor Project",
        "ViceName": "Zyad Ahmed",
        "headName": "Mahmoud Abdelhalim"
    },
    {
        "serialNumber": "41e0fccb04",
        "name": "Merna Wagih Mansour",
        "workshop": "Digital Electronics",
        "sessionsCount": "7",
        "projectName": "MIPS Processor Project",
        "ViceName": "Zyad Ahmed",
        "headName": "Mahmoud Abdelhalim"
    },
    {
        "serialNumber": "479334885c",
        "name": "Yasmine Ibrahim aldesoukie",
        "workshop": "Digital Electronics",
        "sessionsCount": "7",
        "projectName": "MIPS Processor Project",
        "ViceName": "Zyad Ahmed",
        "headName": "Mahmoud Abdelhalim"
    },
    {
        "serialNumber": "4dd8281ac6",
        "name": "Karim Nabil mohamed ali",
        "workshop": "AutoCAD",
        "sessionsCount": "6",
        "projectName": "Full Schematic Villa Section Plan",
        "ViceName": "Zyad Ahmed",
        "headName": "Moa'az Wagdy"
    },
    {
        "serialNumber": "4dfa862a46",
        "name": "Mohammed Hatem",
        "workshop": "Mobile Application",
        "sessionsCount": "6",
        "projectName": "Universities List",
        "ViceName": "Ali Hassan",
        "headName": "Kareem Sobhi"
    },
    {
        "serialNumber": "4e3c2a6ca1",
        "name": "Ahmed Wael",
        "workshop": "Data Science",
        "sessionsCount": "6",
        "projectName": "Exploratory Data Analysis",
        "ViceName": "Ali Hassan",
        "headName": "Mohammed Nasser"
    },
    {
        "serialNumber": "5c3b00848a",
        "name": "Sama Mohamed Mahmoud",
        "workshop": "Arduino",
        "sessionsCount": "5",
        "projectName": "Smart Home Project",
        "ViceName": "Zyad Ahmed",
        "headName": "Mai El-Qassabi"
    },
    {
        "serialNumber": "6666e5f496",
        "name": "Hafez Mohamed",
        "workshop": "SOLIDWORKS",
        "sessionsCount": "5",
        "projectName": "Two Cylinder Engine",
        "ViceName": "Zyad Ahmed",
        "headName": "Ghaida Ali"
    },
    {
        "serialNumber": "6dfb36fa42",
        "name": "Asmaa mohamed ali",
        "workshop": "SOLIDWORKS",
        "sessionsCount": "5",
        "projectName": "Two Cylinder Engine",
        "ViceName": "Zyad Ahmed",
        "headName": "Ghaida Ali"
    },
    {
        "serialNumber": "6f0294c6c2",
        "name": "Adham Alaa Ali Khaled",
        "workshop": "Back-End Development",
        "sessionsCount": "6",
        "projectName": "Social Media App",
        "ViceName": "Ali Hassan",
        "headName": "Yousef Gilany"
    },
    {
        "serialNumber": "75b2b2eb04",
        "name": "Yousef Khaled",
        "workshop": "Embedded Systems",
        "sessionsCount": "7",
        "projectName": "Smart Air Conditioning System",
        "ViceName": "Zyad Ahmed",
        "headName": "Ziad Shawkat"
    },
    {
        "serialNumber": "75d32a1a0f",
        "name": "adham alaa ali khaled",
        "workshop": "Algorithms",
        "sessionsCount": "6",
        "projectName": "",
        "ViceName": "Ali Hassan",
        "headName": "Omar Nashat"
    },
    {
        "serialNumber": "7d860bcbdg",
        "name": "Nour Aldeen Hassan",
        "workshop": "Back-End Development",
        "sessionsCount": "6",
        "projectName": "Social Media App",
        "ViceName": "Ali Hassan",
        "headName": "Yousef Gilany"
    },
    {
        "serialNumber": "7f2776fc50",
        "name": "Roba gowied",
        "workshop": "SOLIDWORKS",
        "sessionsCount": "5",
        "projectName": "Two Cylinder Engine",
        "ViceName": "Zyad Ahmed",
        "headName": "Ghaida Ali"
    },
    {
        "serialNumber": "81012c1576",
        "name": "Mohamed Hesham Mohamed",
        "workshop": "Digital Electronics",
        "sessionsCount": "7",
        "projectName": "MIPS Processor Project",
        "ViceName": "Zyad Ahmed",
        "headName": "Mahmoud Abdelhalim"
    },
    {
        "serialNumber": "848808d7e3",
        "name": "Mostafa Mohsen",
        "workshop": "Embedded Systems",
        "sessionsCount": "7",
        "projectName": "Smart Air Conditioning System",
        "ViceName": "Zyad Ahmed",
        "headName": "Ziad Shawkat"
    },
    {
        "serialNumber": "875178d369",
        "name": "Ahmed Tarek",
        "workshop": "Algorithms",
        "sessionsCount": "6",
        "projectName": "",
        "ViceName": "Ali Hassan",
        "headName": "Omar Nashat"
    },
    {
        "serialNumber": "8fb72378c5",
        "name": "Hadir Wahid Hamdy",
        "workshop": "Front-End Development",
        "sessionsCount": "6",
        "projectName": "Social Media App",
        "ViceName": "Ali Hassan",
        "headName": "Yousef Gilany"
    },
    {
        "serialNumber": "91c96ed17c",
        "name": "Mostafa Mahmoud Mansour",
        "workshop": "Data Science",
        "sessionsCount": "6",
        "projectName": "Exploratory Data Analysis",
        "ViceName": "Ali Hassan",
        "headName": "Mohammed Nasser"
    },
    {
        "serialNumber": "968f4b3077",
        "name": "Mostafa Mousa",
        "workshop": "Front-End Development",
        "sessionsCount": "6",
        "projectName": "Social Media App",
        "ViceName": "Ali Hassan",
        "headName": "Yousef Gilany"
    },
    {
        "serialNumber": "97892e0g6b",
        "name": "Ahmed Mansour",
        "workshop": "Digital Electronics",
        "sessionsCount": "7",
        "projectName": "MIPS Processor Project",
        "ViceName": "Zyad Ahmed",
        "headName": "Mahmoud Abdelhalim"
    },
    {
        "serialNumber": "9afe5cf899",
        "name": "Hasnaa sayed",
        "workshop": "Arduino",
        "sessionsCount": "5",
        "projectName": "Smart Home Project",
        "ViceName": "Zyad Ahmed",
        "headName": "Mai El-Qassabi"
    },
    {
        "serialNumber": "9b9g1219gc",
        "name": "Menna Khaled",
        "workshop": "Front-End Development",
        "sessionsCount": "6",
        "projectName": "Social Media App",
        "ViceName": "Ali Hassan",
        "headName": "Yousef Gilany"
    },
    {
        "serialNumber": "9bg84ef06a",
        "name": "kareem abdel nabi ahmed",
        "workshop": "Arduino",
        "sessionsCount": "5",
        "projectName": "Smart Home Project",
        "ViceName": "Zyad Ahmed",
        "headName": "Mai El-Qassabi"
    },
    {
        "serialNumber": "9eb5d2c190",
        "name": "Ahmed Essam mohamed",
        "workshop": "SOLIDWORKS",
        "sessionsCount": "5",
        "projectName": "Two Cylinder Engine",
        "ViceName": "Zyad Ahmed",
        "headName": "Ghaida Ali"
    },
    {
        "serialNumber": "a807371c91",
        "name": "John amir yehia",
        "workshop": "Arduino",
        "sessionsCount": "5",
        "projectName": "Smart Home Project",
        "ViceName": "Zyad Ahmed",
        "headName": "Mai El-Qassabi"
    },
    {
        "serialNumber": "a830c6e392",
        "name": "Ahmed hatem",
        "workshop": "SOLIDWORKS",
        "sessionsCount": "5",
        "projectName": "Two Cylinder Engine",
        "ViceName": "Zyad Ahmed",
        "headName": "Ghaida Ali"
    },
    {
        "serialNumber": "ae24a0g735",
        "name": "Marcilino Adel",
        "workshop": "Algorithms",
        "sessionsCount": "6",
        "projectName": "",
        "ViceName": "Ali Hassan",
        "headName": "Omar Nashat"
    },
    {
        "serialNumber": "age82df5g7",
        "name": "Mariam Abdou",
        "workshop": "Algorithms",
        "sessionsCount": "6",
        "projectName": "",
        "ViceName": "Ali Hassan",
        "headName": "Omar Nashat"
    },
    {
        "serialNumber": "b7832680b8",
        "name": "Fatema Ahmed Zaki",
        "workshop": "Algorithms",
        "sessionsCount": "6",
        "projectName": "",
        "ViceName": "Ali Hassan",
        "headName": "Omar Nashat"
    },
    {
        "serialNumber": "b9e6a63061",
        "name": "Abdulrahman Issa",
        "workshop": "Embedded Systems",
        "sessionsCount": "7",
        "projectName": "Smart Air Conditioning System",
        "ViceName": "Zyad Ahmed",
        "headName": "Ziad Shawkat"
    },
    {
        "serialNumber": "bb2394ag5b",
        "name": "Mark Wagdy Wadie",
        "workshop": "Back-End Development",
        "sessionsCount": "6",
        "projectName": "Social Media App",
        "ViceName": "Ali Hassan",
        "headName": "Yousef Gilany"
    },
    {
        "serialNumber": "be795d0gc5",
        "name": "Omar Tarek Kenawy",
        "workshop": "SOLIDWORKS",
        "sessionsCount": "5",
        "projectName": "Two Cylinder Engine",
        "ViceName": "Zyad Ahmed",
        "headName": "Ghaida Ali"
    },
    {
        "serialNumber": "c0905d33ac",
        "name": "ahmed medhat",
        "workshop": "Mobile Application",
        "sessionsCount": "6",
        "projectName": "Universities List",
        "ViceName": "Ali Hassan",
        "headName": "Kareem Sobhi"
    },
    {
        "serialNumber": "c3bb4f0fc2",
        "name": "Mohamed Ahmed Shawky",
        "workshop": "Digital Electronics",
        "sessionsCount": "7",
        "projectName": "MIPS Processor Project",
        "ViceName": "Zyad Ahmed",
        "headName": "Mahmoud Abdelhalim"
    },
    {
        "serialNumber": "c4630afba7",
        "name": "Mohannad Ahmed",
        "workshop": "Back-End Development",
        "sessionsCount": "6",
        "projectName": "Social Media App",
        "ViceName": "Ali Hassan",
        "headName": "Yousef Gilany"
    },
    {
        "serialNumber": "c5g5186878",
        "name": "Nadia ahmed",
        "workshop": "SOLIDWORKS",
        "sessionsCount": "5",
        "projectName": "Two Cylinder Engine",
        "ViceName": "Zyad Ahmed",
        "headName": "Ghaida Ali"
    },
    {
        "serialNumber": "c637f0ac3g",
        "name": "Ahmed Amin abdelazem",
        "workshop": "Digital Electronics",
        "sessionsCount": "7",
        "projectName": "MIPS Processor Project",
        "ViceName": "Zyad Ahmed",
        "headName": "Mahmoud Abdelhalim"
    },
    {
        "serialNumber": "c8aabaf420",
        "name": "Rahma Mohamed Ahmed Nagy",
        "workshop": "Back-End Development",
        "sessionsCount": "6",
        "projectName": "Social Media App",
        "ViceName": "Ali Hassan",
        "headName": "Yousef Gilany"
    },
    {
        "serialNumber": "c8d2862e2f",
        "name": "Omar Mohamed Aboalkomsan Ahmed",
        "workshop": "SOLIDWORKS",
        "sessionsCount": "5",
        "projectName": "Two Cylinder Engine",
        "ViceName": "Zyad Ahmed",
        "headName": "Ghaida Ali"
    },
    {
        "serialNumber": "c8fec9b3ga",
        "name": "sherif ahmed",
        "workshop": "Arduino",
        "sessionsCount": "5",
        "projectName": "Smart Home Project",
        "ViceName": "Zyad Ahmed",
        "headName": "Mai El-Qassabi"
    },
    {
        "serialNumber": "cc178a992f",
        "name": "Christine Elishaa",
        "workshop": "Arduino",
        "sessionsCount": "5",
        "projectName": "Smart Home Project",
        "ViceName": "Zyad Ahmed",
        "headName": "Mai El-Qassabi"
    },
    {
        "serialNumber": "cc362a1960",
        "name": "Mohamed Sherif",
        "workshop": "Data Science",
        "sessionsCount": "6",
        "projectName": "Exploratory Data Analysis",
        "ViceName": "Ali Hassan",
        "headName": "Mohammed Nasser"
    },
    {
        "serialNumber": "d1034d8e04",
        "name": "Eman Ehab Ahmed",
        "workshop": "Mobile Application",
        "sessionsCount": "6",
        "projectName": "Universities List",
        "ViceName": "Ali Hassan",
        "headName": "Kareem Sobhi"
    },
    {
        "serialNumber": "d174e6335g",
        "name": "Salah eldin Hassen",
        "workshop": "Embedded Systems",
        "sessionsCount": "7",
        "projectName": "Smart Air Conditioning System",
        "ViceName": "Zyad Ahmed",
        "headName": "Ziad Shawkat"
    },
    {
        "serialNumber": "d47ag378fe",
        "name": "Sohaila Hassan Mohamed Riad",
        "workshop": "Digital Electronics",
        "sessionsCount": "7",
        "projectName": "MIPS Processor Project",
        "ViceName": "Zyad Ahmed",
        "headName": "Mahmoud Abdelhalim"
    },
    {
        "serialNumber": "e227gb3be6",
        "name": "Mohammed Ali",
        "workshop": "Front-End Development",
        "sessionsCount": "6",
        "projectName": "Social Media App",
        "ViceName": "Ali Hassan",
        "headName": "Yousef Gilany"
    },
    {
        "serialNumber": "e2b631ae5c",
        "name": "Saif Ashraf",
        "workshop": "Front-End Development",
        "sessionsCount": "6",
        "projectName": "Social Media App",
        "ViceName": "Ali Hassan",
        "headName": "Yousef Gilany"
    },
    {
        "serialNumber": "e5f6ce3c8e",
        "name": "Ahmed Mostafa",
        "workshop": "Digital Electronics",
        "sessionsCount": "7",
        "projectName": "MIPS Processor Project",
        "ViceName": "Zyad Ahmed",
        "headName": "Mahmoud Abdelhalim"
    },
    {
        "serialNumber": "f00b5d5bb2",
        "name": "Nadia Moahmed",
        "workshop": "Front-End Development",
        "sessionsCount": "6",
        "projectName": "Social Media App",
        "ViceName": "Ali Hassan",
        "headName": "Yousef Gilany"
    },
    {
        "serialNumber": "f0d8da2bgd",
        "name": "Ali Mohamed Ahmed",
        "workshop": "AutoCAD",
        "sessionsCount": "6",
        "projectName": "Full Schematic Villa Section Plan",
        "ViceName": "Zyad Ahmed",
        "headName": "Moa'az Wagdy"
    },
    {
        "serialNumber": "g3820gfg24",
        "name": "Sherif Mohamed",
        "workshop": "Digital Electronics",
        "sessionsCount": "7",
        "projectName": "MIPS Processor Project",
        "ViceName": "Zyad Ahmed",
        "headName": "Mahmoud Abdelhalim"
    },
    {
        "serialNumber": "g58gb7b208",
        "name": "Abdallah Ibrahim",
        "workshop": "Embedded Systems",
        "sessionsCount": "7",
        "projectName": "Smart Air Conditioning System",
        "ViceName": "Zyad Ahmed",
        "headName": "Ziad Shawkat"
    },
    {
        "serialNumber": "g70855a719",
        "name": "Seif Megahed",
        "workshop": "Digital Electronics",
        "sessionsCount": "7",
        "projectName": "MIPS Processor Project",
        "ViceName": "Zyad Ahmed",
        "headName": "Mahmoud Abdelhalim"
    }
]

// sort DATA by workshop
// const sortedData = data.sort((a, b) => { return a.workshop.localeCompare(b.workshop) });
// console.log(sortedData);

  function parseSerial() {
    console.log("read csv file");
    var files = document.querySelector("#file").files;

    if (files.length > 0) {
      // Selected file
      var file = files[0];

      // FileReader Object
      var reader = new FileReader();

      // Read file as string
      reader.readAsText(file);

      // Load event
      reader.onload = function (event) {
        // Read file data
        var csvdata = event.target.result;

        // Split by line break to gets rows Array
        var rowData = csvdata.split("\n");



        const objects = [];

        // Loop on the row Array (change row=0 if you also want to read 1st row)
        for (var row = 0; row < rowData.length; row++) {
          const parts = rowData[row].split("-");
          const object = {
            serialNumber: parts[0],
            name: parts[1],
            workshop: parts[2],
          };
          objects.push(object);
        }
        setData(objects);
        console.log(objects);
      };
    } else {
      alert("Please select a file.");
    }
}

function mergeData(){
    const mergedData = [];
    for (var i = 0; i < DATA.length; i++) {
        for (var j = 0; j < DATA.length; j++) {
            const dataNameparts = DATA[i].name.trim().split(" ");
            const certificateNameparts = certificatesData[j].name.trim().split(" ");

            if(dataNameparts[0] === certificateNameparts[0] && dataNameparts[1] === certificateNameparts[1] ){
                // console.log(DATA[i].name[0])
                const object = {
                    serialNumber: DATA[i].serialNumber,
                    name: DATA[i].name,
                    ...certificatesData[j],
                  };
                  mergedData.push(object);

                  break;
            };
        }

     
      }
      console.log("mergedData",mergedData);
      setData(mergedData);
}


  const handleAddingCertificate = () => {
    console.log("in handleAddingCertificate");
    const certificate = {
      name: name,
      workshop: workshop,
      sessionsCount: sessionsCount,
      projectName: projectName,
      headName: headName,
      viceName: viceName,
    };

    addCertificate(certificate).then((res) => {
        console.log(res);

    }).catch((err) => {
        console.log(err);
    });

    setCertificatesData([...certificatesData, certificate]);
    setIsSuccess(true);
  }

  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setIsSuccess(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [isSuccess]);

    function generateQR (serialNumber){

    return new Promise(resolve => {
        const picture = jsxToPng(<QRCode
            size={256}
            style={{ height: "550px", width: "550px" }}
            value={`https://www.energia-powered.com/verify/${serialNumber}`}
          />, { height: 80, width: 80 })
      
        setTimeout(() => {
          resolve(picture);
        }, 3000);
    })


     
  }

  function readCSVFile() {
    console.log("read csv file");
    var files = document.querySelector("#file").files;

    if (files.length > 0) {
      // Selected file
      var file = files[0];

      // FileReader Object
      var reader = new FileReader();

      // Read file as string
      reader.readAsText(file);

      // Load event
      reader.onload = function (event) {
        // Read file data
        var csvdata = event.target.result;

        // Split by line break to gets rows Array
        var rowData = csvdata.split("\n");

        const objects = [];

        // Loop on the row Array (change row=0 if you also want to read 1st row)
        for (var row = 0; row < rowData.length; row++) {
          const parts = rowData[row].split(",");
          const object = {
            name: parts[0].trim(),
            workshop: parts[1].trim(),
            sessionsCount: parts[2].trim(),
            projectName: parts[3].trim(),
            ViceName: parts[4].trim(),
            headName: parts[5].trim(),
          };
          objects.push(object);
        }
        setCertificatesData(objects);
        console.log(objects);
        // mergeData();

      };
    } else {
      alert("Please select a file.");
    }
  }

  async function generateAll() {

    certificatesData.forEach(async (item) => {
      await generateCertificate(
        item.name,
        item.workshop,
        item.sessionsCount,
        item.projectName,
        item.ViceName,
        item.headName
      );
        
    });
  }

   function generateSerial() {

    return new Promise(resolve => {
        var chars = "1234567890abcdefg",
      serialLength = 10;

    let randomSerial = "";

    let i, randomNumber;

    for (i = 0; i < serialLength; i = i + 1) {
      randomNumber = Math.floor(Math.random() * chars.length);

      randomSerial += chars.substring(randomNumber, randomNumber + 1);
    }
        setTimeout(() => {
          resolve(randomSerial);
        }, 3000);
    })
    
  }

  async function generateCertificate(
    name,
    course,
    sessionsCount,
    projectName,
    ViceName,
    headName
  ) {

    return new Promise(resolve => {
        setTimeout(async () => {
            const serialNumber = await generateSerial();
            const qr = await generateQR(serialNumber);
            const doc = new jsPDF("landscape");
        
            // Add background color
            doc.setFillColor("#2c3e50");
            doc.rect(0, 0, 297, 210, "F");
            
            // Add signature
            if(course === "Algorithms"){
                doc.addImage(algoPic, "PNG", 0, 0, 297, 210);
            }
            else{
            doc.addImage(pic, "PNG", 0, 0, 297, 210);}
        
            doc.addImage(qr,  245, 120, 0, 0);
        
        
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
            console.log(doc.getFontList());
        
            console.log("Donne");
        
        
            setIsSuccess(true);
            resolve("DONE");
          }, 3000);

    });
  
  }

  return (
    <div
    className="site-layout page-component"
    style={{ padding: "0 50px", marginTop: "190px" }}
  >
      <section className="p-5 bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-4xl font-bold text-gray-900 dark:text-white"
          >
            Generate Certificate
          </a>
          <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          
          
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Add certificate data
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Participant Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Yousef Gilany"
                    required={true}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="sessionCount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Sessions Count
                  </label>
                  <input
                    type="number"
                    name="sessionCount"
                    id="sessionCount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="count"
                    required={true}
                    value={sessionsCount}
                    onChange={(e) => setSessionsCount(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="workshop"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Workshop
                  </label>
                  <input
                    type="text"
                    name="workshop"
                    id="workshop"
                    placeholder="Computer"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required={true}
                    value={workshop}
                    onChange={(e) => setWorkshop(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="viceName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Vice President Name
                  </label>
                  <input
                    type="text"
                    name="viceName"
                    id="viceName"
                    placeholder="Vice Name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required={true}
                    value={viceName}
                    onChange={(e) => setViceName(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="headName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Head Name
                  </label>
                  <input
                    type="text"
                    name="headName"
                    id="headName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Head Name"
                    required={true}
                    value={headName}
                    onChange={(e) => setHeadName(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="projectName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Project Name
                  </label>
                  <input
                    type="text"
                    name="projectName"
                    id="projectName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Project Name"
                    required={true}
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>

                <button
                  onClick={() =>
                  {
                    generateCertificate(
                      name,
                      workshop,
                      sessionsCount,
                      projectName,
                      viceName,
                      headName
                    )
                  }
                   
                  }
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Generate
                </button>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Or Upload CSV File
                </h1>

                <input
                  type="file"
                  name="file"
                  id="file"
                  accept=".csv"
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                />

                <button
                  onClick={ () => {
                    readCSVFile();
                     generateAll();
                    //  parseSerial();
                  }}
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Generate all certificates
                </button>
              </form>
            </div>
          </div>
          {isSuccess ? (
            <div
              className="flex p-3 mt-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 inline w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">
                  Certificate has been generated successfully.
                </span>
              </div>
            </div>
          ) : null}
          {isFailed ? (
            <div
              className="flex p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 inline w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">
                  Error generating the certificate.
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

export default CertificateGenerator;
