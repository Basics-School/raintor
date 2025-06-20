import React from "react";
import Link from "next/link";

interface FooterProps {
  brandName?: string;
  tagline?: string;
  email?: string;
  alternateEmail?: string;
  phones?: string[];
  menuItems?: { label: string; href: string }[];
  socialLinks?: { platform: string; href: string }[];
  copyrightYear?: number;
  footerLinks?: { label: string; href: string }[];
}

const Footer: React.FC<FooterProps> = ({
  brandName = "DEVLOP.ME",
  tagline = "As you can",
  email = "HELLO@DEVLOP.ME.COM",
  alternateEmail = "MAHBUBUL@ME.COM",
  phones = ["+784549 4981 00", "+8845 0100 211"],
  menuItems = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "PORTFOLIO", href: "/portfolio" },
    { label: "BLOG", href: "/blog" },
  ],
  socialLinks = [
    { platform: "TWITTER", href: "#" },
    { platform: "INSTAGRAM", href: "#" },
    { platform: "FACEBOOK", href: "#" },
    { platform: "BEHANCE", href: "#" },
    { platform: "DRIBBBLE", href: "#" },
  ],
  copyrightYear = 2022,
  footerLinks = [
    { label: "PRIVACY", href: "/privacy" },
    { label: "TERMS", href: "/terms" },
  ],
}) => {
  return (
    <footer className="bg-foreground rounded-4xl mx-7 lg:px-8  text-background py-16 px-6">
      <div className="max-w-xxl mx-auto ">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-8">
              <h2 className="text-lime-400 text-lg font-bold tracking-wide mb-2">
                {brandName}
              </h2>
            </div>
          </div>
          {/* Contact Section */}
          <h3 className="col-span-full row-start-1 col-start-2 text-background text-6xl lg:text-7xl font-bold leading-tight">
            {tagline}
          </h3>{" "}
          <div className="col-span-full flex justify-between  col-start-2 row-start-2">
            <div className="content col-start-2 row-start-2">
              <div className="mb-8">
                <h4 className="text-gray-400 text-sm font-medium mb-4 tracking-wide">
                  Say hello
                </h4>
                <div className="space-y-2">
                  <p className="text-background font-medium tracking-wide">
                    {email}
                  </p>
                  <p className="text-background font-medium tracking-wide">
                    {alternateEmail}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-gray-400 text-sm font-medium mb-4 tracking-wide">
                  Call
                </h4>
                <div className="space-y-2">
                  {phones.map((phone, index) => (
                    <p
                      key={index}
                      className="text-background font-medium tracking-wide"
                    >
                      {phone}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            {/* Menu Section */}
            <div className="lg:col-span-1">
              <h4 className="text-gray-400 text-sm font-medium mb-4 tracking-wide">
                Menu
              </h4>
              <nav className="space-y-3">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="block text-background font-medium tracking-wide hover:text-lime-400 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            {/* Social Section */}
            <div className="lg:col-span-1">
              <h4 className="text-gray-400 text-sm font-medium mb-4 tracking-wide">
                Social
              </h4>
              <nav className="space-y-3">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className="block text-background font-medium tracking-wide hover:text-lime-400 transition-colors duration-200"
                  >
                    {social.platform}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center pt-8 border-t border-gray-800">
          <div className="mb-4 lg:mb-0">
            <p className="text-lime-400 text-lg font-bold tracking-wide">
              BESNIK
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-8">
            <p className="text-gray-400 text-sm">
              © {brandName.toLowerCase()} {copyrightYear}
            </p>
            <div className="flex space-x-4">
              {footerLinks.map((link, index) => (
                <React.Fragment key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-background transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                  {index < footerLinks.length - 1 && (
                    <span className="text-gray-400">-</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
