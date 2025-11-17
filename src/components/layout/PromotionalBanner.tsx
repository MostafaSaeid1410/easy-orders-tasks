/* eslint-disable @stylistic/jsx-newline */
import { useEffect, useState } from "react";

export default function PromotionalBanner() {
    const [timeLeft, setTimeLeft] = useState({ hours: 20, minutes: 40 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                let { hours, minutes } = prev;

                if (minutes === 0) {
                    if (hours === 0) {
                        return { hours: 23, minutes: 59 };
                    }
                    hours -= 1;

                    minutes = 59;
                } else {
                    minutes -= 1;
                }

                return { hours, minutes };
            });
        }, 60000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (value: number) => {
        return value.toString().padStart(2, "0");
    };

    return (
        <div className="bg-black px-4 py-2 text-white md:py-2.5">
            <div className="mx-auto flex max-w-xl items-center justify-between gap-2 text-xs md:text-sm">
                <p className="flex-1 text-center md:text-left">
                    New season coming! Discount 10% for all product! Checkout
                    Now!
                </p>

                <div className="shrink-0 font-mono text-xs font-semibold md:ml-4 md:text-sm">
                    {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}
                </div>
            </div>
        </div>
    );
}
