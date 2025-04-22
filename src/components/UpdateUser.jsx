import React, { useRef } from "react";
import styles from "./User.module.css";
import ReactDOM from "react-dom";

const OverLay = (props) => {
  // const idRef = useRef();
  const nameRef = useRef();
  const ageRef = useRef();
  const countryRef = useRef();

  const updateUsers = async () => {
    console.log("UpdateUser props:", props);

    console.log("Sending update:", {
      id: props.id,
      name: nameRef.current.value,
      age: ageRef.current.value,
      country: countryRef.current.value,
    });

    console.log(import.meta.env.VITE_SERVER + "/lab/users");
    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: props.id,
        name: nameRef.current.value,
        age: ageRef.current.value,
        country: countryRef.current.value,
      }),
    });

    if (res.ok) {
      props.getData();
      props.setShowUpdateUser(false);
    } else {
      alert("Update failed");
    }
  };

  return (
    <>
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-3">Name</div>
            <input
              ref={nameRef}
              defaultValue={props.name}
              type="text"
              className="col-md-3"
            ></input>
          </div>

          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-3">Age</div>
            <input
              ref={ageRef}
              defaultValue={props.age}
              type="number"
              className="col-md-3"
            ></input>
          </div>

          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-3">Country</div>
            <input
              ref={countryRef}
              defaultValue={props.country}
              type="text"
              className="col-md-3"
            ></input>
          </div>

          <div className="row">
            <div className="col-md-3"></div>
            <button className="col-md-3" onClick={updateUsers}>
              update
            </button>
            <button
              className="col-md-3"
              onClick={() => props.setShowUpdateUser(false)}
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const UpdateUser = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          id={props.id}
          name={props.name}
          age={props.age}
          country={props.country}
          getData={props.getData}
          setShowUpdateUser={props.setShowUpdateUser}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default UpdateUser;
