import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImage from "../../../assets/home/featured.jpg";
import './Featured.css';

const Featured = () => {
  return (
    <div className="featured-item pt-8 text-white bg-fixed my-24">
      <SectionTitle
        heading={"Featured Item"}
        subHeading={"Check it Out"}
      ></SectionTitle>
      <div className="md:flex justify-center items-center gap-8 px-36 py-24 bg-slate-500 bg-opacity-50">
        <div className="w-full md:w-50">
          <img src={featuredImage} alt="" />
        </div>
        <div className="md:ml-10 space-y-8">
          <div>
            <p>May 20, 2023</p>
            <p className="uppercase">WHERE CAN I GET SOME?</p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              itaque quod, cupiditate id architecto soluta ducimus nulla alias
              quae sed!
            </p>
          </div>
          <button className="btn btn-outline text-white border-0 border-b-4">Order Now</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
