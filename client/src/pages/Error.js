import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export const Error = () => {

    //Navigator
    const navigator = useNavigate();

    //States
    const [timer, setTimer] = useState(5);

    //Interval
    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer(timer - 1);
        }, 1000)

        //Countdown
        if (timer < 1) {
            try {
                navigator("/")
            }
            catch (err) {

            }
        }

        return () => clearInterval(countdown)
    }, [timer])

    return (
        <>
            <div className="error-page h-screen w-screen grid place-items-center">
                <div className="error-message flex items-center">
                    <div className="left p-5">
                        <span className="text-6xl text-gradient bit-font">You're Lost</span>
                    </div>
                    <div className="right p-5 flex flex-col border-l border-white">
                        <span className="text-white text-lg">But you won't be for long...</span>
                        <span className="text-white text-sm">We're taking you back to the site in {timer} seconds.</span>
                    </div>
                </div>
            </div>
        </>
    )
}