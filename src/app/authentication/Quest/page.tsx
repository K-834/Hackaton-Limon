"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import { Grid, Box, Card, Typography, Button } from "@mui/material";
// components
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";

const questions = [
  {
    question: "¿Cuáles son tus hobbies e intereses?",
    answers: [
      "Bailar",
      "Deportes",
      "Tecnología",
      "Videojuegos",
      "Música",
      "Lectura",
    ],
  },
  {
    question: "¿Qué actividad preferirías hacer un sábado por la tarde?",
    answers: [
      "a) Explorar nuevas tecnologías.",
      "b) Leer un libro o ver un documental.",
      "c) Tomar alguna sesión de arte.",
      "d) Practicar tu deporte preferido.",
      "e) Hacer alguna obra social con amigos.",
    ],
  },
  {
    question: "¿Cómo prefieres aprender algo nuevo?",
    answers: [
      "a) Experimentando.",
      "b) Investigando.",
      "c) A través de proyectos creativos.",
      "d) Con trabajo de campo.",
      "e) Trabajando en equipo.",
    ],
  },
  {
    question: "¿Qué tipo de películas o series disfrutas más?",
    answers: [
      "a) Ciencia ficción y futuristas.",
      "b) Documentales y biográficas.",
      "c) Dramáticas y artísticas.",
      "d) Deportivas y de acción.",
      "e) Comedias y dramas.",
    ],
  },
  {
    question: "¿Cuál sería tu lugar de vacaciones ideal?",
    answers: [
      "a) Lugares de potencia tecnológica.",
      "b) Museos o lugares históricos.",
      "c) Ciudades con una rica escena artística y cultural.",
      "d) Lugares para hacer hiking, climbing, etc.",
      "e) Retiro en equipo.",
    ],
  },
  {
    question: "Si tuvieras que organizar un evento, ¿qué tipo sería?",
    answers: [
      "a) Un speech de tecnología.",
      "b) Un seminario educativo con expertos.",
      "c) Una exposición cultural.",
      "d) Unas olimpiadas.",
      "e) Un voluntariado.",
    ],
  },
  {
    question: "¿Con qué lema te identificas?",
    answers: [
      "a) “Innovar es la clave del futuro.”",
      "b) “El conocimiento es poder.”",
      "c) “La creatividad no tiene límites.”",
      "d) “Sin esfuerzo, no hay éxito.”",
      "e) “Juntos somos más fuertes.”",
    ],
  },
];

const getClanId = (answers: string[]) => {
  const answerCounts: { [key: string]: number } = {
    "a": 0,
    "b": 0,
    "c": 0,
    "d": 0,
    "e": 0,
  };

  answers.forEach((answer) => {
    const key = answer.charAt(0); 
    if (key in answerCounts) {
      answerCounts[key as keyof typeof answerCounts]++;
    }
  });

  let maxKey = 'a';
  for (const key in answerCounts) {
    if (answerCounts[key as keyof typeof answerCounts] > answerCounts[maxKey]) {
      maxKey = key;
    }
  }

  return parseInt(maxKey, 36) - 10 + 1; 
};


