import { AxiosResponse } from "axios/index";
import { instance, ResponseType } from "common/api/common.api";
import { UserType } from "features/TodolistsList/todolists.api.types";

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<
      ResponseType<{ id: number }>,
      AxiosResponse<ResponseType<{ id: number }>>,
      LoginParamsType
    >(`auth/login`, data);
  },
  logout() {
    return instance.delete<ResponseType>(`auth/login`);
  },
  me() {
    return instance.get<ResponseType<UserType>>(`auth/me`);
  },
};

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};
