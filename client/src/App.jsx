import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { publicRoutes } from './routes'
import Admin from './pages/admin/admin'

function App() {
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          return <Route key={index} path={route.path} element={<Layout> <Page /> </Layout>} />;
        })}
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </Router>
  )
}

export default App
