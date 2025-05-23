import React, { useState, useEffect, useRef } from "react";
import UsersDel from "./UsersDel";

const UsersDisplay = () => {
  const [user, setUser] = useState([]);
  const nameRef = useRef();
  const ageRef = useRef();
  const countryRef = useRef();

  const getData = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/lab/users");

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const addUser = async () => {
    // console.log({
    //   name: nameRef.current.value,
    //   age: ageRef.current.value,
    //   country: countryRef.current.value,
    // });

    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: nameRef.current.value,
        age: ageRef.current.value,
        country: countryRef.current.value,
      }),
    });

    if (res.ok) {
      getData();
      nameRef.current.value = "";
      ageRef.current.value = "";
      countryRef.current.value = "";
    } else {
      alert("an error has occurred");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <h1>Users</h1>
      <div className="row">
        <input
          type="text"
          ref={nameRef}
          placeholder="name"
          className="col-md-3"
        ></input>
        <input
          type="number"
          ref={ageRef}
          placeholder="age"
          className="col-md-3"
        ></input>
        <input
          type="text"
          ref={countryRef}
          placeholder="country"
          className="col-md-3"
        ></input>
        <button className="col-md-3" onClick={addUser}>
          add
        </button>
      </div>

      <div className="row">
        <div className="col-md-2">
          <strong>User ID</strong>
        </div>
        <div className="col-md-2">
          <strong>Name</strong>
        </div>
        <div className="col-md-2">
          <strong>Age</strong>
        </div>
        <div className="col-md-2">
          <strong>Country</strong>
        </div>
        <div className="col-md-2">
          <strong>Actions</strong>
        </div>
      </div>

      {user.map((item, index) => (
        <UsersDel
          key={index}
          userId={item.id}
          name={item.name}
          age={item.age}
          country={item.country}
          getData={getData}
        />
      ))}
    </div>
  );
};

export default UsersDisplay;
