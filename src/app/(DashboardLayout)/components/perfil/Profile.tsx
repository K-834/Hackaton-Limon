import { useState, useEffect } from "react";

interface Perfil {
  url_img: string;
  fullname: string;
  student_code: string;
}

const storedUserData = localStorage.getItem("userData");
const userData = storedUserData ? JSON.parse(storedUserData) : null;
const studentCode = userData.code;

export const Profile = () => {
  const [perfil, setPerfil] = useState<Perfil | null>(null);

  useEffect(() => {
    fetch("http://143.110.156.21:3000/users?student_code=" + studentCode)
      .then((response) => response.json())
      .then((data) => {
        setPerfil(data[0]); // selecciona el primer elemento del array
        console.log("perfil", data[0]);
      });
  }, []);

  return (
    <>
      <div style={{
            display: "flex",
            alignItems: "flex",
            flexDirection: "row",
            marginBottom:"1rem",
          }}
        >

        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: "white",
            padding: "0.5rem",
            borderRadius: "1rem",
            width: "100%",
            justifyContent: "flex-start",
          }}
        >
          <div
            style={{
              width: "7rem",
              height: "7rem",
              borderRadius: "50%",
              backgroundColor: "#2d3748",
              backgroundImage: `url(${perfil?.url_img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div style={{ marginLeft:"10px"}}>
            <h2
              style={{
                fontWeight: "800",
                fontSize: "1.5rem",
              }}
            >
              {perfil?.fullname}{" "}
              
            </h2>
            <h1 style={{ fontSize: "1rem", fontWeight: "400" }}>
                Ingeniería de Software
              </h1>
            {/* <p>{perfil?.student_code} </p> */}
          </div>
        </div>

        
      </div>
    </>
  );
};
