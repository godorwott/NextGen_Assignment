import { useEffect, useState } from "react";
import axios from "axios";
import { FaRegTrashAlt, FaPlusSquare } from "react-icons/fa";

const AddProduct = (props) => {
  const {
    showAddProduct,
    setShowAddProduct,
    currentProductData,
    setCurrentProductData,
    fetchProducts,
  } = props;
  const defaultValues = {
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    brand: "",
    rating: 0,
  };

  const [values, setValues] = useState(defaultValues);

  const onValueChange = (field) => (event) => {
    console.log(field);
    setValues({ ...values, [field]: event.target.value });
  };

  const onSubmit = async () => {
    const productId = values._id;

    delete values._id;
    delete values._v;
    console.log(values);

    if (productId) {
      const response = await axios.put(
        `http://localhost:5000/products/${productId}`,
        values
      );
    } else {
      const response = await axios.post(
        `http://localhost:5000/products`,
        values
      );
    }

    setCurrentProductData(null);
    setShowAddProduct(false);
    fetchProducts();
  };

  const onDelete = async () => {
    const productId = values._id;
    if (!productId) return;
    const response = await axios.delete(
      `http://localhost:5000/products/${productId}`
    );
    setCurrentProductData(null);
    setShowAddProduct(false);
    fetchProducts();
  };

  useEffect(() => {
    if (!currentProductData) return;
    console.log(currentProductData);

    setValues({ ...values, ...currentProductData });
  }, [currentProductData]);

  return (
    <div
      style={{ zIndex: 9999 }}
      class={`offcanvas offcanvas-end ${showAddProduct ? "show" : "hide"}`}
      tabindex="-1"
      id="offcanvas"
      aria-labelledby="offcanvasLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasLabel">
          {currentProductData ? "Edit Product" : "Add New Product"}
        </h5>
        <button
          onClick={() => {
            setShowAddProduct(false);
            setCurrentProductData(null);
            setValues(defaultValues)
          }}
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        You can create your new product from here.
        <div className="row mt-3 p-3">
          <div className="col-12">
            <label>Product Title</label>
            <input
              type="text"
              value={values.title}
              onChange={onValueChange("title")}
              className="form-control"
            />
          </div>
          <div className="col-12 mt-3">
            <label>Product Description</label>
            <textarea
              value={values.description}
              onChange={onValueChange("description")}
              type="text"
              className="form-control"
            />
          </div>
          <div className="col-12 mt-3">
            <label>Product Price (In INR)</label>
            <input
              value={values.price}
              onChange={onValueChange("price")}
              type="number"
              className="form-control"
            />
          </div>

          <div className="col-12 mt-3">
            <label>Product Category</label>
            <input
              value={values.category}
              type="text"
              onChange={onValueChange("category")}
              className="form-control"
            />
          </div>

          <div className="col-12 mt-3">
            <label>Product Brand Name</label>
            <input
              value={values.brand}
              onChange={onValueChange("brand")}
              type="text"
              className="form-control"
            />
          </div>

          <div className="col-12 mt-3">
            <label>Product Image URL</label>
            <input
              value={values.image}
              onChange={onValueChange("image")}
              type="text"
              className="form-control"
            />
          </div>

          <div className="col-12 mt-3">
            <label>Product Rating</label>
            <input
              value={values.rating}
              onChange={onValueChange("rating")}
              type="number"
              className="form-control"
            />
          </div>

          <div className="col-12 mt-3 d-flex justify-content-between align-items-center">
            <button onClick={onSubmit} className="btn btn-dark">
              {currentProductData ? "Update Product" : "Add Product"}
            </button>
            <FaRegTrashAlt onClick={onDelete} style={{ cursor: "pointer" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
