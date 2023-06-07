import pool from '../../pool'
import TableData from '../../Component/TableData'

const columns = [
  "Id", "Name", "City", "Address", "Manager"
]

export async function getServerSideProps(){
  const query = `SELECT 
    "Store"."Id",
    "Store"."Name",
    "Address"."City",
    "Address"."Address",
    "Staff"."Name" AS "Manager"
    FROM "Store" 
    JOIN "Address"
    ON "Address"."Id"="Store"."Address"
    JOIN "Staff"
    ON "Manager"="Staff"."Id"`

  const result = await pool.query(query)

  return {props: {data: result.rows}}
}

export default function Store({data}) {
  return (<TableData columns={columns} data={data} />)
}