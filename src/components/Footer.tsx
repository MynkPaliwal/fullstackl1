import React from "react";

const Footer = () => {
  const footerSections = [
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
    <footer id="support" className="bg-apple-light-gray border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-foreground mb-4 text-center">
                {section.title}
              </h3>
              <ul className="space-y-3 text-center">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(event) => handleScrollToSection(event, link.href)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-fast cursor-pointer">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-border">
          <div className="text-center space-y-2">
            <p className="text-sm font-medium text-foreground">
              Apple Inc. | 1 Apple Park Way, Cupertino, CA 95014
            </p>
            <p className="text-sm text-muted-foreground">
              © 2025 Apple Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


