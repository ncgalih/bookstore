import { Button, Form, Input, Select, Space, message } from "antd";
import pool from "../../pool";
import Link from "next/link";
import { useRouter } from "next/router";

export async function getServerSideProps({params}){
    const queryStaff = `SELECT 
        *
        FROM "Staff" 
        WHERE "Id"=${params.id}`

    const queryStore = `SELECT "Name", "Id" FROM "Store"`
    const staff = pool.query(queryStaff)
    const store = pool.query(queryStore)

    return {props: {
        store: (await store).rows, 
        staff: (await staff).rows[0] 
    }}
}

export default function EditPage({store, staff}){
    const router = useRouter()
    const submit = async (values) => {
        const update = fetch("/api/updateStaff", {
            method: "POST", 
            body: JSON.stringify({...values, Id: staff.Id})
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
        initialValues={staff} 
        style={{maxWidth: "40rem"}}
    >
        <Form.Item label="Name" name="Name">
            <Input />
        </Form.Item>
        <Form.Item label="Email" name="Email">
            <Input />
        </Form.Item>
        <Form.Item label="Store" name="Store">
            <Select options={store.map(({Id, Name})=>({value: Id, label: Name}))}  />
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