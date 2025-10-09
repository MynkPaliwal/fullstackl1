import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NavbarStyles } from './Navbar.styles.ts';
import { NAV_LINKS } from './Navbar.types.ts';
import appleLogo from '../../assets/apple_logo.svg';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navLinks = NAV_LINKS;
    const handleScrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, section: string) => {
        if (section === "/Users") {
            window.location.href = section;
            return;
        }
        
        event.preventDefault();
        const targetId = section.replace('#', '');
        const element = document.getElementById(targetId);

        if (element) {
            const navHeight = 64;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        setIsMenuOpen(false);
    };

    return (
        <nav className={NavbarStyles.root}>
            <div className={NavbarStyles.container}>
                <Link to={"/"} onClick={(event) => handleScrollToSection(event, "#store")}>
                    <img className={NavbarStyles.logoImg} src={appleLogo} alt="Apple Logo" />
                </Link>
                <div className={NavbarStyles.desktopNav}>
                    {navLinks.map((link) => (
                        <a key={link.name} onClick={(e) => handleScrollToSection(e, link.section)}
                            className={NavbarStyles.navLink}>
                            {link.name}
                        </a>
                    ))}
                </div>

                <button
                    className={NavbarStyles.mobileButton}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu">
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {isMenuOpen && (
                <div className={NavbarStyles.mobileMenu}>
                    <div className={NavbarStyles.mobileMenuInner}>
                        {navLinks.map((link) => (
                            <Link key={link.name} to={link.section} onClick={(event) => handleScrollToSection(event, link.section)}
                                className={NavbarStyles.mobileLink}>
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
