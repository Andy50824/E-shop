import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import {Row, Col, ListGroup, Image, Card, Button} from 'react-bootstrap'
import Rating from '../components/Rating'

 
function ProductPage() {
    const [product, setProduct] = useState([])
    const {productId} = useParams()

    useEffect(() => {

        async function fetchingData() {
            const {data} = await axios.get(`/api/products/${productId}`)
            setProduct(data)
        }
        fetchingData()
    }, [])

    
    //const product = products.find((p) => p._id == productId)


    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go back</Link>
            <Row>
                <Col md={6}>
                    <Image alt={product.name} src={product.image} fluid/>
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color='yellow' />
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Price: {product.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status</Col>
                                    <Col>
                                        <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button className='btn w-100' size='lg' type='button' disabled={product.countInStock == 0}>Add to cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

        </div>

  )
}

export default ProductPage