import { Provider } from "react-redux";
import "./App.css";
import store from "./redux/store";
import Routers from "./routers/Routers";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#131118",
          },
        }}
      >
        <Provider store={store}>
          <Routers />
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
