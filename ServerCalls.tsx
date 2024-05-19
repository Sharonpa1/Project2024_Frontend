import axios from 'axios';

const BASE_URL = 'http://192.168.1.34:3000';

export const registerRequest = async (name: any, email: any, password: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      //name,
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginRequest = async (email: any, password: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
