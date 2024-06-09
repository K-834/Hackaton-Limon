"use client";
import { Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import TableProyects from "../components/dashboard/TableProyects";
import '@/app/(DashboardLayout)/components/kanban/estilosKanban.css';

const SamplePage = () => {
  

  return (
    <PageContainer
      title="Proyectos"
      description="Donde van los proyectos realizados">
      <DashboardCard title="Proyectos">
        <TableProyects /> 
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;
