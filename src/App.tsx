import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { BuildingViewer } from "./components/building/building-viewer";
import { MapViewer } from "./components/map/map-viewer";
import { LoginForm } from "./components/user/login-form";
import { ContextProvider } from "./middleware/context-provider";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: '#3975FF'
    },
    secondary: {
      main: '#352276'
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/building" element={<BuildingViewer />} />
          <Route path="/map" element={<MapViewer />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </Router>
    </ContextProvider>
    </ThemeProvider>
  );
}

export default App;
