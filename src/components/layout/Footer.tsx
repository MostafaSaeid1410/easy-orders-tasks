import { useState } from "react";
import { ReactSVG } from "react-svg";
import {
    mail as EmailIcon,
    facebook as FacebookIcon,
    instagram as InstagramIcon,
    twitter as TwitterIcon,
} from "../../assets/icons";
import { footerLogo as logo } from "../../assets/images";
import { ButtonLink, Dropdown, type DropdownItem } from "../ui";

const socialLinks = [
    {
        icon: FacebookIcon,
        url: "https://facebook.com/yourpage",
        label: "Facebook",
    },
    {
        icon: InstagramIcon,
        url: "https://instagram.com/yourpage",
        label: "Instagram",
    },
    {
        icon: TwitterIcon,
        url: "https://twitter.com/yourpage",
        label: "Twitter",
    },
    { icon: EmailIcon, url: "mailto:your@email.com", label: "Email" },
];

const languages: DropdownItem[] = [
    {
        label: "English",
        value: "en",
    },
    {
        label: "Spanish",
        value: "es",
    },
    {
        label: "French",
        value: "fr",
    },
];

const footerLinks = [
    {
        title: "Shop",
        links: [
            { label: "My account", url: "/account" },
            { label: "Login", url: "/login" },
            { label: "Wishlist", url: "/wishlist" },
            { label: "Cart", url: "/cart" },
        ],
    },
    {
        title: "Information",
        links: [
            { label: "Shipping Policy", url: "/shipping-policy" },
            { label: "Returns & Refunds", url: "/returns-refunds" },
            { label: "Cookies Policy", url: "/cookies-policy" },
            { label: "Frequently asked", url: "/faq" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About us", url: "/about" },
            { label: "Privacy Policy", url: "/privacy-policy" },
            { label: "Terms & Conditions", url: "/terms-and-conditions" },
            { label: "Contact Us", url: "/contact" },
        ],
    },
];

export default function Footer() {
    const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
    const [selectedCurr, setSelectedCurr] = useState<string>("USD");

    const handleLanguageSelect = (item: DropdownItem) => {
        setSelectedLanguage(item.label);
    };

    const handleCurrSelect = (item: DropdownItem) => {
        setSelectedCurr(item.label);
    };

    return (
        <footer className="w-full bg-gray-100 px-4 md:px-0">
            <div className="mx-auto mb-12 flex max-w-xl flex-col gap-8 pt-9 md:mb-[73px] md:flex-row md:justify-between md:gap-0">
                <div className="flex flex-col gap-6 md:gap-10">
                    <div className="flex items-center">
                        <img
                            src={logo}
                            alt="Logo"
                            className="h-8 w-auto md:w-42.5"
                        />
                    </div>

                    <div className="flex flex-col gap-4 md:gap-5">
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Get latest offers to your inbox"
                                aria-label="Email subscription"
                                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            />

                            <button
                                type="button"
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black text-white transition-colors hover:bg-gray-800 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                aria-label="Subscribe"
                            >
                                →
                            </button>
                        </div>

                        <ul className="flex gap-3 md:gap-4">
                            {socialLinks.map((link) => (
                                <ButtonLink
                                    key={link.label}
                                    url={link.url}
                                    label={link.label}
                                >
                                    <ReactSVG src={link.icon} />
                                </ButtonLink>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:flex md:gap-30">
                    {footerLinks.map((section) => (
                        <div
                            key={section.title}
                            className="flex flex-col gap-3 md:gap-4"
                        >
                            <h4 className="text-dark-850 text-[14px] leading-[24px] font-semibold">
                                {section.title}
                            </h4>

                            {section.links.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.url}
                                    className="text-dark-900 text-[14px] leading-[22px] font-normal hover:underline"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mx-auto max-w-xl px-4 md:px-0">
                <div className="flex flex-col gap-4 [border-top-width:0.5px] border-dashed border-gray-500 pt-6 pb-[29px] md:flex-row md:justify-between md:gap-0">
                    <span className="inline-block text-sm font-normal text-purple-600 md:text-base">
                        © John Lewis plc 2001 - 2024
                    </span>

                    <div className="flex gap-4 md:gap-8">
                        <Dropdown
                            label={selectedLanguage}
                            items={languages}
                            onSelect={handleLanguageSelect}
                        />

                        <Dropdown
                            label={selectedCurr}
                            items={languages}
                            onSelect={handleCurrSelect}
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
}
