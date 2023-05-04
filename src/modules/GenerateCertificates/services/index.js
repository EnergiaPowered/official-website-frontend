import axios from "axios";
import configs from "globals/config";

const addCertificate = ({ name, workshop,head,vice,project,sessions }) => {
    console.log("in serviceess")
  return axios
    .post(`${configs.API_BASE_URL}participant-certificate`, {
      name,
        workshop,
        head,
        vice,
        project,
        sessions,
    })
    .then((response) => {
        console.log(response.data);
      
      return response.data;
    });
};


export default addCertificate;
