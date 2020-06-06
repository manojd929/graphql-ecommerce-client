import React from 'react'
import {
    Container, Row, Col,
    Card, CardText, CardBody,
    CardSubtitle, Button, CardFooter, CardHeader
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
                    <Col>
                        {laptops.map((laptop, index) => {
                            const { id, name, description, price: { currency, value } } = laptop
                            return (
                                <Card key={index + id}>
                                    <CardHeader>
                                        {name}
                                    </CardHeader>
                                    <CardBody>
                                        <div
                                            style={{
                                                height: '200px',
                                                width: '200px',
                                            }}
                                        />
                                        <CardText>{description}</CardText>
                                    </CardBody>
                                    <CardFooter>
                                        <Row>
                                            <CardSubtitle>{currency + ' ' + value + '/-'}</CardSubtitle>
                                            <Button
                                                onClick={() => this.props.onAdd(name, value)}
                                            >
                                                Add
                                            </Button>
                                        </Row>
                                    </CardFooter>
                                </Card>
                            )
                        }
                        )}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Home
