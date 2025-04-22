import React, { useState } from "react";
import UpdateUser from "./UpdateUser";

const UsersDel = (props) => {
  const [showUpdateUser, setShowUpdateUser] = useState(false);

  const deleteUser = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: props.userId,
      }),
    });

    if (res.ok) {
      props.getData();
    } else {
      alert("User delete failed");
    }
  };

  return (
    <>
      {showUpdateUser && (
        <UpdateUser
          id={props.userId}
          name={props.name}
          age={props.age}
          country={props.country}
          getData={props.getData}
          setShowUpdateUser={setShowUpdateUser}
        />
      )}

      <div className="row">
        <div className="col-md-3">{props.name}</div>
        <div className="col-md-3">{props.age}</div>
        <div className="col-md-3">{props.country}</div>
        <button className="col-sm-1" onClick={deleteUser}>
          delete
        </button>
        <button className="col-sm-1" onClick={() => setShowUpdateUser(true)}>
          update
        </button>
      </div>
    </>
  );
};

export default UsersDel;
