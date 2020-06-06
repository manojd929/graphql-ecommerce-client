import React from 'react'
import { Button } from 'reactstrap'
import Home from './components/Home'
import PayWithPayPal from './components/PayWithPayPal'
import './App.css'

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
                <div className="home-container">
                    <div className="brand">Laptop Store</div>
                    <div className="checkout">
                        <div className="checkout-total">Total: Rs. {total}/-</div>
                        <Button
                            className="checkout-button"
                            onClick={() => {
                                if (total > 0) {
                                    this.setState({ isCheckout: true })
                                }
                            }}
                        >
                            Checkout {`(${checkoutList.length})`}
                        </Button>
                    </div>
                </div>
                <Home
                    onAdd={this.onAdd}
                />
            </React.Fragment>
        )
    }
}

export default App;
