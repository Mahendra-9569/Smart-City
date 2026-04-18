import React, { useEffect, useRef } from "react";

const successStories = [
  {
    name: "Alice Green",
    feedback: "The smart traffic system has drastically reduced my daily commute time!",
    image: "/avatar1.webp",
  },
  {
    name: "Michael Brown",
    feedback: "I love how the smart waste management system keeps our city clean and efficient.",
    image: "/avatar2.webp",
  },
  {
    name: "Sophia Wilson",
    feedback: "The real-time air quality monitoring helps me plan my outdoor activities better.",
    image: "/avatar3.webp",
  },
  {
    name: "Daniel Martinez",
    feedback: "Smart lighting has made our streets safer and more energy-efficient.",
    image: "/avatar4.webp",
  },
];


const SuccessStories = () => {
  const sliderRef = useRef(null);
  const LOOP_COUNT = 10; // 10 sets for smooth looping without overloading the DOM

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationFrameId;
    const scrollAmount = window.innerWidth < 768 ? 0.5 : 1; // Responsive scroll speed

    // Calculate the width of one set of stories
    const cardWidth = slider.children[0].offsetWidth; // Width of one card
    const space = window.innerWidth < 768 ? 16 : 24; // space-x-4 (16px) or space-x-6 (24px)
    const storiesPerSet = successStories.length; // Number of stories in one set (4)
    const widthPerSet = (storiesPerSet * cardWidth) + ((storiesPerSet - 1) * space); // Total width of one set

    const smoothScroll = () => {
      slider.scrollLeft += scrollAmount;
      if (slider.scrollLeft >= widthPerSet) {
        slider.scrollLeft -= widthPerSet; // Reset by one set's width for seamless looping
      }
      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    animationFrameId = requestAnimationFrame(smoothScroll);

    // Cleanup to prevent memory leaks
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="w-full py-8 md:py-16 bg-gray-100 text-center">
      <h2 className="text-2xl md:text-4xl font-bold text-gray-900">Success Stories</h2>
      <p className="text-base md:text-lg text-gray-700 mt-4 max-w-3xl mx-auto">
        Discover how our smart city solutions have improved the lives of residents by addressing key urban challenges efficiently.
      </p>
      <div className="w-full bg-[#f3f4f6] py-8 md:py-16 overflow-hidden relative">
        {/* Gradient Fades */}
        <div className="absolute left-0 top-0 h-full w-12 md:w-24 bg-gradient-to-r from-[#f3f4f6] to-transparent z-10" />
        <div className="absolute right-0 top-0 h-full w-12 md:w-24 bg-gradient-to-l from-[#f3f4f6] to-transparent z-10" />

        {/* Infinite Scrolling Container */}
        <div
          ref={sliderRef}
          className="flex space-x-4 md:space-x-6 px-4 md:px-6 overflow-hidden"
          style={{ display: "flex", flexWrap: "nowrap" }} // Ensure single row
        >
          {/* Repeating success stories */}
          {Array.from({ length: LOOP_COUNT }).flatMap(() => successStories).map((story, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-64 md:w-80 bg-[#e9eff2] p-4 md:p-8 py-8 md:py-12 rounded-lg text-center shadow-md hover:border-gray-400 border-[2px] shadow-gray-600 transition-transform hover:scale-105 hover:shadow-xl"
            >
              <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gray-300">
                <img src={story.image} alt={story.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <p className="text-sm md:text-base text-gray-600 italic">"{story.feedback}"</p>
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mt-4">- {story.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;