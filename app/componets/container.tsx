import React from "react";

interface Containerprops{
    children: React.ReactNode;
}
const Container:React.FC<Containerprops> = ({children}) => {
    return ( 
        <div
        className="max-w-[1920px]
        mx-auto px-4
        xl:px-20
        md:px-2"
        >
            
            {children}</div>
     );
}
 
export default Container;