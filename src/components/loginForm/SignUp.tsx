// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // "use client";
// // import React, { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { signupAPI } from "@/services/redux/thunk/authThunk";
// // import Input from "../input/Input";
// // import Button from "../button/Button";
// // import Link from "next/link";

// // export default function SignupPage() {
// //   const router = useRouter();
// //   const [form, setForm] = useState({ first_name: "", last_name: "", email: "", password: "" });
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   const handleSignup = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError("");
// //     setLoading(true);
// //     try {
// //       await signupAPI(form.first_name, form.last_name, form.email, form.password);
// //       router.push("/login");
// //     } catch (err: any) {
// //       setError(err.response?.data?.message || "Signup failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="flex items-center justify-center mt-40">
// //       <form onSubmit={handleSignup} className="w-96  p-6 rounded-lg shadow-md">
// //         <h1 className="text-2xl mb-4 font-semibold text-center">Create Account</h1>

// //         <Input
// //           type="text"
// //           label="First Name"
// //           placeholder="First Name"
// //           className="w-full p-2 mb-3 rounded  text-black"
// //           name="first_name"
// //         />

// //         <Input
// //           type="text"
// //           label="Last Name"
// //           placeholder="Last Name"
// //           className="w-full p-2 mb-3 rounded  text-black"
// //           name="last_name"
// //         />

// //         <Input
// //           type="email"
// //           placeholder="Email"
// //           className="w-full p-2 mb-3 rounded  text-black"
// //           name="email"
// //         />

// //         <Input
// //           type="password"
// //           label="Password"
// //           placeholder="Password"
// //           className="w-full p-2 mb-3 rounded  text-black"
// //           name="password"
// //         />

// //         <Button
// //           type="submit"
// //           disabled={loading}
// //           className="w-full bg-green-600 hover:bg-green-700 py-2 rounded"
// //           label="Sign Up"
// //         />
         
// //         <p className="text-sm mt-4 text-center">
// //           Already have an account?{" "}
// //           <Link href="/login"  className="text-blue-400 underline">
// //             Login
// //           </Link>
// //         </p>
// //       </form>
// //     </div>
// //   );
// // }

// // "use client";
// // import React, { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { signupAPI } from "@/services/redux/thunk/authThunk";
// // import Input from "../input/Input";
// // import Button from "../button/Button";
// // import Link from "next/link";

// // export default function SignupPage() {
// //   const router = useRouter();
// //   const [form, setForm] = useState({
// //     first_name: "",
// //     last_name: "",
// //     email: "",
// //     password: "",
// //   });
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   const handleSignup = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError("");
// //     setLoading(true);
// //     try {
// //       if (!form.email || !form.password || !form.first_name || !form.last_name) {
// //         setError("All fields are required");
// //         setLoading(false);
// //         return;
// //       }

// //       console.log("Signup Payload:", form);
// //       await signupAPI(form.first_name, form.last_name, form.email, form.password);
// //       router.push("/login");
// //     } catch (err: any) {
// //       setError(err.response?.data?.message || "Signup failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="flex items-center justify-center mt-40">
// //       <form
// //         onSubmit={handleSignup}
// //         className="w-96 p-6 rounded-lg shadow-md bg-white"
// //       >
// //         <h1 className="text-2xl mb-4 font-semibold text-blue-600">Create Account</h1>

// //         {error && (
// //           <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
// //         )}

// //         <Input
// //           type="text"
// //           label="First Name"
// //           name="first_name"
// //           placeholder="First Name"
// //           className="w-full p-2 mb-3 rounded text-black"
// //           value={form.first_name}
// //           onChange={(e) => setForm({ ...form, first_name: e.target.value })}
// //         />

// //         <Input
// //           type="text"
// //           label="Last Name"
// //           name="last_name"
// //           placeholder="Last Name"
// //           className="w-full p-2 mb-3 rounded text-black"
// //           value={form.last_name}
// //           onChange={(e) => setForm({ ...form, last_name: e.target.value })}
// //         />

