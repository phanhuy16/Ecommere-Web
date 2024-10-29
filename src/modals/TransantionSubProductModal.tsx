import React, { useEffect, useState } from "react";
import { SubProductModel } from "../models/Products";
import handleAPI from "../apis/handleAPI";
import { Modal } from "antd";

interface Props {
  visible: boolean;
  onClose: () => void;
  productId: string;
}

const TransantionSubProductModal = (props: Props) => {
  const { productId, visible, onClose } = props;

  const [subProduct, setSubProduct] = useState<SubProductModel[]>([]);
  const [itemSelected, setItemSelected] = useState<SubProductModel>();

  useEffect(() => {
    getProductDetail();
  }, [productId]);

  const getProductDetail = async () => {
    const api = `/Products/get-by-id?id=${productId}`;

    try {
      const res: any = await handleAPI({ url: api });
      setSubProduct(res.subPrudct);
      setItemSelected(res.subPrudct[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal open={visible} onCancel={onClose} onClose={onClose}>
      <img alt="" />
    </Modal>
  );
};

export default TransantionSubProductModal;
