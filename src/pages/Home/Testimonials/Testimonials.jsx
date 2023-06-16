import SectionTitle from "../../../components/SectionTitle/SectionTitle";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

import { useEffect, useState } from "react";

// react awesome rating
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

// react icon
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <section className="my-24">
      <SectionTitle
        heading={"Testimonials"}
        subHeading={"What Our Clients Say"}
      ></SectionTitle>

      {/* swiper content goes here */}
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reviews.map((review) => (
          <SwiperSlide key={review._id} className="text-center">
            <div className="mx-24 flex flex-col items-center gap-4">
              <Rating
                style={{ maxWidth: 250 }}
                value={review.rating}
                readOnly
              />
              <FaQuoteLeft className="text-8xl my-8" />
              <p>{review.details}</p>
              <h3 className="text-yellow-600 uppercase text-2xl my-2">
                {review.name}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
