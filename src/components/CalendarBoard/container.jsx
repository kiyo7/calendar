import { connect } from "react-redux";

import CalendarBoard from "./presentation";
import { createCalendar } from "../../services/calendar";
import {
  addScheduleOpenDialog,
  addScheduleSetValue,
} from "../../redux/addSchedule/actions";
import {
  currentScheduleSetItem,
  currentScheduleOpenDialog,
} from "../../redux/currentSchedule/actions";
import { asyncSchedulesFetchItem } from "../../redux/schedules/effects";

import { setSchedules } from "../../services/schedule";

const mapStateToProps = (state) => ({
  calendar: state.calendar,
  schedules: state.schedules,
});
const mapDispatchToProps = (dispatch) => ({
  openAddScheduleDialog: (d) => {
    dispatch(addScheduleOpenDialog());
    dispatch(addScheduleSetValue({ date: d }));
  },
  openCurrentScheduleDialog: (schedule, e) => {
    // 他のイベントが発火するのをキャンセル
    e.stopPropagation();

    dispatch(currentScheduleSetItem(schedule));
    dispatch(currentScheduleOpenDialog());
  },
  fetchSchedule: (month) => {
    dispatch(asyncSchedulesFetchItem(month));
  },
});

const mergeProps = (stateProps, dispatchProps) => {
  const {
    calendar: month,
    schedules: { items: schedules },
  } = stateProps;

  const calendar = setSchedules(createCalendar(month), schedules);

  return {
    ...stateProps,
    ...dispatchProps,
    fetchSchedule: () => dispatchProps.fetchSchedule(month),
    calendar,
    month,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(CalendarBoard);
