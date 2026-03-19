import '../styles/globals.css'
import Layout from '../components/Layout'
import { AuthProvider } from '../context/AuthContext'

export default function MyApp({ Component, pageProps }) {
  // Check if page needs layout (auth pages don't need header/footer)
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>)

  return (
    <AuthProvider>
      {getLayout(<Component {...pageProps} />)}
    </AuthProvider>
  )
}
