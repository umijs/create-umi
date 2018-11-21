import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import App from "./index";
import { any } from "prop-types";

const mockStore = configureMockStore();
const store = mockStore({
  global: {
    message: "umi"
  }
});
const props = {
  dispatch: any,
  location: any,
  message: any
};
it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <Provider store={store}>
      <App {...props} />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
