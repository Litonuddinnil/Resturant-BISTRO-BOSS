import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import FeatureImg from '../../../assets/home/featured.jpg';
import ReactiveButton from 'reactive-button';

const Featured = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      className="p-8 bg-cover bg-center bg-fixed text-white"
      style={{
        backgroundImage: `url(${FeatureImg})`, 
      }}
    >
      {/* Background Overlay */}
      <div className="bg-black bg-opacity-50 rounded-lg p-10">
        {/* Section Title */}
        <SectionTitle heading="Check it out" subheading="featured items" />

        <div className="flex flex-col md:flex-row items-center gap-8 mt-8">
          {/* Image Section */}
          <div className="flex-shrink-0">
            <img
              src={FeatureImg}
              alt="Featured Item"
              className="rounded-lg w-[648px] h-[400px] shadow-lg"
            />
          </div>

          {/* Text Section */}
          <div className="text-content max-w-lg">
            <p className="text-gray-300 mb-4">{currentDate}</p>
            <p className="uppercase font-bold mb-4">Where Can I Get Some?</p>
            <p className="text-sm mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur perferendis veniam maiores nesciunt eum est explicabo
              ab, velit debitis dolore unde eaque repudiandae eius ullam dolorem
              necessitatibus asperiores assumenda ut sit laudantium quisquam hic
              ex! Sit sed totam delectus ratione sunt vitae magni facilis! Quam
              quis sed temporibus! Odit, beatae.
            </p>

            {/* Reactive Button */}
            <ReactiveButton
              idleText="Read More.."
              type="button"
              className="px-4 py-2 bg-blue-500 text-white font-bold hover:bg-blue-600"
              style={{
                borderRadius: "5px",
              }}
              outline={false}
              shadow={true}
              rounded={false}
              size="normal"
              block={false}
              messageDuration={2000}
              disabled={false}
              animation={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
