import React from "react";
import { FooterStyles } from "./Footer.styles.ts";

export const footerSections = [
  {
    title: "Company",
    links: [
      { name: "About Us", href: "#about" },
      { name: "Careers", href: "#careers" },
      { name: "Newsroom", href: "#newsroom" },
      { name: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Links",
    links: [
      { name: "Store", href: "#store" },
      { name: "Products", href: "#products" },
      { name: "Sponsors", href: "#sponsors" },
      { name: "Support", href: "#support" },
    ],
  },
  {
    title: "Section",
    links: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Use", href: "#terms" },
      { name: "Legal", href: "#legal" },
      { name: "Accessibility", href: "#accessibility" },
    ],
  },
];

const Footer = () => {
  const handleScrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const targetId = href.replace('#', '');
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
  };

  return (
    <footer id="support" className={FooterStyles.root}>
      <div className={FooterStyles.container}>
        <div className={FooterStyles.grid}>
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className={FooterStyles.heading}>
                {section.title}
              </h3>
              <ul className={FooterStyles.list}>
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(event) => handleScrollToSection(event, link.href)}
                      className={FooterStyles.link}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={FooterStyles.divider}>
          <div className={FooterStyles.credits}>
            <p className={FooterStyles.creditsTitle}>
              Apple Inc. | 1 Apple Park Way, Cupertino, CA 95014
            </p>
            <p className={FooterStyles.creditsNote}>
              © 2025 Apple Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


