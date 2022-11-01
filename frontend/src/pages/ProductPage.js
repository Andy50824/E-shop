import React, {useState, useEffect} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {getProduct} from '../reducers/detailReducer'
import { useSelector, useDispatch } from 'react-redux'
import {Row, Col, ListGroup, Image, Card, Button, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Alert'

 
function ProductPage() {
    const {productId} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const productDetail = useSelector(state => state.productDetail)
    const {error, product, loading} = productDetail
    const [itemQty, setItemQty] = useState(1)
    
    useEffect(() => {
        dispatch(getProduct(productId))
    }, [dispatch, productId])

    
    const addToCart = () => {
        navigate(`/cart/${productId}?itemQty=${itemQty}`)
    }

    return (<div>
                <Link to='/' className='btn btn-light my-3'>Go back</Link>
                {loading ? <Loader/>
                    : error ? <Message variant='danger'>{error}</Message>
                        :   
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
                                                    <Col>Status:</Col>
                                                    <Col>
                                                        <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            {product.countInStock > 0 &&
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Qty</Col>
                                                        <Col>
                                                            <Form.Control as='select' value={itemQty} onChange={(e) => setItemQty(e.target.value)}>
                                                                {[...Array(product.countInStock).keys()].map(x =>
                                                                    <option key={x+1} value={x+1}>{x+1}</option>)}
                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>}

                                            <ListGroup.Item>
                                                <Button className='btn w-100' size='lg' 
                                                type='button' disabled={product.countInStock == 0}
                                                onClick={addToCart}>Add to cart</Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
        
            }</div>
    )
}

export default ProductPage