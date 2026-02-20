// // "use client";
// // import React, { useState } from "react";

// // import { useRouter } from "next/navigation";
// // import { loginAPI } from "@/services/redux/thunk/authThunk";
// // import { useAuth } from "@/services/context/AuthContext";
// // import Input from "../input/Input";
// // import Button from "../button/Button";
// // import Link from "next/link";

// // export default function LoginPage() {
// //   const router = useRouter();
// //   const { login } = useAuth();

// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   const handleLogin = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError("");
// //     setLoading(true);

// //     try {
// //       const data = await loginAPI(email, password);
// //       login(data.token, data.user);
// //       router.push("/");
// //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
// //     } catch (err: any) {
// //       setError(err.response?.data?.message || "Invalid credentials");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="flex items-center justify-center mt-40 ">
// //       <form onSubmit={handleLogin} className="w-96 p-6 rounded-lg shadow-md">
// //         <h1 className="text-2xl mb-4 font-semibold text-center">Login</h1>
// //         <Input
// //           type="email"
// //           label="Email"
// //           placeholder="Email"
// //           className="w-full p-2 mb-3 rounded  text-black"
// //           name="email"
// //         />
// //         <Input
// //           type="password"
// //           label="Password"
// //           placeholder="Password"
// //           className="w-full p-2 mb-3 rounded  text-black" name="password"  />

// //         <Button
// //           type="submit"
// //           disabled={loading}
// //           className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
// //           label ="Login"
// //           isLoading={loading}
// //           />

// //         <p className="text-sm mt-4 text-center">
// //           Don’t have an account?{" "}
// //           <Link href="/signup" className="text-blue-400 underline" >
// //             Sign Up
// //           </Link>
// //         </p>

// //         <p className="text-sm text-center mt-2">
// //           <Link href="/forget-password" className="text-gray-400 underline">
// //             Forgot Password?
// //           </Link>
// //         </p>
// //       </form>
// //     </div>
// //   );
// // }

// // "use client";
// // import React, { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { loginAPI } from "@/services/redux/thunk/authThunk";
// // import Input from "../input/Input";
// // import Button from "../button/Button";
// // import Link from "next/link";

// // export default function LoginPage() {
// //   const router = useRouter();
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   const handleLogin = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError("");
// //     setLoading(true);
// //     try {
// //       if (!email || !password) {
// //         setError("Please enter both email and password");
// //         setLoading(false);
// //         return;
// //       }

// //       console.log("Login payload:", { email, password });
// //       await loginAPI(email, password);
// //       router.push("/dashboard");
// //     } catch (err: any) {
// //       setError(err.response?.data?.message || "Login failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="flex items-center justify-center mt-40">
// //       <form
// //         onSubmit={handleLogin}
// //         className="w-96 p-6 rounded-lg shadow-md bg-white"
// //       >
// //         <h1 className="text-2xl mb-4 font-semibold text-blue-600">Login</h1>

// //         {error && (
// //           <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
// //         )}

// //         <Input
// //           type="email"
// //           label="Email"
// //           placeholder="Email"
// //           name="email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           className="w-full p-2 mb-3 rounded text-black"
// //         />

// //         <Input
// //           type="password"
// //           label="Password"
// //           placeholder="Password"
// //           name="password"
// //           value={password}
// //           onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
// //           className="w-full p-2 mb-3 rounded text-black"
// //         />

// //         <Button
// //           type="submit"
// //           disabled={loading}
// //           className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
// //           label={loading ? "Logging in..." : "Login"}
// //         />

// //         {/* Links Section */}
// //       <div className="mt-6 flex flex-col items-center space-y-2 text-sm text-gray-600">
// //         <p>
// //           Don’t have an account?{" "}
// //           <Link href="/signup" className="text-blue-500 hover:underline">
// //             Sign up
// //           </Link>
// //         </p>

// //         <Link
// //           href="/forget-password"
// //           className="text-blue-500 hover:underline font-medium"
// //         >
// //           Forgot Password?
// //         </Link>
// //       </div>
// //     </form>
// //   </div>
// // );
// // }

// // src/components/loginForm/Login.tsx
// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { loginAPI } from "@/services/redux/thunk/authThunk";
// import Button from "../button/Button";
// import Link from "next/link";

// type LoginProps = {
//   onClose?: () => void;            // when used in modal
//   onLoggedIn?: () => void;         // optional callback after success
//   switchToSignUp?: () => void;     // show SignUp view inside modal
//   redirectTo?: string;             // default: "/dashboard"
// };

// export default function Login({
//   onClose,
//   onLoggedIn,
//   switchToSignUp,
//   redirectTo = "/dashboard",
// }: LoginProps) {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     if (!email || !password) {
//       setError("Please enter both email and password");
//       return;
//     }

