import Container from "../componets/container";
import CartClient from "./CartClient";

const Cart = () => {
    return ( 
        <div className="pt-8">
            <Container>
                <CartClient/>
            </Container>
        </div>
     );
}
 
export default Cart;