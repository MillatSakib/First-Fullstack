import React, { useEffect, useState, useRef } from "react";

const App = () => {
  const [users, setUsers] = useState([]);
  const formRef = useRef(null); // Create a reference to the form element

  useEffect(() => {
    fetch("http://localhost:3010/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddUser = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    console.log(user);
    fetch("http://localhost:3010/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Inside post response ", data);
        const newUser = [...users, data];
        setUsers(newUser);
        formRef.current.reset(); // Reset the form after successful submission
      });
  };

  return (
    <div className="flex h-[100vh] flex-col items-center justify-center">
      <div className="text-2xl font-bold">User Management System</div>
      <div>Number of Members: {users.length}</div>
      <div>
        {users.map((user) => (
          <p key={user.id}>
            {user.id}. {user.name} : {user.email}
          </p>
        ))}
      </div>
      <form ref={formRef} onSubmit={handleAddUser}>
        <div className="text-xl text-blue-500 font-semibold">Register</div>
        <input type="text" name="name" className="border-2 my-1"></input>
        <br />
        <input type="email" name="email" className="border-2 my-1"></input>
        <br></br>
        <div className="text-center mx-auto">
          <input
            type="submit"
            value="Add User"
            className="btn btn-info text-white text-center"
          ></input>
        </div>
      </form>
    </div>
  );
};

export default App;
