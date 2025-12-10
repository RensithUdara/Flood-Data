import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geist = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Flood Data Dashboard - Sri Lanka',
    description:
        'Real-time water level and rainfall monitoring for Sri Lanka river basins',
    keywords: [
        'flood',
        'water level',
        'rainfall',
        'monitoring',
        'Sri Lanka',
        'DMC',
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`${geist.variable} ${geistMono.variable} antialiased bg-slate-900 text-white`}
            >
                {children}
            </body>
        </html>
    );
}
