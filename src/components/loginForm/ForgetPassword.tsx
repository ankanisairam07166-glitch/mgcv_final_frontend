// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { resetPasswordAPI, sendOTPAPI, verifyOTPAPI } from "@/services/redux/thunk/authThunk";
// import Input from "../input/Input";
// import Button from "../button/Button";

// export default function ForgotPassword() {
//   const router = useRouter();
//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState("");
//   const [otp, setOTP] = useState("");
//   const [password, setPassword] = useState(""); 
//   const [resetToken, setResetToken] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleSendOTP = async () => {
//     try {
//       const data = await sendOTPAPI(email);
//       setMessage(data.message);
//       setStep(2);
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Failed to send OTP");
//     }
//   };

//   const handleVerifyOTP = async () => {
//     try {
//       const data = await verifyOTPAPI(email, otp);
//       setResetToken(data.reset_token);
//       setStep(3);
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Invalid OTP");
//     }
//   };

//   const handleResetPassword = async () => {
//     try {
//       await resetPasswordAPI(email, password, resetToken);
//       alert("Password reset successful!");
//       router.push("/login");
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Failed to reset password");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center mt-40">
//       <div className="w-96 p-6 rounded-lg shadow-md">
//         <h1 className="text-2xl mb-4 text-center">Forgot Password</h1>

//         {step === 1 && (
//           <>
//             <Input
//               type="email"
//               label="Email"
//               placeholder="Enter your email"
//               className="w-full p-2 mb-3 rounded"
//               name="email"
//             />
//             <Button onClick={handleSendOTP} className="w-full bg-blue-600 py-2 rounded" label="Send OTP" />
           
//           </>
//         )}

//         {step === 2 && (
//           <>
//             <Input
//               type="text"
//               label="Otp"
//               placeholder="Enter OTP"
//               className="w-full p-2 mb-3 bg-gray-700 rounded"
//               name="otp"
//             />
//             <Button onClick={handleVerifyOTP} className="w-full bg-green-600 py-2 rounded" label="Verify OTP" />

//           </>
//         )}

//         {step === 3 && (
//           <>
//             <Input
//               type="password"
//               label="password"
//               name="password"
//               placeholder="New Password"
  
//             />
//             <Button onClick={handleResetPassword} className="w-full bg-yellow-600 py-2 rounded" label="Reset Password" />
              
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { sendOTPAPI, verifyOTPAPI, resetPasswordAPI } from "@/services/redux/thunk/authThunk";
import Button from "../button/Button";
import Link from "next/link";

export default function ForgotPassword() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    setError(""); setMessage(""); setLoading(true);
    try {
      if (!email) return setError("Enter your email");
      const data = await sendOTPAPI(email);
      setMessage(data.message || "OTP sent to your email");
      setStep(2);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setError(""); setMessage(""); setLoading(true);
    try {
      if (!otp) return setError("Enter OTP");
      const data = await verifyOTPAPI(email, otp);
      setResetToken(data.reset_token);
      setMessage(data.message || "OTP verified");
      setStep(3);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setError(""); setMessage(""); setLoading(true);
    try {
      if (!password) return setError("Enter new password");
      await resetPasswordAPI({ email, password, reset_token: resetToken }); // ✅ object param
      setMessage("Password reset successful!");
      router.push("/login");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-40">
      <div className="w-96 p-6 rounded-lg shadow-md bg-white">
        <h1 className="text-2xl mb-4 text-center font-semibold">Forgot Password</h1>

        {message && <p className="text-sm text-center mb-3 text-blue-600">{message}</p>}
        {error && <p className="text-sm text-center mb-3 text-red-600">{error}</p>}

        {step === 1 && (
          <>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-3 rounded text-black border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            />
            <Button
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
              label={loading ? "Sending..." : "Send OTP"}
            />
          </>
        )}

        {step === 2 && (
          <>
            <label className="block text-sm font-medium mb-1">OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              className="w-full p-2 mb-3 rounded text-black border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            />

            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={async () => {
                  try {
                    const res = await sendOTPAPI(email, true);
                    setMessage(res.message || "OTP resent");
                  } catch (e: any) {
                    setError(e?.response?.data?.message || "Failed to resend OTP");
                  }
                }}
                className="text-sm underline"
              >
                Resend OTP
              </button>
            </div>

            <Button
              onClick={handleVerifyOTP}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 py-2 rounded"
              label={loading ? "Verifying..." : "Verify OTP"}
            />
          </>
        )}

        {step === 3 && (
          <>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-3 rounded text-black border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            />
            <Button
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full bg-yellow-600 hover:bg-yellow-700 py-2 rounded"
              label={loading ? "Resetting..." : "Reset Password"}
            />
          </>
        )}

        <p className="text-sm mt-4 text-center">
          <Link href="/login" className="text-blue-500 underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
