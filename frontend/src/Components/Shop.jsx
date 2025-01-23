// src/pages/Shop/Shop.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import SettingIcon from "../assets/setting.svg";
import DotIcon from "../assets/dot.png";
import BiViewIcon from "../assets/bi_view.png";
import Select from "react-select";
import AddProduct from "./AddProduct";
import { FaRegTrashAlt, FaPlusSquare } from "react-icons/fa";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [pagin, setPagin] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState({ value: 10, label: 10 });
  const [sort, SetSort] = useState({ value: "default", label: "Default" });
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [currentProductData, setCurrentProductData] = useState(null);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, sort, perPage]);

  const fetchProducts = async (page = 1) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/products?page=${page}&sort=${sort.value}&limit=${perPage.value}`
      );
      setProducts(response.data);
      let pages = Array.from(Array(response.data.totalPages + 1).keys()).slice(
        1
      );
      setPagin(pages);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const options = [
    { value: "default", label: "Default" },
    { value: "brand", label: "Brand" },
    { value: "price-asc", label: "Price (Low-High)" },
    { value: "price-desc", label: "Price (High-Low)" },
  ];

  const perPageOptions = [
    { value: 5, label: 5 },
    { value: 10, label: 10 },
    { value: 10, label: 15 },
    { value: 20, label: 20 },
    { value: 25, label: 25 },
    { value: 50, label: 50 },
  ];

  const onEditClick = (product) => {
    setCurrentProductData(product);
    setShowAddProduct(true);
  };

  return (
    <Layout>
      <div className="product-header">
        <AddProduct
          showAddProduct={showAddProduct}
          setShowAddProduct={setShowAddProduct}
          currentProductData={currentProductData}
          setCurrentProductData={setCurrentProductData}
          fetchProducts={fetchProducts}
        />
        <div className="container d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <div className="d-xl-flex d-none gap-2 ">
              <img src={SettingIcon} /> <span>Filter</span>
            </div>
            <div className="d-xl-flex d-none">
              <img src={DotIcon} />
            </div>
            <div className="d-xl-flex d-none">
              <img src={BiViewIcon} />
            </div>

            <div className="verticalLine d-xl-flex d-none"></div>
            <div className="d-xl-flex d-none">Showing 1–16 of 32 results</div>
            <button
              className="add-btn d-xl-block d-none"
              onClick={() => setShowAddProduct(true)}
            >
              Add Product{" "}
            </button>
            <div
              className="d-xl-none d-block"
              onClick={() => setShowAddProduct(true)}
            >
              <FaPlusSquare />
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <div className="d-flex align-items-center gap-2">
              Show{" "}
              <Select
                onChange={(data) => {
                  setPerPage(data);
                }}
                value={perPage}
                styles={{
                  dropdownIndicator: (base) => ({
                    ...base,
                    display: "none",
                  }),
                  indicatorSeparator: (base) => ({
                    ...base,
                    display: "none",
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    width: 55,
                  }),
                }}
                options={perPageOptions}
              />
            </div>
            <div className="d-flex align-items-center gap-2">
              Sort By{" "}
              <Select
                onChange={(data) => {
                  SetSort(data);
                }}
                value={sort}
                styles={{
                  dropdownIndicator: (base) => ({
                    ...base,
                    display: "none",
                  }),
                  indicatorSeparator: (base) => ({
                    ...base,
                    display: "none",
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    width: 100,
                  }),
                }}
                options={options}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="shop container mt-5">
        <div className="row">
          {products?.products?.map((product) => {
            return (
              <div
                key={product}
                className="col-lg-4 col-xl-3 col-sm-6 col-12 mb-3 d-flex justify-content-center"
              >
                <div
                  className="product-card"
                  onClick={() => onEditClick(product)}
                >
                  <img className="product-image" src={product.image} />
                  <p className="title">{product.title?.slice(0, 15)}...</p>
                  <p className="subTitle">{product.category}</p>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="price">Rs. {product.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="row pagination">
          {pagin?.map((num) => {
            return (
              <div
                onClick={() => setCurrentPage(num)}
                className={`page ${currentPage === num && "selected"}`}
              >
                {num}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
