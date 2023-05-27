import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

import categoryImage1 from "../../../assets/home/slide1.jpg";
import categoryImage2 from "../../../assets/home/slide2.jpg";
import categoryImage3 from "../../../assets/home/slide3.jpg";
import categoryImage4 from "../../../assets/home/slide4.jpg";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Category = () => {
  return (
    <section className="my-24">
      <SectionTitle
        heading = {"Order Online"}
        subHeading = {"from 11am to 10pm"}
      ></SectionTitle>
      <Swiper
      slidesPerView={4}
      spaceBetween={30}
      centeredSlides={true}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper mb-24"
    >
      <SwiperSlide>
        <img src={categoryImage1} />
        <p className="text-4xl text-center text-white uppercase -mt-10">Salads </p>
      </SwiperSlide>
      <SwiperSlide>
        <img src={categoryImage2} />
        <p className="text-4xl text-center text-white uppercase -mt-10">Pizzas</p>
      </SwiperSlide>
      <SwiperSlide>
        <img src={categoryImage3} />
        <p className="text-4xl text-center text-white uppercase -mt-10">Soups</p>
      </SwiperSlide>
      <SwiperSlide>
        <img src={categoryImage4} />
        <p className="text-4xl text-center text-white uppercase -mt-10">Deserts</p>
      </SwiperSlide>
    </Swiper>
    </section>
  );
};

export default Category;
