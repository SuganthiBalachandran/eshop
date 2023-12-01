"use client"

import { useCart } from "@/hooks/useCart";
import { MdArrowBack } from "react-icons/md";
import Link from "next/link";
import Heading from "../product/heading";
import Button from "../componets/Button";
import ItemContent from"../cart/ItemContent";

const CartClient = () => {

const{cartProducts, handleClearCart}=useCart()
if(!cartProducts||cartProducts.length===0){
    return 
    <div className="flex flex-col items-center">
        <div className="text-2xl">Your cart is empty</div>
        <div>
            <Link href={'/'} className="
            text-slate-500 mt-2 flex items-center">
                <MdArrowBack/>
                <span>Start Shopping</span>
            </Link>
        </div>
    </div>
}

    return ( <div>
<Heading title="Shipping Cart" center/>
<div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
    <div className="cols-span-2 justify-self-start">PRODUCT</div>
    <div className="justify-self-center">PRICE</div>
    <div className="justify-self-center">QUALITY</div>
    <div className="justify-self-end">TOTAL</div>
</div>
<div>{cartProducts && cartProducts.map((item)=>{
return<ItemContent key={item.id} item={item}/>
})}
</div>
<div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between">
<div className="w-[90px]">
    <Button label="Clear Cart" onClick={()=>{handleClearCart()}} small outline/>
</div>
<div className="text-sm flex flex-col gap-1">
    <div className="flex justify-between w-full text-base font-semibold">
    <span>Subtotal</span>
    <span>$367.00</span>
    </div>
    <p className="text-slate-500">Taxes and Shipping calculate at checkout</p>
    <Button label="Checkout" onClick={()=>{}}/>
    <Link href={'/'} className="
            text-slate-500 mt-2 flex items-center">
                <MdArrowBack/>
                <span>Continue Shopping</span>
            </Link>
</div>
</div>
    </div> );
}
 
export default CartClient;