//     setLoading(true);
//     try {
//       const data = await loginAPI(email, password); // { token, user }

//       // Persist & notify navbar
//       localStorage.setItem("authToken", data.token);
//       localStorage.setItem("authUser", JSON.stringify(data.user));
//       window.dispatchEvent(new Event("auth-changed"));

//       onLoggedIn?.();
//       onClose?.(); // close modal if present

//       router.push(redirectTo);
//     } catch (err: any) {
//       setError(err?.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//    return (
//     <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
//       <form onSubmit={handleLogin} className="w-96 p-6 rounded-lg shadow-md bg-white">
//         <h1 className="text-2xl mb-4 font-semibold text-blue-600">Login</h1>

//         {error && <p className="text-red-600 text-sm mb-3 text-center">{error}</p>}

//         {/* Email */}
//         <div className="mb-3">
//           <label className="block text-sm font-medium mb-1 text-gray-600">Email</label>
//           <input
//             type="email"
//             placeholder="Email"
//             name="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
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
//               placeholder="Password"
//               name="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2 pr-10 rounded text-black border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
//               autoComplete="current-password"
//             />
//             <button
//               type="button"
//               aria-label={showPassword ? "Hide password" : "Show password"}
//               onClick={() => setShowPassword((s) => !s)}
//               className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
//             >
//               {showPassword ? (
//                 // eye-off icon
//                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3.11-10.94-8 .58-1.77 1.54-3.34 2.78-4.62"/>
//                   <path d="M1 1l22 22"/>
//                   <path d="M10.58 10.58a2 2 0 0 0 2.84 2.84"/>
//                   <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c5 0 9.27 3.11 10.94 8a11.8 11.8 0 0 1-2.31 3.64"/>
//                 </svg>
//               ) : (
//                 // eye icon
//                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
//                   <circle cx="12" cy="12" r="3" />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>

//         <Button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
//           label={loading ? "Logging in..." : "Login"}
//         />

//         {/* Links */}
//         <div className="mt-6 flex flex-col items-center space-y-2 text-sm text-gray-600">
//           {switchToSignUp ? (
//             <button type="button" className="text-blue-500 hover:underline" onClick={switchToSignUp}>
//               Don’t have an account? Sign up
//             </button>
//           ) : (
//             <p>
//               Don’t have an account?{" "}
//               <Link href="/signup" className="text-blue-500 hover:underline">
//                 Sign up
//               </Link>
//             </p>
//           )}
//           <Link href="/forget-password" className="text-blue-500 hover:underline font-medium">
//             Forgot Password?
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// }
// src/components/loginForm/Login.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAPI } from "@/services/redux/thunk/authThunk";
import Button from "../button/Button";
import Link from "next/link";

type LoginProps = {
  onClose?: () => void;            // when used in modal
  onLoggedIn?: () => void;         // optional callback after success
  switchToSignUp?: () => void;     // show SignUp view inside modal
  redirectTo?: string;             // default: "/dashboard"
};

export default function Login({
  onClose,
  onLoggedIn,
  switchToSignUp,
  redirectTo = "/dashboard",
}: LoginProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      const data = await loginAPI(email, password); // { token, user }

      // Persist & notify navbar
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("authUser", JSON.stringify(data.user));
      window.dispatchEvent(new Event("auth-changed"));

      onLoggedIn?.();
      onClose?.(); // close modal if present

      router.push(redirectTo);
    } catch (err: unknown) {
      // Type-safe error handling
      const error = err as { response?: { data?: { message?: string } } };
      setError(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

   return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <form onSubmit={handleLogin} className="w-96 p-6 rounded-lg shadow-md bg-white">
        <h1 className="text-2xl mb-4 font-semibold text-blue-600">Login</h1>

        {error && <p className="text-red-600 text-sm mb-3 text-center">{error}</p>}

        {/* Email */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1 text-gray-600">Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 pr-10 rounded text-black border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
              autoComplete="current-password"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((s) => !s)}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                // eye-off icon
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3.11-10.94-8 .58-1.77 1.54-3.34 2.78-4.62"/>
                  <path d="M1 1l22 22"/>
                  <path d="M10.58 10.58a2 2 0 0 0 2.84 2.84"/>
                  <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c5 0 9.27 3.11 10.94 8a11.8 11.8 0 0 1-2.31 3.64"/>
                </svg>
              ) : (
                // eye icon
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
          label={loading ? "Logging in..." : "Login"}
        />

        {/* Links */}
        <div className="mt-6 flex flex-col items-center space-y-2 text-sm text-gray-600">
          {switchToSignUp ? (
            <button type="button" className="text-blue-500 hover:underline" onClick={switchToSignUp}>
             Don&apos;t have an account? Sign up
            </button>
          ) : (
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          )}
          <Link href="/forget-password" className="text-blue-500 hover:underline font-medium">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
}