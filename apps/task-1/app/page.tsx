import Hero from "@/components/section/hero"

export default function Page() {
    return (
        <main className="min-h-screen">
            <Hero />

            {/* Additional content for scroll testing */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Additional Content</h2>
                    <p className="text-center text-muted-foreground">
                        Scroll up to see the header background change and blur effect.
                    </p>
                </div>
            </section>
        </main>
    )
}
