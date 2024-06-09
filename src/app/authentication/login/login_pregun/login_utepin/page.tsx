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
      <style jsx>{`
        .divider {
          border-top: 1px solid #ccc;
          margin: 2px 0;
          width: 100%;
        }
      `}</style>

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
            flexDirection={"column"}
          >
            <Typography variant="subtitle2"marginTop={"140px"}>
              <span
                style={{
                  color: "#000",
                  backgroundColor: "#a3dfea",
                  padding: "20px 30px",
                  borderRadius: "30px",
                  fontSize: "40px",
                  fontWeight: "bold",
                  boxShadow: "0 2px 4px #eeeee4",
                }}
              >
                ¡Hola! yo soy UTEPIN
              </span>
            </Typography>
            <img
              src="/images/logos/utepin.png"
              alt="ImagenUTP"
              style={{
                overflow: "hidden",
                display: "block",
                marginTop: "40px",
                marginBottom: "60px",
              }}
            />
            <div className="divider"></div>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              padding={"50px"}
              width="100%"
            >
              <img
                src="/images/logos/utp_squad.png"
                alt="ImagenUTP"
                style={{ overflow: "hidden", display: "block" }}
              />
              <Box>
                <Button
                  style={{ backgroundColor: "#5138f2", color: "white" , fontSize: "46px" , borderRadius: "20px", padding: "10px 60px", margin: "0 10"}}
                  // color="primary"
                  variant="contained"
                  component={Link}
                  href="/authentication/Quest"
                  type="submit"
                >
                  Continuar
                </Button>
              </Box>
            </Box>
          </Grid>
        </Card>
      </Grid>
    </PageContainer>
  );
};
export default Utepin;
