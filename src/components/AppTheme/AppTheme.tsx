import { lazyLoad } from "utility/lazyLoad";
import * as React from "react";

const Header = lazyLoad(
  () => import("components/Headers/Header"),
  <p>Loading...</p>
);
const AppBackGround = lazyLoad(
  () => import("components/AppTheme/AppBackGround"),
  <p>Loading...</p>
);

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}
const AppTheme = ({ children }: Props) => {
  return (
    <React.Fragment>
        <Header />
        <AppBackGround>{children}</AppBackGround>
    </React.Fragment>
  );
};
export default AppTheme;
