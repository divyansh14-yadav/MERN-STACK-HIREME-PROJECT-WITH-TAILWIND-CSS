import React from 'react';

const BrandSlider = () => {
  const brandImages = [
    "https://script.viserlab.com/metalance/assets/images/frontend/partner/662f399ef03071714370974.png",
    "https://script.viserlab.com/metalance/assets/images/frontend/partner/662f39d272ab81714371026.png",
    "https://script.viserlab.com/metalance/assets/images/frontend/partner/662f39e2d4e771714371042.png",
    "https://script.viserlab.com/metalance/assets/images/frontend/partner/662f39a6a80d91714370982.png",
    "https://script.viserlab.com/metalance/assets/images/frontend/partner/662f39943ae351714370964.png",
    "https://script.viserlab.com/metalance/assets/images/frontend/partner/662f39db6d1a91714371035.png",
    "https://script.viserlab.com/metalance/assets/images/frontend/partner/662f39ad8af6c1714370989.png",
  ];

  return (
    <div className="bg-[#f7f7f7] py-6 overflow-hidden">
      <div className="flex items-center justify-around md:justify-between gap-4 md:gap-12 animate-marquee-tailwind">
        {brandImages.map((src, index) => (
          <img
            key={index}
            className="w-[30%] md:w-[15%] lg:w-[12%] max-w-[150px]"
            src={src}
            alt={`Brand ${index + 1}`}
          />
        ))}
        {/* Duplicate images for a smoother effect */}
        {brandImages.map((src, index) => (
          <img
            key={`duplicate-${index}`}
            className="w-[30%] md:w-[15%] lg:w-[12%] max-w-[150px]"
            src={src}
            alt={`Brand ${index + 1} Duplicate`}
          />
        ))}
      </div>
    </div>
  );
};

export default BrandSlider;