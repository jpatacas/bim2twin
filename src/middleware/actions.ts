export type ActionType = "LOGIN" | "LOGOUT" | "START_MAP" | "REMOVE_MAP" | "UPDATE_USER";

export interface Action {
    type: ActionType;
    payload?: any;
}