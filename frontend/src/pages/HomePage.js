import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'

function HomePage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchingData () {
      const {data} = await axios.get('api/products/')
      setProducts(data)
    }
    fetchingData()
  }, [])

  return (
    <div>
        <h1>Latest products</h1>
        <Row>
            {products.map(product => (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                    <Product product={product} />
                </Col>
            ))}
        </Row>
    </div>
  )
}

export default HomePage