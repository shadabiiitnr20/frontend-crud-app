import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    quantity: "",
    price: "",
    imageURL: "",
  });

  const getSingleProduct = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );
      // console.log(response.data);
      setProduct({
        name: response.data.name,
        quantity: response.data.quantity,
        price: response.data.price,
        imageURL: response.data.image,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  const handleEditButton = async () => {
    setIsLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, product);
      toast.success("Product Updated Successfully");
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  // console.log(product);

  return (
    <>
      {isLoading ? (
        "Loading"
      ) : (
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
          <h2 className="font-semibold text-2xl mb-4 block text-center">
            Update a Product
          </h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Enter Name"
                />
              </div>
              <div>
                <label>Quantity</label>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) =>
                    setProduct({ ...product, quantity: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Enter Quantity"
                />
              </div>
              <div>
                <label>Price</label>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Enter Price"
                />
              </div>
              <div>
                <label>Image URL</label>
                <input
                  type="text"
                  value={product.imageURL}
                  onChange={(e) =>
                    setProduct({ ...product, imageURL: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Enter Image URL"
                />
              </div>
              <div>
                {!isLoading && (
                  <button
                    className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-500 hover:cursor-pointer"
                    onClick={handleEditButton}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditPage;
