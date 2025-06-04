import { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import api from "../../api/axiosConfig";

export default function UserAddressCard() {
  const { isOpen, openModal, closeModal } = useModal();

  const [form, setForm] = useState({
    country: "",
    city: "",
    state: "",
    postalCode: "",
    taxId: "",
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        const data = res.data.data.user;
        setUser(data);
        setForm({
          country: data.address?.country || "",
          city: data.address?.city || "",
          state: data.address?.state || "",
          postalCode: data.address?.postalCode || "",
          taxId: data.address?.taxId || "",
        });
      } catch (err) {
        console.error("Failed to load user profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saving address changes:", form);
    // TODO: POST/PUT request to update API
    closeModal();
  };

  if (loading) return <div className="p-5 text-sm text-gray-500">Loading profile...</div>;
  if (!user) return <div className="p-5 text-sm text-red-500">User not found.</div>;

  return (
    <>
      {/* Profile Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:border-gray-800 dark:bg-white/[0.03] mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-5">
            <img
              src={user.profileImage ? `http://localhost:5000${user.profileImage}` : "/default-avatar.png"}
              alt={user.fullName}
              className="w-16 h-16 rounded-full object-cover border border-gray-300"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{user.fullName}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user.position || "User"} &nbsp;|&nbsp; {form.city}, {form.state}
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

      {/* Address Info */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800 dark:text-white text-md">Address</h3>
         
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-10 text-sm text-gray-700 dark:text-white/90">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Country</p>
            <p className="font-medium">{form.country}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">City / State</p>
            <p className="font-medium">{form.city}, {form.state}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Postal Code</p>
            <p className="font-medium">{form.postalCode}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Tax ID</p>
            <p className="font-medium">{form.taxId}</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 bg-white rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Address
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your address details below.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Country</Label>
                  <Input name="country" value={form.country} onChange={handleChange} />
                </div>
                <div>
                  <Label>City</Label>
                  <Input name="city" value={form.city} onChange={handleChange} />
                </div>
                <div>
                  <Label>State</Label>
                  <Input name="state" value={form.state} onChange={handleChange} />
                </div>
                <div>
                  <Label>Postal Code</Label>
                  <Input name="postalCode" value={form.postalCode} onChange={handleChange} />
                </div>
                <div>
                  <Label>Tax ID</Label>
                  <Input name="taxId" value={form.taxId} onChange={handleChange} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>Cancel</Button>
              <Button size="sm" onClick={handleSave}>Save Changes</Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
