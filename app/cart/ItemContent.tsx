import Link from "next/link";
import { CartProductType } from "../product/productDetails";
import { truncateText } from "../utils/truncate";
import { formatPrice } from "../utils/formatprice";
import Image from "next/image";
import SetQuantity from "../componets/products/SetQuantity";
import { useCart } from "@/hooks/useCart";


interface ItemContentProps{
    item:CartProductType
}


const ItemContent:React.FC<ItemContentProps> = ({item}) => {

    const {handleRemoveProductCart, handleQtyDecrease, handleQtyIncrease}=useCart()

    return ( 
        <div className="grid grid-cols-5 text-xs md:text-sm
        gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">

        <div className="cols-span-2 justify-self-start flex gap-2 md:gap-4">
<Link href={`/product/${item.id}`}>
    <div className="relative w-[70px] aspect-square">
        <Image src={item.selectedImg.image} alt={item.name}
        fill className="object-contain"/>
    </div>
</Link>
<div className="flex flex-col justify-between">
<Link  href={`/product/${item.id}`}>
    {truncateText(item.name)}
    <div>{item.selectedImg.color}</div>
    <div className="w-[70px]">
        <button className="text-slate-500 underline " onClick={()=>handleRemoveProductCart(item)}>
            Remove
        </button>
    </div>
</Link>
</div>
 </div>
        
 <div className="justify-self-center">{formatPrice(item.price)}</div>
 <div className="justify-self-center"> 
        <SetQuantity cartCounter={true}
        cartProduct={item}
        handleQtyDecrease={()=>{handleQtyDecrease(item)}}
        handleQtyIncrease={()=>{handleQtyIncrease(item)}}/>
 </div>
 <div className="justify-self-end font-semibold">{(item.price*item.quantity)}</div>
        </div>
     );
}
 
export default ItemContent;