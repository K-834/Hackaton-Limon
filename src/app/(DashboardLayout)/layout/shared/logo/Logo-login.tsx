import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
    height: "100px", // Ajusta la altura según sea necesario
    width: "300px", // Ajusta el ancho según sea necesario
    overflow: "hidden",
    display: "block",
  }));
  
  const Logo = () => {
    return (
      <LinkStyled href="/">
        <Image src="/images/logos/dark-logo.svg" alt="logo" height={100} width={300} priority />
      </LinkStyled>
    );
  };
  
export default Logo;
