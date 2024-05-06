import { useEffect, useRef } from "react"
import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"
import gsap from "gsap";
import { ScrollTop } from "../components/ScrollTop";
import "../styles/Contact.css";

export const Contact = () => {

    //Refs
    const contactTitle = useRef(null);
    const rightPanel = useRef(null);

    //Animations
    useEffect(() => {

        const tl = gsap.timeline();

        tl
            .from(contactTitle.current, {
                opacity: 0,
                duration: 0.4,
                ease: "bounce.in",
            })
            .from(rightPanel.current, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                duration: 0.6,
                ease: "power4.in"
            }, 0)
            .from(".contact-item", {
                opacity: 0,
                duration: 0.4,
                ease: "bounce.in",
                stagger: 0.2
            })
    }, [])

    return (
        <>
            <ScrollTop />
            {/* Navbar */}
            <Navbar />
            {/* Navbar End */}
            <div className="contact-page">
                <div className="contact-flex flex items-stretch lg:flex-row flex-col-reverse gap-5 p-5 mb-20 h-screen">
                    <div className="left flex items-end md:w-[40%]">
                        <span className="text-5xl sm:text-8xl bit-font text-white" ref={contactTitle}>Contact</span>
                    </div>
                    <div ref={rightPanel} className="right border-b md:border-b-0 md:border-l mt-24 border-white md:p-5 md:pb-0 pb-10 flex flex-col gap-10">
                        <div className="contact-item flex flex-col gap-2">
                            <span className="head text-gradient-2 font-bold">Need a Website?</span>
                            <a href="mailto:hemantdutta2977@gmail.com" rel="noreferrer" className="link underline underline-offset-2 text-lg text-white">Email me</a>
                        </div>
                        <div className="contact-item flex flex-col gap-2">
                            <span className="head text-gradient-2 font-bold">Want to connect?</span>
                            <a href="https://www.linkedin.com/in/hemantduttahd/" rel="noreferrer" className="link underline underline-offset-2 text-lg text-white">LinkedIn</a>
                            <a href="https://twitter.com/hemantduttahd" rel="noreferrer" className="link underline underline-offset-2 text-lg text-white">Twitter</a>
                            <a href="https://github.com/HemantDutta" rel="noreferrer" className="link underline underline-offset-2 text-lg text-white">Github</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <Footer />
            {/* Footer End */}
        </>
    )
}