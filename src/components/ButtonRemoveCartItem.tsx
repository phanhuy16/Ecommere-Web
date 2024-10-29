import { Button, Modal } from "antd";
import { CartModel } from "../models/CartModel";
import { Trash } from "iconsax-react";
import { useDispatch } from "react-redux";
import handleAPI from "../apis/handleAPI";
import { removeCart } from "../redux/reducres/cartReducer";

interface Props {
  item: CartModel;
}

const ButtonRemoveCartItem = (props: Props) => {
  const { item } = props;
  const dispatch = useDispatch();

  const handleRemoveCartItem = async (item: any) => {
    const api = `/Carts/delete?id=${item.id}`;

    try {
      await handleAPI({ url: api, data: undefined, method: "delete" });

      dispatch(removeCart(item));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      onClick={() =>
        Modal.confirm({
          title: "Confirm",
          content: "Are you sure want to remove this item?",
          onOk: async () => {
            await handleRemoveCartItem(item);
          },
        })
      }
      icon={<Trash size={20} />}
      danger
      type="text"
    />
  );
};

export default ButtonRemoveCartItem;
