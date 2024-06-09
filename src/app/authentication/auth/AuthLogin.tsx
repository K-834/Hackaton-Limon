import React from "react";
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

const AuthLogin = ({ title, subtitle, subtext }: loginType) => (
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
        <CustomTextField variant="outlined" fullWidth />
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
      <Stack
        justifyContent="end"
        direction="row"
        alignItems="center"
        my={3}
      >
        {/* <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remeber this Device"
          />
        </FormGroup> */}
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
        // color="primary"
        variant="contained"
        size="large"
        fullWidth
        component={Link}
        href="/authentication/login/login_pregun"
        type="submit"
      >
        Iniciar Sesión
      </Button>
    </Box>
    {subtitle}
  </>
);

export default AuthLogin;
