import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="navbar-default">
            <div className="logo">Rate My Album 🎵</div>
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/about">Acerca de</Link></li>
                <li><Link to="/contact">Contacto</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;
