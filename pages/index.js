import { Typography } from "antd";
const { Title } = Typography

export default function Home(){
    return (
        <>
        <Title level={2} 
            type="secondary"
            style={{textAlign: "center", marginTop: "6rem"}}>
            Selamat Datang
        </Title>

        <Title level={1} 
            style={{marginTop: 0, textAlign: "center"}}>
            Sistem Informasi GRB
        </Title>
        </>
    )
}