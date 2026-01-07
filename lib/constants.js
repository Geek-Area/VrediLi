import {
    Coffee,
    Milk,
    Croissant,
    Smartphone,
    Ticket,
    Pizza,
    Beer,
    Candy,
    Fuel,
    Shirt,
    Plane
} from 'lucide-react';

export const PRODUCTS = [
    {
        id: 'bread',
        name: 'Vekna Hleba',
        priceRSD: 80,
        priceEUR: 0.7,
        icon: Croissant,
        color: '#ca8a04' // yellow-600
    },
    {
        id: 'milk',
        name: 'Litar Mleka',
        priceRSD: 160,
        priceEUR: 1.35,
        icon: Milk,
        color: '#3b82f6' // blue-500
    },
    {
        id: 'coffee',
        name: 'Espresso',
        priceRSD: 220,
        priceEUR: 1.9,
        icon: Coffee,
        color: '#b45309' // amber-700
    },
    {
        id: 'beer',
        name: 'Pivo (0.5l)',
        priceRSD: 350,
        priceEUR: 3.0,
        icon: Beer,
        color: '#eab308' // yellow-500
    },
    {
        id: 'chocolate',
        name: 'Čokolada (100g)',
        priceRSD: 150,
        priceEUR: 1.3,
        icon: Candy,
        color: '#db2777' // pink-600
    },
    {
        id: 'pizza',
        name: 'Parče Pice',
        priceRSD: 300,
        priceEUR: 2.5,
        icon: Pizza,
        color: '#f97316' // orange-500
    },
    {
        id: 'fuel',
        name: 'Litar Goriva',
        priceRSD: 195,
        priceEUR: 1.65,
        icon: Fuel,
        color: '#10b981' // emerald-500
    },
    {
        id: 'cinema',
        name: 'Bioskopska Karta',
        priceRSD: 850,
        priceEUR: 7.2,
        icon: Ticket,
        color: '#a855f7' // purple-500
    },
    {
        id: 'tshirt',
        name: 'Majica',
        priceRSD: 2500,
        priceEUR: 21,
        icon: Shirt,
        color: '#818cf8' // indigo-400
    },
    {
        id: 'trip',
        name: 'Avio Karta (Evropa)',
        priceRSD: 24000,
        priceEUR: 200,
        icon: Plane,
        color: '#0ea5e9' // sky-500
    },
    {
        id: 'phone',
        name: 'iPhone 15',
        priceRSD: 120000,
        priceEUR: 1000,
        icon: Smartphone,
        color: '#a1a1aa' // zinc-400
    }
];

export const CURRENCIES = {
    RSD: { symbol: 'RSD', rateToEur: 1 / 117.2 },
    EUR: { symbol: '€', rateToEur: 1 }
};

export const SALARIES = {
    AVG: {
        label: 'Prosečna Plata',
        netRSD: 96000,
        hoursPerMonth: 168
    },
    MIN: {
        label: 'Minimalac',
        netRSD: 53592, // Current min approx
        hoursPerMonth: 168
    },
    MEDIAN: {
        label: 'Medijana',
        netRSD: 77830, // Nov 2024
        hoursPerMonth: 168
    }
};
