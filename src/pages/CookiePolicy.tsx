
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const CookiePolicy = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Policy | Savvy</title>
      </Helmet>
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: May 2, 2025</p>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
              <p>
                Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Cookies</h2>
              <p className="mb-4">We use cookies for a variety of purposes, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Essential cookies: Necessary for the website to function properly</li>
                <li>Analytical/performance cookies: Allow us to recognize and count visitors and see how they move around our website</li>
                <li>Functionality cookies: Used to recognize you when you return to our website</li>
                <li>Targeting cookies: Record your visit to our website, the pages you visited, and the links you followed</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
              <div className="mb-4">
                <h3 className="text-xl font-medium mb-2">Essential Cookies</h3>
                <p>
                  These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually set in response to actions made by you, such as setting your privacy preferences, logging in, or filling in forms.
                </p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-xl font-medium mb-2">Performance Cookies</h3>
                <p>
                  These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular and see how visitors move around the site.
                </p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-xl font-medium mb-2">Functional Cookies</h3>
                <p>
                  These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Targeting Cookies</h3>
                <p>
                  These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant ads on other sites.
                </p>
              </div>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Managing Cookies</h2>
              <p className="mb-4">
                Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience.
              </p>
              <p>
                To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit <a href="https://www.allaboutcookies.org" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Changes to This Cookie Policy</h2>
              <p>
                We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
              <p>
                If you have any questions about our Cookie Policy, please contact us at{' '}
                <a href="mailto:privacy@savvy.com" className="text-primary hover:underline">
                  privacy@savvy.com
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CookiePolicy;
