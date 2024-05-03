import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export const Navbar = () => {

    //refs
    const nav = useRef(null);

    //Hide on Scroll
    let scrollY = 0;
    useEffect(() => {
        const hideOnScroll = () => {
            if (window.scrollY > scrollY) {
                nav.current.classList.add("hide");
            }
            else {
                nav.current.classList.remove("hide");
            }
            scrollY = window.scrollY;
        }

        window.addEventListener("scroll", hideOnScroll);

        return () => window.removeEventListener("scroll", hideOnScroll);
    }, [])

    return (
        <nav ref={nav} className="fixed top-0 left-0 w-screen z-50">
            <div className="navbar-container flex gap-5 items-center justify-between p-5 text-white">
                <div className="left user-select-none">
                    <Link to="/about" className="hover:underline underline-offset-2">About</Link>
                </div>
                <div className="middle">
                    <Link to="/" className="text-4xl bit-font">SENTINEL</Link>
                </div>
                <div className="right">
                    <Link to="/contact" className="hover:underline underline-offset-2">Contact</Link>
                </div>
            </div>
        </nav>
    )
}