import { registerUser } from "../../api/authService.js";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import { useNavigate } from "react-router-dom";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerSchemaYup } from "../../validation/registerSchemaYup";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
const navigate = useNavigate();

  const initialValues = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    phone: "",
    bio: "",
    position: "user",
    isChecked: false,
    profileImage: null,
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("firstName", values.fname);
    formData.append("lastName", values.lname);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("phone", values.phone);
    formData.append("bio", values.bio);
    formData.append("position", values.position);
    formData.append("profileImage", values.profileImage);

    try {
  const response = await registerUser(formData);
   navigate("/signin");
} catch (err) {
  alert("Registration failed: " + err.response?.data?.message || err.message);
}
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your details to sign up!
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={registerSchemaYup}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form encType="multipart/form-data">
                <div className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <Label>First Name<span className="text-error-500">*</span></Label>
                      <Field name="fname" placeholder="Enter your first name" as={Input} />
                      <ErrorMessage name="fname" component="div" className="text-error-500 text-sm mt-1" />
                    </div>
                    <div>
                      <Label>Last Name<span className="text-error-500">*</span></Label>
                      <Field name="lname" placeholder="Enter your last name" as={Input} />
                      <ErrorMessage name="lname" component="div" className="text-error-500 text-sm mt-1" />
                    </div>
                  </div>

                  <div>
                    <Label>Email<span className="text-error-500">*</span></Label>
                    <Field name="email" type="email" placeholder="Enter your email" as={Input} />
                    <ErrorMessage name="email" component="div" className="text-error-500 text-sm mt-1" />
                  </div>

                  <div>
                    <Label>Password<span className="text-error-500">*</span></Label>
                    <div className="relative">
                      <Field
                        name="password"
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        as={Input}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                      >
                        {showPassword ? (
                          <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                        ) : (
                          <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                        )}
                      </span>
                    </div>
                    <ErrorMessage name="password" component="div" className="text-error-500 text-sm mt-1" />
                  </div>

                  <div>
                    <Label>Phone</Label>
                    <Field name="phone" placeholder="Enter your phone number" as={Input} />
                  </div>

                  <div>
                    <Label>Bio</Label>
                    <Field name="bio" placeholder="Short bio" as={Input} />
                  </div>

                  <div>
                    <Label>Profile Image</Label>
                    <input
                      name="profileImage"
                      type="file"
                      onChange={(event) => setFieldValue("profileImage", event.currentTarget.files[0])}
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer dark:text-gray-400 dark:border-gray-600 dark:placeholder-gray-400"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      className="w-5 h-5"
                      checked={values.isChecked}
                      onChange={(value) => setFieldValue("isChecked", value)}
                    />
                    <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                      By creating an account you agree to the{" "}
                      <span className="text-gray-800 dark:text-white/90">Terms and Conditions</span> and our{" "}
                      <span className="text-gray-800 dark:text-white">Privacy Policy</span>.
                    </p>
                  </div>
                  <ErrorMessage name="isChecked" component="div" className="text-error-500 text-sm mt-1" />

                  <div>
                    <button
                      type="submit"
                      className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Already have an account?{" "}
              <Link to="/signin" className="text-brand-500 hover:text-brand-600 dark:text-brand-400">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// import { registerUser } from "../../api/authService.js";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
// import Label from "../form/Label";
// import Input from "../form/input/InputField";
// import Checkbox from "../form/input/Checkbox";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { registerSchemaYup } from "../../validation/registerSchemaYup";

