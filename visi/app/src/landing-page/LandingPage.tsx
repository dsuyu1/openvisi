import ExamplesCarousel from "./components/ExamplesCarousel";
import FeaturesGrid from "./components/FeaturesGrid";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Mission from "./components/Mission";
import Contact from "./components/Contact";
import { examples, features, footerNavigation } from "./contentSections";
import VideoShowcase from "./ExampleHighlightedFeature";

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground">
      <main className="isolate">
        <Hero />
        <Mission />
        <ExamplesCarousel examples={examples} />
        <VideoShowcase />
        <FeaturesGrid features={features} />
        <Contact />
      </main>
      <Footer footerNavigation={footerNavigation} />
    </div>
  );
}
