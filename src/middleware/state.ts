import {User} from "firebase/auth"

export interface State {
    user: User | null;
}

export const initialState: State = {
    user: null
}