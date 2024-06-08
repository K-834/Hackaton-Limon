import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Link
} from '@mui/material';

interface Course {
  section_code: string;
  name_course: string;
  modality: string;
  teacher: string;
  bg_image: string;
}

const Cursos: React.FC = () => {

  // Prueba de data de los cursos 
  const sampleCourses: Course[] = [
    {
      "section_code": "CS101",
      "name_course": "Introduction to Computer Science",
      "modality": "virtual",
      "teacher": "Dr. John Doe",
      "bg_image": "https://class.utp.edu.pe/static/media/course24%E2%81%847.c43c482e.png"
    },
    {
      "section_code": "ENG201",
      "name_course": "English Literature",
      "modality": "virtual",
      "teacher": "Prof. Jane Smith",
      "bg_image": "https://class.utp.edu.pe/static/media/course24%E2%81%847.c43c482e.png"
    },
    {
      "section_code": "MATH301",
      "name_course": "Calculus III",
      "modality": "virtual",
      "teacher": "Dr. Albert Einstein",
      "bg_image": "https://class.utp.edu.pe/static/media/course24%E2%81%847.c43c482e.png"
    },
    {
      "section_code": "HIST101",
      "name_course": "World History",
      "modality": "virtual",
      "teacher": "Dr. Emily Brown",
      "bg_image": "https://class.utp.edu.pe/static/media/course24%E2%81%847.c43c482e.png"
    },
    {
      "section_code": "PHYS202",
      "name_course": "Physics II",
      "modality": "virtual",
      "teacher": "Prof. Isaac Newton",
      "bg_image": "https://class.utp.edu.pe/static/media/course24%E2%81%847.c43c482e.png"
    },
    {
      "section_code": "CHEM105",
      "name_course": "General Chemistry",
      "modality": "virtual",
      "teacher": "Dr. Marie Curie",
      "bg_image": "https://class.utp.edu.pe/static/media/course24%E2%81%847.c43c482e.png"
    },
    {
      "section_code": "BIO204",
      "name_course": "Biology of Cells",
      "modality": "virtual",
      "teacher": "Dr. Charles Darwin",
      "bg_image": "https://class.utp.edu.pe/static/media/course24%E2%81%847.c43c482e.png"
    },
    {
      "section_code": "ART110",
      "name_course": "Art Appreciation",
      "modality": "virtual",
      "teacher": "Prof. Leonardo da Vinci",
      "bg_image": "https://class.utp.edu.pe/static/media/course24%E2%81%847.c43c482e.png"
    }
  ];

  const [courses, setCourses] = useState<Course[]>(sampleCourses);

  useEffect(() => {

    // consumo de API de cursos 
    const fetchCourses = async () => {
      try {
        console.log('Conectando');
        const response = await fetch('http://143.110.156.21:3000/courses');
        if (!response.ok) {
          throw new Error(' sin conexion');
        }
        console.log('conectado nice');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCourses();
  }, []);


  return (
    <Grid container spacing={3}>
      {courses.map((course, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Link href={`/${course.section_code}`} underline="none" style={{ textDecoration: 'none' }}>
            <Card className="bg-white shadow-md rounded-lg overflow-hidden">
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
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default Cursos;