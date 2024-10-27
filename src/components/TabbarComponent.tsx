import { Typography } from "antd";
import React, { ReactNode } from "react";

interface Props {
  title: string;
  right?: ReactNode;
  level?: 5 | 1 | 2 | 3 | 4 | undefined;
}

const { Text, Title, Paragraph } = Typography;

const TabbarComponent = (props: Props) => {
  const { title, right, level } = props;
  return (
    <>
      <div className="row m-0">
        <div className={`col ${!right && "text-center"}`}>
          <Title className="fw-normal" level={level ?? 2}>
            {title}
          </Title>
        </div>
        <div className="col text-end">{right && right}</div>
      </div>
    </>
  );
};

export default TabbarComponent;
