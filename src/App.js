import "./App.css";
import ShowData from "./components/ShowData";
import AddData from "./components/AddData";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditData from "./components/EditData";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div className="ml-10 mt-10 bg-gray">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ShowData />}></Route>
            <Route path="/add" element={<AddData />}></Route>
            <Route path="/edit/:id" element={<EditData />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
