export const ActionList = ["LOGIN",
"LOGOUT",
"START_MAP",
"REMOVE_MAP",
"UPDATE_USER",
"ADD_BUILDING",
"OPEN_BUILDING",
"CLOSE_BUILDING",
"UPDATE_BUILDING",
"DELETE_BUILDING",
"UPLOAD_MODEL",
"DELETE_MODEL",
"START_BUILDING",
"CLOSE_BUILDING",
"EXPLODE_MODEL",
"TOGGLE_CLIPPER",
"TOGGLE_DIMENSIONS",
"TOGGLE_FLOORPLAN",
] as const;

export type ActionType = typeof ActionList[number]

export interface Action {
  type: ActionType;
  payload?: any;
}
