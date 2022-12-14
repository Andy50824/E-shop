import React, {useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import { useSelector, useDispatch } from 'react-redux'
import {getProducts} from '../reducers/productReducer'
import Loader from '../components/Loader'
import Message from '../components/Alert'

function HomePage() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error, products, loading} = productList

  useEffect(() => {
      dispatch(getProducts())
  }, [dispatch])

  return (
    <div>
        <h1>Latest products</h1>
        {loading ? <Loader/>
          : error ? <Message variant='danger'>{error}</Message>
            : <Row>
                  {products.map(product => (
                  <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                      <Product product={product} />
                  </Col>))}
              </Row>}
    </div>
  )
}

export default HomePage