import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreatePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const name = useRef(null);
  const quantity = useRef(null);
  const price = useRef(null);
  const imageURL = useRef(null);
  const formRef = useRef(null);

  const handleSubmitButton = async () => {
    if (
      name.current.value === "" ||
      quantity.current.value === "" ||
      price.current.value === "" ||
      imageURL.current.value === ""
    ) {
      alert("Please enter all the values");
      return;
    }
    try {
      //formRef.current.reset();
      // console.log(name.current.value);
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/products",
        {
          name: name.current.value,
          quantity: quantity.current.value,
          price: price.current.value,
          image: imageURL.current.value,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success(`Saved ${response.data.name} successfully`);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
      <h2 className="font-semibold text-2xl mb-4 block text-center">
        Create a Product
      </h2>
      <form onSubmit={(e) => e.preventDefault()} ref={formRef}>
        <div className="space-y-2">
          <div>
            <label>Name</label>
            <input
              type="text"
              ref={name}
              className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
              placeholder="Enter Name"
            />
          </div>
          <div>
            <label>Quantity</label>
            <input
              type="number"
              ref={quantity}
              className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
              placeholder="Enter Quantity"
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              ref={price}
              className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
              placeholder="Enter Price"
            />
          </div>
          <div>
            <label>Image URL</label>
            <input
              type="text"
              ref={imageURL}
              className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
              placeholder="Enter Image URL"
            />
          </div>
          <div>
            {!isLoading && (
              <button
                className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-500 hover:cursor-pointer"
                onClick={handleSubmitButton}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePage;