// //         <Input
// //           type="email"
// //           label="Email"
// //           name="email"
// //           placeholder="Email"
// //           className="w-full p-2 mb-3 rounded text-black"
// //           value={form.email}
// //           onChange={(e) => setForm({ ...form, email: e.target.value })}
// //         />

// //         <Input
// //           type="password"
// //           label="Password"
// //           name="password"
// //           placeholder="Password"
// //           className="w-full p-2 mb-3 rounded text-black"
// //           value={form.password}
// //           onChange={(e) => setForm({ ...form, password: e.target.value })}
// //         />

// //         <Button
// //           type="submit"
// //           disabled={loading}
// //           className="w-full bg-green-600 hover:bg-green-700 py-2 rounded"
// //           label={loading ? "Creating..." : "Sign Up"}
// //         />

// //         <p className="text-sm mt-4 text-center text-gray-600">
// //           Already have an account?{" "}
// //           <Link href="/login" className="text-blue-400 underline">
// //             Login
// //           </Link>
// //         </p>
// //       </form>
// //     </div>
// //   );
// // }
// // src/components/loginForm/SignUp.tsx
// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { signupAPI } from "@/services/redux/thunk/authThunk";
// import Button from "../button/Button";

// type SignUpProps = {
//   onClose?: () => void;          // when used inside modal
//   switchToLogin?: () => void;    // show Login view inside modal (if you prefer switching)
//   redirectTo?: string;           // default: "/dashboard"
//   autoLogin?: boolean;           // default: true (use backend token)
// };

// export default function SignUp({
//   onClose,
//   switchToLogin,
//   redirectTo = "/dashboard",
//   autoLogin = true,
// }: SignUpProps) {
//   const router = useRouter();
//   const [form, setForm] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     const { first_name, last_name, email, password } = form;
//     if (!first_name || !last_name || !email || !password) {
//       setError("All fields are required");
//       return;
//     }

//     setLoading(true);
//     try {
//       const data = await signupAPI(first_name, last_name, email, password); // { token, user }

//       if (autoLogin && data?.token) {
//         localStorage.setItem("authToken", data.token);
//         localStorage.setItem("authUser", JSON.stringify(data.user));
//         window.dispatchEvent(new Event("auth-changed"));
//         onClose?.(); // close modal if present
//         router.push(redirectTo);
//       } else {
//         // fallback: switch to login view if provided
//         switchToLogin?.();
//       }
//     } catch (err: any) {
//       setError(err?.response?.data?.message || "Signup failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
//       <form
//         onSubmit={handleSignup}
//         className="w-full max-w-md p-6 rounded-lg shadow-md bg-white"
//       >
//         <h1 className="text-2xl mb-4 font-semibold text-blue-600">Create Account</h1>
//         {error && <p className="text-red-600 text-sm mb-3 text-center">{error}</p>}

//         {/* First Name */}
//         <div className="mb-3">
//           <label className="block text-sm font-medium mb-1 text-gray-600">First Name</label>
//           <input
//             type="text"
//             name="first_name"
//             placeholder="First Name"
//             value={form.first_name}
//             onChange={(e) => setForm({ ...form, first_name: e.target.value })}
//             className="w-full p-2 rounded text-black border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
//             autoComplete="given-name"
//           />
//         </div>

//         {/* Last Name */}
//         <div className="mb-3">
//           <label className="block text-sm font-medium mb-1 text-gray-600">Last Name</label>
//           <input
//             type="text"
//             name="last_name"
//             placeholder="Last Name"
//             value={form.last_name}
//             onChange={(e) => setForm({ ...form, last_name: e.target.value })}
//             className="w-full p-2 rounded text-black border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
//             autoComplete="family-name"
//           />
//         </div>

//         {/* Email */}
//         <div className="mb-3">
//           <label className="block text-sm font-medium mb-1 text-gray-600">Email</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             className="w-full p-2 rounded text-black border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
//             autoComplete="email"
//           />
//         </div>

