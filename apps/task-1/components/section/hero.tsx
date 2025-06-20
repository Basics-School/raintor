import { Button } from "@workspace/ui/components/button";
import { CallIcon } from "@workspace/ui/components/icons/call-icon";
import { SocialLinks } from "@/components/layout/social-links";

export default function Hero() {
    return (
        <section
            className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: "url('/hero.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Overlay for better text readability in dark mode */}
            <div className="absolute  inset-0 bg-background/10 dark:bg-background/30"></div>

            <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="relative flex items-start">
                    {/* Social links positioned on the left, aligned with h1 */}
                    <div className="hidden lg:block absolute left-0 bottom-20 -rotate-90">
                        <SocialLinks />
                    </div>

                    {/* Main content */}
                    <div className="max-w-4xl px-4 sm:px-6 lg:px-8    w-full   md:max-w-xxl mx-auto text-center md:text-left ">
                        <h1 className="text-4xl md:text-6xl md:leading-32 lg:text-7xl space-y-4 font-bold  mb-6">
                            <span className="text-black dark:text-foreground">Trusted </span>
                            <span className="bg-black dark:bg-foreground text-white dark:text-background px-4 pt-2  rounded-lg inline-block">
                                Partner
                            </span>
                            <span className="text-black dark:text-foreground"> for</span>
                            <br />
                            <span className="text-black dark:text-foreground">
                                Your Website{" "}
                            </span>
                            <span className="bg-black dark:bg-foreground text-white dark:text-background px-4 pt-2 rounded-lg inline-block">
                                Develop.
                            </span>
                        </h1>
                        <div className=" max-w-4xl relative md:left-40 mx-auto md:mt-20 flex items-center md:items-start flex-col gap-8">
                            <p className="text-lg md:text-xl  relative text-black/80 dark:text-foreground/80 mb-4">
                                Building the world's best marketing websites for over a decade.
                                <br />
                                Your trusted partner for strategy, design, and dev.
                            </p>

                            <Button
                                size="lg"
                                className="w-min cursor-pointer py-10 px-0"
                            >
                                <CallIcon />
                                <span className="pr-4">Schedule a Call</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social links on the left side */}

        </section>
    );
}
