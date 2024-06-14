import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Curso {
  section_code: string;
  name_course: string;
  modality: string;
  teacher: string;
  bg_image: string;
  number_groups: number;
}
interface Estudiante {
  id: number;
  studentCode: string;
  hobbies: {
    id: number;
    hobbies: string[];
  };
  points: number;
  clan: {
    id: number;
    description: string;
  };
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
  const [user, setUser] = useState<Estudiante[]>([]);
  
  if (typeof window !== "undefined" && "localStorage" in window) {
  const storedUserData = localStorage.getItem("userData");

  if (storedUserData === null) {
    window.location.href = "/authentication/login";
  }}

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


  const fetchUsuario = async () => {
    if (courses.length === 0) { 
      try {
        if (typeof window !== "undefined" && "localStorage" in window) {
          const storedUserData = localStorage.getItem("userData");
          const UserCode = storedUserData ? JSON.parse(storedUserData).code : null;

          if (storedUserData != null) {
            const response = await fetch('http://143.110.156.21:8080/api/users/profile/'+ UserCode);
            const user = await response.json();
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
          if (!response.ok) {
            throw new Error(' sin conexion');
          }
          }}

        } catch (error) {
          console.error('Error:', error);
    }
      
    }
  };

  useEffect(() => {
    fetchCursos();
    fetchUsuario();
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
