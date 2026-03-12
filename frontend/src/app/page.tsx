import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MenuSection from '@/components/MenuSection';
import ReservationSection from '@/components/ReservationSection';
import AboutSection from '@/components/AboutSection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import SectionDivider from '@/components/SectionDivider';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SectionDivider />
        <MenuSection />
        <SectionDivider />
        <ReservationSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <BlogSection />
        <SectionDivider />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
