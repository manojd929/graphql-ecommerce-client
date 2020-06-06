import React from 'react'
import {
    Container, Row, Col,
    Card, CardText, CardBody,
    Button, CardFooter, CardHeader
} from 'reactstrap';
import Loader from './Loader'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            laptops: null,
            fatalError: false,
            loading: true
        }
    }

    componentDidMount () {
        const productsListQuery = `{
            getProductsList {
                id
                name
                description
                price {
                    currency
                    value
                }
            }
        }`
        fetch('http://localhost:4000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: productsListQuery })
        }).then(
            (response) => response.json()
        ).then((response) => {
            this.setState({ laptops: response.data.getProductsList, loading: false })
        }).catch((err) => {
            this.setState({ fatalError: true })
        })
    }
    render () {
        const { fatalError, loading, laptops } = this.state
        if (fatalError) {
            return (
                <div>
                    Sorry, an error occurred. Please try again
                </div>
            )
        }

        if (loading) {
            return (
                <Loader />
            )
        }

        return (
            <Container fluid={true}>
                <Row>
                    {laptops.map((laptop, index) => {
                        const { id, name, description, price: { currency, value } } = laptop
                        return (
                            <Col lg="4" md="6" sm="12" key={index}>
                                <Card key={index + id}>
                                    <CardHeader>
                                        <b>{name}</b>
                                    </CardHeader>
                                    <CardBody>
                                        <img
                                            className="image"
                                            src={require('./laptop_image.jpg')}
                                            alt="Laptop"
                                        />
                                        <CardText>{description}</CardText>
                                    </CardBody>
                                    <CardFooter>
                                        <div className="card-footer" style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <div>{currency + ' ' + value + '/-'}</div>
                                            <Button
                                                onClick={() => this.props.onAdd(name, value)}
                                            >
                                                Add to Cart
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </Col>
                        )
                    }
                    )}
                </Row>
            </Container>
        )
    }
}

export default Home
