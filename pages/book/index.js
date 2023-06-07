import Head from 'next/head'
import { Button, Space, Table } from 'antd'
import pool from '../../pool'
import Link from 'next/link'
import TableData from '../../Component/TableData'

const columns = [
  "Id", "Name", "Publisher", "Publication_Year", "Pages", "Price"
]

export async function getServerSideProps(){
  const query = `SELECT 
    "Book"."Id",
    "Book"."Name",
    "Publication_Year",
    "Pages",
    "Publisher"."Name" AS "Publisher",
    "Price"
    FROM "Book" 
    INNER JOIN "Publisher" 
    ON "Book"."Publisher" = "Publisher"."Id"`

  const result = await pool.query(query)

  return {props: {data: result.rows}}
}

export default function Home({data}) {
  return <TableData columns={columns} data={data} />
}