const PlantillaPregunta = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [leagueData, setLeagueData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [firstQuestionAnswers, setFirstQuestionAnswers] = useState<string[]>(
    []
  );
  const [otherQuestionAnswers, setOtherQuestionAnswers] = useState<string[]>(
    []
  );
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



  const handleNextQuestion = async () => {
    if (currentQuestionIndex === 0) {
      setFirstQuestionAnswers(selectedAnswers);
    } else {
      setOtherQuestionAnswers((prevAnswers) => [
        ...prevAnswers,
        selectedAnswers[0],
      ]);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswers([]);
    } else {
      console.log("Respuestas a la primera pregunta:", firstQuestionAnswers);
      console.log("Respuestas a las demás preguntas:", otherQuestionAnswers);
      const clanId = getClanId(otherQuestionAnswers);
      console.log("El ID del clan es:", clanId)
  
      // Aquí es donde enviamos la solicitud POST a la API
      const response = await fetch('http://143.110.156.21:8080/api/users/profile/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          studentCode:`${userData?.code ?? 'U00000001'}`,
          hobbies:["Programación"], 
          clanId:clanId
        })
      });
  
      if (!response.ok) {
        throw new Error('Error al crear el perfil del usuario');
      }
  
      const data = await response.json();
      console.log('Perfil del usuario creado con éxito:', data);
      
      
  
      window.location.href = "/";
    }
  };

  const handleAnswerClick = (answer: string) => {
    if (currentQuestionIndex === 0) {
      setSelectedAnswers((prevAnswers) => [...prevAnswers, answer]);
    } else {
      setSelectedAnswers([answer]);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <PageContainer title="UTEPIN" description="pagina de UTEPIN">
      <style jsx>{`
        .divider {
          border-top: 1px solid #ccc;
          margin: 2px 0;
          width: 100%;
          margin-top: 10px;
        }
      `}</style>

      <Grid
        container
        spacing={0}
        justifyContent="center"
        sx={{ height: "100vh" }}
      >
        <Card
          elevation={6}
          sx={{
            p: 4,
            zIndex: 1,
            width: "100%",
            margin: "50px 260px",
            background: "#efefef",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            textAlign="center"
          >
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              padding={"50px"}
              width="100%"
              textAlign="center"
            >
              
              <img
                src="/images/logos/utepin.png"
                alt="ImagenUTP"
                style={{
                  overflow: "hidden",
                  display: "block",
                  marginBottom: "20px",
                  width: "100px",
                }}
              />
              <Typography
                variant="subtitle1"
                display={"flex"}
                justifyItems={"center"}
                alignItems={"center"}
                style={{ marginTop: "0" }}
                fontSize={"30px"}
                marginLeft={"40px"}
              >
                <span
                  style={{
                    color: "#000",
                    backgroundColor: "#ffffff",
                    padding: "10px",
                    borderRadius: "15px",
                  }}
                >
                  {currentQuestion.question}
                </span>
              </Typography>
            </Box>

            <Grid
              item
              width={"100%"}
              height={"300px"}
              marginBottom={"40px"}
              margin={"0px 90px 0px 90px"}
              display={"flex"}
              flexDirection={"column"}
            >
              {currentQuestion.answers.map((answer, idx) => (
                <Button
                  key={idx}
                  style={{
                    margin: "5px",
                    width: "100%",
                    borderRadius: "5px",
                    backgroundColor: selectedAnswers.includes(answer)
                      ? "#d3d3d3"
                      : "white",

                    color: "black",
                    fontSize: "20px",
                    padding: "5px",
                    marginTop: "10px",
                  }}
                  onClick={() => handleAnswerClick(answer)}
                >
                  {answer}
                </Button>
              ))}
            </Grid>

            <div className="divider"></div>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              padding={"50px"}
              width="100%"
            >
              <img
                src="/images/logos/utp_squad.png"
                alt="ImagenUTP"
                style={{ overflow: "hidden", display: "block" }}
              />
              <Box>
                {currentQuestionIndex < questions.length - 1 ? (
                  <Button
                    style={{
                      backgroundColor: "#5138f2",
                      color: "white",
                      fontSize: "46px",
                      borderRadius: "20px",
                      padding: "10px 60px",
                      margin: "0 10",
                    }}
                    variant="contained"
                    onClick={handleNextQuestion}
                    disabled={selectedAnswers.length === 0}
                  >
                    Continuar
                  </Button>
                ) : (
                  <Button
                    style={{
                      backgroundColor: "#5138f2",
                      color: "white",
                      fontSize: "46px",
                      borderRadius: "20px",
                      padding: "10px 60px",
                      margin: "0 10",
                      textDecoration: "none",
                    }}
                    variant="contained"
                    onClick={handleNextQuestion}
                  >
                    Continuar
                  </Button>
                )}
              </Box>
            </Box>
          </Grid>
        </Card>
      </Grid>
    </PageContainer>
  );
};

export default PlantillaPregunta;
