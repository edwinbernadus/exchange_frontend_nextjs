import '../styles/globals.css'
import Layout from "../components/Layout";
import {UserProvider} from "@auth0/nextjs-auth0";


function MyApp({ Component, pageProps }) {
  // return <Component {...pageProps} />

  return <UserProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </UserProvider>

  // return <UserProvider>
  //   <Layout>
  //     <div>test</div>
  //   </Layout>
  // </UserProvider>

}

export default MyApp
