import axios from "axios";
import configs from "globals/config";

export const getCertificateData = (serial) =>
  axios
    .get(`${configs.API_BASE_URL}verify-certificate/${serial}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
