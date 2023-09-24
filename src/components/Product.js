import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Product = ({ product, getProducts }) => {
  const deleteProductHandler = async (id) => {
    const result = await Swal.fire({
      title: "Do you really want to delete the product?",
      icon: "Warning",
      showCancelButton: true,
      confirmButtonText: "Yes Delete it",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        toast.success("Product Deleted Successfully");
        getProducts();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="bg-white rounded overflow-hidden shadow-lg">
      <img
        alt={product.name}
        src={product.image}
        className="w-full h-28 object-cover"
      />
      <div className="px-4 pt-2 pb-4">
        <h2 className="text font-semibold">{product.name}</h2>
        <div className="text-sm">Quantity: {product.quantity}</div>
        <div className="text-sm">Price ${product.price}</div>
        <div className="mt-2 flex gap-4">
          <Link
            to={`/edit/${product._id}`}
            className="inline-block w-full text-center shadow-md text-sm bg-gray-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-gray-500 hover:cursor-pointer"
          >
            Edit
          </Link>
          <button
            onClick={() => deleteProductHandler(product._id)}
            className="inline-block w-full text-center shadow-md text-sm bg-red-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-red-500 hover:cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
