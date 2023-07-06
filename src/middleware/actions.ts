export type ActionType = "LOGIN" | "LOGOUT" |"UPDATE_USER";

export interface Action {
    type: ActionType;
    payload?: any;
}