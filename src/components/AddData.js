import axios from "axios";
import React, { useState } from "react";
import { BsPlus } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddData = () => {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [dob, setDOB] = useState("");
  const [address, setAddress] = useState("");
  const [mno, setMNO] = useState("");
  const [postcode, setPostcode] = useState("");

  const navigate = useNavigate();

  const dataSubmitHandler = async () => {
    const formData = {
      user_id: userId,
      email: email,
      name: name,
      centre: city,
      dob: dob,
      address: address,
      phone: mno,
      postcode: postcode,
    };

    try {
      const res = await axios.post("http://localhost:7000/api/add", formData);
      if (res.data.success) {
        setUserId("");
        setEmail("");
        setName("");
        setCity("");
        setDOB("");
        setMNO("");
        setAddress("");
        setPostcode("");

        navigate("/");
        toast.success("Data Insert SuccessFully!")
      } else {
        console.log("Something went wrong!");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log(error.response.data.message);
    }
  };

  return (
    <div className="max-w-5xl p-8">
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-primary text-white px-4 py-2 flex items-center space-x-2">
          <BsPlus color="red" size={23} className="rounded-full bg-white" />
          <h2 className="text-lg font-semibold">Add User</h2>
        </div>
        <div className="p-4 border-black border border-t-0 rounded-b-lg">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="user_id" className="block font-semibold pb-2">
                  User Id
                </label>
                <input
                  type="text"
                  id="user_id"
                  name="user_id"
                  className="w-full py-1 px-4 border border-gray-300 rounded-md focus:outline-none"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-semibold pb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full py-1 px-4 border border-gray-300 rounded-md focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block font-semibold pb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full py-1 px-4 border border-gray-300 rounded-md focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="city" className="block font-semibold pb-2">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="w-full py-1 px-4 border border-gray-300 rounded-md focus:outline-none"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="dob" className="block font-semibold pb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  className="w-full py-1 px-4 border border-gray-300 rounded-md focus:outline-none"
                  value={dob}
                  onChange={(e) => setDOB(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="address" className="block font-semibold pb-2">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="w-full py-1 px-4 border border-gray-300 rounded-md focus:outline-none"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="mno" className="block font-semibold pb-2">
                  Mobile Number
                </label>
                <input
                  type="number"
                  id="mno"
                  name="mno"
                  className="w-full py-1 px-4 border border-gray-300 rounded-md focus:outline-none"
                  value={mno}
                  onChange={(e) => setMNO(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="postcode" className="block font-semibold pb-2">
                  Postcode
                </label>
                <input
                  type="number"
                  id="postcode"
                  name="postcode"
                  className="w-full py-1 px-4 border border-gray-300 rounded-md focus:outline-none"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex space-x-2 justify-end py-4">
            <Link to="/">
              <button className=" text-gray-500 border  border-gray-500 font-semibold px-4 py-2 rounded-md focus:outline-none">
                Close
              </button>
            </Link>
            <button
              className="bg-primary text-white px-3 py-1 rounded-md focus:outline-none"
              onClick={dataSubmitHandler}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddData;
