import { admin, getUserById } from "../api/auth";
import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ admin: 0, mentor: 0, mentee: 0 });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
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

  // Role update modal state
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [updatingRole, setUpdatingRole] = useState(false);

  const showMessage = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 4000);
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await admin(token);
      setUsers(data);

      const roleCounts = data.reduce(
        (acc, user) => {
          const role = user.role?.toLowerCase();
          if (role === "admin") acc.admin += 1;
          else if (role === "mentor") acc.mentor += 1;
          else if (role === "mentee") acc.mentee += 1;
          return acc;
        },
        { admin: 0, mentor: 0, mentee: 0 },
      );
      setStats(roleCounts);
    } catch (error) {
      console.error("Error fetching admin data:", error);
      showMessage("Failed to fetch users ❌", "error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openRoleModal = (user) => {
    setSelectedUser(user);
    setSelectedRole(user.role || "Mentee");
    setShowRoleModal(true);
  };

  const handleUpdateRole = async () => {
    if (!selectedRole) {
      showMessage("Role is required ❌", "error");
      return;
    }
    setUpdatingRole(true);
    try {
      // await axiosInstance.put(`/api/admin/User/${selectedUser.id}/role`, {
      //   role: selectedRole,
      // });
      await axiosInstance.put(`/admin/User/${selectedUser.id}/role`, {
        role: selectedRole,
      });
      showMessage(
        `Role updated to "${selectedRole}" successfully ✅`,
        "success",
      );
      setShowRoleModal(false);
      setSelectedUser(null);
      await fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      showMessage("Failed to update user role ❌", "error");
    } finally {
      setUpdatingRole(false);
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
      showMessage("All fields are required ❌", "error");
      return;
    }
    try {
      await axiosInstance.post("/auth/Create-User", newUser);
      setNewUser({
        FullName: "",
        Email: "",
        Bio: "",
        Skill: "",
        Availability: "",
        Password: "",
        Role: "",
      });
      showMessage("User created successfully ✅", "success");
      await fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
      showMessage("Failed to create user ❌", "error");
    }
  };

  const fetchOtherProfile = async (idParam) => {
    try {
      const id = idParam ?? Number(otherId);
      if (!id || isNaN(id)) {
        showMessage("Invalid ID ❌", "error");
        return;
      }
      const response = await getUserById(id);
      setOtherProfile(response);
      showMessage("Profile fetched successfully ✅", "success");
    } catch (err) {
      console.error("Failed to fetch other profile", err);
      showMessage("Failed to fetch profile ❌", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-amber-200 text-center">
            Welcome Admin
          </h1>
          {message && (
            <div
              className={`mt-3 text-center text-sm sm:text-base font-semibold py-2 px-4 rounded-lg ${
                messageType === "error"
                  ? "text-red-300 bg-red-900/50"
                  : "text-green-300 bg-green-900/50"
              }`}
            >
              {message}
            </div>
          )}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 sm:mb-8">
          <div className="bg-purple-700/50 backdrop-blur-sm rounded-lg p-4 text-center border border-purple-500">
            <div className="text-2xl sm:text-3xl font-bold text-amber-300">
              {stats.admin}
            </div>
            <div className="text-sm sm:text-base text-amber-100">Admins</div>
          </div>
          <div className="bg-purple-700/50 backdrop-blur-sm rounded-lg p-4 text-center border border-purple-500">
            <div className="text-2xl sm:text-3xl font-bold text-amber-300">
              {stats.mentor}
            </div>
            <div className="text-sm sm:text-base text-amber-100">Mentors</div>
          </div>
          <div className="bg-purple-700/50 backdrop-blur-sm rounded-lg p-4 text-center border border-purple-500">
            <div className="text-2xl sm:text-3xl font-bold text-amber-300">
              {stats.mentee}
            </div>
            <div className="text-sm sm:text-base text-amber-100">Mentees</div>
          </div>
        </div>

        {/* User Table Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-300 mb-4">
            Manage Users
          </h2>
          <div className="overflow-x-auto rounded-lg">
            <div className="max-h-[300px] sm:max-h-[350px] lg:max-h-[400px] overflow-y-auto">
              <table className="min-w-full bg-white rounded-lg">
                <thead className="sticky top-0 bg-gray-200">
                  <tr>
                    <th className="py-2 px-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-gray-700">
                      ID
                    </th>
                    <th className="py-2 px-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-gray-700">
                      Full Name
                    </th>
                    <th className="py-2 px-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-gray-700">
                      Email
                    </th>
                    <th className="py-2 px-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-gray-700">
                      Role
                    </th>
                    <th className="py-2 px-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td
                          className="py-2 px-3 sm:px-4 text-xs sm:text-sm text-blue-600 cursor-pointer hover:underline font-medium"
                          onClick={() => fetchOtherProfile(user.id)}
                        >
                          {user.id}
                        </td>
                        <td className="py-2 px-3 sm:px-4 text-xs sm:text-sm text-gray-800">
                          {user.fullName}
                        </td>
                        <td className="py-2 px-3 sm:px-4 text-xs sm:text-sm text-gray-800">
                          {user.email}
                        </td>
                        <td className="py-2 px-3 sm:px-4 text-xs sm:text-sm text-gray-800">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold
                            ${
                              user.role?.toLowerCase() === "admin"
                                ? "bg-purple-100 text-purple-800"
                                : user.role?.toLowerCase() === "mentor"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="py-2 px-3 sm:px-4">
                          <button
                            onClick={() => openRoleModal(user)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                          >
                            Update Role
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-4 text-gray-500 text-sm"
                      >
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Search User Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-xl font-bold text-blue-300 mb-4">
            Find User
          </h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Enter User ID"
                value={otherId}
                onChange={(e) => setOtherId(e.target.value)}
                className="w-full border border-gray-300 px-3 sm:px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 bg-white"
              />
            </div>
            <button
              onClick={() => fetchOtherProfile()}
              className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors cursor-pointer"
            >
              Search
            </button>
          </div>
          {otherProfile && (
            <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <p className="text-sm text-gray-300">
                  <span className="font-semibold text-gray-100">ID:</span>{" "}
                  {otherProfile.id}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold text-gray-100">Name:</span>{" "}
                  {otherProfile.fullName || otherProfile.fullname}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold text-gray-100">Email:</span>{" "}
                  {otherProfile.email}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold text-gray-100">Role:</span>{" "}
                  {otherProfile.role}
                </p>
                <p className="text-sm text-gray-300 sm:col-span-2">
                  <span className="font-semibold text-gray-100">Bio:</span>{" "}
                  {otherProfile.bio}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Create User Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-blue-300 mb-4">
            Create New User
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Full Name"
              value={newUser.FullName}
              onChange={(e) =>
                setNewUser({ ...newUser, FullName: e.target.value })
              }
              className="w-full border border-gray-300 px-3 sm:px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 bg-white"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.Email}
              onChange={(e) =>
                setNewUser({ ...newUser, Email: e.target.value })
              }
              className="w-full border border-gray-300 px-3 sm:px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 bg-white"
            />
            <input
              type="text"
              placeholder="Bio"
              value={newUser.Bio}
              onChange={(e) => setNewUser({ ...newUser, Bio: e.target.value })}
              className="w-full border border-gray-300 px-3 sm:px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 bg-white"
            />
            <input
              type="text"
              placeholder="Skill"
              value={newUser.Skill}
              onChange={(e) =>
                setNewUser({ ...newUser, Skill: e.target.value })
              }
              className="w-full border border-gray-300 px-3 sm:px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 bg-white"
            />
            <input
              type="text"
              placeholder="Availability"
              value={newUser.Availability}
              onChange={(e) =>
                setNewUser({ ...newUser, Availability: e.target.value })
              }
              className="w-full border border-gray-300 px-3 sm:px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 bg-white"
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.Password}
              onChange={(e) =>
                setNewUser({ ...newUser, Password: e.target.value })
              }
              className="w-full border border-gray-300 px-3 sm:px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 bg-white"
            />
            <select
              value={newUser.Role}
              onChange={(e) => setNewUser({ ...newUser, Role: e.target.value })}
              className="w-full border border-gray-300 px-3 sm:px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white cursor-pointer"
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="Admin">Admin</option>
              <option value="Mentor">Mentor</option>
              <option value="Mentee">Mentee</option>
            </select>
            <div className="sm:col-span-2 lg:col-span-3 flex justify-center mt-2">
              <button
                onClick={onCreate}
                className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-8 py-2 rounded-lg font-semibold transition-colors cursor-pointer"
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Update Role Modal */}
      {showRoleModal && selectedUser && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Update Role
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Updating role for{" "}
              <span className="font-medium text-gray-700">
                {selectedUser.fullName}
              </span>
            </p>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white mb-5"
            >
              <option value="Admin">Admin</option>
              <option value="Mentor">Mentor</option>
              <option value="Mentee">Mentee</option>
            </select>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRoleModal(false);
                  setSelectedUser(null);
                }}
                className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateRole}
                disabled={updatingRole}
                className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition disabled:opacity-50"
              >
                {updatingRole ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUser;
