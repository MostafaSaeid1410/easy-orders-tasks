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
        <div className="bg-black px-8 py-3 text-white">
            <div className="mx-auto flex max-w-xl items-center justify-center gap-2 text-sm md:text-sm">
                <p className="text-center md:text-left">
                    New season coming! Discount 10% for all product! Checkout
                    Now!&nbsp;
                    <span className="bg-dark-650 rounded-full px-[6.5px] py-[3px] text-[11px] leading-[100%] font-medium text-white">
                        {formatTime(timeLeft.hours)}:
                        {formatTime(timeLeft.minutes)}
                    </span>
                </p>
            </div>
        </div>
    );
}
