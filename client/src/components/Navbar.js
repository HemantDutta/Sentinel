export const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-screen z-50">
            <div className="navbar-container flex gap-5 items-center justify-between p-5 text-white">
                <div className="left">
                    <span>About</span>
                </div>
                <div className="middle">
                    <span className="text-4xl bit-font">SENTINEL</span>
                </div>
                <div className="right">
                    <span>Contact</span>
                </div>
            </div>
        </nav>
    )
}