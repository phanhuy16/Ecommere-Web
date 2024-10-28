import { Button, Space, Tooltip, Typography } from "antd";
import { ArrangeHorizontal, Eye, Star1 } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import { MdImage } from "react-icons/md";
import { colors } from "../constants/color";
import { ProductModel } from "../models/Products";

interface Props {
  item: ProductModel;
}

const { Title, Text, Paragraph } = Typography;

const ProductItem = (props: Props) => {
  const { item } = props;

  const [elementWidth, setElementWidth] = useState();

  const ref = useRef<any>();

  useEffect(() => {
    const width = ref.current?.offsetWidth;
    setElementWidth(width);
  }, []);

  console.log(item);

  return (
    <div key={item.id} className="col-sm-6 col-md-4 col-lg-3 mb-4 product-item">
      <div style={{ position: "relative" }}>
        {item.images.length > 0 ? (
          <img
            style={{
              width: "100%",
              height: elementWidth ? elementWidth * 1.1 : 280,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}
            src={item.images[0]}
            alt={item.title}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: elementWidth ? elementWidth * 1.1 : 280,
              backgroundColor: "#e0e0e0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <MdImage size={22} color={colors.gray600} />
          </div>
        )}

        <div className="btn-container">
          <div
            className="btn-list text-end"
            style={{ height: (elementWidth ? elementWidth * 1.2 : 250) * 0.85 }}
          >
            <Space direction="vertical">
              <Button
                className="btn-icon"
                icon={<Star1 size={18} color={colors.primary500} />}
              />
              <Button
                className="btn-icon"
                icon={<ArrangeHorizontal size={18} color={colors.primary500} />}
              />
              <Button
                className="btn-icon"
                icon={<Eye size={18} color={colors.primary500} />}
              />
            </Space>
          </div>
          <Button size="large" style={{ width: "80%" }}>
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="p-2">
        <Paragraph className="m-0 fw-bold">{"Pinterest"}</Paragraph>
        <Tooltip title={item.title}>
          <Text className="m-0 title fs-5">{item.title}</Text>
        </Tooltip>
        <Text className="mt-3 d-block fw-bold fs-6">{`0.00 - 100.20`}</Text>
      </div>
    </div>
  );
};

export default ProductItem;
