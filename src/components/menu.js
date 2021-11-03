import React from 'react';
import '../components/menu.css';
import burgerImage from '../images/burger.jpg';
import friesImage from '../images/fries.jpg';
import drinkImage from '../images/coca-cola.jpg';

//SET IMAGES
const image1 = <img src={burgerImage} alt="a juicy burger"></img>
const image2 = <img src={friesImage} alt="hot tasty fries"></img>
const image3 = <img src={drinkImage} alt="refreshing ice cold beverage"></img>

//ARRAY OF PRODUCTS
const products = [
    { url: image1, name: 'Burger', brand: 'McDonalds', price: '4.00', quantity: 8 },
    { url: image2, name: 'Hot Salty Fries', brand: 'Burger King', price: '2.50', quantity: 6 },
    { url: image3, name: 'Very Cold Soda', brand: 'Coca-cola', price: '2.00', quantity: 6 }
]

class productMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: 0,
            burgerTotal: 0,
            friesTotal: 0,
            drinkTotal: 0,
            finalTotal: 0,

            burgerQty: 0,
            friesQty: 0,
            drinkQty: 0
        }
    }

    //Bind
    handleBurger = this.handleBurger.bind(this);
    handleFries = this.handleFries.bind(this);
    handleDrink = this.handleDrink.bind(this);

    handleBurger(event) {
        this.setState({
            burgerTotal: event.target.value * products[0].price,
            burgerQty: eval(event.target.value)
        })

    }

    handleFries(event) {
        this.setState({
            friesTotal: event.target.value * products[1].price,
            friesQty: eval(event.target.value)
        })
    }

    handleDrink(event) {
        this.setState({
            drinkTotal: event.target.value * products[2].price,
            drinkQty: eval(event.target.value)
        })
    }



    render() {
        return (
            <div>
                <div>
                    Items in Cart: {this.state.burgerQty + this.state.friesQty + this.state.drinkQty}
                </div>
                <table className="product-table">
                    <tr className="row-title">
                        <th>Item</th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>

                    <tr className="product-row">
                        <td>{products[0].url}</td>
                        <td>{products[0].name}</td>
                        <td>{products[0].brand}</td>
                        <td>${products[0].price}</td>
                        <input onChange={this.handleBurger} type="number" min="0" max={products[0].quantity}></input>
                        <td>{this.state.burgerQty > 0 ? 'enjoy your burger' : 'no burger today?'}</td>
                    </tr>

                    <tr className="product-row">
                        <td>{products[1].url}</td>
                        <td>{products[1].name}</td>
                        <td>{products[1].brand}</td>
                        <td>${products[1].price}</td>
                        <input onChange={this.handleFries} type="number" min="0" max={products[1].quantity}></input>
                        <td>{this.state.friesQty > 0 ? 'enjoy your fries' : 'no fries today?'}</td>
                    </tr>

                    <tr className="product-row">
                        <td>{products[2].url}</td>
                        <td>{products[2].name}</td>
                        <td>{products[2].brand}</td>
                        <td>${products[2].price}</td>
                        <input onChange={this.handleDrink} type="number" min="0" max={products[2].quantity}></input>
                        <td>{this.state.drinkQty > 0 ? 'enjoy your drink' : 'no drink today?'}</td>
                    </tr>

                    <div className="total">
                        Total ${this.state.burgerTotal + this.state.friesTotal + this.state.drinkTotal}
                    </div>
                </table>
            </div>

        );
    };
}



export default productMenu;
