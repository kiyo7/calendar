import {
  ADD_SCHEDULE_SET_VALUE,
  ADD_SCHEDULE_CLOSE_DIALOG,
  ADD_SCHEDULE_OPEN_DIALOG,
  ADD_SCHEDULE_START_EDIT,
} from "./actions";

import dayjs from "dayjs";

const init = {
  form: {
    title: "",
    description: "",
    date: dayjs(),
    location: "",
  },
  isDialogOpen: false,
  isStartEdit: false,
};

//第1引数のstateは現在のstate、なかった場合の初期値(init)を入れている
//第2引数のactionは次の変更されるstate
const addScheduleReducer = (state = init, action) => {
  const { type, payload } = action;
  // console.log(payload);
  switch (type) {
    case ADD_SCHEDULE_SET_VALUE:
      return { ...state, form: { ...state.form, ...payload } }; //現状の state の中に新しいformを追加しつつformの中でも現在のformに対して新しいデータを展開して追加
    case ADD_SCHEDULE_OPEN_DIALOG:
      return { ...state, isDialogOpen: true };
    case ADD_SCHEDULE_CLOSE_DIALOG:
      return init;
    case ADD_SCHEDULE_START_EDIT:
      return { ...state, isStartEdit: true };
    default:
      return state;
  }
};

export default addScheduleReducer;
