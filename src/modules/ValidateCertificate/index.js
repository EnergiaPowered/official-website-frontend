import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import { getCertificateData } from './services/verify.services';
import { Navigate } from "react-router-dom";
import Response from './components/response';





const VerifyCertificate = () => {
    const { serial } = useParams(); // extract the code parameter from the URL using useParams
    const [serialNumber, setSerial] = useState(serial);
const [ isValidate, setIsValidate ] = useState(false);
const [ isNotFound, setIsNotFound ] = useState(false);
const [ certificateData, setCertificatesData ] = useState({});

    const handleVerify = () => {
        getCertificateData(serialNumber).then(res => {

            if(res.certificate.length > 0){
                setCertificatesData(res.certificate[0]);
                setIsValidate(true);
            }else{
                setIsNotFound(true);  
}   
                
    })

}
   

  return (
    <section className="py-12 dark:bg-transparent">
  { isNotFound == false && isValidate == false ? <div className="flex flex-col py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 className="mb-4 text-6xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Verify a Certificate</h2>
      <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Need to verify a certificate? Enter the serial number shown at the lower right side of the certificate.</p>
      <form action="#" className="space-y-8">
          <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Serial Number</label>
              <input onChange={(e) => setSerial(e.target.value)} type="text" id="serial" value={serialNumber} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="123456789" required />
          </div>
      
          <button onClick={handleVerify} className="mx-auto py-3 px-5 text-sm font-medium text-center text-white rounded-lg sm:w-fit hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-800 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Verify</button>
      </form>
  </div> : <Response found={isValidate} certificateData={certificateData} />}
</section>
  )
}

export default VerifyCertificate