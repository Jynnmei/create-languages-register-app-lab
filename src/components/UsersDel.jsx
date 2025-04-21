import React from "react";

const UsersDel = (props) => {
  const deleteUser = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: props.user_id,
      }),
    });

    if (res.ok) {
      props.getData();
    } else {
      alert("an error has occurred");
    }
  };

  return (
    <div className="row">
      <div className="col-md-3">{props.name}</div>
      <div className="col-md-3">{props.age}</div>
      <div className="col-md-3">{props.country}</div>
      <button className="col-sm-2" onClick={deleteUser}>
        delete
      </button>
    </div>
  );
};

export default UsersDel;
