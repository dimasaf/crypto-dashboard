import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { theme as customTheme } from "./theme";
import ColorModeContext from "./components/ColorModeContext";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const [mode, setMode] = useState("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        window.localStorage.setItem(
          "themeMode",
          mode !== "dark" ? "light" : "dark"
        );
        setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
      },
    }),
    [mode]
  );

  useEffect(() => {
    try {
      const localTheme = window.localStorage.getItem("themeMode");
      localTheme ? setMode(localTheme) : setMode("dark");
    } catch {
      setMode("dark");
    }
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={customTheme[mode]}>
        <CssBaseline />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
