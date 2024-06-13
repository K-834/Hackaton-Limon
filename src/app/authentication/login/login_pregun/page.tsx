"use client";
import Link from "next/link";
import { Grid, Box, Card, Stack, Typography, Button } from "@mui/material";
// components
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logologin from "@/app/(DashboardLayout)/layout/shared/logo/Logo-login";
import AuthLogin from "../../auth/AuthLogin";
import { normalize } from "path";
import { text } from "stream/consumers";

const Login3 = () => {
  return (
    <PageContainer
      title="Inicia Sesion en UTP+squad"
      description="pagina para logearte"
    >
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
            background: "#ffffff",
            padding: "20px",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h2"
            fontWeight={600}
            fontSize={24}
            textAlign="center"
            color="textSecondary"
            mb={3}
          >
            La sinergia crea{" "}
            <span
              style={{
                color: "#e9f0f2",
                backgroundColor: "#db5b78",
                padding: "2px 4px",
                borderRadius: "4px",
              }}
            >
              resultados
            </span>
          </Typography>
          <img
            src="/images/backgrounds/login_quest.png"
            alt="Imagen"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          lg={6}
          xl={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection={"column"}
          sx={{
            background: "#e9f0f2",
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="center">
            <Link href="/">
              <img
                src="/images/logos/utp_squad.png"
                alt="ImagenUTP"
                style={{ overflow: "hidden", display: "block" }}
              />
            </Link>
          </Box>

          <Typography fontSize={50} paddingTop={2} variant="subtitle1">
            Hola{" "}
            
          </Typography>
          <Typography fontSize={32} paddingTop={2} variant="subtitle1">
            ¿Todavía no tienes un perfil?
          </Typography>

          <Button
            variant="contained"
            component={Link}
            href="/authentication/login/login_pregun/login_utepin"
            style={{
              backgroundColor: "#F24968",
              color: "#ffffff",
              padding: "32px 80px",
              borderRadius: "10px",
              border: "none",
              marginTop: "30px",
              fontSize: "32px",
            }}
          >
            ¡Comienza tu aventura ahora!
          </Button>

          {/* <AuthLogin
              subtext={
                <Typography variant="subtitle2" fontWeight={600} fontSize={24} textAlign="center" color="textSecondary" mb={3}>
                 zzzzzzzzz
                </Typography>
              }
            /> */}
        </Grid>
      </Grid>
    </PageContainer>
  );
};
export default Login3;
