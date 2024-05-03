import { useEffect, useState, React } from "react";
import gsap from "gsap";

export const PreLoader = () => {

    //States
    const [barHeight, setBarHeight] = useState(window.screen.availHeight / 5);

    //Bar Animation
    useEffect(() => {
        gsap.from(".bar", {
            height: 0,
            stagger: 0.2,
            duration: 0.4,
            ease: "power2.in",
            onComplete: removeBars()
        })
    }, [])

    //Remove Bars
    function removeBars() {
            gsap.to(".bar", {
                translateY: 100,
                opacity: 0,
                stagger: 0.2,
                duration: 0.4,
                ease: "power2.out"
            })
    }

    return (
        <>
            <div className="preloader fixed h-screen w-screen top-0 left-0 z-[999] bg-black">
                <div className="bars">
                    <div className="bar w-full border-b border-gray-400 bg-white" style={{ height: barHeight }} />
                    <div className="bar w-full border-b border-gray-400 bg-white" style={{ height: barHeight }} />
                    <div className="bar w-full border-b border-gray-400 bg-white" style={{ height: barHeight }} />
                    <div className="bar w-full border-b border-gray-400 bg-white" style={{ height: barHeight }} />
                    <div className="bar w-full border-b border-gray-400 bg-white" style={{ height: barHeight }} />
                </div>
            </div>
        </>
    )
}