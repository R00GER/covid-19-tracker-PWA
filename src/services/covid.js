import axios from "axios";

const url = "https://api.covid19api.com/total/country/finland";

const getCases = () => {
  const request = axios.get(url);
  return request.then((response) => response.data);
};

export default { getCases };
