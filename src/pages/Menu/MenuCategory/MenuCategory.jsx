import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, coverImg, title, description }) => {
  return (
    <div className="my-32">
      {title && (
        <Cover coverImage={coverImg} title={title} description={description}></Cover>
      )}
      <div className="grid grid-cols-2 gap-10 my-16">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <div className="text-center">
      <Link to={`/order/${title}`} className="btn btn-outline border-0 border-b-4">Order Now</Link>
      </div>
    </div>
  );
};

export default MenuCategory;
