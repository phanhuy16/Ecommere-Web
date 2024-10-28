import { Typography } from "antd";
import React, { ReactNode } from "react";

interface Props {
  title: string;
  right?: ReactNode;
  level?: 5 | 1 | 2 | 3 | 4 | undefined;
}

const { Title } = Typography;

const TabbarComponent = (props: Props) => {
  const { title, right, level } = props;
  return (
    <>
      <div className="row m-0">
        <div className={`col ${!right && "text-center"}`}>
          <Title className="fw-bold my-4" level={level ?? 2}>
            {title}
          </Title>
        </div>
        {/* {right && right} */}
      </div>
    </>
  );
};

export default TabbarComponent;
