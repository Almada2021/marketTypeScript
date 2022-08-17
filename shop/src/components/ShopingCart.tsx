import React from 'react'
import { Offcanvas, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCardContext'
import { formatCurrency } from '../utilities/formatCurrency'
import storeItem from "../data/items.json"
import CartItem from './CartItem'
type ShopingCartProps = {
    isOpen : boolean
}
export default function ShopingCart({isOpen} :ShopingCartProps) {
    const {closeCart , cartItems} = useShoppingCart()
    return (
        <Offcanvas show={isOpen} onHide={closeCart}  placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map((item)=> (
                        <CartItem key={item.id} {...item}></CartItem>
                    ))}
                </Stack>
                <div className="ms-auto fw-bold fs-5"> 
                    Total  {formatCurrency(cartItems.reduce((total,cartItem) =>{
                        const item = storeItem.find(i => i.id === cartItem.id)
                        return total + (item?.price || 0)* cartItem.quantity
                    },0)
                    )}
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
