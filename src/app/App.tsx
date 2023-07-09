import React, { useCallback, useEffect } from "react";
import "./App.css";
import LinearProgress from "@mui/material/LinearProgress";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/icons-material/Menu";
import { TodolistsList } from "features/TodolistsList/TodolistsList";
import { ErrorSnackBar } from "common/components/ErrorSnackBar/ErrorSnackBar";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "features/auth/Login";
import CircularProgress from "@mui/material/CircularProgress";
import { authThunks } from "features/auth/auth.slice";
import { useSelector } from "react-redux";
import { selectAppStatus, selectIsInitialized } from "app/app.selectors";
import { selectIsLoggedIn } from "features/auth/auth.selectors";
import { useActions } from "common/hooks/useActions";

export function App() {
  const status = useSelector(selectAppStatus);
  const isInitialized = useSelector(selectIsInitialized);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { initializeApp, logout } = useActions(authThunks);

  useEffect(() => {
    initializeApp();
  }, []);

  const logoutHandler = useCallback(() => {
    logout();
  }, []);

  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      <ErrorSnackBar />
      <AppBar position="static" enableColorOnDark>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            TO-DO LISTS
          </Typography>
          {isLoggedIn && (
            <Button color="inherit" variant="outlined" onClick={logoutHandler}>
              Log out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {status === "loading" && <LinearProgress color="secondary" />}
      <Container fixed>
        <Routes>
          <Route path="/" element={<TodolistsList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
          <Route path="*" element={<Navigate to={"/404"} />} />
        </Routes>
      </Container>
    </div>
  );
}
