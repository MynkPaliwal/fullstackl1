import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import appleLogo from '../assets/apple_logo.svg';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: "Store", section: "#store" },
        { name: "Products", section: "#products" },
        { name: "Sponsors", section: "#sponsors" },
        { name: "Support", section: "#support" }
    ];

    const handleScrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, section: string) => {
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
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link to={"/"} onClick={(event) => handleScrollToSection(event, "#store")}>
                    <img className="h-5 w-4" src={appleLogo} alt="Apple Logo" />
                </Link>
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a key={link.name} onClick={(e) => handleScrollToSection(e, link.section)}
                            className="text-sm text-foreground/70 hover:text-foreground transition-fast cursor-pointer">
                            {link.name}
                        </a>
                    ))}
                </div>

                <button
                    className="md:hidden p-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu">
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-border">
                    <div className="px-6 py-4 space-y-4">
                        {navLinks.map((link) => (
                            <Link key={link.name} to={link.section} onClick={(event) => handleScrollToSection(event, link.section)}
                                className="block text-sm text-foreground/70 hover:text-foreground transition-fast cursor-pointer py-2">
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
