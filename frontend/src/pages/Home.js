import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState('')

  useEffect(() => {
    getTestData();
  }, [])

  const getTestData = async () => {
    const response = await axios({
      method: 'GET',
      url: '/api/v1/users',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application.json' }
    });
    console.log(response)
  }

  return (
    <div>

      <h1>this is home page</h1>
    </div>
  );
}

export default Home;