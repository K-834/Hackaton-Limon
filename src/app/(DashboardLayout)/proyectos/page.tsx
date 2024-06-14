"use client";
import { Grid, Typography, Box } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import TableProyects from "../components/dashboard/TableProyects";
import TeacherMsgProyects from "../components/dashboard/TeacherMsgProyects";


const mensajes = [
{
    colorBg: 'rgb(0, 0, 230)', // Verde
    tipo: 'Comentario',
    fecha: 'Tarea Academica 2',
    msg: 'Su trabajo esta excelente, sigan así. '
  },
  {
    colorBg: 'rgb(230, 0, 0)', // Rojo
    tipo: 'Urgente',
    fecha: 'Hoy',
    msg: 'Este es un mensaje urgente.'
  },{
    colorBg: 'rgb(10, 10, 10)', // Negro
    tipo: 'Anuncio',
    fecha: 'Ayer',
    msg: 'Buenas estudiantes, recuerden que el proyecto final debe ser entregado el día 30 de noviembre.'
  },
  {
    colorBg: 'rgb(0, 0, 230)', //'rgb(0, 0, 230)', // Azul
    tipo: 'Comentario',
    fecha: 'Tarea Academica 1',
    msg: 'Mejorar la presentación y la redacción.'
  }
];

const SamplePage = () => {
  return (
    <PageContainer
      title="Proyectos"
      description="Donde van los proyectos realizados"
    >
      <Box>
        <Grid container spacing={3}>


          <Grid item xs={12} lg={8}>
            <Grid item sm={12}>
              <DashboardCard title="Proyectos">
                <TableProyects />
              </DashboardCard>
            </Grid>
          </Grid>


          <Grid item xs={12} lg={4}>
            <Grid item sm={12}>
              <DashboardCard title="Anuncios">
                <>
                  {mensajes.map((mensaje, index) => (
                    <TeacherMsgProyects key={index} colorBg={mensaje.colorBg} tipo={mensaje.tipo} fecha={mensaje.fecha} msg={mensaje.msg}  />
                  ))}
                </>
              </DashboardCard>
            </Grid>
          </Grid>


        </Grid>
      </Box>
    </PageContainer>
  );
};

export default SamplePage;
