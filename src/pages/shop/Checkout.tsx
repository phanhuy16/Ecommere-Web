import { Avatar, Button, Card, Space, Table, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { Add, Minus } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonRemoveCartItem } from "../../components";
import { CartModel } from "../../models/CartModel";
import { cartSeletor, changeCount } from "../../redux/reducres/cartReducer";
import { VND } from "../../utils/handleCurrency";

const { Title, Text } = Typography;

const Checkout = () => {
  const carts: CartModel[] = useSelector(cartSeletor);

  const dispatch = useDispatch();

  const columns: ColumnProps<CartModel>[] = [
    {
      key: "image",
      dataIndex: "image",
      render: (img: string) => <Avatar src={img} size={52} shape="square" />,
    },
    {
      key: "product",
      dataIndex: "",
      title: "Product",
      render: (item: CartModel) => (
        <>
          <Title level={4}>{item.title}</Title>
          <Text>Size: {item.size}</Text>
        </>
      ),
    },
    {
      key: "price",
      dataIndex: "price",
      title: "Price",
      render: (price: number) => VND.format(price),
    },
    {
      key: "count",
      dataIndex: "",
      title: "Quantity",
      render: (item: CartModel) => (
        <Space className="btn-group">
          <Button
            onClick={() => dispatch(changeCount({ id: item.id, val: -1 }))}
            disabled={item.count === 1}
            type="text"
            icon={<Minus size={20} className="text-muted" />}
          />
          {`${item.count}`}
          <Button
            onClick={() => dispatch(changeCount({ id: item.id, val: 1 }))}
            disabled={item.count === item.qty}
            type="text"
            icon={<Add size={20} className="text-muted" />}
          />
        </Space>
      ),
      align: "center",
      width: 100,
    },
    {
      key: "subtotal",
      title: "SubTotal",
      dataIndex: "",
      render: (item: CartModel) => VND.format(item.price * item.count),
    },
    {
      key: "action",
      title: "",
      dataIndex: "",
      render: (item: CartModel) => <ButtonRemoveCartItem item={item} />,
    },
  ];

  return (
    <div className="container-fluid">
      <div className="container mt-4">
        <div className="row">
          <div className="col-sm-12 col-md-8">
            <Title style={{ fontWeight: 300 }} className="text-muted">
              Checkout
            </Title>
            <Table dataSource={carts} columns={columns} />
          </div>
          <div className="col-sm-12 col-md-4">
            <Card>eqwe</Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