// export default function SignUpForm() {
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const initialValues = {
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     phone: "",
//     bio: "",
//     position: "user",
//     profileImage: null,
//     isChecked: false,
//   };

//   const handleSubmit = async (values) => {
//     const formData = new FormData();
//     formData.append("firstName", values.firstName);
//     formData.append("lastName", values.lastName);
//     formData.append("email", values.email);
//     formData.append("password", values.password);
//     formData.append("phone", values.phone);
//     formData.append("bio", values.bio);
//     formData.append("position", values.position);
//     formData.append("profileImage", values.profileImage);

//     try {
//       await registerUser(formData);
//       navigate("/signin");
//     } catch (err) {
//       alert("Registration failed: " + (err.response?.data?.message || err.message));
//     }
//   };

//   return (
//     <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
//       <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
//         <Link
//           to="/"
//           className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
//         >
//           <ChevronLeftIcon className="size-5" />
//           Back to dashboard
//         </Link>
//       </div>

//       <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
//         <div>
//           <div className="mb-5 sm:mb-8">
//             <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
//               Sign Up
//             </h1>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Enter your details to sign up!
//             </p>
//           </div>

//           <Formik
//             initialValues={initialValues}
//             validationSchema={registerSchemaYup}
//             onSubmit={handleSubmit}
//           >
//             {({ values, setFieldValue }) => (
//               <Form encType="multipart/form-data">
//                 <div className="space-y-5">

//                   {/* First/Last Name */}
//                   <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//                     <div>
//                       <Label>
//                         First Name<span className="text-error-500">*</span>
//                       </Label>
//                       <Field name="firstName" placeholder="Enter your first name" as={Input} />
//                       <ErrorMessage name="firstName" component="div" className="text-error-500 text-sm mt-1" />
//                     </div>
//                     <div>
//                       <Label>
//                         Last Name<span className="text-error-500">*</span>
//                       </Label>
//                       <Field name="lastName" placeholder="Enter your last name" as={Input} />
//                       <ErrorMessage name="lastName" component="div" className="text-error-500 text-sm mt-1" />
//                     </div>
//                   </div>

//                   {/* Email */}
//                   <div>
//                     <Label>
//                       Email<span className="text-error-500">*</span>
//                     </Label>
//                     <Field name="email" type="email" placeholder="Enter your email" as={Input} />
//                     <ErrorMessage name="email" component="div" className="text-error-500 text-sm mt-1" />
//                   </div>

//                   {/* Password */}
//                   <div>
//                     <Label>
//                       Password<span className="text-error-500">*</span>
//                     </Label>
//                     <div className="relative">
//                       <Field
//                         name="password"
//                         placeholder="Enter your password"
//                         type={showPassword ? "text" : "password"}
//                         as={Input}
//                       />
//                       <span
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
//                       >
//                         {showPassword ? (
//                           <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
//                         ) : (
//                           <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
//                         )}
//                       </span>
//                     </div>
//                     <ErrorMessage name="password" component="div" className="text-error-500 text-sm mt-1" />
//                   </div>

//                   {/* Phone */}
//                   <div>
//                     <Label>Phone</Label>
//                     <Field name="phone" placeholder="Enter your phone number" as={Input} />
//                     <ErrorMessage name="phone" component="div" className="text-error-500 text-sm mt-1" />
//                   </div>

//                   {/* Bio */}
//                   <div>
//                     <Label>Bio</Label>
//                     <Field name="bio" placeholder="Short bio" as={Input} />
//                     <ErrorMessage name="bio" component="div" className="text-error-500 text-sm mt-1" />
//                   </div>

//                   {/* Position */}
//                   <div>
//                     <Label>Position</Label>
//                     <Field name="position" placeholder="Position (e.g. Developer, Manager)" as={Input} />
//                     <ErrorMessage name="position" component="div" className="text-error-500 text-sm mt-1" />
//                   </div>

//                   {/* Profile Image */}
//                   <div>
//                     <Label>Profile Image</Label>
//                     <input
//                       name="profileImage"
//                       type="file"
//                       accept="image/*"
//                       onChange={(event) => setFieldValue("profileImage", event.currentTarget.files[0])}
//                       className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer dark:text-gray-400 dark:border-gray-600 dark:placeholder-gray-400"
//                     />
//                   </div>

//                   {/* Checkbox */}
//                   <div className="flex items-center gap-3">
//                     <Checkbox
//                       className="w-5 h-5"
//                       checked={values.isChecked}
//                       onChange={(value) => setFieldValue("isChecked", value)}
//                     />
//                     <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
//                       By creating an account you agree to the{" "}
//                       <span className="text-gray-800 dark:text-white/90">Terms and Conditions</span> and our{" "}
//                       <span className="text-gray-800 dark:text-white">Privacy Policy</span>.
//                     </p>
//                   </div>
//                   <ErrorMessage name="isChecked" component="div" className="text-error-500 text-sm mt-1" />

//                   {/* Submit */}
//                   <div>
//                     <button
//                       type="submit"
//                       className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
//                     >
//                       Sign Up
//                     </button>
//                   </div>
//                 </div>
//               </Form>
//             )}
//           </Formik>

//           {/* Sign in link */}
//           <div className="mt-5">
//             <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
//               Already have an account?{" "}
//               <Link to="/signin" className="text-brand-500 hover:text-brand-600 dark:text-brand-400">
//                 Sign In
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



