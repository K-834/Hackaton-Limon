"use client";
import { Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import TableProyects from "../components/dashboard/TableProyects";
import "@/app/(DashboardLayout)/components/kanban/estilosKanban.css";
import { useEffect, useState } from "react";

const SamplePage = () => {
  const [sectionId, setSectionId] = useState(null);
  const [studentCode, setStudentCode] = useState(null);
  const [nameCurso, setNameCurso] = useState(null);
  const [numberGroups, setNumberGroups] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(1);
  const [students, setStudents] = useState([]);
  const [clanIds, setClanIds] = useState({});

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setSectionId(searchParams.get("sectionId"));
    setStudentCode(searchParams.get("studentCode"));
    setNameCurso(searchParams.get("nameCourse"));
    setNumberGroups(searchParams.get("numberGroups"));
  }, []);

  useEffect(() => {
    if (sectionId != null && studentCode != null && nameCurso != null) {
      const idGroup = `${sectionId}${currentGroup}`;

      fetch(`http://143.110.156.21:8080/api/projects/group/${idGroup}`)
        .then((response) => response.json())
        .then((data) => {
          setStudents(data.data.profiles);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [numberGroups, currentGroup]);

  useEffect(() => {
    const fetchClanIds = async () => {
      const newClanIds = {};
      for (const student of students) {
        const clanId = await fetchUsuario(student.studentCode);
        newClanIds[student.studentCode] = clanId;
      }
      setClanIds(newClanIds);
    };

    if (students.length > 0) {
      fetchClanIds();
    }
  }, [students]);

  const listGroups = (
    <div className="container" >
    <div >

    </div>
    {Array.from({ length: numberGroups }, (_, i) => (
      <div
        onClick={() => setCurrentGroup(i + 1)}
        key={i}
        className={`group ${i + 1 === currentGroup ? "selected" : ""}`}
        style={{fontSize: "1.125rem", fontWeight: "600"}}
      >
        GRUPO {i + 1}
      </div>
    ))}
    
  </div>
  );

  const clanImages = {
    1: "/images/clanes/Group_30.svg",
    2: "/images/clanes/Group_31.svg",
    3: "/images/clanes/Group_32.svg",
    4: "/images/clanes/Group_33.svg",
    5: "/images/clanes/Group_34.svg",
  };

  const fetchUsuario = async (storedUserData) => {
    if (storedUserData != null) {
      const response = await fetch(
        "http://143.110.156.21:8080/api/users/profile/" + storedUserData
      );
      const user = await response.json();
      return user.clan.id;
    }
  };

  const listStudents = (
    <div className="cards">
      {students.map((student, i) => (
        <div key={`${student.id}${i}`} className="card">
          <div className="image-container">
            <img src={student.urlImg} alt="avatar" />
          </div>
          <div className="card-body">
            <div className="card-header-clan">
              <h2>{student.fullname}</h2>
              {clanIds[student.studentCode] && (
                <img
                  src={clanImages[clanIds[student.studentCode]]}
                  alt="clan"
                />
              )}
            </div>
            <div className="contenedor-etiq-hobbies">
              {student.hobbies.hobbies.split(",").map((hobby, index) => (
                <p key={index} className="etiqueta-hobbies">
                  #{hobby.trim()}
                </p>
              ))}
            </div>

            <div className="field">
            <svg className="icon" viewBox="0 0 512 512">
                <path d="M239.208 343.937c-17.78 10.103-38.342 15.876-60.255 15.876-21.909 0-42.467-5.771-60.246-15.87C71.544 358.331 42.643 406 32 448h293.912c-10.639-42-39.537-89.683-86.704-104.063zM178.953 120.035c-58.479 0-105.886 47.394-105.886 105.858 0 58.464 47.407 105.857 105.886 105.857s105.886-47.394 105.886-105.857c0-58.464-47.408-105.858-105.886-105.858zm0 186.488c-33.671 0-62.445-22.513-73.997-50.523H252.95c-11.554 28.011-40.326 50.523-73.997 50.523z" />
                <g>
                  <path d="M322.602 384H480c-10.638-42-39.537-81.691-86.703-96.072-17.781 10.104-38.343 15.873-60.256 15.873-14.823 0-29.024-2.654-42.168-7.49-7.445 12.47-16.927 25.592-27.974 34.906C289.245 341.354 309.146 364 322.602 384zM306.545 200h100.493c-11.554 28-40.327 50.293-73.997 50.293-8.875 0-17.404-1.692-25.375-4.51a128.411 128.411 0 0 1-6.52 25.118c10.066 3.174 20.779 4.862 31.895 4.862 58.479 0 105.886-47.41 105.886-105.872 0-58.465-47.407-105.866-105.886-105.866-37.49 0-70.427 19.703-89.243 49.09C275.607 131.383 298.961 163 306.545 200z" />
                </g>
              </svg>
              <h1 className="icon-label">{student.studentCode}</h1>
            </div>
            <div className="field">
              <svg className="icon" viewBox="0 0 512 512">
                <path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z" />
              </svg>
              <h1 className="icon-label">{`${student.studentCode}@utp.edu.pe`}</h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const handleUnirse = () => {
    console.log("Unirse");
    const newUrl = `/proyectos?studentCode=${studentCode}&sectionId=${sectionId}&nameCourse=${nameCurso}`;
    window.location.href = newUrl;
  };

  return (
    <PageContainer
      title="Proyectos"
      description="Donde van los proyectos realizados"
    >
      <DashboardCard title="Grupos">
        <div className="grupos-page">
          {numberGroups != null ? (
            listGroups
          ) : (
            <Typography variant="h6">Cargando grupos...</Typography>
          )}
          <div className="integrantes">
            <div className="header-integrantes">
              <h2 className="integrantes-title">INTEGRANTES</h2>
              <button className="join-button" onClick={handleUnirse}>
                UNIRTE
              </button>
            </div>
            <div className="cards">
              {students.length > 0 ? (
                listStudents
              ) : (
                <Typography variant="h6">
                  No hay Integrantes por el momento
                </Typography>
              )}
            </div>
          </div>
        </div>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;
