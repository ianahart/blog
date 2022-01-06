import axios from 'axios';

const apiRequest = async (url, data, method, errorHandler=null, headers=null) => {
  try {
    const noData = ['get', 'delete']

    if (!headers) {
      headers =  { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    }

    const request = noData.includes(method.toLowerCase()) ? { method, url, headers } : { method, url, headers, data }

    const response = await axios(request);
    return response
  } catch(e) {
    if (e) {
      if (!e.response) {
        return;
      }
      console.log(e.response)
      const { data, status } = e.response
      if (errorHandler) {
        errorHandler({ data, status });
      }
    }
  }
}
export default apiRequest;