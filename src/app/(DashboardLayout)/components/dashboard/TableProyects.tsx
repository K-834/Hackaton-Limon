import React, { useEffect, useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

interface Project {
id: number;
name: string;
groupId: string;
type: {
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


useEffect(() => {
const searchParams = new URLSearchParams(window.location.search);
setSectionId(searchParams.get('sectionId'));
setStudentCode(searchParams.get('studentCode'));
setNameCurso(searchParams.get('nameCourse'));

}, []);

useEffect(() => {
const requestBody = {
studentCode: "U00000002",
sectionId: sectionId,
nameCourse: nameCurso
};

const fetchProjects = async () => {
try {
const response = await fetch('http://143.110.156.21:8080/api/projects/find-student-project', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody)
});
if (!response.ok) {
    throw new Error('Error fetching projects');
}
    const data = await response.json();
    setProjects(data.data.projects);
    setGrupo(data.data.group); // Guardar un objeto Group en lugar de un arreglo
    const leader = data.data.group.members.find((member: GroupMember) => member.leadMember);
    setMember(leader ? leader : null); // Guardar el miembro líder o null si no hay líder
    console.log('Data:', data);
    
} catch (error) {
console.error('Error:', error);
}
};

if (studentCode && sectionId) {
fetchProjects();
}
}, [studentCode, sectionId]);

const miembroLider = () => {
if (!grupo) return "No se encontró líder";
const leader = grupo.members.find((member) => member.leadMember);
return leader ? leader.fullname : "No se encontró líder";
};

return (
<PageContainer title="Proyectos" description="Donde van los proyectos realizados">
<DashboardCard>
<Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2>{`${nameCurso || " "}  - ${sectionId || " "}`}</h2>
        <Button variant="outlined">Añadir proyecto</Button>
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
    <TableCell>
        <Typography variant="subtitle2" fontWeight={600}>
        Tipo
        </Typography>
    </TableCell>
    <TableCell>
        <Typography variant="subtitle2" fontWeight={600}>
        Líder
        </Typography>
    </TableCell>
    </TableRow>
</TableHead>
<TableBody>
    {projects.map((project) => (
    <TableRow key={project.id}>
        <TableCell>
        <Typography>
            {project.name}
        </Typography>
        </TableCell>
        <TableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="subtitle2">
            {project.evaluation.description}
            </Typography>
        </Box>
        </TableCell>
        <TableCell>
        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
            {project.type.description}
        </Typography>
        </TableCell>
        <TableCell>
        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
            {miembroLider() || ""}
        </Typography>
        </TableCell>
        <TableCell>
            <Button variant="contained" href={`/Mkanban`}>
            {/* <Button variant="contained" href={`/mkanban/${project.id}`}> */}
                Ir
                </Button>
        </TableCell>
    </TableRow>
    ))}
</TableBody>
</Table>
</Box>
</DashboardCard>
</PageContainer>
);
};

export default Proyectos;
