import { Parallax } from "react-parallax";

const Cover = ({ coverImage, title, description }) => {
  return (
    <Parallax
      blur={{ min: -50, max: 50 }}
      bgImage={coverImage}
      bgImageAlt="the menu"
      strength={-200}
    >
      {/* content goes here */}
      <div
        className="hero h-[700px] rounded-xl"
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md rounded-3xl">
            <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
            <p className="mb-5 uppercase">{description}</p>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default Cover;
