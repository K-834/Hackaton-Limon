"use client";
import { useEffect, useState } from "react";
import { Typography, Grid, Card, Box } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import BlankCard from "@/app/(DashboardLayout)/components/shared/BlankCard";
import SalesOverview from "@/app/(DashboardLayout)/components/dashboard/SalesOverview";
import YearlyBreakup from "@/app/(DashboardLayout)/components/dashboard/YearlyBreakup";
import RecentTransactions from "@/app/(DashboardLayout)/components/dashboard/RecentTransactions";
import ProductPerformance from "@/app/(DashboardLayout)/components/dashboard/ProductPerformance";
import Blog from "@/app/(DashboardLayout)/components/dashboard/Blog";
import MonthlyEarnings from "@/app/(DashboardLayout)/components/dashboard/MonthlyEarnings";
import Cursos from "@/app/(DashboardLayout)/components/dashboard/Cursos";

interface Position {
  studentCode: string;
  points: number;
  position: number;
}

const TypographyPage = () => {
  const [leagueData, setLeagueData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const url =
      "http://143.110.156.21:8080/api/projects/league-position/U00000001";

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setLeagueData(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);
  interface LeagueImages {
    [key: number]: string;
  }
  const leagueImages: LeagueImages = {
    1: "/images/liga/Cliga.svg",
    2: "/images/liga/Bliga.svg",
    3: "/images/liga/Cliga.svg",
    4: "/images/liga/Dliga.svg",
  };

  return (
    <PageContainer title="Liga" description="this is Typography">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Grid item sm={12}>
              <DashboardCard title="LIGA">
                <Grid
                  container
                  spacing={2}
                  display={"flex"}
                  flexDirection={"column"}
                  height={"71vh"}
                >
                  {leagueData && (
                    <>
                      {/* <Typography variant="h6">
                        League ID: {leagueData.data.userEstadistics.league.id}
                      </Typography>
                      <Typography variant="h6">
                        League Description:{" "}
                        {leagueData.data.userEstadistics.league.description}
                      </Typography>
                      <Typography variant="h6">
                        Current Points:{" "}
                        {leagueData.data.userEstadistics.currentPoints}
                      </Typography>
                      <Typography variant="h6">
                        Missing Points:{" "}
                        {leagueData.data.userEstadistics.missingPoints}
                      </Typography>
                      <Typography variant="h6">Positions:</Typography> */}

                      <img
                        src={
                          leagueImages[
                            leagueData.data.userEstadistics.league.id
                          ]
                        }
                        alt="Liga"
                        style={{ maxWidth: "100%" }}
                      />
                      <Typography
                        variant="h2"
                        textAlign={"center"}
                        padding={"10px"}
                      >
                        {leagueData.data.userEstadistics.league.id}
                      </Typography>
                      <Typography
                        variant="h2"
                        textAlign={"center"}
                        padding={"10px"}
                      >
                        {leagueData.data.userEstadistics.league.description}
                      </Typography>

                      {leagueData.data.positions.map(
                        (position: Position, index: number) => (
                          <div key={position.studentCode}>
                            <Grid
                              container
                              justifyContent="center"
                              padding={"10px"}
                            >
                              <Card
                                style={{
                                  width: "492px",
                                  background: "#c6dff1",
                                }}
                              >
                                <Grid
                                  container
                                  justifyContent="space-between"
                                  alignItems="center"
                                >
                                  <Typography padding={"15px"}>
                                    {position.position}
                                  </Typography>
                                  <Typography padding={"15px"}>
                                    {position.studentCode}
                                  </Typography>
                                  <Typography padding={"15px"}>
                                    {position.points} EXP
                                  </Typography>
                                </Grid>
                              </Card>
                            </Grid>
                          </div>
                        )
                      )}
                    </>
                  )}
                  {error && (
                    <Typography variant="body1" color="error">
                      Error: {error.message}
                    </Typography>
                  )}
                </Grid>
              </DashboardCard>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card style={{ padding: "40px" }}>
                  <Typography variant="subtitle1" paddingBottom={"10px"}>
                    SUPERATE MAS
                  </Typography>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    paddingBottom={"35px"}
                  >
                    <img
                      src="/images/profile/user-1.jpg"
                      alt="perfil"
                      width={"90px"}
                      style={{ borderRadius: "100px" }}
                    />
                  </Box>
                  
                  <Box>
                  <Typography variant="h6">
                    Puntos : {leagueData.data.userEstadistics.currentPoints}
                  </Typography>
                  <Typography variant="h6">
                    Puntos Faltantes:{" "}
                    {leagueData.data.userEstadistics.missingPoints}
                  </Typography>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default TypographyPage;
