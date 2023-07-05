import {FC} from "react"; //to define a component
import {getApp} from "firebase/app"

export const LoginForm: FC = () => {
    return <h1>{JSON.stringify(getApp())}</h1>
} //FC type - functional component