"use client";
import { Grid, Typography,Box } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import TableProyects from "../components/dashboard/TableProyects";

const SamplePage = () => {
  

  return (
    <PageContainer
      title="Proyectos"
      description="Donde van los proyectos realizados">
    <Box>
      <Grid container spacing={3}>
      <Grid item xs={12} lg={8}>
        <Grid item sm={12}> 

        <DashboardCard title="Proyectos">
          <TableProyects />   
        </DashboardCard>


        </Grid>
      </Grid>
{/* OTRA PARTE  */}

      <Grid item xs={12} lg={8}>
        <Grid item sm={12}>
        {/* chat del profe */}
    

        </Grid>
      </Grid>

      </Grid>


    </Box>



    </PageContainer>
  );
};

export default SamplePage;
