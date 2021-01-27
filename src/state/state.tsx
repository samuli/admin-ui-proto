import React, { createContext, useContext, useReducer } from "react";
import { Language, View, ViewSummary } from "../types";

import { Action } from "./reducer";

export type State = {
  view: View;
  views: ViewSummary[];
  allLanguages: Language[];
  organisationViews: Array<{ id: number; name: string}>;
};

export const initialViewState = {
  general: undefined,
  facets: undefined
};

const initialState: State = {
  views: [],
  view: initialViewState,
  allLanguages: [Language.FI, Language.SV, Language.EN],
  organisationViews: [{id: 1, name: "view-1"}, {id: 120, "name": "view-120"}]
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
