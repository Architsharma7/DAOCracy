import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    aadhar: "",
  });

  const handleSubmit = (event) => {
    setFormData({[event.target.aadhar]: event.target.value});
    console.log(formData);
  };
  return (
    <div>
      <input
        type="text"
        name="aadhar"
        placeholder="Enter your aadhar no."
        onChange={(e) => setFormData(e.target.value)}
      ></input>
      <button className="bg-white text-black" onSubmit={handleSubmit}>
        submit form
      </button>
    </div>
  );
};

export default Form;
