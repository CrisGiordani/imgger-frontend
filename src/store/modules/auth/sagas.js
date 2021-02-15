import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";

import api from "../../../services/api";

import { signInSuccess, signFailure } from "./actions";

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, "auth/login", {
      email,
      password,
    });

    const { token, user } = response.data;
    api.defaults.headers.Authorization = `Bearer ${token}`;
    yield put(signInSuccess(token, user));

  } catch (error) {
    toast(error.response.data.error, {
      className: ".imgger-toast imgger-toast-alert",
      bodyClassName: "imgger-toast-alert-body",
      progressClassName: "imgger-toast-alert-bar",
    });
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;
    yield call(api.post, "users", {
      name,
      email,
      password,
    });
  } catch (error) {
    toast.error(error.response.data.error, {
      className: ".imgger-toast imgger-toast-alert",
      bodyClassName: "imgger-toast-alert-body",
      progressClassName: "imgger-toast-alert-bar",
    });
    yield put(signFailure());
  }
}
export function setToken({ payload }) {
  if (!payload) {
    return;
  }

  const { token } = payload.auth;
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest("persist/REHYDRATE", setToken),
  takeLatest("@auth/SIGN_IN_REQUEST", signIn),
  takeLatest("@auth/SIGN_UP_REQUEST", signUp),
]);
