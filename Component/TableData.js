import { Space, Table, Button } from "antd"
import Link from "next/link"
import { useRouter } from "next/router"

const TableData = ({data, columns}) => {
  const router = useRouter()

  const ActionCol = {
    title: 'Action',
    render: (_, record)=>(
    <Space size="middle">
        <Button onClick={()=>router.push(router.asPath+"/"+record.Id.toString())}>Edit</Button>
    </Space>
    )
  }
  return (
    <>
     <Table 
        columns={[...columns.map(c=>({title: c, dataIndex: c})), ActionCol]} 
        dataSource={data} rowKey="Id"
        pagination={{pageSize: 6}} />
    </>
  )
}

export default TableData