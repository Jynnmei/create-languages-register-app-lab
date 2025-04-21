import React, { useState, useEffect, useRef } from "react";

const Users = () => {
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
          type="text"
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
        <div className="col-md-3">Name</div>
        <div className="col-md-3">Age</div>
        <div className="col-md-3">Country</div>
      </div>

      {user.map((item, index) => (
        <div className="row" key={index}>
          <div className="col-md-3">{item.name}</div>
          <div className="col-md-3">{item.age}</div>
          <div className="col-md-3">{item.country}</div>
        </div>
      ))}
    </div>
  );
};

export default Users;
