import coverImage from "../../../assets/home/chef-service.jpg";

const MessageInfo = () => {
  return (
    <div
      className="hero rounded-xl overflow-hidden my-20"
      style={{
        backgroundImage: `url("${coverImage}")`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="bg-white text-black m-24 p-24 rounded-3xl">
          <h1 className="mb-5 text-5xl uppercase">Bistro Boss</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageInfo;
