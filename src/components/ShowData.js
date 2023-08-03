import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ShowData = () => {
  const [showbuttonId, setShowButtonId] = useState(null);
  const [data, setData] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [searchKey, setSearchKey] = useState("");

  let searchData = [];

  if (searchKey.length !== 0) {
    searchData = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchKey.toLowerCase()) ||
        item.user_id.toLowerCase().includes(searchKey.toLowerCase())
    );
  } else {
    searchData = data;
  }

  const buttonHideHandler = (id) => {
    if (showbuttonId === id) {
      setShowButtonId(null);
    } else {
      setShowButtonId(id);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:7000/api/view");
      setData(res.data);
    } catch (error) {
      console.log("Error Fetching Data" + error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteDataHandler = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:7000/api/delete/${id}`);
      if (res.data.success) {
        toast.error("Data Deleted SuccessFully!",{
          icon:"❌"
        })
        setData((prevData) => prevData.filter((item) => item._id !== id));
      } else {
        console.log("Something went wrong!");
      }
    } catch (error) {
      console.log("Error Deleting Data" + error);
    }
  };

  const handlePhotoUpload = async () => {
    const formData = new FormData();
    formData.append("profilePhoto", profilePhoto);

    try {
      const res = await axios.post(
        `http://localhost:7000/api/upload/${selectedItemId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response" + res.data.message);
      setData((prevData) => {
        return prevData.map((item) => {
          if (item._id === selectedItemId) {
            return {
              ...item,
              profilePhoto: res.data.profilePhoto, // Assuming the API returns the new profile photo URL
            };
          }
          return item;
        });
      });
      setIsPopupOpen(false);
    } catch (error) {
      console.log("error" + error);
    }
  };

  return (
    <div>
      <p className="text-primary font-semibold mb-7 text-xl">User Management</p>
      <div className="flex relative mb-10">
        <FaSearch color="gray" className="absolute top-[0.8rem] left-3" />
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search"
          className=" border-gray-200 border-2 p-1 pl-8 rounded-md w-1/6"
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <Link to="/add">
          <button className="bg-primary text-white p-2 rounded-md px-5 ml-3">
            Add User
          </button>
        </Link>
      </div>

      <div>
        <table className="table-auto w-full border-separate">
          <thead>
            <tr>
              <th className="p-4 border-b text-left">User Name</th>
              <th className="p-4 border-b">User Id</th>
              <th className="p-4 border-b">User Address</th>
              <th className="p-4 border-b">User Work Phone</th>
              <th className="p-4 border-b">User Cost Centre</th>
              <th className="p-4 border-b">User Postcode</th>
              <th className="p-4 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {searchData.length !== 0 ? (
              searchData.map((item) => (
                <tr key={item._id}>
                  <td className="p-4 border-b">
                    <span className="flex items-center">
                      {item.profilePhoto ? (
                        <img
                          src={`http://localhost:7000/uploads/${item.profilePhoto}`}
                          alt={item.name}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                      ) : (
                        <img
                          src={
                            "http://localhost:7000/uploads/profile_default.png"
                          }
                          alt={item.name}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                      )}

                      <span>{item.name}</span>
                    </span>
                  </td>
                  <td className="p-4 border-b text-center">{item.user_id}</td>
                  <td className="p-4 border-b text-center">{item.address}</td>
                  <td className="p-4 border-b text-center">{item.phone}</td>
                  <td className="p-4 border-b text-center">{item.centre}</td>
                  <td className="p-4 border-b text-center">{item.postcode}</td>
                  <td className="flex space-x-2 items-center p-4 border-b">
                    <button
                      className="bg-primary text-white p-2 rounded-md"
                      onClick={() => {
                        setSelectedItemId(item._id);
                        setIsPopupOpen(true);
                      }}
                    >
                      <AiOutlineCloudUpload />
                    </button>

                    {isPopupOpen && (
                      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-25">
                        <div className="bg-white pt-12 px-7 pb-3 rounded-md flex flex-col justify-center items-center space-y-10">
                          <div className="w-[68%]">
                            <input
                              type="file"
                              name="profilePhoto"
                              id="profilePhoto"
                              onChange={(e) =>
                                setProfilePhoto(e.target.files[0])
                              }
                            />
                          </div>
                          <div className="flex space-x-2">
                            <button
                              className=" text-gray-400 border border-gray-400 p-1 rounded-sm"
                              onClick={handlePhotoUpload}
                            >
                              +Add Image
                            </button>
                            <button
                              className=" text-gray-400 border border-gray-400 p-1 rounded-sm"
                              onClick={() => setIsPopupOpen(false)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      className="mb-3"
                      onClick={() => buttonHideHandler(item._id)}
                    >
                      ...
                    </button>
                    {showbuttonId === item._id && (
                      <div className="flex space-x-1 -mb-4">
                        <button
                          className="bg-primary rounded-md p-1"
                          onClick={() => deleteDataHandler(item._id)}
                        >
                          <RiDeleteBinLine color="white" size={12} />
                        </button>
                        <Link to={`edit/${item._id}`}>
                          <button className="bg-primary rounded-md p-1">
                            <BiEdit color="white" size={12} />
                          </button>
                        </Link>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="text-center text-xl text-primary font-bold p-5"
                >
                  No Data Found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowData;
