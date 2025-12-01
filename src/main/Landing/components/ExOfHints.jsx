import React from 'react';
import shape from '../assets/shape.png';
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import img4 from '../assets/img4.png';
import img5 from '../assets/img5.png';
import img6 from '../assets/img6.png';

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const ExOfHints = () => {
  const images = [img1, img2, img3, img4, img5, img6];

  return (
    <div className="relative pt-6 md:pt-12 pb-8 md:pb-16 px-4 md:px-12 overflow-hidden">
      
      {/* Background shape image */}
      <img
        src={shape}
        alt="Background Shape"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30 z-0 pointer-events-none"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-10 px-2">
          <h2 className="text-3xl md:text-5xl font-bold mb-10">
            Examples <span className="text-red-500">of Hints</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Every Hint is practical and easy to use. Explore categories across health, focus, and wellness.
          </p>
        </div>

        {/* Masonry Grid */}
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 1024: 3 }}>
          <Masonry
            gutter="0px"
            style={{
              lineHeight: 0, // removes white space between inline elements
              margin: 0,
            }}
          >
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Hint Example ${idx + 1}`}
                style={{
                  width: '100%',
                  display: 'block',
                  margin: 0,
                  padding: 0,
                  borderRadius: '12px',
                }}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
};

export default ExOfHints;
