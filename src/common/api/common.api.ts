import axios from "axios";

export const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.1/`,
  withCredentials: true,
  headers: {
    "API-KEY": "aaa80c55-0a44-44bc-9139-4b0b82a58976",
  },
});

export type ResponseType<T = {}> = {
  fieldsErrors: string[];
  messages: string[];
  resultCode: number;
  data: T;
};
