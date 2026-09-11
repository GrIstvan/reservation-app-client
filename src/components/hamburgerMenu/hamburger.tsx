import './hamburger.css'

interface HamburgerProps {
    open: boolean;
}

function Hamburger({open}: HamburgerProps) {
    return(
        <div className={open ? "hamburger open" : "hamburger"}>
            <div className="burger burger1"></div>
            <div className="burger burger2"></div>
            <div className="burger burger3"></div>
        </div>
    )
}

export default Hamburger;