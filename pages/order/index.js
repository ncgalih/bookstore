import Head from 'next/head'
import { Button, Space, Table } from 'antd'
import pool from '../../pool'
import Link from 'next/link'

const columns = [
  "Book", "Price", "Quantity", "Order_Id", "Store", "Costumer", "Staff"
]

export async function getServerSideProps(){
  const query = `SELECT 
    "Order_Item"."Order_Id", 
    "Order_Item"."Quantity", 
    "Order_Item"."Price",
    "Book"."Name" 		AS "Book",
    "Costumer"."Name" AS "Costumer",
    "Staff"."Name" 		AS "Staff",
    "Order"."Store"
    FROM "Order_Item" 
    JOIN "Order" ON "Order"."Id"="Order_Item"."Order_Id"
    JOIN "Book"	 ON "Book"."Id"="Order_Item"."Item_id"
    JOIN "Costumer" ON "Costumer"."Id"="Order"."Costumer"
    JOIN "Staff" ON "Staff"."Id"="Order"."Staff"
    ORDER BY "Order_Item"."Order_Id";`

  const result = await pool.query(query)

  return {props: {data: result.rows}}
}

export default function Home({data}) {
  return (<>
    <Link href="order/add">
      <Button type='primary' style={{marginBottom: "1rem"}}>
        Create New Order
      </Button>
    </Link>
    <Table 
      columns={columns.map(c=>({title: c, dataIndex: c}))} 
      dataSource={data} rowKey="Id"
      pagination={{pageSize: 6}} 
    />
  </>)
}
