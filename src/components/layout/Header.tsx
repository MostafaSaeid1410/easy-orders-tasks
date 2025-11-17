import { useState } from "react";
import { cart as cartIcon, heart, userIcon } from "../../assets/icons";
import { headerLogo as logo } from "../../assets/images";
import { useCartStore } from "../../stores/cart";
import { Button, CategoriesDropdown, IconButton, SearchInput } from "../ui";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { getTotalItems, openCart } = useCartStore();
    const cartItemCount = getTotalItems();

    return (
        <header className="mb-[31px] [border-bottom-width:0.5px] border-dashed border-gray-500 py-4 md:py-[31px]">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img
                        src={logo}
                        alt="Logo"
                        className="h-8 w-auto md:w-42.5"
                    />
                </div>

                <nav className="hidden items-center gap-4 md:flex md:gap-8">
                    <SearchInput />

                    <CategoriesDropdown />

                    <Button
                        variant="transparent"
                        className="hidden border-none lg:flex"
                        leftIcon={userIcon}
                    >
                        Sign In
                    </Button>

                    <IconButton
                        className="p-0"
                        icon={heart}
                        ariaLabel="View favorites"
                    />

                    <IconButton
                        className="p-0"
                        icon={cartIcon}
                        ariaLabel="View shopping cart"
                        badge={cartItemCount}
                        onClick={openCart}
                    />
                </nav>

                <nav className="flex items-center gap-3 md:hidden">
                    <SearchInput />

                    <IconButton
                        className="p-0"
                        icon={heart}
                        ariaLabel="View favorites"
                    />

                    <IconButton
                        className="p-0"
                        icon={cartIcon}
                        ariaLabel="View shopping cart"
                        badge={cartItemCount}
                        onClick={openCart}
                    />

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="flex flex-col gap-1.5 p-2"
                        aria-label="Toggle menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span
                            className={`h-0.5 w-6 bg-black transition-all ${
                                isMobileMenuOpen
                                    ? "translate-y-2 rotate-45"
                                    : ""
                            }`}
                        />

                        <span
                            className={`h-0.5 w-6 bg-black transition-all ${
                                isMobileMenuOpen ? "opacity-0" : ""
                            }`}
                        />

                        <span
                            className={`h-0.5 w-6 bg-black transition-all ${
                                isMobileMenuOpen
                                    ? "-translate-y-2 -rotate-45"
                                    : ""
                            }`}
                        />
                    </button>
                </nav>
            </div>

            {isMobileMenuOpen && (
                <div className="mt-4 border-t border-dashed border-gray-500 pt-4 md:hidden">
                    <div className="flex flex-col gap-4">
                        <CategoriesDropdown />

                        <Button
                            variant="transparent"
                            className="justify-start border-none"
                            leftIcon={userIcon}
                        >
                            Sign In
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
}
