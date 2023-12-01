"use client"
import { useEffect, useState } from "react";
import{useCallback} from"react"
import React from "react";
import{Rating} from"@mui/material"
import SetColor from'@/app/componets/products/SetColor'
import SetQuantity from "../componets/products/SetQuantity";
import Button from "../componets/Button";
import ProductImage from "../componets/products/productImage";
import { useCart } from "@/hooks/useCart";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";
// import { products } from "../utils/products";
import { products } from '@/app/utils/products';


interface ProductDetailProps{
    products:any;
}
export type CartProductType={
    id:string,
    name:string,
    description:string,
category:string,
brand:string,
selectedImg:SelectedImgType,
quantity:number,
price:number
}
export type SelectedImgType={
    color:string,
    colorCode:string,
    image:string
}
const Horizontal=()=>{
    return <hr className="w-[30%] my-1"/>
}



const ProductDetail:React.FC<ProductDetailProps> = ({products}) => {
const{handleAddProductCart,cartProducts}=useCart()

    const productRating= products.reviews.reduce((acc:number,item:any)=>item.rating+acc,0)/products.reviews.length

const[isProductInCart, setIsProductInCart]=useState(false)
    const [cartProduct, setCartProduct]=useState<CartProductType>({
    id:products.id,
    name:products.name,
    description:products.description,
category:products.category,
brand:products.brand,
selectedImg:{...products.images[0]},
quantity:1,
price:products.price
})

const router=useRouter()

console.log(cartProduct)
useEffect(()=>{
    setIsProductInCart(false)
    if(cartProducts){
        const existingIndex=cartProducts.findIndex((item)=>item.id===products.id)
        if(existingIndex>-1){
            setIsProductInCart(true)
        }
    }
},[cartProducts])
const handleColorSelect=useCallback((value:SelectedImgType)=>{
    setCartProduct((prev)=>{
        return{
            ...prev,selectedImg:value
        }
    })
},[cartProduct.selectedImg])
const handleQtyDecrease=useCallback(()=>{
    if(cartProduct.quantity===1){
        return;
    }
    setCartProduct((prev)=>{
        return{...prev, quantity:--prev.quantity}
    })
},[cartProduct])
const handleQtyIncrease=useCallback(()=>{
    if(cartProduct.quantity===99){
        return;
    }
    setCartProduct((prev)=>{
        return{...prev, quantity:++prev.quantity}
    })
},[cartProduct])

    return ( 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ProductImage cartProduct={cartProduct} product={products} 
            handleColorSelect={handleColorSelect}/>
            <div className="flex flex-col gap-1 text-slate-500 text-sm">
                <h2 className="text-3xl font-medium text-slate-700">{products.name}</h2>
                <div className="flex items-center gap-2">
                   <Rating value={productRating} readOnly/>
                   <div>{products.reviews.length}reviews</div>
                </div>
                <Horizontal/>
                <div className="text-justify">
                    {products.description}
                </div>
                <Horizontal/>
                <div>
                    <span className="font-semibold">Category:</span>{products.category}
                </div>
                <div>
                    <span className="font-semibold">Brand:</span>{products.brand}
                </div>
                <div className={products.inStock ? "text-teal-400 ":"text-rose-400"}>
                    {products.inStock ? "in Stock":"Out of Stock"}
                </div>
                <Horizontal/>
                {isProductInCart? (<>
                <p className="mb-2 text-slate-500 flex items-center gap-1">
                    <MdCheckCircle className="text-teal-4" size={20}/>
                    <span>Product added to cart</span>
                </p>
                <div className="max-w-[300px]">
                    <Button label="View Cart" outline onClick={()=>{router.push("/cart")}}/>
                </div>
                </>):(<>
                <div>
                    <SetColor cartProduct={cartProduct}
                    images={products.images}
                    handColorSelect={handleColorSelect}/>
                </div>
                <Horizontal/>
                <div>
                    <SetQuantity cartProduct={cartProduct}
                    handleQtyIncrease={handleQtyIncrease}
                    handleQtyDecrease={handleQtyDecrease}/>

                </div>
                <Horizontal/>
<div className="max-w-[300px]">
<Button label="Add To Cart"
onClick={()=>handleAddProductCart(cartProduct)}/>
</div>

                </>)}
                            </div>
        </div>
     );
}
 
export default ProductDetail;