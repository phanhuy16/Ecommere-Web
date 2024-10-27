import { CSSProperties, ReactNode } from "react";

interface Props {
  children: ReactNode;
  // styles: CSSProperties;
}

const Section = (props: Props) => {
  const { children } = props;
  return <div className="section">{children}</div>;
};

export default Section;
