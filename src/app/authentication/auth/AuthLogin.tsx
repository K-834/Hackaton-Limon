import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";
import Link from "next/link";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";


interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const [username, setUsername] = useState("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "http://143.110.156.21:8080/api/users/find-user/" + username
      );
      if (!response.ok) {
        throw new Error("No se pudo obtener los datos del usuario");
      }
      const data = await response.json();
      if (!data || !data.data) {
        throw new Error("Los datos del usuario no son válidos");
      }
      
      if (typeof window !== 'undefined') {
        if ('localStorage' in window) {
          localStorage.setItem("userData", JSON.stringify(data.data));
          
          const userData = localStorage.getItem("userData");
          
          if (userData) {
            // El usuario está en el almacenamiento local
            console.log("El usuario está en el almacenamiento local");
          } else {
            // El usuario no está en el almacenamiento local
            console.log("El usuario no está en el almacenamiento local");
          }
        }
      }
      
      if (data.data.isRegister) {
        (window as any).location.href = "/";
      } else {
        (window as any).location.href = "/authentication/login/login_pregun";
      }
  
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
    
  };
  
  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px"
          >
            Código UTP
          </Typography>

          <CustomTextField 
            variant="outlined" 
            fullWidth 
            value={username} 
            onChange={handleUsernameChange} 
          />
        </Box>
        <Box mt="25px">
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="password"
          mb="5px"
        >
          Contraseña
        </Typography>
        <CustomTextField type="password" variant="outlined" fullWidth />
      </Box>
        <Stack justifyContent="end" direction="row" alignItems="center" my={3}>
          <Typography
            component={Link}
            href="/"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Reestablecer contraseña?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          style={{ backgroundColor: "#0661FC", color: "white" }}
          variant="contained"
          size="large"
          fullWidth
          onClick={handleLogin}
        >
          Iniciar Sesión
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthLogin;