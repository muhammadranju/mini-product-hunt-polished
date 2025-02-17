import { AuthContext } from "@/context/AuthProvider";
import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import swal from "sweetalert";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const { setLoading, user } = useContext(AuthContext);

  useEffect(() => {
    // Fetch users (mocked here)
    const fetchProducts = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BackendURL}/api/users`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setUsers(data.data);
      }
    };

    fetchProducts();
  }, []);

  const handelRoleChange = async (userEmail, role) => {
    setLoading(true);
    const response = await fetch(
      `${
        import.meta.env.VITE_BackendURL
      }/api/admin/users/${userEmail}?role=${role}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          role: role,
          email: userEmail,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      setLoading(false);
      setUsers(
        users.map((user) => (user.id === userEmail ? { ...user, role } : user))
      );
      toast.success("User role updated successfully!");
    }
    setLoading(false);
  };

  const handleMakeModerator = (userEmail) => {
    // setUsers(
    //   users.map((user) =>
    //     user.id === userId ? { ...user, role: "Moderator" } : user
    //   )
    // );
    swal({
      title: "Are you sure?",
      text: "You will make this user a moderator",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willModerator) => {
      if (willModerator) {
        handelRoleChange(userEmail, "moderator");
        swal("User promoted to Moderator!", {
          icon: "success",
        });
        toast.success("User promoted to Moderator!");
      } else {
        swal("User not promoted to Moderator!", {
          icon: "error",
        });
      }
    });

    // Add actual API call here
  };

  const handleMakeAdmin = (userEmail) => {
    swal({
      title: "Are you sure?",
      text: "You will make this user an admin",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willModerator) => {
      if (willModerator) {
        handelRoleChange(userEmail, "admin");
        swal("User promoted to Admin!", {
          icon: "success",
        });
        toast.success("User promoted to Admin!");
      } else {
        swal("User not promoted to Admin!", {
          icon: "error",
        });
      }
    });
  };
  return (
    <div className="ml-0 md:ml-64 py-16 h-screen overflow-auto bg-gray-50">
      <Helmet>
        <title> Manage Users - Product Hunt</title>
      </Helmet>
      <div className="w-11/12 mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Manage Users
        </h2>
        <div className="hidden md:block">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">User Image</th>
                <th className="py-2 px-4 border-b">User Name</th>
                <th className="py-2 px-4 border-b">User Email</th>
                <th className="py-2 px-4 border-b">User Role</th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.reverse().map((user) => (
                <tr key={user.id}>
                  <td className="py-2 px-4 border-b ">
                    <img
                      src={user.photoURL}
                      className="w-12 h-12 rounded-md"
                      alt="User"
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {user.name}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {user.email}
                  </td>
                  {/* <td className="py-2 px-4 border-b capitalize">{user.role}</td> */}

                  <td className="py-2 px-4 border-b capitalize font-medium  text-center">
                    <span
                      className={`${
                        user.role === "admin"
                          ? "bg-blue-200/70 text-blue-700"
                          : user.role === "user"
                          ? "bg-green-200/70 text-green-700"
                          : "bg-yellow-200/70 text-yellow-700"
                      } py-1 px-3 rounded-full text-sm capitalize`}
                    >
                      {user.role}
                    </span>

                    {/* {user.role} */}
                  </td>

                  <td className="py-2 px-4 border-b text-center">
                    <button
                      className={`bg-blue-600 text-white py-1 px-3 rounded-lg mr-2 hover:bg-blue-700 ${
                        user.role === "moderator" &&
                        "opacity-50 cursor-not-allowed"
                      }`}
                      onClick={() => handleMakeModerator(user.email)}
                      disabled={user.role === "moderator"}
                    >
                      Moderator
                    </button>
                    <button
                      className={`bg-slate-800 text-white py-1 px-3 rounded-lg hover:bg-slate-700 ${
                        user.role === "admin" && "opacity-50 cursor-not-allowed"
                      }`}
                      onClick={() => handleMakeAdmin(user.email)}
                      disabled={user.role === "admin"}
                    >
                      Admin
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="block md:hidden">
          {users?.reverse().map((user) => (
            <div key={user.id} className="p-4 mb-4 border rounded-lg bg-white">
              <div className="flex items-center mb-4">
                <img
                  src={user.photoURL}
                  className="w-12 h-12 rounded-md mr-4"
                  alt="User"
                />
                <div>
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
              <div className="text-sm mb-2">
                <span className="font-semibold">Role:</span> {user.role}
              </div>
              <div className="text-center">
                <button
                  className={`bg-blue-600 text-white py-1 px-3 rounded-lg mr-2 hover:bg-blue-700 ${
                    user.role === "Moderator" && "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={() => handleMakeModerator(user.email)}
                  disabled={user.role === "Moderator"}
                >
                  Moderator
                </button>
                <button
                  className={`bg-slate-800 text-white py-1 px-3 rounded-lg hover:bg-slate-700 ${
                    user.role === "Admin" && "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={() => handleMakeAdmin(user.email)}
                  disabled={user.role === "Admin"}
                >
                  Admin
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
