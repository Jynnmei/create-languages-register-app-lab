import React, { useEffect, useState } from "react";

const UserLanguagesDisplay = (props) => {
  const [userLanguages, setUserLanguages] = useState([]);

  const getData = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/lab/users/languages",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: props.userId,
          }),
        }
      );
      if (res.ok) {
        const data = await res.json();
        setUserLanguages(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {/* <div>{JSON.stringify(props)}</div> */}
      <div className="row">
        <div className="col-md-3">User Language</div>
        {userLanguages}
      </div>
    </>
  );
};

export default UserLanguagesDisplay;
