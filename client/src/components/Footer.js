import {Link} from "react-router-dom";

export const Footer = () => {
    return (
        <>
            <footer className="px-5 py-2">
                <div className="footer-container w-full flex items-center justify-between">
                    <div className="credits">
                        <a href="https://github.com/HemantDutta/Sentinel" rel="noreferrer" target="_blank" className="text-white text-sm">&copy; SENTINEL by <a href="https://github.com/HemantDutta" className="underline underline-offset-2" rel="noreferrer" target="_blank">Hemant Dutta</a></a>
                    </div>
                    <div className="sitemap flex items-center gap-3 flex-wrap text-sm">
                        <Link to="/" className="text-white transition hover:underline underline-offset-2">Home</Link>
                        <Link to="/about" className="text-white transition hover:underline underline-offset-2">About</Link>
                        <Link to="/contact" className="text-white transition hover:underline underline-offset-2">Contact</Link>
                    </div>
                </div>
            </footer>
        </>
    )
}