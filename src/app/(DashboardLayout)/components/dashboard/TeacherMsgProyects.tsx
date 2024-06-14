import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

interface ProyectosAnunciosProps {
    colorBg: string;
    tipo: string;
    fecha: string;
    msg: string;
}


const Proyectos: React.FC<ProyectosAnunciosProps> = ({ colorBg, tipo, fecha, msg }) => {
    return (
        <PageContainer
            title="Proyectos"
            description="Donde van los proyectos realizados">
            <DashboardCard>
                <div style={{color:"rgb(24, 147, 255)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div
                            style={{ display: "flex", alignItems: "center", cursor: "text", justifyContent: "space-between" }}>

                            <div style={{ position: "relative", width: "15px" }}>
                                <div style={{ width: "15px", height: "15px", borderRadius: "50%", backgroundColor: colorBg }}></div>
                                <div style={{ position: "absolute", top: "0", right: "0" }}></div>
                            </div>

                            <span
                                style={{ fontWeight: "bold", fontSize: "0.8rem", marginLeft: "0.5rem", color: colorBg}}>
                                {tipo}
                            </span>
                        </div>


                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                            <span style={{ fontSize: "0.8rem", fontWeight: "normal", marginRight: "1rem" }}>
                                {fecha}
                            </span>
                        </div>
                    </div>
                    <p style={{ fontWeight: 'bold', cursor: 'text', color: 'Black', marginTop: '5px' }}>
                        {msg}
                    </p>
                </div>
            </DashboardCard>
        </PageContainer>
    );
};

export default Proyectos;