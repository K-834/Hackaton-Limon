"use client";
import Link from "next/link";
import { Grid, Box, Card, Stack, Typography, Button } from "@mui/material";
// components
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logologin from "@/app/(DashboardLayout)/layout/shared/logo/Logo-login";
import { normalize } from "path";
import { text } from "stream/consumers";

const Utepin = () => {
  return (
    <PageContainer title="UTEPIN" description="pagina de UTEPIN">
      <Grid
        container
        spacing={0}
        justifyContent="center"
        sx={{ height: "100vh" }}
      >
        <Card
          elevation={6}
          sx={{
            p: 4,
            zIndex: 1,
            width: "100%",
            margin: "50px 260px",
            background: "#efefef",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            textAlign="center"
          >
            <Typography>a</Typography>
            <Typography>a</Typography>
            <Typography>a</Typography>
            <Typography>a</Typography>
          </Grid>
        </Card>
      </Grid>
    </PageContainer>
  );
};
export default Utepin;
