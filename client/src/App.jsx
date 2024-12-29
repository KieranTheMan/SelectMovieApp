import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <div className="back-Image">
        <Outlet />
      </div>
    </>
  );
}

export default App;
