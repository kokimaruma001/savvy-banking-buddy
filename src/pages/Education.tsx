
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import LearningHub from '../components/education/LearningHub';

const Education = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16 bg-gradient-to-b from-background to-secondary/5">
        <div className="container mx-auto px-6 md:px-12">
          <LearningHub />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Education;
