import dayjs from "dayjs";

import { CALENDAR_SET_MONTH } from "./actions";

import { formatMonth } from "../../services/calendar";

const day = dayjs();

const init = formatMonth(day);

// day.month()は月情報のインデックス番号を返します。すなわち0 ~ 11の数字です。そこで表示のためにこのように補正しています。

const calendarReducer = (state = init, action) => {
  const { type, payload } = action;

  switch (type) {
    case CALENDAR_SET_MONTH:
      return payload;
    default:
      return state;
  }
};

export default calendarReducer;
//reducerはglobalstateの値を決めるもの *イメージ
