"use client";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import SignInCard from "./SignInCard";

export default function SignInSide() {
  return (
    <>
      <CssBaseline />
      <Stack
        direction="row"
        component="main"
        sx={[
          {
            height: "100vh"
          },
        ]}
      >
        <Stack
          direction="column"
          sx={{
            justifyContent: "center",
            width: "100%",
          }}
        >
          <SignInCard />
        </Stack>
        <Stack
          direction="column"
          sx={{
            width: "100%",
            height: "100%",
            backgroundImage: "url(image/jasamargabackground.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        >
        </Stack>
      </Stack>
    </>
  );
}
