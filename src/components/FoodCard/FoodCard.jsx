const FoodCard = ({ item }) => {
  const { name, image, recipe, price } = item;

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="relative">
        <img src={image} alt="Shoes" />
      </figure>
      <p className="absolute right-10 top-5 text-white font-semibold bg-slate-700 bg-opacity-70 rounded-3xl py-2 px-8">
        ${price}
      </p>
      <div className="card-body">
        <h2 className="text-center text-2xl font-bold">{name}</h2>
        <p className="text-start">{recipe}</p>
        <div className="text-center">
          <button className="btn btn-outline border-0 border-b-4 border-yellow-500 bg-slate-200">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
