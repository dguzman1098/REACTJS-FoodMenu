import React, { Component } from 'react';
import '../components/menu.css';
import burgerImage from '../images/burger.jpg';
import friesImage from '../images/fries.jpg';
import drinkImage from '../images/coca-cola.jpg';

//SET IMAGES
const image1 = <img className="product-img" src={burgerImage} alt="a juicy burger"></img>
const image2 = <img className="product-img" src={friesImage} alt="hot tasty fries"></img>
const image3 = <img className="product-img" src={drinkImage} alt="refreshing ice cold beverage"></img>

//ARRAY OF PRODUCTS
const products = [
    { url: image1, name: 'Burger', brand: 'McDonalds', price: '4.00', quantity: 8 },
    { url: image2, name: 'Hot Salty Fries', brand: 'Burger King', price: '2.50', quantity: 6 },
    { url: image3, name: 'Very Cold Soda', brand: 'Coca-cola', price: '2.00', quantity: 6 }
]

class productMenu extends Component {
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
            drinkQty: 0,

            beerOfTheDay: null,
            beerImg: null,
            beerCombo: null
        }
    }

    //Bindings
    handleBurger = this.handleBurger.bind(this);
    handleFries = this.handleFries.bind(this);
    handleDrink = this.handleDrink.bind(this);
    handleKeypress = this.handleKeypress.bind(this)

    handleKeypress(event) {
        const characterCode = event.key
        if (characterCode === 'Backspace') return

        const characterNumber = Number(characterCode)
        if (characterNumber < 0) {
            if (event.currentTarget.value) {
                return
            } else if (characterNumber === 0) {
                event.preventDefault()
            }
        } else {
            event.preventDefault()
        }
    }

    handleBurger(event) {
        this.setState({
            burgerTotal: event.target.value * products[0].price,
            burgerQty: parseInt(event.target.value),
        })

        if (this.state.burgerQty < 0) {
            this.setState({
                burgerQty: 0
            })
        }
    }

    handleFries(event) {
        this.setState({
            friesTotal: event.target.value * products[1].price,
            friesQty: parseInt(event.target.value)
        })
    }

    handleDrink(event) {
        this.setState({
            drinkTotal: event.target.value * products[2].price,
            drinkQty: parseInt(event.target.value)
        })
    }

    async componentDidMount() {
        const url = "https://api.punkapi.com/v2/beers/random";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ beerOfTheDay: data[0].name, beerImg: data[0].image_url, beerCombo: data[0].food_pairing })
        console.log(this.state.beerImg);
    }

    render() {
        return (
            <div className="body">
                <h1 style={{color: "red"}}>BurgersBeersNFries</h1>
                <div className="message-box">
                    <b>BEER OF THE DAY:</b> {this.state.beerOfTheDay}
                    <br />
                    <img className="beer-img" src={this.state.beerImg} alt="a tasty beer" />
                    <br />
                    <b>GOES WELL WITH: {this.state.beerCombo}</b>
                    <br />
                </div>

                <div className="cart">
                    <p>ITEMS IN CART: {this.state.burgerQty + this.state.friesQty + this.state.drinkQty}</p>
                </div>
                <table className="product-table">
                    <thead>
                        <tr className="row-title">
                            <th>Item</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="product-row">
                            <td>{products[0].url}</td>
                            <td>{products[0].name}</td>
                            <td>{products[0].brand}</td>
                            <td>${products[0].price}</td>
                            <td><input value={this.state.burgerQty} onChange={this.handleBurger} type="number" min="0" max={products[0].quantity} onKeyDown={this.handleKeypress}></input></td>
                            <td className="enjoy-msg">{this.state.burgerQty > 0 ? 'enjoy your burger' : 'no burger today?'}</td>
                        </tr>

                        <tr className="product-row">
                            <td>{products[1].url}</td>
                            <td>{products[1].name}</td>
                            <td>{products[1].brand}</td>
                            <td>${products[1].price}</td>
                            <td><input value={this.state.friesQty} onChange={this.handleFries} type="number" min="0" max={products[1].quantity} onKeyDown={this.handleKeypress}></input></td>
                            <td className="enjoy-msg">{this.state.friesQty > 0 ? 'enjoy your fries' : 'no fries today?'}</td>
                        </tr>

                        <tr className="product-row">
                            <td>{products[2].url}</td>
                            <td>{products[2].name}</td>
                            <td>{products[2].brand}</td>
                            <td>${products[2].price}</td>
                            <td><input value={this.state.drinkQty} onChange={this.handleDrink} type="number" min="0" max={products[2].quantity} onKeyDown={this.handleKeypress}></input></td>
                            <td className="enjoy-msg">{this.state.drinkQty > 0 ? 'enjoy your drink' : 'no drink today?'}</td>
                        </tr>
                        <tr>
                            <td><div className="total">
                                Total ${this.state.burgerTotal + this.state.friesTotal + this.state.drinkTotal}
                            </div>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>

        );
    };
}

export default productMenu;
