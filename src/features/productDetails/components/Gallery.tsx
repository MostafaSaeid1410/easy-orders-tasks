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

                    <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                        <IconButton
                            icon={chevronLeft}
                            className="bg-white/80 p-2 backdrop-blur-sm hover:bg-white"
                            onClick={handlePrevious}
                            ariaLabel="Previous image"
                        />
                    </div>

                    <div className="absolute inset-y-0 right-0 flex items-center md:hidden">
                        <IconButton
                            icon={chevronRight}
                            className="bg-white/80 p-2 backdrop-blur-sm hover:bg-white"
                            onClick={handleNext}
                            ariaLabel="Next image"
                        />
                    </div>

                    <div className="absolute top-4 right-4 hidden flex-col gap-3 md:flex">
                        <IconButton
                            className="bg-white/80 p-3 backdrop-blur-sm hover:bg-white"
                            icon={share}
                            onClick={handleShare}
                            ariaLabel="Share product"
                        />

                        <IconButton
                            icon={heart}
                            className={`p-3 backdrop-blur-sm hover:bg-white ${
                                isAddedToWishList
                                    ? "bg-red-100/80"
                                    : "bg-white/80"
                            }`}
                            onClick={handleAddToWishList}
                            ariaLabel={
                                isAddedToWishList
                                    ? "Remove from favorites"
                                    : "Add to favorites"
                            }
                        />
                    </div>
                </div>

                <div className="hidden md:block">
                    <div className="flex h-full flex-col justify-between">
                        <div className="flex flex-col gap-[20px]">
                            <IconButton
                                className="bg-gray-200 p-4"
                                icon={share}
                                onClick={handleShare}
                                ariaLabel="Share product"
                            />

                            <IconButton
                                icon={heart}
                                className={`p-4 ${isAddedToWishList ? "bg-red-100" : "bg-gray-200"}`}
                                onClick={handleAddToWishList}
                                ariaLabel={
                                    isAddedToWishList
                                        ? "Remove from favorites"
                                        : "Add to favorites"
                                }
                            />
                        </div>

                        <div className="flex flex-col gap-5">
                            <IconButton
                                icon={chevronLeft}
                                className="bg-gray-200 p-4"
                                onClick={handlePrevious}
                                ariaLabel="Previous image"
                            />

                            <IconButton
                                icon={chevronRight}
                                className="bg-gray-200 p-4"
                                onClick={handleNext}
                                ariaLabel="Next image"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center gap-4 md:hidden">
                <IconButton
                    className="bg-gray-200 p-3"
                    icon={share}
                    onClick={handleShare}
                    ariaLabel="Share product"
                />

                <IconButton
                    icon={heart}
                    className={`p-3 ${isAddedToWishList ? "bg-red-100" : "bg-gray-200"}`}
                    onClick={handleAddToWishList}
                    ariaLabel={
                        isAddedToWishList
                            ? "Remove from favorites"
                            : "Add to favorites"
                    }
                />
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
