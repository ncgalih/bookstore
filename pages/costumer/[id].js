import { Button, Form, Input, Select, Space, message } from "antd";
import pool from "../../pool";
import Link from "next/link";
import { useRouter } from "next/router";

export async function getServerSideProps({params}){
    const query = `SELECT 
        *
        FROM "Costumer" 
        WHERE "Id"=${params.id}`

    const costumer = pool.query(query)

    return {props: {
        costumer: (await costumer).rows[0] 
    }}
}

export default function EditPage({costumer}){
    const router = useRouter()
    const submit = async (values) => {
        const update = fetch("/api/updateCostumer", {
            method: "POST", 
            body: JSON.stringify({...values, Id: costumer.Id})
        })
        try { 
            const res = await update 
            if(!res.ok) throw new Error(await res.text())
            router.push("./")
            message.info("updated")
        }
        catch (e) {message.error(e.message)}
    }
    return (<>
    <h2>Edit Book</h2>
    <Form 
        onFinish={submit}
        labelCol={{span: 4}} 
        initialValues={costumer} 
        style={{maxWidth: "40rem"}}
    >
        <Form.Item label="Name" name="Name">
            <Input />
        </Form.Item>
        <Form.Item >
            <Space>
                <Link href="./"><Button>Cancel</Button></Link>
                <Button type="primary" htmlType="submit">
                    Update
                </Button>
            </Space>
        </Form.Item>
    </Form>
    </>)
}