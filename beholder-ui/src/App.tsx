import { Provider } from "react-redux";
import "./App.css";
import Main from "./components/Main";
import { store } from "./store";
export const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Main />
      </Provider>
    </div>
  );
};

export default App;
