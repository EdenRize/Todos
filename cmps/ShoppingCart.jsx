const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { CLEAR_CART, REMOVE_CAR_FROM_CART, SET_USER_SCORE } from '../store/store.js'

export function ShoppingCart({ isCartShown }) {
    const dispatch = useDispatch()
    // DONE: get from storeState
    const shoppingCart = useSelector(storeState => storeState.shoppingCart)
    // DONE: get from storeState
    const user = useSelector(storeState => storeState.loggedinUser)

    function removeFromCart(carId) {
        console.log(`Todo: remove: ${carId} from cart`)
        // DONE: use dispatch
        dispatch({ type: REMOVE_CAR_FROM_CART, carId })
    }

    function getCartTotal() {
        return shoppingCart.reduce((acc, car) => acc + car.price, 0)
    }

    function onCheckout() {
        const amount = getCartTotal()
        // TODO: checkout function that dispatch
        userService.updateScore(-amount)
            .then(score => {
                dispatch({ type: SET_USER_SCORE, score })
                dispatch({ type: CLEAR_CART })
                showSuccessMsg(`Charged you: $ ${amount.toLocaleString()}`)
            })
    }

    if (!isCartShown) return <span></span>
    const total = getCartTotal()
    return (
        <section className="cart" >
            <h5>Your Cart</h5>
            <ul>
                {
                    shoppingCart.map((car, idx) => <li key={idx}>
                        <button onClick={() => {
                            removeFromCart(car._id)
                        }}>x</button>
                        {car.vendor} | ${car.price}
                    </li>)
                }
            </ul>
            <p>Total: ${total} </p>
            <button disabled={!user || !total} onClick={onCheckout}>Checkout</button>
        </section>
    )
}
