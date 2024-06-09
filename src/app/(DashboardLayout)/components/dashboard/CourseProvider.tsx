import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Curso {
  section_code: string;
  name_course: string;
  modality: string;
  teacher: string;
  bg_image: string;
  number_groups: number;
}

interface CursosTipo {
  courses: Curso[];
  fetchCursos: () => void;
}

interface CursosProps {
  children: ReactNode;
}

const CourseContext = createContext<CursosTipo | undefined>(undefined);

export const CourseProvider: React.FC<CursosProps> = ({ children }) => {
  const [courses, setCourses] = useState<Curso[]>([]);

  const fetchCursos = async () => {
    if (courses.length === 0) { 
      try {
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
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  return (
    <CourseContext.Provider value={{ courses, fetchCursos }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = (): CursosTipo => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};
