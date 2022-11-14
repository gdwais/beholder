import { Provider } from "react-redux";
import "./App.css";
import { Main } from "./components/Main";
import { store } from "./store";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Routes>
          <Route element={<Landing />} path="/" />

          <Route element={<DisplayName />} path="/evaluator" />

          {/* Redirect to root if path doesn't exist */}
          <Route element={<Navigate to="/" replace />} path="/*" />
        </Routes>
      </Provider>
    </div>
  );
};

export default App;
