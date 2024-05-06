import { useEffect } from "react";

export const ScrollTop = () => {
    
    //Scroll To Top
    useEffect(()=>{
        window.scrollTo(0,0);
    },[])
    
    return null;
}