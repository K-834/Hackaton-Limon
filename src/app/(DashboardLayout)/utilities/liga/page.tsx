"use client";
import { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  Box,
  CardMedia,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";
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
  user: {
    fullname: string | null;
    type: string | null;
    student_code: string;
    url_img: string | null;
  };
  points: number;
  position: number;
}
interface LeagueImages {
  [key: number]: string;
}
const leagueImages: LeagueImages = {
  1: "/images/liga/Cliga.svg",
  2: "/images/liga/Bliga.svg",
  3: "/images/liga/Cliga.svg",
  4: "/images/liga/Dliga.svg",
};
const compararPuntaje = (leagueData: any) => {
  const storedUserData = localStorage.getItem("userData");
  const userData = storedUserData ? JSON.parse(storedUserData) : null;

  if (userData && leagueData && leagueData.data) {
    const studentCode = userData.code;
    const positions = leagueData.data.positions;
    for (let i = 0; i < positions.length; i++) {
      if (positions[i].user.student_code === studentCode) {
        return positions[i].points;
      }
    }
  }
  return null;
};

const TypographyPage = () => {
  const [leagueData, setLeagueData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [userData, setUserData] = useState<any>(null);

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
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const [showList, setShowList] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true); // Estado para controlar la visibilidad del botón

  const handleShowList = () => {
    setShowList(true); // Mostrar la lista
    setButtonVisible(false); // Ocultar el botón
  };

  return (
    <PageContainer title="Liga" description="this is Typography">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Grid item sm={12}>
              <DashboardCard title="LIGA">
                <Grid container spacing={2} justifyContent="center">
                  {leagueData && (
                    <>
                      <Box
                        display={"flex"}
                        flexDirection={"column"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <img
                          src={
                            leagueImages[
                              leagueData.data.userEstadistics.league.id
                            ]
                          }
                          alt="Liga"
                          style={{ width: "90px" }}
                        />
                        <Typography
                          variant="h2"
                          textAlign={"center"}
                          padding={"10px"}
                        >
                          {leagueData.data.userEstadistics.league.description}{" "}
                        </Typography>

                        {buttonVisible && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Typography
                              fontSize={"20px"}
                              alignItems={"center"}
                              marginBottom={"10px"}
                            >
                              Quieres participar en la liga de este periodo?
                            </Typography>

                            <Button
                              onClick={handleShowList}
                              style={{
                                fontSize: "15px",
                                fontWeight: "bold",
                                color: "#1CB0F6",
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)", 
                                marginTop: "20px",
                                height: "48px",
                                width: "256px",
                                display: "block", 
                                margin: "auto", 
                                padding: "10px 20px",
                                borderRadius: "10px",
                                transition: "0.3s"
                              }}
                            >
                              EMPEZAR
                            </Button>
                          </div>
                        )}

                        {showList &&
                          leagueData.data.positions.map(
                            (position: Position, index: number) => (
                              <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                marginTop={"15px"}
                                style={{
                                  backgroundColor:
                                    position.user.student_code ===
                                    userData?.code
                                      ? "#f0f0f0"
                                      : "#ffffff",
                                }}
                              >
                                <Box
                                  display={"flex"}
                                  flexDirection={"row"}
                                  alignContent={"center"}
                                  alignItems={"center"}
                                >
                                  <Typography
                                    marginRight={"30px"}
                                    marginLeft={"40px"}
                                    color={"#9577be"}
                                    fontSize={"20px"}
                                    fontWeight={"bold"}
                                  >
                                    {position.position}
                                  </Typography>
                                  <img
                                    src={position.user.url_img ?? ""}
                                    alt="perfil"
                                    width={"50px"}
                                    height={"55px"}
                                    style={{
                                      borderRadius: "100px",
                                      marginRight: "30px",
                                    }}
                                  />

                                  {position.user.student_code ===
                                  userData?.code ? (
                                    <Typography
                                      fontSize={"20px"}
                                      fontWeight={"bold"}
                                      color={"#9577be"}
                                    >
                                      {position.user.fullname}
                                    </Typography>
                                  ) : (
                                    <Typography fontSize={"20px"}>
                                      {position.user.fullname}
                                    </Typography>
                                  )}
                                </Box>

                                {position.user.student_code ===
                                userData?.code ? (
                                  <Typography
                                    marginRight={"70px"}
                                    marginLeft={"90px"}
                                    fontSize={"15px"}
                                    fontWeight={"bold"}
                                    color={"#9577be"}
                                  >
                                    {position.points} EXP
                                  </Typography>
                                ) : (
                                  <Typography
                                    marginRight={"70px"}
                                    marginLeft={"90px"}
                                    fontSize={"15px"}
                                    fontWeight={"bold"}
                                  >
                                    {position.points} EXP
                                  </Typography>
                                )}
                              </Grid>
                            )
                          )}
                      </Box>
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
                <Card
                  style={{
                    padding: "40px",
                    width: "100%",
                    maxWidth: "320px",
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      padding: "0 10px 10px 0",
                    }}
                  >
                    <div
                      className="dropdown-menu"
                      style={{
                        position: "relative",
                        zIndex: "10",
                        display: "none",
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "0.375rem",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      paddingBottom: "2.5rem",
                    }}
                  >
                    <img
                      className="profile-image"
                      src={userData?.urlImg ?? "/images/profile/user-1.jpg"}
                      alt="perfil"
                      style={{
                        width: "6rem",
                        height: "6rem",
                        marginBottom: "0.75rem",
                        borderRadius: "9999px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Typography
                      variant="h5"
                      style={{
                        marginBottom: "0.25rem",
                        fontSize: "1.25rem",
                        fontWeight: "600",
                        color: "#111827",
                      }}
                    >
                      {userData?.fullname ?? "Nombre de usuario"}
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{ fontSize: "0.875rem", color: "#6b7280" }}
                    >
                      {userData?.type ?? "Tipo de usuario"}
                    </Typography>
                    <div style={{ marginTop: "1rem", display: "flex" }}>
                      <a
                        className="add-friend-button"
                        style={{
                          display: "inline-block",
                          padding: "0.5rem 1.25rem",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          textAlign: "center",
                          textDecoration: "none",
                          borderRadius: "0.375rem",
                          backgroundColor: "#3b82f6",
                          color: "#fff",
                        }}
                      >
                        Codigo :{" "}
                        {/* {leagueData?.data?.userEstadistics?.currentPoints} */}
                        {userData?.code ?? "codigo"}
                      </a>
                      {/* <a
                        
                        className="message-button"
                        style={{
                          display: "inline-block",
                          marginLeft: "0.5rem",
                          padding: "0.5rem 1.25rem",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          textAlign: "center",
                          textDecoration: "none",
                          border: "1px solid #e5e7eb",
                          borderRadius: "0.375rem",
                          backgroundColor: "#fff",
                          color: "#4b5563",
                        }}
                      >
                        {leagueData?.data?.userEstadistics?.missingPoints}
                      </a> */}
                    </div>
                  </div>
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
