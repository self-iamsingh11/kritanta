export interface Product {
    id: string;
    title: string;
    vendor: string;
    price: number;
    compareAtPrice?: number;
    image: string;
    imageHover?: string;
    category: string;
    onSale?: boolean;
    soldOut?: boolean;
    sizes: string[];
}

export interface Category {
    id: string;
    title: string;
    image: string;
    href: string;
}

export interface Review {
    id: string;
    name: string;
    handle: string;
    rating: number;
    text: string;
    image?: string;
}

// Categories for the shop
export const categories: Category[] = [
    {
        id: "hanuman",
        title: "Hanuman",
        image: "/images/Gods/Hanuman/A_hyper-realistic_pristine_white_muscular_Lord_Hanuman_seated_7003328b-9a03-4118-9c7b-2b8643ec65ef_3.png",
        href: "/collections/hanuman",
    },
    {
        id: "krishna",
        title: "Krishna",
        image: "/images/Gods/Krishna/a_beautiful_illustration_of_lord_krishna_playing_the_flute_wi_0c3fb998-6f09-40f7-9f9c-8a5fea9d0d7f_2.png",
        href: "/collections/krishna",
    },
    {
        id: "shiva",
        title: "Shiva",
        image: "/images/Gods/Shiva/A_dramatic_and_divine_painting_of_Lord_Shiva_standing_at_the__0514bef2-4dbf-47cf-80dc-f62be916b62a_0.png",
        href: "/collections/shiva",
    },
    {
        id: "durga",
        title: "Durga",
        image: "/images/Gods/Others/A_dramatic_silhouette_of_Maa_Durga_the_supreme_warrior_goddes_eb2dfab9-46a4-45f8-a687-72978e33c94c_3.png",
        href: "/collections/durga",
    },
];

