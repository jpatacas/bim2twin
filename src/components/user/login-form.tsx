// import { FC } from "react"; //to define a component
// import { Navigate } from "react-router-dom";
// import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
// import { useAppContext } from "../../middleware/context-provider";
// import "./user-styles.css";
// //import {getApp} from "firebase/app"

// export const LoginForm: FC = () => {
//   const [state, dispatch] = useAppContext();

//   const onLogin = () => {
//    // console.log("Logging in!");
//     dispatch({type: "LOGIN"});

//   };

//   if (state.user) {
//     return <Navigate to="/map"/>
//   }

//   return (

//     <Card sx={{ maxWidth: 400, margin: "0 auto", marginTop: 30 }}>
//     <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//       <img className="landing-logo" alt="ifcjs logo" src="ifcjs-logo.png" />

//       <Typography variant="h5" component="h1" align="center" gutterBottom>
//         Login
//       </Typography>

//       <TextField
//         label="Email"
//         type="email"
//         variant="outlined"
//         margin="normal"
//         fullWidth
//         // Add necessary props and event handlers for email input
//       />

//       <TextField
//         label="Password"
//         type="password"
//         variant="outlined"
//         margin="normal"
//         fullWidth
//         // Add necessary props and event handlers for password input
//       />

//       <Button variant="contained" color="primary" onClick={onLogin} fullWidth>
//         Login
//       </Button>
//     </CardContent>
//   </Card>

//   );
// }; //FC type - functional component

import { FC, useState } from "react";
import { Navigate } from "react-router-dom";
import { Box, Button, Card, CardContent, TextField, Typography, Tab, Tabs } from "@mui/material";
import { useAppContext } from "../../middleware/context-provider";
import "./user-styles.css";

export const LoginForm: FC = () => {
  const [state, dispatch] = useAppContext();
  const [activeTab, setActiveTab] = useState(0);

  const onLogin = () => {
    dispatch({ type: "LOGIN" });
  };

  const onSignUp = () => {
   // dispatch({ type: "SIGNUP" });
   console.log("Sign up")
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (state.user) {
    return <Navigate to="/map" />;
  }

  return (
    <Card sx={{ maxWidth: 400, margin: "0 auto", marginTop: 20 }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1>BIM2TWIN</h1>
        <img className="landing-logo" alt="ifcjs logo" src="ifcjs-logo.png" />

        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>

        {activeTab === 0 && (
          <>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              fullWidth
              // Add necessary props and event handlers for email input
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              // Add necessary props and event handlers for password input
            />
            <Box sx={{ width: "100%", marginTop: 2}}>
            <Button variant="contained" color="primary" onClick={onLogin} fullWidth>
              Login
            </Button>
            </Box>

            <Box sx={{ width: "100%", marginTop: 2}}>
            <Button variant="contained" color="secondary" onClick={onLogin} fullWidth>
              Login with Google
            </Button>
            </Box>
          </>
        )}

        {activeTab === 1 && (
          <>
            {/* Add sign-up form fields and button */}
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              fullWidth
              // Add necessary props and event handlers for email input
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              // Add necessary props and event handlers for password input
            />
            <Box sx={{ width: "100%", marginTop: 2}}>
            <Button variant="contained" color="primary" onClick={onSignUp} fullWidth>
              Sign Up
            </Button>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};
