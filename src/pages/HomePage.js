import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/products");
      // console.log(response.data);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div>
        <Link
          to="/create"
          className="inline-block nt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-500 hover:cursor-pointer"
        >
          Create a Product
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 m-5">
        {loading ? (
          "Loading"
        ) : (
          <>
            {products.length > 0 ? (
              <>
                {products.map((product) => {
                  return (
                    <Product
                      key={product._id}
                      product={product}
                      getProducts={getProducts}
                    />
                  );
                })}
              </>
            ) : (
              <div>There is no product</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
