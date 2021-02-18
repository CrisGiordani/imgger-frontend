import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";

import api from "../../../services/api";

import { updateUserSuccess } from "./actions";

export function* updateUser({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;
    const user = Object.assign({ name, email }, rest.password ? rest : {});
    const response = yield call(api.put, "users", user);
    toast("Perfil atualizado com sucesso!", {
      className: ".imgger-toast imgger-toast-success",
      bodyClassName: "imgger-toast-success-body",
      progressClassName: "imgger-toast-success-bar",
    });
    yield put(updateUserSuccess(response.data));
  } catch (error) {
    toast(error.response.data.error, {
      className: ".imgger-toast imgger-toast-alert",
      bodyClassName: "imgger-toast-alert-body",
      progressClassName: "imgger-toast-alert-bar",
    });
  }
}

export default all([takeLatest("@user/UPDATE_USER_REQUEST", updateUser)]);
