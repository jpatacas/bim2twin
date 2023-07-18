import { FC, useState } from "react";
import { Navigate } from "react-router-dom";
import { Box, Button, Card, CardContent, TextField, Tab, Tabs } from "@mui/material";
import { useAppContext } from "../../middleware/context-provider";
import "./user-styles.css";
import { NavBar } from "../navbar/navbar";

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
    <>
    <NavBar open={false} onOpen={() => {}} width={100} />
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
    </>
  );
};
