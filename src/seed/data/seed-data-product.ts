interface SeedProduct {
    description: string;
    images: string[];
    stock: number;
    price: number;
    sizes: ValidSizes[];
    slug: string;
    tags: string[];
    title: string;
    type: ValidTypes;
    gender: 'men'|'women'|'kid'|'unisex'
}

type ValidSizes = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL'|'2T'|'4T'|'6'|'8'|'10'|'12';
type ValidTypes = 'shirts'|'pants'|'hoodies'|'hats'|'t-shirts';

interface SeedUser {
    email: string
    fullName: string
    password: string
    roles: string[]
}

interface SeedData {
    users: SeedUser[];
    products: SeedProduct[];
}

export const initialData: SeedData = {

    users:[
        {
            email: 'Admin1@google.com',
            fullName: 'Admin One',
            password: 'Admin12345',
            roles: ['admin']
        }, 
        {
            email: 'user1@google.com',
            fullName: 'User One',
            password: 'User12345',
            roles: ['user']
        }, 
        {
            email: 'moderador1@google.com',
            fullName: 'moderador One',
            password: 'Moderador1',
            roles: ['moderador']
    
        }, 
    ],

    products: [
        {
            description: "Inspired by our vehicles’ 2024 holiday software update, the Santa Bot Long Sleeve Tee features a partially raised graphic of Tesla Optimus wearing a Santa hat on the front and a matching Tesla T logo on the back. Made from 100% cotton.",
            images: [
                'https://res.cloudinary.com/dhavhzmvy/image/upload/v1734925905/teslo-shop/products/2157637-00-A-1-01.avif',
                'https://res.cloudinary.com/dhavhzmvy/image/upload/v1734925326/teslo-shop/products/2157637-00-A-1-02.avif',
                'https://res.cloudinary.com/dhavhzmvy/image/upload/v1734926095/teslo-shop/products/2157637-00-A-1-03.avif'
            ],
            stock: 0,
            price: 45,
            sizes: ['S','M','L','XL','XXL','XXXL'],
            slug: "santa_bot_long_sleeve_tee",
            type: 't-shirts',
            tags: ['longshirt'],
            title: "Santa Bot Long Sleeve Tee",
            gender: 'unisex'
        },
        {
            description: "Utility is our goal. Built for any planet is our motto. \nThe Built for Any Planet Hoodie features a high-density orange cyber owl graphic on the front and matching Tesla wordmark on the back. Part of our Built for Any Planet Collection, this oversized hoodie is designed for style and comfort. Made from 100% cotton.",
            images: [
                'https://res.cloudinary.com/dhavhzmvy/image/upload/v1734926549/teslo-shop/products/2077996-01-A-3-01.avif',
                'https://res.cloudinary.com/dhavhzmvy/image/upload/v1734926549/teslo-shop/products/2077996-01-A-3-01.avif',
                'https://res.cloudinary.com/dhavhzmvy/image/upload/v1734926550/teslo-shop/products/2077996-01-A-3-03.avif',
                'https://res.cloudinary.com/dhavhzmvy/image/upload/v1734926550/teslo-shop/products/2077996-01-A-3-04.avif'
            ],
            stock: 7,
            price: 85,
            sizes: ['S','M','L','XL','XXL','XXXL'],
            slug: "built_for_any_planet_hoodie",
            type: 'hoodies',
            tags: ['planet', 'hoodie'],
            title: "Built for Any Planet Hoodie",
            gender: 'unisex'
        },
        {
            description: "The refreshed Kids Racing Stripe Tee is made from 100% Peruvian cotton, featuring a newly enhanced racing stripe with a brushed Tesla wordmark that's perfect for any speed racer.",
            images: [
                'https://res.cloudinary.com/dhavhzmvy/image/upload/v1734927559/teslo-shop/products/8529366-00-A_0_2000.avif',
                'https://res.cloudinary.com/dhavhzmvy/image/upload/v1734927559/teslo-shop/products/8529366-00-A_1_2000.avif'
            ],
            stock: 5,
            price: 15,
            sizes: ['2T','4T','6','8','10'],
            slug: "kids_racing_stripe_tee",
            type: 'shirts',
            tags: ['racing', 'kids'],
            title: "Kids Racing Stripe Tee",
            gender: 'kid'
        },
        {
            description: "Inspired by Cybertruck’s stainless-steel exterior, the Kids Cybertruck Reflective Tee features the Cybertruck silhouette on the front and signature Cybertruck graffiti wordmark on the back collar, both constructed from laser-cut, high-visibility vinyl taping to create a unique glowing effect. Made from 95% cotton and 5% elastane.",
            images: [
                'https://res.cloudinary.com/dhavhzmvy/image/upload/v1734928006/teslo-shop/products/2031041-00-A_01_2000.avif',
                'https://res.cloudinary.com/dhavhzmvy/image/upload/v1734928006/teslo-shop/products/2031041-00-A_02_2000.avif',
                'https://res.cloudinary.com/dhavhzmvy/image/upload/v1734928006/teslo-shop/products/2031041-00-A_03_2000.avif'
            ],
            stock: 15,
            price: 30,
            sizes: ['2T','4T','6','8','10','12'],
            slug: "kids_cybertruck_reflective_tee",
            type: 'shirts',
            tags: ['cybertruck', 'kids'],
            title: "Kids Cybertruck Reflective Tee",
            gender: 'kid'
        },
    ]
}