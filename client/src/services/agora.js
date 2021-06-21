import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/rtctoken';

const createToken = async (channel, isPublisher = true) => {
  const body = {
    channel,
    isPublisher,
  };
  const response = await axios.post(baseUrl, body);
  return response.data;
};

const services = { createToken };
export default services;
