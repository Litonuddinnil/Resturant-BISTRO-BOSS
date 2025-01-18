import React, { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Rating } from "@smastrom/react-rating"; 
import { FaQuoteLeft } from "react-icons/fa6";
import "@smastrom/react-rating/style.css";
const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("https://bistro-boss-restaurant-server-beta-rosy.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);
  // console.log(reviews);
  return (
    <section>
      <section>
        <SectionTitle
          heading={"What Our Clients Say"}
          subheading={"TESTIMONIALS"}
        ></SectionTitle>
      </section>

      <section className="my-8 ">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper text-center "
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="flex items-center justify-center flex-col">
                <Rating
                  style={{ maxWidth: 180 }}
                  value={review.rating}
                  readOnly
                />
                <div className=" text-7xl my-2 ">  
                    <FaQuoteLeft></FaQuoteLeft>
                </div>
                <p className="w-10/12 mx-auto">{review.details}</p>
                <h1 className="text-yellow-600 font-semibold text-3xl mt-4">
                  {review.name}
                </h1>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </section>
  );
};

export default Testimonials;
