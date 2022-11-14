import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export const Main = () => {
  return (
    <Routes>
      <Route element={<Landing />} path="/" />

      <Route element={<DisplayName />} path="/signup/display-name" />

      {/* Redirect to root if path doesn't exist */}
      <Route element={<Navigate to="/" replace />} path="/*" />
    </Routes>
  );
};
