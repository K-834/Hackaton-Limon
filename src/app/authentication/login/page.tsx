"use client";
import Link from "next/link";
import { Grid, Box, Card, Stack, Typography } from "@mui/material";
// components
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logologin from "@/app/(DashboardLayout)/layout/shared/logo/Logo-login";
import AuthLogin from "../auth/AuthLogin";

const Login2 = () => {
  return (
    <PageContainer title="Inicia Sesion en UTP+squad" description="pagina para logearte">
      <Grid
        container
        spacing={0}
        justifyContent="center"
        sx={{ height: "100vh" }}
      >
        
        <Grid
          item
          xs={12}
          sm={12}
          lg={6}
          xl={6}
          display={{ xs: "none", lg: "flex" }}
          justifyContent="center"
          alignItems="center"
          sx={{
            background: "#eff6ff",
            padding: "20px",
          }}
        >
          <img src="/images/backgrounds/fondo_login.png" alt="Imagen" style={{ maxWidth: "100%", height: "auto" }} />
        </Grid>

        <Grid item xs={12} sm={12} lg={6} xl={6} display="flex" justifyContent="center" alignItems="center">
          <Card elevation={9} sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}>
            <Box display="flex" alignItems="center" justifyContent="center" >
              <Logologin />
            </Box>
            <AuthLogin
              subtext={
                <Typography variant="subtitle2" fontWeight={600} fontSize={24} textAlign="center" color="textSecondary" mb={3}>
                 La nueva experiencia digital para realizar proyectos
                </Typography>
              }
              
            />
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};
export default Login2;
