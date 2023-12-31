import React, { ChangeEvent, ReactElement } from 'react'
import { CartItemType, ReducerAction } from '../context/CartProvider'
import { ReducerActionType } from '../context/CartProvider'

type PropsType = {
    item: CartItemType,
    REDUCER_ACTION: ReducerActionType,
    dispatch: React.Dispatch<ReducerAction>
}

const CartLine = ({ item, REDUCER_ACTION, dispatch }: PropsType): ReactElement => {

    const img: string = new URL(`../imgs/${item.sku}.jpg`, import.meta.url).href

    const lineTotal: number = (item.quantity * item.price)

    const highestQty: number = 20 > item.quantity ? 20 : item.quantity

    const optionValues: number[] = [...Array(highestQty).keys()].map(i => i + 1)

    const options: ReactElement[] = optionValues.map(val => {
        return <option key={`opt${val}`} value={val}>{val}</option>
    })

    const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({
            type: REDUCER_ACTION.QUANTITY,
            payload: { ...item, quantity: Number(e.target.value) }
        })
    }

    const onRemoveFromCart = () => dispatch({
        type: REDUCER_ACTION.REMOVE,
        payload: item,
    })

    const content = (
        <li className="cart__item">
            <img src={img} alt={item.name} className="cart__img" />
            <div aria-label="Item Name">{item.name}</div>
            <div aria-label="Price Per Item">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}</div>

            <label htmlFor="itemQty" className="offscreen">
                Item Quantity
            </label>

            <select
                name="itemQty"
                id="itemQty"
                className="cart__select"
                value={item.quantity}
                aria-label="Item Quantity"
                onChange={onChangeQty}
            >{options}</select>

            <div className="cart__item-subtotal" aria-label="Line Item Subtotal">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(lineTotal)}
            </div>

            <button
                className="cart__button"
                aria-label="Remove Item From Cart"
                title="Remove Item From Cart"
                onClick={onRemoveFromCart}
            >
                ❌
            </button>
        </li>
    )


    return (
        content
    )
}

export default CartLine
