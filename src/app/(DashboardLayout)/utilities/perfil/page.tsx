'use client';
import React, { useEffect, useState } from 'react';
import { Paper, Grid } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Header from '../../components/perfil/Header';
import { Profile } from '../../components/perfil/Profile'; // Import the 'Perfil' type
import { Tags } from '../../components/perfil/Tags';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

const Shadow = () => {
  const [hobbies, setHobbies] = useState(null);
  const [perfil, setPerfil] = useState<null>(null);
  
  useEffect(() => {
    fetch('http://143.110.156.21:8080/api/users/profile/U00000001')
        .then(response => response.json())
        .then(data => setHobbies(data));
  
    fetch('http://143.110.156.21:3000/users?student_code=U00000001')
        .then(response => response.json())
        .then(data => setPerfil(data));
  }, []);
  
  

  return (
    <PageContainer title="Perfil" description="this is perfil">
      <DashboardCard title="Perfil">
        <Grid container spacing={2}>
          <div style={{
            backgroundColor: '#ebf8ff',
            padding: '1.5rem',
            borderRadius: '1rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            maxWidth: '64rem',
            margin: '0 auto'
          }}>
            <Header />
            <Profile/>
            <Tags />
            <div style={{
              backgroundColor: '#ffffff',
              padding: '1rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              marginBottom: '1rem'
            }}>
              <h3 style={{fontWeight: 'bold', marginBottom: '0.5rem'}}>EXP de esta semana</h3>
              <div style={{width: '100%', height: '8rem', backgroundColor: '#f0f0f0', borderRadius: '0.5rem'}}>
                {/* Placeholder for the chart */}
              </div>
            </div>
            <div style={{
              backgroundColor: '#ffffff',
              padding: '1rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
            }}>
              <h3 style={{fontWeight: 'bold', marginBottom: '0.5rem'}}>Logros</h3>
              <div style={{display: 'flex', gap: '0.5rem'}}>
                <div style={{width: '4rem', height: '4rem', backgroundColor: '#fed7d7', borderRadius: '0.5rem'}}> <img src="/images/insignias/caballero.png" alt="" style={{width: '4rem', height: '4rem'}}/> </div>
                <div style={{width: '4rem', height: '4rem', backgroundColor: '#fefcbf', borderRadius: '0.5rem'}}> <img src="/images/insignias/elixir.png" alt="" style={{width: '4rem', height: '4rem'}}/>  </div>
                <div style={{width: '4rem', height: '4rem', backgroundColor: '#fbd38d', borderRadius: '0.5rem'}}> <img src="/images/insignias/medalla-de-oro.png" alt="" style={{width: '4rem', height: '4rem'}}/>  </div>
                <div style={{width: '4rem', height: '4rem', backgroundColor: '#c6f6d5', borderRadius: '0.5rem'}}> <img src="/images/insignias/tienda-de-campana.png" alt="" style={{width: '4rem', height: '4rem'}}/>  </div>
              </div>
              <div style={{textAlign: 'right', marginTop: '0.5rem'}}>
                <a href="#" style={{color: '#4299e1'}}>VER TODOS</a>
              </div>
            </div>
          </div>
        </Grid> 
      </DashboardCard>
    </PageContainer>
  );
};

export default Shadow;
