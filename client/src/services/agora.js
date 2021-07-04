import axios from 'axios';
const baseUrl = '/api/rtctoken';

const fetchAgoraToken = async (channel, uid, isPublisher = true) => {
  const body = {
    channel,
    uid,
    isPublisher,
  };
  const response = await axios.post(baseUrl, body);
  return response.data;
};

const services = { fetchAgoraToken };
export default services;
