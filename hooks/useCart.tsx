"use client"
import { CartProductType } from "@/app/product/productDetails";
import { createContext , useCallback, useContext, useEffect, useState} from "react"
import {toast}from"react-hot-toast"

type CartContextType={
    cartTotalQty:number;
    cartProducts:CartProductType[]|null
    handleAddProductCart:(product:CartProductType)=>void
    handleRemoveProductCart:(product:CartProductType)=>void
    handleQtyIncrease:(product:CartProductType)=>void
    handleQtyDecrease:(product:CartProductType)=>void
    handleClearCart:()=>void


}


 export const CartContext = createContext<CartContextType|null>(null)

 interface Props{
    [propName:string]:any
}

 export const CartContextProvider=(props:Props)=>{

    const [cartTotalQty, setCartTotalQty]=useState(0)
    const [cartProducts, setCartProducts]=useState<CartProductType[]|null>(null)

useEffect(()=>{
    const cartItems:any=localStorage.getItem('eShopCartItems')
   const cProducts:CartProductType[]|null=JSON.parse(cartItems)
   setCartProducts(cProducts)
},[])

const handleAddProductCart=useCallback((product:CartProductType)=>{
setCartProducts ((prev)=>{
    let updatedCart;
    if (prev){
        updatedCart=[...prev,product]
    }
    else{
        updatedCart=[product]
    }
toast.success('product add to cart')
    localStorage.setItem('eShopCartItems',JSON.stringify(updatedCart) )
    return updatedCart
})
},[])
const handleRemoveProductCart=useCallback((
    product:CartProductType
)=>{
    if(cartProducts){
        const filteredProducts=cartProducts.filter((item)=>{
            return item.id !== product.id
        })
        setCartProducts(filteredProducts)
        toast.success('product removed')
    localStorage.setItem('eShopCartItems',JSON.stringify(filteredProducts) )
    }
},[cartProducts])

const handleQtyIncrease=useCallback((product:CartProductType)=>{
    let updatedCart;
    if(product.quantity===99){
        return toast.error('Ooop! Maximum reached')
    }
    if(cartProducts){
        updatedCart=[...cartProducts]
        const existingIndex=cartProducts.findIndex((item)=>item.id===product.id)
            if(existingIndex>-1){
                updatedCart[existingIndex].quantity=++updatedCart[existingIndex].quantity
            }
            setCartProducts(updatedCart)
            localStorage.setItem('eShopCartItems',JSON.stringify(updatedCart))
            
    }
},[cartProducts])

const handleQtyDecrease=useCallback((product:CartProductType)=>{
    let updatedCart;
    if(product.quantity===1){
        return toast.error('Ooop! Maximum reached')
    }
    if(cartProducts){
        updatedCart=[...cartProducts]
        const existingIndex=cartProducts.findIndex((item)=>item.id===product.id)
            if(existingIndex>-1){
                updatedCart[existingIndex].quantity=--updatedCart[existingIndex].quantity
            }
            setCartProducts(updatedCart)
            localStorage.setItem('eShopCartItems',JSON.stringify(updatedCart))
            
    }
},[cartProducts])

const handleClearCart=useCallback(()=>{
    setCartProducts(null)
    setCartTotalQty(0)
    localStorage.setItem('eShopCartItems',JSON.stringify(null))

},[cartProducts])

    const value={
        cartTotalQty,
        cartProducts,
        handleAddProductCart,
        handleRemoveProductCart, 
        handleQtyIncrease,
        handleQtyDecrease,
        handleClearCart
    }
    return<CartContext.Provider value={value} {...props}/>
 }
 export const useCart=()=>{
    const context=useContext(CartContext);


    if (context===null){
        throw new Error("useCart must to be used within a CartContextProvider");
    }
    return context
 }
