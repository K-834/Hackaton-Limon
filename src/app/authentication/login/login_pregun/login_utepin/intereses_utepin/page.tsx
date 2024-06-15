"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Grid, Box, Card, Typography, Button } from "@mui/material";
// components
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";

const questions = [
    {
        question: "¿Cuáles son tus intereses?",
        answers: [
            "Programación",
            "Lectura",
            "Bailar",
            "Tecnología",
            "Deportes",
            "Música",
            "Videojuegos",
            "Cantar",
            "Diseño"
            ],
    }
];

const InteresesUtepin = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
    const [userAnswers, setUserAnswers] = useState<string[][]>([]);
    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswerClick = (answer: string) => {
        setSelectedAnswers((prevSelectedAnswers) => {
            if (prevSelectedAnswers.includes(answer)) {
                return prevSelectedAnswers.filter((a) => a !== answer);
            } else {
                return [...prevSelectedAnswers, answer];
            }
        });
    };

    const handleNextQuestion = () => {
        window.location.href = '/authentication/Quest';
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
            container
            spacing={2}
            width={"100%"}
            marginBottom={"40px"}
            padding={"0px 90px"}
        >
            {currentQuestion.answers.map((answer, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
                <Button
                style={{
                    width: "100%",
                    borderRadius: "5px",
                    backgroundColor: selectedAnswers.includes(answer) ? "#d3d3d3" : "white",
                    color: "black",
                    fontSize: "20px",
                    padding: "5px",
                }}
                onClick={() => handleAnswerClick(answer)}
                >
                {answer}
                </Button>
            </Grid>
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
            </Box>
        </Box>
        </Grid>
    </Card>
    </Grid>
    </PageContainer>
    );
};

export default InteresesUtepin;
