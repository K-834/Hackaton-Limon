"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Grid, Box, Card, Typography, Button } from "@mui/material";
// components
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";

const questions = [
  {
    question: "Si pudieras tener un superpoder, ¿cuál elegirías?",
    answers: [
      "a) Crear inventos asombrosos de la nada.",
      "b) Absorber conocimientos con solo tocar un libro.",
      "c) Convertir tus ideas en obras de arte instantáneamente.",
      "d) Tener la fuerza y resistencia de un superhéroe.",
      "e) Poder hablar y entender todos los idiomas del mundo.",
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

const PlantillaPregunta = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const currentQuestion = questions[currentQuestionIndex];
  
  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer)
  };

  const handleNextQuestion = () => {
    if (selectedAnswer != null) {
      setUserAnswers((prevAnswers) => [...prevAnswers, currentQuestion.answers.indexOf(selectedAnswer)]);
      if (currentQuestionIndex != questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswer(null);
      }
    }
  };

  const handlePickClan = () => {
    if (selectedAnswer != null) {
      userAnswers.push(currentQuestion.answers.indexOf(selectedAnswer));
      console.log(userAnswers)
      const clan = numeroMasRepetido(userAnswers);

      localStorage.setItem('ClanID', JSON.stringify(clan));

      switch (clan) {
        case 0:
          console.log("Eres un Ingeniero");
          break;
        case 1:
          console.log("Eres un Científico");
          break;
        case 2:
          console.log("Eres un Artista");
          break;
        case 3:
          console.log("Eres un Atleta");
          break;
        case 4:
          console.log("Eres un Humanista");
          break;
        default:
          console.log("Eres un UTEPIN");
          break;
      }

    }
  };

  const numeroMasRepetido = (array : number[]) => {
    if(array.length === 0)
      return null;
    
    var contador: { [key: number]: number } = {};
    var valorMasRepetido = array[0], maxCount = 1;
  
    for(var i = 0; i < array.length; i++)
    {
      var valor = array[i];
      if(contador[valor] == null)
        contador[valor] = 1;
      else
        contador[valor]++;  
  
      if(contador[valor] > maxCount)
      {
        valorMasRepetido = valor;
        maxCount = contador[valor];
      }
    }
  
    return valorMasRepetido;
  };


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
        spacing={3}
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
                    backgroundColor:
                      selectedAnswer === answer ? "#d3d3d3" : "white",
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
                    disabled={selectedAnswer === null}
                  >
                    Continuar
                  </Button>
                ) : (
                  <Link href="/" passHref>
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
                      onClick={handlePickClan}
                    >
                      Finalizar
                    </Button>
                  </Link>
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
