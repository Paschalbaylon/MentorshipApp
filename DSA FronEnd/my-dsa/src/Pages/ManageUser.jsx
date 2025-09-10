import { admin } from "../api/auth";
import { useState, useEffect } from "react";
import axios from "axios";
import { getUserById } from "../api/auth"; // ✅ make sure this exists

const API_BASE = "http://localhost:5116/api/auth";
const ADMIN_API_BASE = "http://localhost:5116/admin";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ admin: 0, mentor: 0, mentee: 0 });
  const [message, setMessage] = useState("");

  const [newUser, setNewUser] = useState({
    FullName: "",
    Email: "",
    Bio: "",
    Skill: "",
    Availability: "",
    Password: "",
    Role: "",
  });

  const [otherId, setOtherId] = useState("");
  const [otherProfile, setOtherProfile] = useState(null);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await admin(token);
      setUsers(data);

      // Count roles
      const roleCounts = data.reduce(
        (acc, user) => {
          const role = user.role?.toLowerCase();
          if (role === "admin") acc.admin += 1;
          else if (role === "mentor") acc.mentor += 1;
          else if (role === "mentee") acc.mentee += 1;
          return acc;
        },
        { admin: 0, mentor: 0, mentee: 0 }
      );

      setStats(roleCounts);
    } catch (error) {
      console.error("Error fetching admin data:", error);
      setMessage("Failed to fetch users ❌");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onUpdate = async (user) => {
    const role = window.prompt("Enter your Role: ", user.role);

    if (!role) {
      setMessage("Role is required ❌");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${ADMIN_API_BASE}/User/${user.id}/role`,
        { role },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("User role updated successfully ✅");
      await fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage("Failed to update user ❌");
    }
  };

  const onCreate = async () => {
    if (
      !newUser.FullName ||
      !newUser.Email ||
      !newUser.Bio ||
      !newUser.Skill ||
      !newUser.Availability ||
      !newUser.Password ||
      !newUser.Role
    ) {
      setMessage("All fields are required ❌");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_BASE}/Create-User`, newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewUser({
        FullName: "",
        Email: "",
        Bio: "",
        Skill: "",
        Availability: "",
        Password: "",
        Role: "Mentee",
      });
      setMessage("User created successfully ✅");
      await fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
      setMessage("Failed to create user ❌");
    }
  };

  const fetchOtherProfile = async (idParam) => {
    try {
      const id = idParam ?? Number(otherId); // use passed id or manual input
      if (!id || isNaN(id)) {
        setMessage("Invalid ID ❌");
        return;
      }

      const response = await getUserById(id);
      setOtherProfile(response);
      setMessage("Profile fetched successfully ✅");
    } catch (err) {
      console.error("Failed to fetch other profile", err);
      setMessage("Failed to fetch profile ❌");
    }
  };

  return (
    <div>
      <div className="bg-purple-900 h-[1015px] md:h-screen overflow-auto">
        <div className="mx-auto max-w-3xl">
          <div className="mt-2 p-4">
            <h2 className="text-center text-2xl font-bold font-serif text-amber-200">
              WelCome Admin
            </h2>
            {message && (
              <div className="mt-2 text-center text-sm font-semibold text-amber-300">
                {message}
              </div>
            )}

            {/* User Table */}
            <div className="mt-4">
              <h2 className="font-bold py-2 text-2xl text-blue-500">
                Manage User
              </h2>
              <h2 className="text-amber-50">User Statistics</h2>
              <h3 className="text-amber-50">
                Admin: {stats.admin} &nbsp; Mentor: {stats.mentor} &nbsp;
                Mentee: {stats.mentee}
              </h3>
              <div className="overflow-x-auto h-[400px] w-[410px] md:w-full mt-4 md:h-[300px]">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="py-2 px-4 border-b text-left">ID</th>
                      <th className="py-2 px-4 border-b text-left">
                        Full Name
                      </th>
                      <th className="py-2 px-4 border-b text-left">Email</th>
                      <th className="py-2 px-4 border-b text-left">Role</th>
                      <th className="py-2 px-4 border-b text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-100">
                          <td
                            className="py-2 px-4 border-b text-blue-600 cursor-pointer hover:underline"
                            onClick={() => fetchOtherProfile(user.id)} // 👈 click ID to fetch details
                          >
                            {user.id}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {user.fullName}
                          </td>
                          <td className="py-2 px-4 border-b">{user.email}</td>
                          <td className="py-2 px-4 border-b">{user.role}</td>
                          <td className="py-2 px-4 border-b">
                            <button
                              onClick={() => onUpdate(user)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mr-2 cursor-pointer transition"
                            >
                              Update Role
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-4">
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 🔍 Search User By ID */}
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2 text-blue-500">Find User</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter User ID"
                value={otherId}
                onChange={(e) => setOtherId(e.target.value)}
                className="border px-2 py-1 rounded border-amber-50 text-amber-50"
              />
              <button
                onClick={() => fetchOtherProfile()}
                className="bg-yellow-500 text-white px-4 py-1 rounded cursor-pointer font-bold"
              >
                Search
              </button>
            </div>
            {otherProfile && (
              <div className="mt-4 p-3 bg-gray-800 text-white rounded">
                <p>
                  <span className="font-bold">ID:</span> {otherProfile.id}
                </p>
                <p>
                  <span className="font-bold">Name:</span>{" "}
                  {otherProfile.fullname}
                </p>
                <p>
                  <span className="font-bold">Email:</span> {otherProfile.email}
                </p>
                <p>
                  <span className="font-bold">Role:</span> {otherProfile.role}
                </p>
                <p>
                  <span className="font-bold">Bio:</span> {otherProfile.bio}
                </p>
              </div>
            )}
          </div>

          {/* ➕ Create User Form */}
          <div className="p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-2 text-blue-500">
              Create New User
            </h3>
            <div className="flex flex-col md:flex-row flex-wrap gap-2">
              <input
                type="text"
                placeholder="Full Name"
                value={newUser.FullName}
                onChange={(e) =>
                  setNewUser({ ...newUser, FullName: e.target.value })
                }
                className="border px-2 py-1 rounded border-amber-50 text-amber-50"
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.Email}
                onChange={(e) =>
                  setNewUser({ ...newUser, Email: e.target.value })
                }
                className="border px-2 py-1 rounded border-amber-50 text-amber-50"
              />
              <input
                type="text"
                placeholder="Bio"
                value={newUser.Bio}
                onChange={(e) =>
                  setNewUser({ ...newUser, Bio: e.target.value })
                }
                className="border px-2 py-1 rounded border-amber-50 text-amber-50"
              />
              <input
                type="text"
                placeholder="Skill"
                value={newUser.Skill}
                onChange={(e) =>
                  setNewUser({ ...newUser, Skill: e.target.value })
                }
                className="border px-2 py-1 rounded border-amber-50 text-amber-50"
              />
              <input
                type="text"
                placeholder="Availability"
                value={newUser.Availability}
                onChange={(e) =>
                  setNewUser({ ...newUser, Availability: e.target.value })
                }
                className="border px-2 py-1 rounded border-amber-50 text-amber-50"
              />
              <input
                type="password"
                placeholder="Password"
                value={newUser.Password}
                onChange={(e) =>
                  setNewUser({ ...newUser, Password: e.target.value })
                }
                className="border px-2 py-1 rounded border-amber-50 text-amber-50"
              />
              <select
                value={newUser.Role}
                onChange={(e) =>
                  setNewUser({ ...newUser, Role: e.target.value })
                }
                className="border px-2 py-1 rounded cursor-pointer border-amber-50 text-amber-50"
              >
                <option value="Admin">Admin</option>
                <option value="Mentor">Mentor</option>
                <option value="Mentee">Mentee</option>
              </select>
              <button
                onClick={onCreate}
                className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer font-bold"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
