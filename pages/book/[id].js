import { Button, Form, Input, Select, Space, message } from "antd";
import pool from "../../pool";
import Link from "next/link";
import { useRouter } from "next/router";

export async function getServerSideProps({params}){
    const queryBook = `SELECT * FROM "Book" WHERE "Id"=${params.id}`
    const queryPubs = `SELECT "Name", "Id" FROM "Publisher"`
    const book = pool.query(queryBook)
    const pubs = pool.query(queryPubs)

    return {props: {
        book: (await book).rows[0], 
        publisher: (await pubs).rows 
    }}
}

export default function EditPage({book, publisher}){
    const router = useRouter()
    const submit = async (values) => {
        const update = fetch("/api/updateBook", {
            method: "POST", 
            body: JSON.stringify({...values, Id: book.Id})
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
        initialValues={book} 
        style={{maxWidth: "40rem"}}
    >
        <Form.Item label="Name" name="Name">
            <Input />
        </Form.Item>
        <Form.Item label="Publication Year" name="Publication_Year">
            <Input type="Number" />
        </Form.Item>
        <Form.Item label="Pages" name="Pages">
            <Input type="Number" />
        </Form.Item>
        <Form.Item label="Price" name="Price">
            <Input type="Number" />
        </Form.Item>
        <Form.Item label="Publisher" name="Publisher">
            <Select options={publisher.map(({Id, Name})=>({value: Id, label: Name}))}  />
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