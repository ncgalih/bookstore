import Head from 'next/head'
import { Button, Space, Table } from 'antd'
import pool from '../../pool'
import Link from 'next/link'
import TableData from '../../Component/TableData'

const columns = [
  "Id", "Name"
]

export async function getServerSideProps(){
  const query = `SELECT 
    "Id",
    "Name"
    FROM "Costumer" `

  const result = await pool.query(query)

  return {props: {data: result.rows}}
}

export default function CostumerPage({data}) {
  return <TableData columns={columns} data={data} />
}
