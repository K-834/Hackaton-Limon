import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
//  {   
//    navlabel: true,
//    subheader: "Barra4",
//  },

  {
    id: uniqueId(),
    title: "Cursos",
    icon: IconLayoutDashboard,
    href: "/",
  },
  // {
  //   navlabel: true,
  //   subheader: "Utilities",
  // },
  {
    id: uniqueId(),
    title: "Liga",
    icon: IconCopy,
    href: "/utilities/liga",
  },
  {
    id: uniqueId(),
    title: "Perfil",
    icon: IconUserPlus,
    href: "/utilities/perfil",
  }
  // {
  //   navlabel: true,
  //   subheader: "Auth",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Login",
  //   icon: IconLogin,
  //   href: "/authentication/login",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Register",
  //   icon: IconUserPlus,
  //   href: "/authentication/register",
  // },
  // {
  //   navlabel: true,
  //   subheader: "Extra",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Icons",
  //   icon: IconMoodHappy,
  //   href: "/icons",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Proyectos",
  //   icon: IconAperture,
  //   href: "/proyectos",
  // }
];

export default Menuitems;
