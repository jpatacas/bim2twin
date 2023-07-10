import {
  FC,
  PropsWithChildren,
  useReducer,
  createContext,
  useContext,
} from "react";
import { reducer } from "./state-handler";
import { initialState, State } from "./state";
import { Action, ActionList } from "./actions";
import { executeCore } from "./core-handler";
import { Authenticator } from "./authenticator";
import { Events } from "./event-handler";

const appContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => {},
]);

export const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useReducer(reducer, initialState);

  const dispatch = (value: Action) => {
    setState(value);
    executeCore(value, events);
  };

  const events = new Events();
  for (const type of ActionList) {
    events.on(type, (payload: any) => {
      setState({ type, payload });
    });
  }
  return (
    <appContext.Provider value={[state, dispatch]}>
      <Authenticator />
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(appContext);
};
