import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import "@/app/(DashboardLayout)/components/kanban/estilosKanban.css";

interface Project {
  id: number;
  name: string;
  groupId: string;
  type?: {
    id: string;
    description: string;
  };
  evaluation: {
    id: string;
    description: string;
  };
}

interface Group {
  id: string;
  members: GroupMember[];
}

interface GroupMember {
  studentCode: string;
  leadMember: boolean;
  fullname: string;
}

const Proyectos: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [grupo, setGrupo] = useState<Group | null>(null);
  const [member, setMember] = useState<GroupMember | null>(null);
  const [sectionId, setSectionId] = useState<string | null>(null);
  const [studentCode, setStudentCode] = useState<string | null>(null);
  const [nameCurso, setNameCurso] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formNameProject, setFormNameProject] = useState("");
  // const [formEvaluation, setFormEvaluation] = useState("");
  const [formType, setFormType] = useState("");
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [formEvaluation, setFormEvaluation] = useState("TA1");


  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setSectionId(searchParams.get("sectionId"));
    setStudentCode(searchParams.get("studentCode"));
    setNameCurso(searchParams.get("nameCourse"));
  }, []);

  useEffect(() => {
    const requestBody = {
      studentCode: "U00000001",
      sectionId: sectionId,
      nameCourse: nameCurso,
    };
    localStorage.setItem("requestBody", JSON.stringify(requestBody));
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "http://143.110.156.21:8080/api/projects/find-student-project",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );
        if (!response.ok) {
          throw new Error("Error fetching projects");
        }
        const data = await response.json();
        setProjects(data.data.projects);
        setGrupo(data.data.group); // Guardar un objeto Group en lugar de un arreglo
        const leader = data.data.group.members.find(
          (member: GroupMember) => member.leadMember
        );
        setMember(leader ? leader : null);

        // console.log("Data:", data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (studentCode && sectionId) {
      fetchProjects();
    }
  }, [studentCode, sectionId]);

  
  if (!grupo) return "No se encontró líder";
  localStorage.setItem("miembros", JSON.stringify(grupo.members));
  console.log("miembros:", grupo.members);
  // const miembroLider = () => {
  //   if (!grupo) return "No se encontró líder";
  //   const leader = grupo.members.find((member) => member.leadMember);
  //   localStorage.setItem("miembros", JSON.stringify(grupo.members));
  //   // console.log("miembros:", grupo.members);
  //   return leader ? leader.fullname : "No se encontró líder";
  // };

  const handleAddProject = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleAddProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingProject(true);

    const requestBody = {
      name: formNameProject,
      evaluationId: formEvaluation,
      typeId: formType,
      groupId: "CS1011",
    };

    const response = await fetch(
      `http://143.110.156.21:8080/api/projects/create-new-project`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      // Actualiza el estado de los proyectos para incluir el nuevo proyecto
      setProjects((prevProjects) => [...prevProjects, data]);
    } else if (response.status === 404) {
      // Maneja el error aquí
    }

    setIsAddingProject(false);
    window.location.reload()
  };

  return (
    <PageContainer
      title="Proyectos"
      description="Donde van los proyectos realizados"
    >
      <DashboardCard>
        <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2>{`${nameCurso || " "}  - ${sectionId || " "}`}</h2>
            <Button variant="outlined" onClick={() => handleAddProject()}>
              Añadir proyecto
            </Button>
          </div>
          <Table aria-label="simple table" sx={{ whiteSpace: "wrap", mt: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Nombre
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Evaluación
                  </Typography>
                </TableCell>
                {/* <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Tipo
                  </Typography>
                </TableCell> */}
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Nota
                  </Typography>
                </TableCell>
                {/* <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                  % Avance
                  </Typography>
                </TableCell> */}
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                  Acción
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <Typography>{project.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        fontWeight={400}
                      >
                        {project.evaluation ? project.evaluation.description : "No definido"}
                        
                      </Typography>
                    </Box>
                  </TableCell>
                  {/* <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {project.type ? project.type.description : "No definido"}
                    </Typography>
                  </TableCell> */}
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {"-" || ""}
                    </Typography>
                  </TableCell>
                  {/* <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {"0%" || ""}
                    </Typography>
                  </TableCell> */}
                  <TableCell>
                    <Button
                      variant="contained"
                      href={`/Mkanban?projectId=${project.id}`}
                    >
                      Ir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {isModalOpen && (
            <div className={`canvas-modal`}>
              <div
                className="projects-blackwall"
                onClick={() => setIsModalOpen((prev) => !prev)}
              ></div>
              <div className="projects-modal">
                <h2 className="title">Añadir proyecto</h2>
                <form
                  className="form-add-project"
                  onSubmit={handleAddProjectSubmit}
                >
                  <div className="input-form">
                    <label htmlFor="name">Nombre del proyecto</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      onChange={(e) => setFormNameProject(e.target.value)}
                    />
                  </div>
                  <div className="input-form">
                    <label htmlFor="evaluation">Evaluación</label>
                    <select
                      name="evaluation"
                      id="evaluation"
                      onChange={(e) => setFormEvaluation(e.target.value)}
                    >
                      <option value="TA3">Tarea Academica 2</option>
                      <option value="TA2">Tarea Academica 2</option>
                      <option value="TA1">Tarea Academica 1</option>
                      <option value="TF">Trabajo Final</option>
                    </select>
                  </div>
                  <div className="input-form">
                    <label htmlFor="type">Tipo</label>
                    <select
                      name="type"
                      id="type"
                      onChange={(e) => setFormType(e.target.value)}
                    >
                      <option value="ET">Ensayos y Trabajos Escritos</option>
                      <option value="PI">Proyectos de Investigación</option>
                      <option value="PP">Proyectos Prácticos</option>
                      <option value="TG">Trabajos en Grupo</option>
                    </select>
                  </div>
                  <button className="btn-submit-task" type="submit">
                    AÑADIR PROYECTO
                  </button>
                </form>
              </div>
            </div>
          )}
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Proyectos;

// Comentario
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Typography,
// } from "@mui/material";
// import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
// import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
// import "@/app/(DashboardLayout)/components/kanban/estilosKanban.css";

// interface Project {
//   id: number;
//   name: string;
//   groupId: string;
//   type?: {
//     id: string;
//     description: string;
//   };
//   evaluation: {
//     id: string;
//     description: string;
//   };
// }

// interface Group {
//   id: string;
//   members: GroupMember[];
// }

// interface GroupMember {
//   studentCode: string;
//   leadMember: boolean;
//   fullname: string;
// }

// const Proyectos: React.FC = () => {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [grupo, setGrupo] = useState<Group | null>(null);
//   const [member, setMember] = useState<GroupMember | null>(null);
//   const [sectionId, setSectionId] = useState<string | null>(null);
//   const [studentCode, setStudentCode] = useState<string | null>(null);
//   const [nameCurso, setNameCurso] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formNameProject, setFormNameProject] = useState("");
//   const [formEvaluation, setFormEvaluation] = useState("");
//   const [formType, setFormType] = useState("");
//   const [isAddingProject, setIsAddingProject] = useState(false);

//   useEffect(() => {
//     const searchParams = new URLSearchParams(window.location.search);
//     setSectionId(searchParams.get("sectionId"));
//     setStudentCode(searchParams.get("studentCode"));
//     setNameCurso(searchParams.get("nameCourse"));
//   }, []);

//   useEffect(() => {
//     const requestBody = {
//       studentCode: "U00000001",
//       sectionId: sectionId,
//       nameCourse: nameCurso,
//     };
//     localStorage.setItem("requestBody", JSON.stringify(requestBody));
//     const fetchProjects = async () => {
//       try {
//         const response = await fetch(
//           "http://143.110.156.21:8080/api/projects/find-student-project",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(requestBody),
//           }
//         );
//         if (!response.ok) {
//           throw new Error("Error fetching projects");
//         }
//         const data = await response.json();
//         setProjects(data.data.projects);
//         setGrupo(data.data.group); // Guardar un objeto Group en lugar de un arreglo
//         const leader = data.data.group.members.find(
//           (member: GroupMember) => member.leadMember
//         );
//         setMember(leader ? leader : null);

//         console.log("Data:", data);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     if (studentCode && sectionId) {
//       fetchProjects();
//     }
//   }, [studentCode, sectionId]);

//   const miembroLider = () => {
//     if (!grupo) return "No se encontró líder";
//     const leader = grupo.members.find((member) => member.leadMember);
//     localStorage.setItem("miembros", JSON.stringify(grupo.members));
//     console.log("miembros:", grupo.members);
//     return leader ? leader.fullname : "No se encontró líder";
//   };

//   const handleAddProject = () => {
//     setIsModalOpen((prev) => !prev);
//   };

//   const handleAddProjectSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsAddingProject(true);

//     const requestBody = {
//       name: formNameProject,
//       evaluation: formEvaluation,
//       typeId: formType,
//       groupId: "CS1011",
//     };

//     const response = await fetch(
//       `http://143.110.156.21:8080/api/projects/create-new-project`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(requestBody),
//       }
//     );

//     if (response.ok) {
//       const data = await response.json();
//       console.log(data);

//       // Actualiza el estado de los proyectos para incluir el nuevo proyecto
//       setProjects((prevProjects) => [...prevProjects, data]);
//     } else if (response.status === 404) {
//       // Maneja el error aquí
//     }

//     setIsAddingProject(false);
//   };

//   return (
//     <PageContainer
//       title="Proyectos"
//       description="Donde van los proyectos realizados"
//     >
//       <DashboardCard>
//         <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             <h2>{`${nameCurso || " "}  - ${sectionId || " "}`}</h2>
//             <Button variant="outlined" onClick={() => handleAddProject()}>
//               Añadir proyecto
//             </Button>
//           </div>
//           <Table aria-label="simple table" sx={{ whiteSpace: "wrap", mt: 2 }}>
//             <TableHead>
//               <TableRow>
//                 <TableCell>
//                   <Typography variant="subtitle2" fontWeight={600}>
//                     Nombre
//                   </Typography>
//                 </TableCell>
//                 <TableCell>
//                   <Typography variant="subtitle2" fontWeight={600}>
//                     Evaluación
//                   </Typography>
//                 </TableCell>
//                 <TableCell>
//                   <Typography variant="subtitle2" fontWeight={600}>
//                     Tipo
//                   </Typography>
//                 </TableCell>
//                 <TableCell>
//                   <Typography variant="subtitle2" fontWeight={600}>
//                     Líder
//                   </Typography>
//                 </TableCell>
//                 <TableCell>
//                   <Typography variant="subtitle2" fontWeight={600}>
//                     Acción
//                   </Typography>
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {projects.map((project) => (
//                 <TableRow key={project.id}>
//                   <TableCell>
//                     <Typography>{project.name}</Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                       <Typography
//                         color="textSecondary"
//                         variant="subtitle2"
//                         fontWeight={400}
//                       >
//                         {project.evaluation?.description || "No definido"}
//                       </Typography>
//                     </Box>
//                   </TableCell>
//                   <TableCell>
//                     <Typography
//                       color="textSecondary"
//                       variant="subtitle2"
//                       fontWeight={400}
//                     >
//                       {project.type ? project.type.description : "No definido"}
//                     </Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography
//                       color="textSecondary"
//                       variant="subtitle2"
//                       fontWeight={400}
//                     >
//                       {miembroLider() || ""}
//                     </Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       href={`/Mkanban?projectId=${project.id}`}
//                     >
//                       Ir
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           {isModalOpen && (
//             <div className={`canvas-modal`}>
//               <div
//                 className="projects-blackwall"
//                 onClick={() => setIsModalOpen((prev) => !prev)}
//               ></div>
//               <div className="projects-modal">
//                 <h2 className="title">Añadir proyecto</h2>
//                 <form
//                   className="form-add-project"
//                   onSubmit={handleAddProjectSubmit}
//                 >
//                   <div className="input-form">
//                     <label htmlFor="name">Nombre del proyecto</label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       onChange={(e) => setFormNameProject(e.target.value)}
//                     />
//                   </div>
//                   <div className="input-form">
//                     <label htmlFor="evaluation">Evaluación</label>
//                     <select
//                       name="evaluation"
//                       id="evaluation"
//                       onChange={(e) => setFormEvaluation(e.target.value)}
//                     >
//                       <option value="TA1">Tarea Academica 1</option>
//                       <option value="TF">Trabajo Final</option>
//                     </select>
//                   </div>
//                   <div className="input-form">
//                     <label htmlFor="type">Tipo</label>
//                     <select
//                       name="type"
//                       id="type"
//                       onChange={(e) => setFormType(e.target.value)}
//                     >
//                       <option value="ET">Ensayos y Trabajos Escritos</option>
//                       <option value="PI">Proyectos de Investigación</option>
//                       <option value="PP">Proyectos Prácticos</option>
//                       <option value="TG">Trabajos en Grupo</option>
//                     </select>
//                   </div>
//                   <button className="btn-submit-task" type="submit">
//                     AÑADIR PROYECTO
//                   </button>
//                 </form>
//               </div>
//             </div>
//           )}
//         </Box>
//       </DashboardCard>
//     </PageContainer>
//   );
// };

// export default Proyectos;
