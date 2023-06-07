import { Button, Form, Input, Select, Space, message } from "antd";
import pool from "../../pool";
import Link from "next/link";
import { useRouter } from "next/router";

export async function getServerSideProps({params}){
    const queryStaff = `SELECT "Name", "Id" FROM "Staff"`
    const queryCostm = `SELECT "Name", "Id" FROM "Costumer"`
    const queryBook  = `SELECT "Name", "Id" FROM "Book"` 
    const staff = pool.query(queryStaff)
    const costumer = pool.query(queryCostm)
    const book = pool.query(queryBook)

    return {props: {
        staff: (await staff).rows, 
        costumer: (await costumer).rows,
        book: (await book).rows
    }}
}

export default function CreateOrderPage({staff, costumer, book}){
    const router = useRouter()
    const submit = async (values) => {
        console.log(values)
        const update = fetch("/api/createOrder", {
            method: "POST", 
            body: JSON.stringify({...values, Id: book.Id})
        })
        try { 
            const res = await update 
            if(!res.ok) throw new Error(await res.text())
            router.push("./")
            message.info("Created new order")
        }
        catch (e) {message.error(e.message)}
    }
    return (<>
    <h2>Create New Order</h2>
    <Form 
        onFinish={submit}
        labelCol={{span: 4}} 
        style={{maxWidth: "40rem"}}
    >
        <Form.Item label="Costumer" name="Costumer">
            <Select options={costumer.map(({Id, Name})=>({value: Id, label: Name}))}  />
        </Form.Item>
        <Form.Item label="Staff" name="Staff">
            <Select options={staff.map(({Id, Name})=>({value: Id, label: Name}))}  />
        </Form.Item>
        <Form.List name="Item">
            {(fields, {add, remove})=>(<>
                {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                        style={{width: "24rem"}}
                        {...restField}
                        name={[name, 'Item_id']}
                        rules={[{ required: true, message: 'Missing' }]}
                    >
                        <Select options={book.map(({Id, Name})=>({value: Id, label: Name}))} placeholder="select book" />
                    </Form.Item>
                    <Form.Item
                        {...restField}
                        name={[name, 'Quantity']}
                        rules={[{ required: true, message: 'Missing' }]}
                    >
                        <Input type="Number" placeholder="quantity" />
                    </Form.Item>
                    <Button onClick={() => remove(name)}>hapus</Button>
                    </Space>
                ))}
                <Form.Item>
                    <Button type="dashed" onClick={() => add()} block >
                    Add field
                    </Button>
                </Form.Item>
                </>)}
        </Form.List>
        <Form.Item >
            <Space>
                <Link href="./"><Button>Cancel</Button></Link>
                <Button type="primary" htmlType="submit">
                    Create
                </Button>
            </Space>
        </Form.Item>
    </Form>
    </>)
}