//         {/* Password with show/hide */}
//         <div className="mb-3">
//           <label className="block text-sm font-medium mb-1 text-gray-600">Password</label>
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               className="w-full p-2 pr-10 rounded text-black border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
//               autoComplete="new-password"
//             />
//             <button
//               type="button"
//               aria-label={showPassword ? "Hide password" : "Show password"}
//               onClick={() => setShowPassword((s) => !s)}
//               className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
//             >
//               {showPassword ? (
//                 // eye-off
//                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3.11-10.94-8  .58-1.77 1.54-3.34 2.78-4.62"/>
//                   <path d="M1 1l22 22"/>
//                   <path d="M10.58 10.58a2 2 0 0 0 2.84 2.84"/>
//                   <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c5 0 9.27 3.11 10.94 8a11.8 11.8 0 0 1-2.31 3.64"/>
//                 </svg>
//               ) : (
//                 // eye
//                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
//                   <circle cx="12" cy="12" r="3" />
//                 </svg>
//               )}
//             </button>
//           </div>
//           <p className="text-xs text-gray-500 mt-1">Use at least 8 characters.</p>
//         </div>

//         <Button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-green-600 hover:bg-green-700 py-2 rounded"
//           label={loading ? "Creating..." : "Sign Up"}
//         />
//       </form>
//     </div>
//   );
// }

// src/components/loginForm/SignUp.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signupAPI } from "@/services/redux/thunk/authThunk";
import Button from "../button/Button";

type SignUpProps = {
  onClose?: () => void;          // when used inside modal
  switchToLogin?: () => void;    // show Login view inside modal (if you prefer switching)
  redirectTo?: string;           // default: "/dashboard"
  autoLogin?: boolean;           // default: true (use backend token)
};

export default function SignUp({
  onClose,
  switchToLogin,
  redirectTo = "/dashboard",
  autoLogin = true,
}: SignUpProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { first_name, last_name, email, password } = form;
    if (!first_name || !last_name || !email || !password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const data = await signupAPI(first_name, last_name, email, password); // { token, user }

      if (autoLogin && data?.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("authUser", JSON.stringify(data.user));
        window.dispatchEvent(new Event("auth-changed"));
        onClose?.(); // close modal if present
        router.push(redirectTo);
      } else {
        // fallback: switch to login view if provided
        switchToLogin?.();
      }
    } catch (err: unknown) {
      // Type-safe error handling
      const error = err as { response?: { data?: { message?: string } } };
      setError(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md p-6 rounded-lg shadow-md bg-white"
      >
        <h1 className="text-2xl mb-4 font-semibold text-blue-600">Create Account</h1>
        {error && <p className="text-red-600 text-sm mb-3 text-center">{error}</p>}

        {/* First Name */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1 text-gray-600">First Name</label>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={form.first_name}
            onChange={(e) => setForm({ ...form, first_name: e.target.value })}
            className="w-full p-2 rounded text-black border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            autoComplete="given-name"
          />
        </div>

        {/* Last Name */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1 text-gray-600">Last Name</label>
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={form.last_name}
            onChange={(e) => setForm({ ...form, last_name: e.target.value })}
            className="w-full p-2 rounded text-black border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            autoComplete="family-name"
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1 text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-2 rounded text-black border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            autoComplete="email"
          />
        </div>

        {/* Password with show/hide */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1 text-gray-600">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full p-2 pr-10 rounded text-black border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
              autoComplete="new-password"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((s) => !s)}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                // eye-off
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3.11-10.94-8  .58-1.77 1.54-3.34 2.78-4.62"/>
                  <path d="M1 1l22 22"/>
                  <path d="M10.58 10.58a2 2 0 0 0 2.84 2.84"/>
                  <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c5 0 9.27 3.11 10.94 8a11.8 11.8 0 0 1-2.31 3.64"/>
                </svg>
              ) : (
                // eye
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Use at least 8 characters.</p>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 py-2 rounded"
          label={loading ? "Creating..." : "Sign Up"}
        />
      </form>
    </div>
  );
}