// Products for display
export const products: Product[] = [
    {
        id: "1",
        title: "Majestic Hanuman - White Warrior",
        vendor: "KRITANTA",
        price: 299,
        compareAtPrice: 499,
        image: "/images/Gods/Hanuman/A_hyper-realistic_pristine_white_muscular_Lord_Hanuman_seated_7003328b-9a03-4118-9c7b-2b8643ec65ef_3.png",
        imageHover: "/images/Gods/Hanuman/A_hyper-realistic_pristine_white_muscular_Lord_Hanuman_seated_c46f1ce7-6c4b-44ee-8d43-ec748d8cdb89_0.png",
        category: "Hanuman",
        onSale: true,
        sizes: ["A6", "A5", "A4", "A3", "13x19"],
    },
    {
        id: "2",
        title: "Divine Hanuman - Himalayan Meditation",
        vendor: "KRITANTA",
        price: 349,
        compareAtPrice: 599,
        image: "/images/Gods/Hanuman/A_spiritual_painting_of_Hanuman_in_deep_meditation_in_a_Himal_21e7e335-a478-4d2c-86f0-967faf1c08ef_0.png",
        imageHover: "/images/Gods/Hanuman/A_spiritual_painting_of_Hanuman_in_deep_meditation_in_a_Himal_7e4409f7-85b9-4aee-b9bf-872f066434fa_0.png",
        category: "Hanuman",
        onSale: true,
        sizes: ["A6", "A5", "A4", "A3", "13x19"],
    },
    {
        id: "3",
        title: "Lord Krishna - Divine Flute",
        vendor: "KRITANTA",
        price: 299,
        compareAtPrice: 499,
        image: "/images/Gods/Krishna/a_beautiful_illustration_of_lord_krishna_playing_the_flute_wi_0c3fb998-6f09-40f7-9f9c-8a5fea9d0d7f_2.png",
        imageHover: "/images/Gods/Krishna/a_beautiful_illustration_of_lord_krishna_playing_the_flute_wi_7d49eda8-97b3-4250-8ffd-ab985b5a4ba8_0.png",
        category: "Krishna",
        onSale: true,
        sizes: ["A6", "A5", "A4", "A3", "13x19"],
    },
    {
        id: "4",
        title: "Krishna - Peaceful Melody",
        vendor: "KRITANTA",
        price: 329,
        image: "/images/Gods/Krishna/a_beautiful_illustration_of_lord_krishna_playing_the_flute_wi_41acbbde-1f0f-42d4-802b-c2a1ec01cdc4_1.png",
        imageHover: "/images/Gods/Krishna/a_beautiful_illustration_of_lord_krishna_playing_the_flute_wi_7ee4ab92-010c-42ed-bb0a-6f1cc8ede075_1.png",
        category: "Krishna",
        sizes: ["A6", "A5", "A4", "A3", "13x19"],
    },
    {
        id: "5",
        title: "Hanuman - Intricate Armor",
        vendor: "KRITANTA",
        price: 399,
        compareAtPrice: 699,
        image: "/images/Gods/Hanuman/A_majestic_depiction_of_Lord_Hanuman_in_a_unique_intricate_ar_0b6b1069-146a-4fad-812a-ae86a07999b2_2.png",
        imageHover: "/images/Gods/Hanuman/A_majestic_depiction_of_Lord_Hanuman_in_a_unique_intricate_ar_0b6b1069-146a-4fad-812a-ae86a07999b2_3.png",
        category: "Hanuman",
        onSale: true,
        sizes: ["A6", "A5", "A4", "A3", "13x19"],
    },
    {
        id: "6",
        title: "Maa Durga - Warrior Silhouette",
        vendor: "KRITANTA",
        price: 349,
        image: "/images/Gods/Others/A_dramatic_silhouette_of_Maa_Durga_the_supreme_warrior_goddes_eb2dfab9-46a4-45f8-a687-72978e33c94c_3.png",
        imageHover: "/images/Gods/Others/A_dramatic_silhouette_of_Maa_Durga_the_supreme_warrior_goddes_f5c9c1f1-1921-4262-85ee-bc5ed21457b3_3.png",
        category: "Durga",
        sizes: ["A6", "A5", "A4", "A3", "13x19"],
    },
    {
        id: "7",
        title: "Hanuman - Ultra Realistic Portrait",
        vendor: "KRITANTA",
        price: 449,
        compareAtPrice: 799,
        image: "/images/Gods/Hanuman/An_ultra-realistic_full-body_portrait_of_Lord_Hanuman_with_hi_06e97ee8-f9e8-479b-8a41-58f10d8561a5_0.png",
        imageHover: "/images/Gods/Hanuman/An_ultra-realistic_full-body_portrait_of_Lord_Hanuman_with_hi_06e97ee8-f9e8-479b-8a41-58f10d8561a5_1.png",
        category: "Hanuman",
        onSale: true,
        sizes: ["A6", "A5", "A4", "A3", "13x19"],
    },
    {
        id: "8",
        title: "Krishna - Side Portrait",
        vendor: "KRITANTA",
        price: 299,
        image: "/images/Gods/Krishna/An_artistic_side-view_portrait_of_Krishna_standing_gracefully_d6e5c0da-c378-4db3-9759-190a0b27b0ae_0.png",
        imageHover: "/images/Gods/Krishna/An_artistic_side-view_portrait_of_Krishna_standing_gracefully_e664a174-77ca-42d2-bf81-3dfe4bcc569a_3.png",
        category: "Krishna",
        sizes: ["A6", "A5", "A4", "A3", "13x19"],
    },
    {
        id: "9",
        title: "Maa Durga - Mahishasura Mardini",
        vendor: "KRITANTA",
        price: 399,
        compareAtPrice: 649,
        image: "/images/Gods/Others/A_semi-anime_devotional_painting_of_Maa_Durga_Mahishasur_Mard_5a7ac9eb-4067-418c-9eb8-e9b79811eb91_3.png",
        imageHover: "/images/Gods/Others/A_dramatic_silhouette_of_Maa_durga_the_supreme_warrior_goddes_e47751fe-ced3-4574-b016-ae0c901a6187_0.png",
        category: "Durga",
        onSale: true,
        sizes: ["A6", "A5", "A4", "A3", "13x19"],
    },
    {
        id: "10",
        title: "Cinematic Krishna",
        vendor: "KRITANTA",
        price: 379,
        image: "/images/Gods/Krishna/Cinematic_hero_shot_semi-realistic_depiction_of_Krishna_in_mi_c7a69847-5b90-4781-ba14-ff10decdc6b7_2.png",
        imageHover: "/images/Gods/Krishna/a_beautiful_illustration_of_lord_krishna_playing_the_flute_wi_9bab79e4-2194-4a8b-97c0-68dae5366948_1.png",
        category: "Krishna",
        sizes: ["A6", "A5", "A4", "A3", "13x19"],
    },
];

