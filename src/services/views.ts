import { ViewGeneral, ViewSummary } from "../types";
import { Action } from "../state/reducer";

export const changeView = (): Action => {
  return { type: "CHANGE_VIEW", payload: null };
};

export const setViews = (payload: Array<ViewSummary>): Action => {
  return { type: "SET_VIEWS", payload: payload };
};

export const setGeneral = (payload: ViewGeneral): Action => {
  return { type: "SET_GENERAL", payload: payload };
};

export const updateGeneral = (payload: ViewGeneral): Action => {
  return { type: "UPDATE_GENERAL", payload: payload };
};
