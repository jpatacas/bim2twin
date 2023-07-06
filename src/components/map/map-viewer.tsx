import {FC, useRef, useEffect} from "react"; //to define a component
import { useAppContext } from "../../middleware/context-provider";
import { Navigate } from "react-router-dom";
import { Button } from "@mui/material";

export const MapViewer: FC = () => {

    const [state, dispatch] = useAppContext()
    const canvasRef = useRef(null) //canvas where mapbox scene will be rendered

    //when component starts
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas && state.user) {
            dispatch({type: "START_MAP", payload: canvas})
        }

        //called when component is destroyed
        return () => {
            dispatch({type: "REMOVE_MAP"})
        }
    }, [])

    if (!state.user) {
        return <Navigate to= "/login" />
    }

    const onLogout = () => {
        dispatch ({type: "LOGOUT"})
    }

    return (
        <>
            <Button onClick={onLogout}>Log out</Button>
            <div className= "full-screen" ref= {canvasRef}/>
        </>
        )
} //FC type - functional component