// Reviews data
export const reviews: Review[] = [
    {
        id: "1",
        name: "Rahul Sharma",
        handle: "@rahul_art",
        rating: 5,
        text: "Amazing quality prints! The colors are vibrant and the paper quality is excellent. Definitely ordering more!",
        image: "/images/Gods/Hanuman/A_hyper-realistic_pristine_white_muscular_Lord_Hanuman_seated_7003328b-9a03-4118-9c7b-2b8643ec65ef_3.png",
    },
    {
        id: "2",
        name: "Priya Patel",
        handle: "@priya_decor",
        rating: 5,
        text: "Fast delivery and stunning artwork. My living room looks complete now!",
    },
    {
        id: "3",
        name: "Amit Kumar",
        handle: "@amit_walls",
        rating: 5,
        text: "Best poster shop in India! The Hanuman poster looks divine on my wall.",
        image: "/images/Gods/Krishna/a_beautiful_illustration_of_lord_krishna_playing_the_flute_wi_0c3fb998-6f09-40f7-9f9c-8a5fea9d0d7f_2.png",
    },
    {
        id: "4",
        name: "Sneha Gupta",
        handle: "@sneha_home",
        rating: 5,
        text: "Ordered the Krishna collection and absolutely love it. Premium quality!",
    },
    {
        id: "5",
        name: "Vikram Singh",
        handle: "@vikram_art",
        rating: 5,
        text: "The custom poster feature is amazing. Got my favorite quote printed beautifully!",
        image: "/images/Gods/Others/A_dramatic_silhouette_of_Maa_Durga_the_supreme_warrior_goddes_eb2dfab9-46a4-45f8-a687-72978e33c94c_3.png",
    },
    {
        id: "6",
        name: "Neha Reddy",
        handle: "@neha_interior",
        rating: 5,
        text: "Bought 4 got 3 free - amazing deal! All my friends are ordering now.",
    },
];

// Hero slides
export const heroSlides = [
    {
        id: "1",
        image: "/images/Gods/Hanuman/A_hyper-realistic_pristine_white_muscular_Lord_Hanuman_seated_7003328b-9a03-4118-9c7b-2b8643ec65ef_3.png",
        title: "Premium Wall Art",
        subtitle: "Transform Your Space with Divine Artwork",
        cta: "Shop Now",
        href: "/collections/all",
    },
    {
        id: "2",
        image: "/images/Gods/Krishna/a_beautiful_illustration_of_lord_krishna_playing_the_flute_wi_0c3fb998-6f09-40f7-9f9c-8a5fea9d0d7f_2.png",
        title: "Krishna Collection",
        subtitle: "Spiritual Art for Your Home",
        cta: "Explore",
        href: "/collections/krishna",
    },
    {
        id: "3",
        image: "/images/Gods/Others/A_dramatic_silhouette_of_Maa_Durga_the_supreme_warrior_goddes_eb2dfab9-46a4-45f8-a687-72978e33c94c_3.png",
        title: "Custom Posters",
        subtitle: "Create Your Own Masterpiece",
        cta: "Customize Now",
        href: "/custom-poster",
    },
];
