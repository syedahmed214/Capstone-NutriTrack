import { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal.js";
import { Modal } from "../ui/Modal/index.jsx";
import Button from "../ui/button/Button.jsx";
import Input from "../form/input/InputField.jsx";
import Label from "../form/Label.jsx";
import api from "../../api/axiosConfig";
import { updateUserProfile } from "../../api/authService.js";
export default function UserAddressCard() {
  const { isOpen, openModal, closeModal } = useModal();
 
const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    position: "user",
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
const fetchUser = async () => {
  try {
    const res = await api.get("/auth/me");
    const data = res.data.data.user;
    setUser(data);
    setForm({
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      email: data.email || "",
      phone: data.phone || "",
      bio: data.bio || "",
      position: data.position || "user",
    });
  } catch (err) {
    console.error("Failed to load user profile", err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchUser();
}, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSave = async (e) => {
  e.preventDefault();
  try {
    await updateUserProfile(form);
    await fetchUser(); // ✅ Refresh profile data after update
    closeModal();
  } catch (error) {
    console.error("Failed to update profile:", error);
  }
};

// const handleSave = async (e) => {
//   e.preventDefault(); 
//   try {
//     await updateUserProfile(form);
//     closeModal();
//   } catch (error) {
//     console.error("Failed to update profile:", error);
//   }
// };
  if (loading) return <div className="p-5 text-sm text-gray-500">Loading profile...</div>;
  if (!user) return <div className="p-5 text-sm text-red-500">User not found.</div>;
  return (
    <>
      {/* Profile Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:border-gray-800 dark:bg-white/[0.03] mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-5">
            <img
              src={user.profileImage ? `http://localhost:5000${user.profileImage}` : "/images/user/owner.jpg"}
              alt={user.fullName}
              className="w-16 h-16 rounded-full object-cover border border-gray-300"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{user.fullName}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user.position || "User"} &nbsp;
              </p>
            </div>
          </div>
          <Button size="sm" variant="outline" onClick={openModal}>
            Edit
          </Button>
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:border-gray-800 dark:bg-white/[0.03] mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800 dark:text-white text-md">Personal Information</h3>

        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-10 text-sm text-gray-700 dark:text-white/90">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">First Name</p>
            <p className="font-medium">{user.firstName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Last Name</p>
            <p className="font-medium">{user.lastName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Email Address</p>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
            <p className="font-medium">{user.phone}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-xs text-gray-500 dark:text-gray-400">Bio</p>
            <p className="font-medium">{user.bio || "-"}</p>
          </div>
        </div>
      </div>

     <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 bg-white rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Profile
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your profile details below.
            </p>
          </div>

          <form className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">

                <div>
                  <Label>First Name</Label>
                  <Input name="firstName" value={form.firstName} onChange={handleChange} />
                </div>

                <div>
                  <Label>Last Name</Label>
                  <Input name="lastName" value={form.lastName} onChange={handleChange} />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input name="email" value={form.email} onChange={handleChange} type="email" />
                </div>

                <div>
                  <Label>Phone</Label>
                  <Input name="phone" value={form.phone} onChange={handleChange} />
                </div>

                <div>
                  <Label>Bio</Label>
                  <Input name="bio" value={form.bio} onChange={handleChange} />
                </div>

                <div>
                  <Label>Position</Label>
                  <select
                    name="position"
                    value={form.position}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-500 dark:text-white dark:bg-gray-800 dark:border-gray-600"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                  </select>
                </div>

              </div>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="submit" size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>

    </>
  );
}
