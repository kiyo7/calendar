import Navigation from "./presentation";

import { asyncSchedulesFetchItem } from "../../redux/schedules/effects";
import { connect } from "react-redux";

import {
  getNextMonth,
  getPreviousMonth,
  getMonth,
  formatMonth,
} from "../../services/calendar";
import { calendarSetMonth } from "../../redux/calendar/actions";

const mapStateToProps = (state) => ({ calendar: state.calendar });

const mapDispatchToProps = (dispatch) => ({
  setMonth: (month) => {
    dispatch(calendarSetMonth(month));
  },
  fetchItem: (month) => {
    dispatch(asyncSchedulesFetchItem(month));
  },
});

const mergeProps = (stateProps, dispatchProps) => ({
  month: getMonth(stateProps.calendar),
  setNextMonth: () => {
    const nextMonth = getNextMonth(stateProps.calendar);
    dispatchProps.setMonth(nextMonth);
    dispatchProps.fetchItem(nextMonth);
  },
  setPreviousMonth: () => {
    const previousMonth = getPreviousMonth(stateProps.calendar);
    dispatchProps.setMonth(previousMonth);
    dispatchProps.fetchItem(previousMonth);
  },

  setMonth: (dayObj) => {
    const month = formatMonth(dayObj);
    dispatchProps.setMonth(month);
    dispatchProps.fetchItem(month);
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Navigation); //関数をリターンする関数

//mapDisapatchToPropsは connect の第二引数の関数で、dispatch を使う props として渡す関数を定義するためのものです。mapDisapatchToPropsがないと dispatch することができないのでとても重要です。
