import { Building } from './../types';
import {User} from "firebase/auth"

export interface State {
    user: User | null;
    building : Building | null;
}

export const initialState: State = {
    user: null,
    building: null
}