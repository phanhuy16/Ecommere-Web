import { Button } from "antd";
import { BiPowerOff } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authSeletor, removeAuth } from "../redux/reducres/authReducer";

const HeaderComponent = () => {
  const auth = useSelector(authSeletor);

  const dispatch = useDispatch();

  return (
    <div className="p-3">
      <div className="row">
        <div className="col"></div>
        <div className="col text-end">
          {auth.token && auth.id ? (
            <Button
              onClick={() => {
                dispatch(removeAuth({}));
                localStorage.clear();
              }}
              danger
              type="text"
              icon={<BiPowerOff size={20} />}
            />
          ) : (
            <Link to={"/Account/login"}>Login</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
