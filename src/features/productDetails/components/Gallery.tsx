import { useCallback, useState } from "react";
import { chevronLeft, chevronRight, heart, share } from "../../../assets/icons";
import { IconButton } from "../../../components/ui";

type GalleryImage = {
    id: string | number;
    src: string;
    webp?: string;
    alt: string;
};

type GalleryProps = {
    images: GalleryImage[];
};

export default function Gallery({ images }: GalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAddedToWishList] = useState(false);

    const handlePrevious = useCallback(() => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }, [images.length]);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, [images.length]);

    const handleThumbnailClick = useCallback((index: number) => {
        setCurrentIndex(index);
    }, []);

    const handleShare = useCallback(() => {}, []);

    const handleAddToWishList = useCallback(() => {}, []);

    return (
        <div className="mx-auto flex w-full flex-col gap-4 md:gap-6">
            <div className="relative flex gap-4 md:gap-[35px]">
                <div className="relative aspect-4/5 max-h-[400px] w-full overflow-hidden rounded-lg bg-gray-100 md:max-h-[610px]">
                    {images.length > 0 && images[currentIndex] && (
                        <img
                            src={images[currentIndex].src}
                            alt={images[currentIndex].alt}
                            className="h-full w-full object-contain"
                        />
                    )}
                </div>

                <div className="flex w-[56px] shrink-0 flex-col justify-between gap-6 md:w-auto md:gap-0">
                    <div className="flex flex-col gap-3 md:gap-[20px]">
                        <IconButton
                            className="bg-gray-200 p-3 md:p-4"
                            icon={share}
                            onClick={handleShare}
                            ariaLabel="Share product"
                        />

                        <IconButton
                            icon={heart}
                            className={`p-3 md:p-4 ${
                                isAddedToWishList ? "bg-red-100" : "bg-gray-200"
                            }`}
                            onClick={handleAddToWishList}
                            ariaLabel={
                                isAddedToWishList
                                    ? "Remove from favorites"
                                    : "Add to favorites"
                            }
                        />
                    </div>

                    <div className="flex flex-col gap-3 md:gap-5">
                        <IconButton
                            icon={chevronLeft}
                            className="bg-gray-200 p-3 md:p-4"
                            onClick={handlePrevious}
                            ariaLabel="Previous image"
                        />

                        <IconButton
                            icon={chevronRight}
                            className="bg-gray-200 p-3 md:p-4"
                            onClick={handleNext}
                            ariaLabel="Next image"
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 md:gap-[20.24px] md:overflow-visible md:pb-0">
                {images.map((image, index) => (
                    <button
                        key={image.id}
                        onClick={() => handleThumbnailClick(index)}
                        className={`h-20 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all md:h-30 md:w-25 ${
                            currentIndex === index
                                ? "border-gray-800 opacity-100"
                                : "border-transparent opacity-60 hover:opacity-80"
                        }`}
                        aria-label={`View image ${index + 1}: ${image.alt}`}
                        aria-current={
                            currentIndex === index ? "true" : undefined
                        }
                    >
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="h-full w-full object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
