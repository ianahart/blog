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
    <h1>This is the homepage</h1>
  );
}

export default Home;