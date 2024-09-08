'use client'

import React, { useState, useEffect } from 'react';
import { Lists } from '@/components/Global';

const data_1 = [
  {
    title: "Junior & [Software Engineer]",
    details: "Akastra Toyota | March 2023 - March 2024",
    description: "I started my programming journey here at Akastra Toyota as an Intern Junior Software Engineer. I've built and participated in many incredible projects here. This is the place that I prepared myself to be a future-ready programmer."
  },
  {
    title: "English [Certification]",
    details: "TOEIC Test | August 2022",
    description: "I took the TOEIC Test, which is a benchmark for assessing someone's English skills. I scored 800 points out of 1000, which placed me in the 'advanced' level in terms of English proficiency."
  },
];

const data_2 = [
  {
    title: "IT Software Solution [for Business]",
    details: "IT Software Solution For Business | March 2023",
    description: "I participated in LKS IT Software Solution For Business and became the champion in Banjarnegara. I made my way through the provincial competition. Even though I didn't win in the provincial stage, I'm highly proud to made it this far."
  },
  {
    title: "Web Technology [Competition]",
    details: "Web Technology | February 2024",
    description: "I won the LKS Web Technology Competition in Banjarnegara, where I competed by building a full-stack web app with payment gateway integration. The stack used in this competition was Laravel."
  }
];

const data_3 = [
  {
    title: "Digital Marketing [Analyst]",
    details: "Toploker.com | May 2024 - Now",
    description: "I work at Toploker.com as a Digital Marketing Analyst. My job involves finding and analyzing the best digital marketing strategies for the company. I also look for ways to improve our team and develop better algorithms to save time or increase company's value."
  }
];

// Combine data for mobile and tablet
const combinedData = [...data_1, ...data_2, ...data_3];

export const Experience: React.FC = () => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Set mobile or tablet view if width <= 1024px
      setIsMobileOrTablet(window.matchMedia("(max-width: 1024px)").matches);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize); // Add listener for resize

    return () => window.removeEventListener('resize', handleResize); // Cleanup
  }, []);

  return (
    <div className='h-auto w-full p-12 bg-secondary shadow-xl relative mb-[60px]'>
      <h3 className="text-text text-4xl absolute top-[-20px] left-4">
        Experience
      </h3>

      {isMobileOrTablet ? (
        <div className="mb-12">
          <Lists items={combinedData} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-14">
            <Lists items={data_1} />
            <div className="hidden md:flex items-center justify-center">
              <img 
                src="assets/static/img/Icons/csharp.svg" 
                alt="C#" 
                className='h-[180px]'
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-14">
            <div className="hidden md:flex items-center justify-center">
              <img 
                src="assets/static/img/Icons/nodejs.svg" 
                alt="NodeJS" 
                className='h-[180px]'
              />
            </div>
            <Lists items={data_2} />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-14">
            <Lists items={data_3} />
            <div className="hidden md:flex items-center justify-center">
              <img 
                src="assets/static/img/Icons/docker.svg" 
                alt="Docker" 
                className='h-[180px]'
              />
            </div>
          </div>
        </>
      )}

      {/* Single Icon Display on Mobile and Tablet */}
      {isMobileOrTablet && (
        <div className="md:hidden flex justify-center">
          <img 
            src="assets/static/img/Icons/csharp.svg" 
            alt="C#" 
            className='h-[100px]'
          />
        </div>
      )}
    </div>
  );
};