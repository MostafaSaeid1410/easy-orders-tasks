import type { FC, ReactNode } from "react";
import { CartDrawer } from "../cart";
import Footer from "./Footer";
import Header from "./Header";
import PromotionalBanner from "./PromotionalBanner";

type LayoutProps = {
    children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex min-h-screen flex-col">
            <PromotionalBanner />

            <div className="mx-auto w-full max-w-xl px-4 md:px-0">
                <Header />

                <main className="flex-1">{children}</main>
            </div>

            <Footer />

            <CartDrawer />
        </div>
    );
};

export default Layout;
