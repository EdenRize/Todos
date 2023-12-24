const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux

import { UserMsg } from './UserMsg.jsx'


export function AppFooter() {
  const dispatch = useDispatch()

  const cart = []

  return (
    <footer>
      <h5>Currently {carsCount} cars in the shop</h5>
      <p>Coffeerights to all - Count: {count}</p>
      <h5>
        <span>{cart.length}</span> Products in your Cart
        <a
          href="#"
          onClick={(ev) => {
            ev.preventDefault()
            dispatch({ type: SET_CART_IS_SHOWN, isCartShown: !isCartShown })
          }}
        >
          ({isCartShown ? 'hide' : 'show'})
        </a>
      </h5>

      <ShoppingCart isCartShown={isCartShown} />
      <UserMsg />
    </footer>
  )
}
