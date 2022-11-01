import { Container } from 'react-bootstrap'

import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header'

import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'


function App() {
  return (
    <Router>
        <Header/>
        <main className='py-3'>
          <Container>
            <Routes>
              <Route exact path='/' element={< HomePage />}></Route> 
              <Route path='/product/:productId' element={< ProductPage />}></Route>
              <Route path='/cart/*' element={< CartPage />}></Route>
            </Routes>
          </Container>
        </main>
        <Footer/>
    </Router>
  );
}

export default App;
