import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from 'next/router';

const Data = "999941057051"

const Form = () => {
  const [formData, setFormData] = useState("");
  let router= useRouter();
  function redirect() {
    router.push('/verification')
 } 
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    if(Data === formData){
        console.log("hello")
    }
    else(
        alert("You are not a citizen of this country")
    )
    setFormData("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-row mt-12 justify-center w-3/5 float-left mb-12">
        <input
          type="text"
          value={formData}
          onChange={(e) => setFormData(e.target.value)}
          placeholder="Enter your aadhar no."
          className="py-2 px-7 rounded-lg mr-5"
        />
        <div className="flex flex-row">
          <input type="submit" className="bg-white cursor-pointer text-black py-2 px-7 rounded-md" onClick={redirect} />
        </div>
      </form>
    </div>
  );
};

export default dynamic (() => Promise.resolve(Form), {ssr: false})
