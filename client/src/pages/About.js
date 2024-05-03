import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"
import "../styles/About.css";

export const About = () => {
    return (
        <>
            {/* Navbar */}
            <Navbar />
            {/* Navbar End */}
            <div className="about-page pt-24">
                <div className="about-flex flex flex-col p-5">
                    <div className="panel-1 h-[500px] flex items-center justify-center text-center">
                        <span className="text-8xl bit-font text-gradient drop-shadow-lg">How Much Can They See?</span>
                    </div>
                    <div className="panel-2 pt-48 flex items-center justify-between flex-wrap">
                        <div className="project-info text-white w-[100%] md:w-[50%] text-center md:text-left flex flex-col gap-2">
                            <span className="text-gradient-2">Why did I make this project?</span>
                            <div className="info-text">
                                <span className="first text-3xl bit-font">One</span> <span>day while browsing the Internet, this question popped up in my head! How much information can websites legally/ethically gain about us from our Browser? And that is how <span className="bit-font text-2xl text-gradient-2">Sentinel</span> was born. Sentinel's only purpose is to show you how much information your browser is revealing to the websites you visit!</span>
                            </div>
                        </div>
                        <div className="graphics relative w-[100%] md:w-[50%] grid place-items-center">
                            <div className="graphic-wrapper relative -rotate-12">
                                <div className="graphic-overlay absolute h-full w-full rounded-[100%]" />
                                <img src="/assets/About/website.png" alt="Internet" className="object-contain w-[100%] md:w-[100%] h-[100%]" />
                            </div>
                        </div>
                    </div>
                    <div className="panel-3 pt-48 flex items-center justify-between flex-wrap">
                        <div className="title w[100%] md:w-[50%]">
                            <span className="text-6xl bit-font text-gradient drop-shadow-lg">So What's going on here?</span>
                        </div>
                        <div className="logic-info w[100%] md:w-[50%] flex flex-col gap-2">
                            <span className="text-gradient-2">How does it work?</span>
                            <span className="text-white">Are you being hacked? Is someone looking into your laptop screen through your window? No, nothing of that sort is happening (Well, I am not sure about the window thing, someone might be there, I don't know).</span>
                            <span className="text-white">All of this information is openly available to any website using vanilla JavaScript, Web APIs such as navigator, Global Objects like "document" and "window" and a few other things.</span>
                            <span className="text-white">So imagine, if a regular website can ethically get all this information about you, what information can a person with no ethics and morals find out about you through the Internet.</span>
                            <span className="text-white">I don't why I am writing all this, maybe to tell you to be safe on the Internet and don't open websites that can't be trusted, or do it, doesn't really matter to me, I just wanted to make a cool mini project.</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer */}
            {/* <Footer/> */}
            {/* Footer End */}
        </>
    )
}