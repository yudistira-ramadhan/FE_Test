"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import LoadingButton from "@mui/lab/LoadingButton";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function SignInCard() {
  const router = useRouter();
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const validateInputs = async () => {
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    let isValid = true;

    if (!username.value || username.value.length < 6) {
      setUsernameError(true);
      setUsernameErrorMessage("Please enter a valid username");
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const handleLogin = async () => {
    setIsLoading(true);
    const valid = await validateInputs();

    if (valid) {
      axios
        .post("http://localhost:8080/api/auth/login", {
          username: username,
          password: password,
        })
        .then(function (response) {
          response.data.status
            ? localStorage.setItem("isLoggedIn", response.data.is_logged_in)
            : localStorage.setItem("isLoggedIn", 0);
          router.push("/dashboard");
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          setIsLoading(false);
        });
    } else setIsLoading(false);
  };

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: "flex", md: "none" } }}></Box>
      <img src="image/jasamargalogo.png"></img>
      <Box
        component="form"
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          gap: 2,
        }}
      >
        <FormControl>
          <FormLabel htmlFor="username">Username</FormLabel>
          <TextField
            error={usernameError}
            helperText={usernameErrorMessage}
            id="username"
            type="text"
            name="username"
            placeholder="Super Admin"
            autoComplete="username"
            autoFocus
            required
            fullWidth
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
            color={usernameError ? "error" : "primary"}
            sx={{ ariaLabel: "username" }}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormLabel htmlFor="password">Password</FormLabel>
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            color={passwordError ? "error" : "primary"}
          />
        </FormControl>
        {isLoading ? (
          <LoadingButton loading variant="outlined">
            Submit
          </LoadingButton>
        ) : (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleLogin}
          >
            Login
          </Button>
        )}
      </Box>
    </Card>
  );
}
