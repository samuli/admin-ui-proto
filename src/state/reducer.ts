import { State, initialViewState } from "./state";
import { ViewSummary, ViewGeneral } from "../types";

export type Action =
  | { type: "CHANGE_VIEW"; payload: null }
  | { type: "SET_VIEWS"; payload: ViewSummary[] }
  | { type: "SET_GENERAL"; payload: ViewGeneral }
  | { type: "UPDATE_GENERAL"; payload: ViewGeneral }
  ;
 
export const reducer = (state: State, action: Action): State => {
  const { view } = state;
  const { general } = view;

  switch (action.type) {
    case "CHANGE_VIEW":
      return {
        ...state, view: initialViewState
      };
    case "SET_VIEWS":
      return {
        ...state,
        views: action.payload
      };
    case "SET_GENERAL":
      return {
        ...state,
        view: {...view, general: action.payload }
      };
    case "UPDATE_GENERAL":
      if (!general) {
        return state;
      }
      return {
        ...state,
        view: {...view, general: {...general, ...action.payload } },
        views: state.views.map(v => v.id === general.id ? {...v, ...action.payload} : v)
      };
    default:
      return state;
  }
};
