import axios from 'axios';

const BASE_URL = 'http://192.168.1.34:3000';

export const registerRequest = async (name: any, email: any, password: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      name,
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


export const editUserNameRequest = async (id : any, name : any) => {
  try {
    const response = await axios.put(`${BASE_URL}/auth/editName`, { id, name });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editUserPasswordRequest = async (id : any, password : any) => {
  try {
    const response = await axios.put(`${BASE_URL}/auth/editPassword`, { id, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const newPostRequest = async (user: any, subject: any, content: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/post/newPost`, {
      user,
      subject,
      content
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllPostsRequest = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/post/getAllPosts`, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPostsByUserIdRequest = async (id : any) => {
  try {
    const response = await axios.get(`${BASE_URL}/post/getPostsByUserId/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editPostRequest = async (id : any, subject : any, content : any) => {
  try {
    const response = await axios.put(`${BASE_URL}/post/editPost`, { id, subject, content });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePostRequest = async (id : any) => {
  try {
    const response = await axios.put(`${BASE_URL}/post/deletePost`, { id });
    return response.data;
  } catch (error) {
    throw error;
  }
};