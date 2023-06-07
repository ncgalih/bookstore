import 'antd/dist/reset.css'
import '../styles/globals.css'
import { Layout, Menu } from 'antd'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  return (
    <Layout>
      <Layout.Sider>
        <Menu 
          style={{height: '100%'}} 
          items={[
            {label: "Home", key: "/"},
            {label: "Book", key: "/book"},
            {label: "Store", key: "/store"},
            {label: "Staff", key: "/staff"},
            {label: "Costumer", key: "/costumer"},
            {label: "Order", key: "/order"}
          ]}
          onSelect={(i)=>router.push(i.key)}/>
      </Layout.Sider>
      <Layout>
        <Layout.Content style={{padding: "2rem", minHeight: "100vh"}}>
          <h2 style={{color: "gray", marginBottom: "2rem"}}>Good Reading BookStore</h2>
          <Component {...pageProps} />        
        </Layout.Content>
      </Layout>
    </Layout>)
}
export default MyApp
