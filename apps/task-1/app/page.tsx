import AboutSection from "@/components/section/about";
import ContactSection from "@/components/section/contact";
import Hero from "@/components/section/hero";
import MySkills from "@/components/section/my-skills";

export default function Page() {
    return (
        <main className="min-h-screen ">
            <Hero />
            <MySkills />
            <AboutSection />
            <ContactSection />
        </main>
    );
}
