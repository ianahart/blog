import axios from 'axios';

const apiRequest = async (url, data, method, errorHandler=null) => {
  try {
    const noData = ['get', 'delete']
    const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    const request = noData.includes(method.toLowerCase()) ? { method, url, headers } : { method, url, headers, data }

    const response = await axios(request);
    return response
  } catch(e) {
    if (e) {
      if (!e.response) {
        return;
      }
      const { data, status } = e.response
      if (errorHandler) {
        errorHandler({ data, status });
      }
    }
  }
}
export default apiRequest;