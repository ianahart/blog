import axios from 'axios';

const apiRequest = async (url, data, method, headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' }, errorHandler) => {
  try {
    const response = await axios({ method, url, headers, data,  });
    return response
  } catch(e) {
    if (e) {
      console.log('services/apiRequest.js: Error')
      console.log(e);
      console.log(e.response)
      const { data, status } = e.response
      errorHandler({ data, status });
    }
  }
}
export default apiRequest;