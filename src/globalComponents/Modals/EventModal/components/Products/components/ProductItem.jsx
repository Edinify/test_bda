import MinusIcon  from "../../../../../../assets/icons/minus-cirlce.svg?react";
import { useDispatch } from "react-redux";
import { EVENTS_MODAL_ACTION_TYPE } from "../../../../../../redux/actions-type";

const ProductItem = ({ product, modalData, index }) => {
  const dispatch = useDispatch();

  const deleteProduct = () => {
    dispatch({
      type: EVENTS_MODAL_ACTION_TYPE.GET_EVENTS_MODAL,
      payload: {
        data: {
          ...modalData,
          products: modalData.products.filter((item) => item !== product),
        },
        openModal: true,
      },
    });
  };

  return (
    <li>
      <div className="top" style={{ marginTop: "0px" }}>
        <span style={{ fontWeight: "" }}>
          {index + 1}. {product}
        </span>
        <div className="minus-icon-con">
          <MinusIcon className="minus-icon" onClick={deleteProduct} />
        </div>
      </div>
    </li>
  );
};

export default ProductItem;
