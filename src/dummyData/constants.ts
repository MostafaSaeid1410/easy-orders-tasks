import type { BreadcrumbItem } from "../components/ui";
import type { Review } from "../features/productDetails/components/ProductReviews/ProductReviews";
import type { Product } from "../features/productList/components";

export const relatedProducts: Product[] = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
        brand: "Whistle",
        title: "Wide Leg Cropped Jeans, Denim",
        currentPrice: 26,
        rating: 4.8,
        soldCount: 1238,
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
        brand: "Whistle",
        title: "Wide Leg Cropped Jeans, Denim",
        currentPrice: 26,
        rating: 4.8,
        soldCount: 1238,
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
        brand: "John Lewis ANYDAY",
        title: "Stripe Curved Hem Shirt, Blue",
        currentPrice: 32,
        rating: 4.5,
        soldCount: 620,
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop",
        brand: "John Lewis ANYDAY",
        title: "Denim Overshirt, Mid Wash",
        currentPrice: 40,
        rating: 4.6,
        soldCount: 238,
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop",
        brand: "John Lewis",
        title: "Linen Blazer, Navy",
        currentPrice: 79,
        rating: 4.8,
        soldCount: 1238,
    },
];

export const dummyReviews: Review[] = [
    {
        id: "1",
        rating: 5,
        title: "Excellent product! Highly recommend",
        content:
            "This deodorant works really well. It keeps me fresh all day long and has a pleasant scent. The packaging is also nice and easy to use.",
        author: {
            name: "Sarah Johnson",
            avatar: "https://i.pravatar.cc/150?img=1",
        },
        date: "2 days ago",
        helpful: 24,
        unhelpful: 2,
        hasPhoto: true,
        hasDescription: true,
    },
    {
        id: "2",
        rating: 4,
        title: "Good value for money",
        content:
            "Works as expected. The scent is subtle and not overpowering. Would buy again.",
        author: {
            name: "Michael Chen",
        },
        date: "1 week ago",
        helpful: 18,
        unhelpful: 1,
        hasDescription: true,
    },
    {
        id: "3",
        rating: 5,
        title: "Best deodorant I've tried",
        content:
            "I've tried many brands and this one is by far the best. It's effective, long-lasting, and doesn't irritate my skin.",
        author: {
            name: "Emily Rodriguez",
            avatar: "https://i.pravatar.cc/150?img=5",
        },
        date: "2 weeks ago",
        helpful: 45,
        unhelpful: 0,
        hasPhoto: true,
        hasVideo: true,
        hasDescription: true,
    },
    {
        id: "4",
        rating: 3,
        title: "It's okay, nothing special",
        content:
            "Does the job but nothing extraordinary. The scent fades after a few hours.",
        author: {
            name: "David Thompson",
        },
        date: "3 weeks ago",
        helpful: 8,
        unhelpful: 5,
        hasDescription: true,
    },
    {
        id: "5",
        rating: 5,
        title: "Amazing! Will definitely repurchase",
        content:
            "This product exceeded my expectations. Great quality and the price is reasonable. Highly satisfied!",
        author: {
            name: "Jessica Martinez",
            avatar: "https://i.pravatar.cc/150?img=9",
        },
        date: "1 month ago",
        helpful: 32,
        unhelpful: 1,
        hasPhoto: true,
        hasDescription: true,
    },
    {
        id: "6",
        rating: 4,
        title: "Solid product",
        content:
            "Good deodorant that works well throughout the day. The application is smooth and it doesn't leave residue.",
        author: {
            name: "Robert Wilson",
        },
        date: "1 month ago",
        helpful: 15,
        unhelpful: 2,
        hasDescription: true,
    },
    {
        id: "7",
        rating: 2,
        title: "Not for me",
        content:
            "Didn't work well for my skin type. Caused some irritation and the effectiveness was limited.",
        author: {
            name: "Amanda Lee",
            avatar: "https://i.pravatar.cc/150?img=12",
        },
        date: "2 months ago",
        helpful: 3,
        unhelpful: 12,
        hasDescription: true,
    },
    {
        id: "8",
        rating: 5,
        title: "Perfect for daily use",
        content:
            "I use this every day and it never disappoints. Great scent, long-lasting protection, and gentle on the skin.",
        author: {
            name: "James Anderson",
        },
        date: "2 months ago",
        helpful: 28,
        unhelpful: 0,
        hasPhoto: true,
        hasDescription: true,
    },
];

export const dummyReviewData = {
    averageRating: 4.3,
    totalReviews: 1284,
    ratingBreakdown: [
        { rating: 5, count: 820 },
        { rating: 4, count: 300 },
        { rating: 3, count: 100 },
        { rating: 2, count: 40 },
        { rating: 1, count: 24 },
    ],
};

export const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Beauty", href: "/beauty" },
    { label: "Bath & Body", href: "/beauty/bath-body" },
    { label: "Deodorants & Antiperspirants", href: "/beauty/deodorants" },
    { label: "Antiperspirant Deodorant" },
];
