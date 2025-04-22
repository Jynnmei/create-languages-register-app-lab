import React, { useState } from "react";

const UserLanguagesDel = (props) => {
  const deleteUser = async () => {
    if (!props.userId || !props.languages) {
      alert("Missing user ID or language");
      return;
    }

    const res = await fetch(
      import.meta.env.VITE_SERVER + "/lab/users/languages",
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: props.userId,
          language: props.languages,
        }),
      }
    );

    if (res.ok) {
      props.getData();
    } else {
      alert("UserLanguages delete failed");
    }
  };

  return (
    <div className="row">
      <div className="col-md-3">{props.userId}</div>
      <div className="col-md-3">{props.languages}</div>
      <button className="col-sm-1" onClick={deleteUser}>
        delete
      </button>
    </div>
  );
};

export default UserLanguagesDel;
