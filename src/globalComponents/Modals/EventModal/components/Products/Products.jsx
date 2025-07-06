import React, { useState } from "react";
import { TextField } from "@mui/material";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { EVENTS_MODAL_ACTION_TYPE } from "../../../../../redux/actions-type";
import { useDispatch } from "react-redux";
import ProductItem from "./components/ProductItem";

const Products = ({ modalData }) => {
  const [product, setProduct] = useState("");
  const dispatch = useDispatch();

  // // console.log(modalData, "course modal data");

  // add new payment section
  const addData = () => {
    if (modalData.products) {
      dispatch({
        type: EVENTS_MODAL_ACTION_TYPE.GET_EVENTS_MODAL,
        payload: {
          data: { ...modalData, products: [...modalData.products, product] },
          openModal: true,
        },
      });
    } else {
      dispatch({
        type: EVENTS_MODAL_ACTION_TYPE.GET_EVENTS_MODAL,
        payload: {
          data: { ...modalData, products: [product] },
          openModal: true,
        },
      });
    }

    setProduct("");
  };

  return (
    <>
      <div className="dropdown-input  courses">
        <div className="left">
          <div className="input-box">
            <TextField
              sx={{
                "& input": {
                  fontSize: "12px",
                  marginRight: "32px",
                },
                marginTop: "24px",
              }}
              InputLabelProps={{
                style: { fontSize: "12px", color: "#3F3F3F" },
              }}
              fullWidth
              label="Məhsul növü"
              autoComplete="off"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </div>
        </div>

        <div className="right">
          <button
            disabled={!product}
            onClick={() => addData()}
            className="add-class"
          >
            <AiOutlinePlusCircle />
          </button>
        </div>
      </div>
      <ul className="category-list courses-li" style={{ marginBottom: "20px" }}>
        {modalData?.products?.map((item, index) => (
          <li key={index}>
            <ul>
              <ProductItem product={item} modalData={modalData} index={index} />
            </ul>
          </li>
        ))}
      </ul>{" "}
    </>
  );
};

export default Products;
