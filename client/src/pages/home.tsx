import React from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Features from "@/components/features";
import DashboardPreview from "@/components/dashboard-preview";
import Waitlist from "@/components/waitlist";
import Testimonials from "@/components/testimonials";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";
import AuthModal from "@/components/auth/auth-modal";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <DashboardPreview />
        <Waitlist />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      <AuthModal />
    </div>
  );
};

export default Home;
