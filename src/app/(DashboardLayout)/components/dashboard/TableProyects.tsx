
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip
} from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';

const products = [
    {
        id: 1,
        nombre: "Sussssnil Joshi",
        evaluacion:"Tarea",
        tipo:"Desarrollo de Software" ,
        lider: "Juan Pérez",
        pbg: "primary.main"
    },
    {
        id: 2,
        nombre: "Andrew McDownland",
        evaluacion:"Examen",
        tipo:  "Diseño Gráfico",
        lider: "María González",
        pbg: "secondary.main"
    },
    {
        id: 3,
        nombre: "Christopher Jamil",
        evaluacion: "Tarea",
        tipo: "Consultoría Médica",
        lider: "Carlos Hernández",
        pbg: "error.main"
    },
    {
        id: 4,
        nombre: "Nirav Joshi",
        evaluacion: "Tarea",
        tipo: "Desarrollo Web",
        lider: "Laura Martínez",
        pbg: "success.main"
    },
];


const ProductPerformance = () => {
    return (

       
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "wrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Nombre
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Evaluacion
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Tipo
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Lider
                                </Typography>
                            </TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>
                                <Typography
                                       
                                    >
                                        {product.nombre}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2" >
                                                {product.evaluacion}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                               
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {product.tipo}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {product.lider}
                                    </Typography>
                                    
                                </TableCell>
                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        
    );
};

export default ProductPerformance;
