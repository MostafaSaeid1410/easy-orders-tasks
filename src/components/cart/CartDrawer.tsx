/* eslint-disable @stylistic/jsx-newline */
import { useEffect } from "react";
import { ReactSVG } from "react-svg";
import { chevronLeft } from "../../assets/icons";
import { useCartStore } from "../../stores/cart";
import { Button, Price } from "../ui";

export default function CartDrawer() {
    const {
        items,
        isOpen,
        closeCart,
        removeItem,
        updateQuantity,
        getTotalPrice,
    } = useCartStore();

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                closeCart();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);

            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);

            document.body.style.overflow = "";
        };
    }, [isOpen, closeCart]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeCart();
        }
    };

    if (!isOpen) return null;

    const totalPrice = getTotalPrice();

    return (
        <>
            <div
                className="fixed inset-0 z-40 bg-black/50 transition-opacity"
                onClick={handleBackdropClick}
                aria-hidden="true"
            />

            <div
                className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-xl transition-transform duration-300 ease-in-out md:w-96"
                role="dialog"
                aria-modal="true"
                aria-label="Shopping cart"
            >
                <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 md:px-6">
                        <h2 className="text-dark-950 text-xl font-semibold">
                            Shopping Cart
                        </h2>

                        <button
                            onClick={closeCart}
                            className="rounded-lg p-2 transition-colors hover:bg-gray-100"
                            aria-label="Close cart"
                        >
                            <ReactSVG
                                src={chevronLeft}
                                className="h-6 w-6 rotate-180"
                            />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 py-4 md:px-6">
                        {items.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center text-center">
                                <p className="text-dark-600 mb-2 text-lg font-medium">
                                    Your cart is empty
                                </p>

                                <p className="text-dark-400 text-sm">
                                    Add some items to get started!
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-4 rounded-lg border border-gray-200 p-4"
                                    >
                                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                            <img
                                                src={item.productImage}
                                                alt={item.productName}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>

                                        <div className="flex flex-1 flex-col gap-2">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h3 className="text-dark-950 line-clamp-2 text-sm font-medium">
                                                        {item.productName}
                                                    </h3>

                                                    {Object.keys(
                                                        item.selectedVariations,
                                                    ).length > 0 && (
                                                        <div className="mt-1 flex flex-wrap gap-2">
                                                            {Object.entries(
                                                                item.selectedVariations,
                                                            ).map(
                                                                ([
                                                                    key,
                                                                    value,
                                                                ]) => {
                                                                    return (
                                                                        <span
                                                                            key={
                                                                                key
                                                                            }
                                                                            className="text-dark-500 text-xs capitalize"
                                                                        >
                                                                            {
                                                                                key
                                                                            }
                                                                            :
                                                                            {
                                                                                value
                                                                            }
                                                                        </span>
                                                                    );
                                                                },
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                                <button
                                                    onClick={() =>
                                                        removeItem(item.id)
                                                    }
                                                    className="text-dark-400 ml-2 flex-shrink-0 text-lg font-bold hover:text-red-600"
                                                    aria-label={`Remove ${item.productName} from cart`}
                                                >
                                                    ×
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <Price
                                                    currentPrice={item.price}
                                                    originalPrice={
                                                        item.originalPrice
                                                    }
                                                    currentPriceClassName="text-base"
                                                />

                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                item.quantity -
                                                                    1,
                                                            )
                                                        }
                                                        disabled={
                                                            item.quantity <= 1
                                                        }
                                                        className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-lg font-semibold transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        −
                                                    </button>

                                                    <span className="text-dark-950 min-w-[2rem] text-center text-base font-medium">
                                                        {item.quantity}
                                                    </span>

                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                item.quantity +
                                                                    1,
                                                            )
                                                        }
                                                        disabled={
                                                            item.maxQuantity >
                                                                0 &&
                                                            item.quantity >=
                                                                item.maxQuantity
                                                        }
                                                        className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-lg font-semibold transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                                                        aria-label="Increase quantity"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {items.length > 0 && (
                        <div className="border-t border-gray-200 bg-white p-4 md:p-6">
                            <div className="mb-4 flex items-center justify-between">
                                <span className="text-dark-700 text-lg font-semibold">
                                    Total:
                                </span>

                                <Price
                                    currentPrice={totalPrice}
                                    currentPriceClassName="text-xl"
                                />
                            </div>

                            <Button
                                variant="primary"
                                className="w-full"
                                onClick={() => {
                                    console.log("Checkout clicked");
                                }}
                            >
                                Checkout
                            </Button>

                            <Button
                                variant="secondary"
                                className="mt-2 w-full"
                                onClick={closeCart}
                            >
                                Continue Shopping
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
