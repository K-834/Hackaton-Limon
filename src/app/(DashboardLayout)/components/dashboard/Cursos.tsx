import React from "react";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useCourses } from "./CourseProvider";

const Cursos: React.FC = () => {
  const { courses } = useCourses();

  let storedUserData = null;
  let userData = null;
  let studentCode = "U00000001";

  if (typeof window !== "undefined" && "localStorage" in window) {
    storedUserData = localStorage.getItem("userData");
    userData = storedUserData ? JSON.parse(storedUserData) : null;
    studentCode = userData.code || "U00000001";
  }

  const handleClick = (
    section_code: string,
    name_course: string,
    number_groups: number
  ) => {
    const nameCourse = name_course;
    const newUrl = `/proyectos?studentCode=${studentCode}&sectionId=${section_code}&nameCourse=${nameCourse}`;
    const urlGrupos = `/grupos?studentCode=${studentCode}&sectionId=${section_code}&nameCourse=${nameCourse}&numberGroups=${number_groups}`;
    window.location.href = urlGrupos;
  };

  return (
    <Grid container spacing={3}>
      {courses.map((course, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            className="bg-white shadow-md rounded-lg overflow-hidden"
            style={{ cursor: "pointer" }}
            onClick={() =>
              handleClick(
                course.section_code,
                course.name_course,
                course.number_groups
              )
            }
          >
            <CardMedia
              component="img"
              height="140"
              image={course.bg_image}
              alt="Curso-png"
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {course.name_course}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {course.section_code} - {course.modality}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {course.teacher}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Cursos;
