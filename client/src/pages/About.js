import { useEffect, useRef } from "react";
import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"
import {ScrollTop} from "../components/ScrollTop";
import "../styles/About.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export const About = () => {

    //refs
    const aboutTitle = useRef(null);
    const panel2Head = useRef(null);
    const panel2Text = useRef(null);
    const panel2Graphic = useRef(null);
    const panel3Head = useRef(null);
    const panel3Text = useRef(null);
    const panel3Graphic = useRef(null);


    //Register ScrolLTrigger
    gsap.registerPlugin(ScrollTrigger);

    //Scroll Animations
    useEffect(() => {
        gsap.from(aboutTitle.current, {
            opacity: 0,
            duration: 0.4,
            ease: "bounce.in"
        })

        gsap.from(panel2Head.current, {
            opacity: 0,
            duration: 0.4,
            delay: 0.2,
            ease: "bounce.in",
            scrollTrigger: {
                trigger: panel2Head.current
            }
        })

        gsap.from(panel2Text.current, {
            opacity: 0,
            duration: 0.4,
            delay: 0.2,
            ease: "bounce.in",
            scrollTrigger: {
                trigger: panel2Head.current
            }
        })

        gsap.from(panel2Graphic.current, {
            opacity: 0,
            duration: 0.4,
            delay: 0.2,
            ease: "power1.in",
            scrollTrigger: {
                trigger: panel2Head.current
            }
        })

        gsap.from(panel3Head.current, {
            opacity: 0,
            duration: 0.4,
            delay: 0.2,
            ease: "bounce.in",
            scrollTrigger: {
                trigger: panel3Head.current
            }
        })

        gsap.from(panel3Text.current, {
            opacity: 0,
            duration: 0.4,
            delay: 0.2,
            ease: "bounce.in",
            scrollTrigger: {
                trigger: panel3Head.current
            }
        })

        gsap.from(panel3Graphic.current, {
            opacity: 0,
            duration: 0.4,
            delay: 0.2,
            ease: "power1.in",
            scrollTrigger: {
                trigger: panel3Head.current
            }
        })
    }, [])

    return (
        <>
        <ScrollTop/>
            {/* Navbar */}
            <Navbar />
            {/* Navbar End */}
            <div className="about-page pt-24">
                <div className="about-flex flex flex-col p-5 mb-20">
                    <div className="panel-1 h-[500px] flex items-center justify-center text-center">
                        <span className="text-8xl bit-font text-gradient drop-shadow-lg" ref={aboutTitle}>How Much Can They See?</span>
                    </div>
                    <div className="panel-2 pt-48 flex items-center justify-between flex-wrap">
                        <div className="project-info text-white w-[100%] md:w-[50%] text-center md:text-left flex flex-col gap-2">
                            <span className="text-gradient-2 font-bold" ref={panel2Head}>Why did I make this project?</span>
                            <div className="info-text" ref={panel2Text}>
                                <span className="first text-3xl bit-font">One</span> <span>day while browsing the Internet, this question popped up in my head! How much information can websites legally/ethically gain about us from our Browser? And that is how <span className="bit-font text-2xl text-gradient-2">Sentinel</span> was born. Sentinel's only purpose is to show you how much information your browser is revealing to the websites you visit!</span>
                            </div>
                        </div>
                        <div className="graphics relative w-[100%] md:w-[50%] grid place-items-center">
                            <div className="graphic-wrapper relative -rotate-12" ref={panel2Graphic}>
                                <div className="graphic-overlay absolute h-full w-full rounded-[100%]" />
                                <img src="/assets/About/website.png" alt="Internet" className="object-contain w-[100%] md:w-[100%] h-[100%]" />
                            </div>
                        </div>
                    </div>
                    <div className="panel-3 pt-48 flex items-stretch justify-between flex-wrap">
                        <div className="title grid place-items-center w-[100%] md:w-[50%]">
                            <span className="text-6xl bit-font text-gradient drop-shadow-lg" ref={panel3Graphic}>So What's going on here?</span>
                        </div>
                        <div className="logic-info w[100%] md:w-[50%] flex flex-col gap-2">
                            <span className="text-gradient-2 font-bold" ref={panel3Head}>How does it work?</span>
                            <div className="text-point-wrapper flex flex-col gap-2" ref={panel3Text}>
                                <span className="text-white">Are you being hacked? Is someone looking into your laptop screen through your window? No, nothing of that sort is happening (Well, I am not sure about the window thing, someone might be there, I don't know).</span>
                                <span className="text-white">All of this information is openly available to any website using vanilla JavaScript, Web APIs such as navigator, Global Objects like "document" and "window" and a few other things.</span>
                                <span className="text-white">So imagine, if a regular website can ethically get all this information about you, what information can a person with no ethics and morals find out about you through the Internet.</span>
                                <span className="text-white">I don't know why I am writing all this, maybe to tell you to be safe on the Internet and don't open websites that can't be trusted, or do it, it's really upto you, I just wanted to make a cool mini project.</span>
                            </div>
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