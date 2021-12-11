import axios from 'axios';

const apiRequest = async (url, data, method, headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' }) => {
  try {
    const response = await axios({
      method,
      url,
      headers,
      data,
    });
    console.log(response);
  } catch(e) {
    console.log(e);
    // console.log(e.response);
  }
}
export default apiRequest;