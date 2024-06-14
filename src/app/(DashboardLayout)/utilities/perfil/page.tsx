"use client";
import React, { useEffect, useState } from "react";
import { Paper, Grid, Card } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Header from "../../components/perfil/Header";
import { Profile } from "../../components/perfil/Profile"; // Import the 'Perfil' type
import { Tags } from "../../components/perfil/Tags";
import SalesOverview from "../../components/dashboard/SalesOverview";
import YearlyBreakup from "../../components/dashboard/YearlyBreakup";
import MonthlyEarnings from "../../components/dashboard/MonthlyEarnings";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

const darkTheme = createTheme({ palette: { mode: "dark" } });
const lightTheme = createTheme({ palette: { mode: "light" } });

interface ClanImagenes {
  [key: number]: string;
}
const clanImages: ClanImagenes = {
  1: "/images/clanes/Group_30.svg",
  2: "/images/clanes/Group_31.svg",
  3: "/images/clanes/Group_32.svg",
  4: "/images/clanes/Group_33.svg",
  5: "/images/clanes/Group_34.svg",
};

const Shadow = () => {
  const [hobbies, setHobbies] = useState(null);
  const [perfil, setPerfil] = useState<null>(null);
  const [clan, setClan] = useState<{ id: number; description: string } | null>(
    null
  );

  useEffect(() => {
    fetch("http://143.110.156.21:8080/api/users/profile/U00000001")
      .then((response) => response.json())
      .then((data) => {
        setHobbies(data.hobbies);
        setClan(data.clan);
      });

    fetch("http://143.110.156.21:3000/users?student_code=U00000001")
      .then((response) => response.json())
      .then((data) => setPerfil(data));
  }, []);

  return (
    <PageContainer title="Perfil" description="Este es el perfil">
      <DashboardCard title=" ">
        <Grid container spacing={2}>
          <div
            style={{
              backgroundColor: "#ebf4fb",
              padding: "1.5rem",
              borderRadius: "1rem",
              maxWidth: "64rem",
              margin: "0 auto",
            }}
          >
            <div
             
            >
              <Header />
              <Profile />
            </div>
            <Tags />

            <div
              style={{
                marginBottom: "2rem",
              }}
            >
              {clan && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    marginTop: "1rem",
                    gap: "1rem",
                  }}
                >
                  <Card
                    style={{
                      flex: 1,
                      padding: "1rem",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "180px",
                    }}
                  >
                    <img src="/images/backgrounds/Rayo.png" alt="rayo" />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: "3rem",
                      }}
                    >
                      <h1 style={{ margin: "0", marginBottom: "5px" }}>60</h1>{" "}
                      <h3 style={{ margin: "0" }}>Exp. Totales</h3> <div></div>
                    </div>
                  </Card>

                  <Card
                    style={{
                      flex: 1,
                      padding: "1rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "180px",
                    }}
                  >
                    {/* <p>Clan ID: {clan.id}</p> */}
                    <img
                      src={clanImages[clan.id]}
                      alt="Liga"
                      style={{ width: "90px" }}
                    />
                    <h3> {clan.description}</h3>
                  </Card>
                </div>
              )}
            </div>

            <SalesOverview />
            {/* <div
              style={{
                backgroundColor: "#ffffff",
                padding: "1rem",
                borderRadius: "0.5rem",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                marginBottom: "1rem",
              }}
            >
              <h3 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                EXP de esta semana
              </h3>
              <div
                style={{
                  width: "100%",
                  height: "8rem",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "0.5rem",
                }}
              >
               
              </div>
            </div> */}

            <div
              style={{
                backgroundColor: "#ffffff",
                marginTop: "1rem",
                padding: "1rem",
                borderRadius: "0.5rem",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              }}
            >
              <h3 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                Logros
              </h3>

              <div
                style={{ display: "flex", gap: "0.5rem", flexDirection: "row" }}
              >
                <div
                  style={{
                    width: "4rem",
                    height: "4rem",
                    marginBottom: "1rem",
                    backgroundColor: "#fed7d7",
                    borderRadius: "0.5rem",
                  }}
                >
                  <img
                    src="/images/insignias/caballero.png"
                    alt=""
                    style={{ width: "4rem", height: "4rem" }}
                  />
                </div>
                <div style={{ flexGrow: 1 }}>
                  <div className="skills-container" style={{ width: "100%" }}>
                    <div className="skill">
                      <div
                        className="skill-name"
                        style={{ marginBottom: "15px" }}
                      >
                        Caballero UTP
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress progress-html"
                          style={{
                            width: "90%",
                            backgroundColor: "#ffc800",
                            height: "10px",
                            borderRadius: "100px",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{ display: "flex", gap: "0.5rem", flexDirection: "row" }}
              >
                <div
                  style={{
                    width: "4rem",
                    height: "4rem",
                    marginBottom: "1rem",
                    backgroundColor: "#fed7d7",
                    borderRadius: "0.5rem",
                  }}
                >
                  <img
                    src="/images/insignias/elixir.png"
                    alt=""
                    style={{ width: "4rem", height: "4rem" }}
                  />
                </div>
                <div style={{ flexGrow: 1 }}>
                  <div className="skills-container" style={{ width: "100%" }}>
                    <div className="skill">
                      <div
                        className="skill-name"
                        style={{ marginBottom: "15px" }}
                      >
                        Elixir UTP
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress progress-html"
                          style={{
                            width: "77%",
                            backgroundColor: "#ffc800",
                            height: "10px",
                            borderRadius: "100px",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{ display: "flex", gap: "0.5rem", flexDirection: "row" }}
              >
                <div
                  style={{
                    width: "4rem",
                    height: "4rem",
                    marginBottom: "1rem",
                    backgroundColor: "#fed7d7",
                    borderRadius: "0.5rem",
                  }}
                >
                  <img
                    src="/images/insignias/medalla-de-oro.png"
                    alt=""
                    style={{ width: "4rem", height: "4rem" }}
                  />
                </div>
                <div style={{ flexGrow: 1 }}>
                  <div className="skills-container" style={{ width: "100%" }}>
                    <div className="skill">
                      <div
                        className="skill-name"
                        style={{ marginBottom: "15px" }}
                      >
                        Oro UTP
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress progress-html"
                          style={{
                            width: "37%",
                            backgroundColor: "#ffc800",
                            height: "10px",
                            borderRadius: "100px",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </DashboardCard>
    </PageContainer>
  );
};

export default Shadow;
