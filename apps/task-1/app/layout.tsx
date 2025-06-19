import localFont from "next/font/local";

import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import Header from "@/components/layout/header";

const sportingGrotesque = localFont({
    src: [
        {
            path: '../fonts/Sporting_Grotesque-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../fonts/Sporting_Grotesque-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-sporting-grotesque',
    display: 'swap',
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${sportingGrotesque.variable} font-sans antialiased`}
            >
                <Providers>
                    <Header />
                    <main className="absolute -z-10  top-0 w-full
                    ">
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    );
}
