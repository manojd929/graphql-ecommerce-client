import React from 'react'
import { Row, Navbar, Button } from 'reactstrap'
import Home from './components/Home'
import PayWithPayPal from './components/PayWithPayPal'

class App extends React.Component {
    state = {
        total: 0.00,
        checkoutList: [],
        isCheckout: false
    }

    onAdd = (name, value) => {
        this.setState({
            checkoutList: [...this.state.checkoutList, { name, value }],
            total: this.state.total + value
        })
    }

    render () {
        const { total, checkoutList, isCheckout } = this.state

        if (isCheckout) {
            return (
                <PayWithPayPal
                    total={total}
                    items={checkoutList}
                />
            )
        }
        return (
            <React.Fragment>
                <Row>
                    <Navbar color="light">
                        Laptop Store
                        <div style={{ marginLeft: '20px' }}>
                            <span>Total: Rs. {total}/-</span>
                            <Button
                                style={{ marginLeft: '20px' }}
                                onClick={() => {
                                    if (total > 0) {
                                        this.setState({ isCheckout: true })
                                    }
                                }}
                            >
                                Checkout {`(${checkoutList.length})`}
                            </Button>
                        </div>
                    </Navbar>
                </Row>
                <Home
                    onAdd={this.onAdd}
                />
            </React.Fragment>
        )
    }
}

export default App;
