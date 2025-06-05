import PageBreadcrumb from "../components/common/PageBreadCrumb.jsx";
import UserAddressCard from "../components/UserProfile/UserAddressCard.jsx";

export default function UserProfiles() {
  return (
    <>
      <PageBreadcrumb pageTitle="Profile" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        
        <div className="space-y-6">
          <UserAddressCard />
        </div>
      </div>
    </>
  );
}
