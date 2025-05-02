
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Savvy</title>
      </Helmet>
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">About Savvy</h1>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6">
              At Savvy, our mission is to democratize financial literacy and empower individuals to take control of their financial future through education, tools, and personalized guidance.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Founded in 2023, Savvy was born from the recognition that many people lack access to quality financial education and guidance. Our team of financial experts and technology innovators came together to create a platform that makes financial knowledge accessible to everyone.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <ul className="list-disc pl-6 space-y-3 text-lg text-muted-foreground">
              <li>Accessibility - Making financial education available to everyone</li>
              <li>Transparency - Clear, honest communication in all we do</li>
              <li>Innovation - Continuously improving our tools and resources</li>
              <li>Empowerment - Giving users the knowledge to make confident financial decisions</li>
              <li>Security - Protecting user data with the highest standards</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our diverse team brings together expertise in finance, technology, education, and customer service. United by our passion for financial literacy, we're committed to helping you achieve your financial goals.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;
