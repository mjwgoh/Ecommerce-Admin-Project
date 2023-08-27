import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images, // not implemented!
}) {
  // extracts title, description, and price from the information passed in (see spread syntax) and stores them as existingXXX respectively
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");

  const [goToProducts, setGoToProducts] = useState(false);

  async function createProduct(ev) {
    ev.preventDefault(); // prevents default behavior of event (i.e. page does not refresh when product creation event occurs)
    const data = { title, description, price }; // creating a new struct called data with variables productName, productDescription, and productPrice

    if (_id) {
      // if _id exists, update product
      await axios.put("/api/products", { ...data, _id });
    } else {
      // if _id does not exist, create a new product
      await axios.post("/api/products", data); // sends data to the api/products endpoint using the axios library
    }
    setGoToProducts(true); // set value to enable return to producct page
  }

  if (goToProducts) {
    useRouter().push("/products");
  }

  async function uploadImages(ev) {

    // function NOT implemented as it requires AWS S3
    // Watch https://www.youtube.com/watch?v=dTFXufTgfOE for implementation

    const files = ev.target?.files;

    if (files?.length > 0) {
      const data = new FormData();

      for (const file of files) {
        data.append("file", files);
      }

      const res = axios.post('/api/upload', data);
      console.log(res.data);

    }
  }

  return (
    <form onSubmit={createProduct}>
      {" "}
      {/* React automatically passes the event object as the first argument to the function when it is triggered. Therefore, there is no need to pass ev to the function! Also, in JS, adding {} to the function invokes the function immediately. */}
      <label>Product Name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      ></input>
      <label>Photos</label>
      <div className="mb-2 hidden">
        <label className="flex flex-col w-24 h-24 border justify-center items-center cursor-pointer hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div className="text-sm text-gray-600 mt-1">Upload</div>
          <input type="file" className="hidden"></input>
        </label>
        {!images?.length && <div>No photos in the product</div>}
      </div>
      <label>Description</label>
      <textarea
        type="text"
        placeholder="description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      ></textarea>
      <label>Price (USD)</label>
      <input
        type="text"
        placeholder="price"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      ></input>
      <button type="submit" className="btn-primary">
        Add Product
      </button>
    </form>
  );
}
