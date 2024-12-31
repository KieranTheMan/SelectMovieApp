import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <main className="sm:p-8 px-4 py-8 w-full h-full bg-slate-800 min-h-[calc(100vh-73px)]">
        <Outlet />
      </main>
    </>
  );
}

export default App;
