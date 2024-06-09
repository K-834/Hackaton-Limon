import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useCourses } from './CourseProvider';

const Cursos: React.FC = () => {
  const { courses } = useCourses();

  const handleClick = (section_code: string) => {
    const studentCode = 'U00000002'; // Ejemplo de un código de estudiante fijo
    const newUrl = `/proyectos?studentCode=${studentCode}&sectionId=${section_code}`;
    window.location.href = newUrl;
  };

  return (
    <Grid container spacing={3}>
      {courses.map((course, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            className="bg-white shadow-md rounded-lg overflow-hidden"
            style={{ cursor: 'pointer' }}
            onClick={() => handleClick(course.section_code)}
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
