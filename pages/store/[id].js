import { Button, Form, Input, Select, Space, message } from "antd";
import pool from "../../pool";
import Link from "next/link";
import { useRouter } from "next/router";

export async function getServerSideProps({params}){
    const queryStore = `SELECT 
        "Store"."Id",
        "Store"."Name",
        "Address"."City",
        "Address"."Address",
        "Manager"
        FROM "Store" JOIN "Address" 
        ON "Address"."Id"="Store"."Address"
        WHERE "Store"."Id"=${params.id}`

    const queryStaff = `SELECT "Name", "Id" FROM "Staff"`
    const store = pool.query(queryStore)
    const staff = pool.query(queryStaff)

    return {props: {
        store: (await store).rows[0], 
        staff: (await staff).rows 
    }}
}

export default function EditPage({store, staff}){
    const router = useRouter()
    const submit = async (values) => {
        const update = fetch("/api/updateStore", {
            method: "POST", 
            body: JSON.stringify({...values, Id: store.Id})
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
        initialValues={store} 
        style={{maxWidth: "40rem"}}
    >
        <Form.Item label="Name" name="Name">
            <Input />
        </Form.Item>
        <Form.Item label="Address" name="Address">
            <Input />
        </Form.Item>
        <Form.Item label="City" name="City">
            <Input />
        </Form.Item>
        <Form.Item label="Manager" name="Manager">
            <Select options={staff.map(({Id, Name})=>({value: Id, label: Name}))}  />
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