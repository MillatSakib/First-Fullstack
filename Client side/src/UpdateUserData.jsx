import { useLoaderData } from "react-router-dom";

const UpdateUserData = () => {
  const handleUpdate = (event) => {
    event.preventDefault();
    // const form = event.target;
    const name = event.target.name.value;
    const email = event.target.email.value;
    console.log(name, email);
    const updateUser = { name, email };
    fetch(`http://localhost:3010/user/${loaderUser._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("User updated successfully!!");
        } else {
          alert("User can't updated");
        }
      });
  };
  const loaderUser = useLoaderData();
  return (
    <div className="flex h-[100vh] w-[100vw] items-center justify-center">
      <div>
        Update information of {loaderUser.name}
        <br />
        <br />
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            name="name"
            defaultValue={loaderUser?.name}
            className="border-2 outline-none my-2"
          ></input>
          <br />
          <input
            type="email"
            name="email"
            defaultValue={loaderUser?.email}
            className="border-2 outline-none my-2"
          ></input>
          <br />
          <input
            type="submit"
            value="Update"
            className="btn btn-info text-white"
          ></input>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserData;
