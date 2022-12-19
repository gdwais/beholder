import { Provider } from "react-redux";
import "./App.css";
import { store } from "./store";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { EvaluatorContainer, Landing } from "./components";


export const App = () => {
  return (
    <BrowserRouter>
    <div className="App">
      <Provider store={store}>
        <Routes>
          <Route element={<Landing />} path="/" />

          <Route element={<EvaluatorContainer />} path="/evaluator" />

          {/* Redirect to root if path doesn't exist */}
          <Route element={<Navigate to="/" replace />} path="/*" />
        </Routes>
      </Provider>
    </div>
    </BrowserRouter>
  );
};

export default App;
