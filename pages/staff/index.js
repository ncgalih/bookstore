import Head from 'next/head'
import { Button, Space, Table } from 'antd'
import pool from '../../pool'
import Link from 'next/link'
import TableData from '../../Component/TableData'

const columns = [
  "Id", "Name", "Store", "Email",
]

export async function getServerSideProps(){
  const query = `SELECT 
    "Staff"."Id",
    "Staff"."Name",
    "Email",
    "Store"."Name" AS "Store"
    FROM "Staff"
    JOIN "Store" ON "Staff"."Store"="Store"."Id" `

  const result = await pool.query(query)

  return {props: {data: result.rows}}
}

export default function StaffPage({data}) {
  return <TableData columns={columns} data={data} />
}
