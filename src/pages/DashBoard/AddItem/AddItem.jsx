import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddItem = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }, reset
  } = useForm();
  const [axiosSecure] = useAxiosSecure();

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageResponse) => {
        // console.log('image response from formData', imageResponse);
        if (imageResponse.success) {
          const imgURL = imageResponse.data.display_url;

          const { name, category, price, recipe } = data;
          const newItem = {
            name,
            category,
            recipe,
            price: parseFloat(price),
            image: imgURL,
          };

          console.log(data, "image response from formData", imgURL, newItem);

          axiosSecure.post("/menu", newItem).then((res) => {
            console.log("after posting new data item", res.data);
            if (res.data.insertedId) {
              reset();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "New manu item added successfully!",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        }
      });
  };
  // console.log(img_hosting_token);
  console.log(errors);

  return (
    <div className="w-full px-16">
      <Helmet>
        <title>Bistro Boss | Add Item</title>
      </Helmet>

      <SectionTitle
        heading={"Add an Item"}
        subHeading={"What's New?"}
      ></SectionTitle>

      <form className="mb-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text fon-semibold">Recipe Name *</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="name"
            {...register("name", { required: true, maxLength: 110 })}
            className="input input-bordered w-full"
          />
          {errors.name && (
            <span className="text-red-300">Name is required</span>
          )}
        </div>
        <div className="flex gap-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Category *</span>
            </label>
            <select
              defaultValue={"Pick One"}
              {...register("category", { required: true })}
              className="select select-bordered"
            >
              <option disabled>Pick One</option>
              <option>Pizza</option>
              <option>Soup</option>
              <option>Salad</option>
              <option>Dessert</option>
              <option>Drinks</option>
            </select>
            {errors.category && (
            <span className="text-red-400">Category name is required</span>
          )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text fon-semibold">Price *</span>
            </label>
            <input
              type="number"
              {...register("price", { required: true })}
              placeholder="Type here"
              className="input input-bordered w-full"
            />
            {errors.price && (
            <span className="text-red-500">Price is required</span>
          )}
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Recipe Details</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            {...register("recipe", { required: true, maxLength: 500 })}
            placeholder="Bio"
          ></textarea>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Item Image *</span>
          </label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input file-input-bordered w-full"
          />
          {errors.image && (
            <span className="text-red-500">Image is required</span>
          )}
        </div>

        <div className="flex gap-4 items-center justify-center mx-auto btn btn-error btn-outline mt-4 w-40 text-black text-xl font-bold">
          <input type="submit" value="Add Item" /> <FaUtensils />
        </div>
      </form>
    </div>
  );
};

export default AddItem;
