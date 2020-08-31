import axios from 'axios';

export const TOKEN_KEY = "fake@token";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const api = axios.create({
    baseURL: "http://localhost:8888"
  });
