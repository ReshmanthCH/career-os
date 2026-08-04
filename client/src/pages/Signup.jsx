import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { sendOTP, verifyOTP } from "../services/authService";

function Signup() {
  const [step, setStep] = useState(1); // 1 = Details, 2 = Email OTP Verification
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [devOtpCode, setDevOtpCode] = useState("");

  const [localError, setLocalError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  // Step 1: Send OTP to email
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLocalError("");
    setSuccessMsg("");
    setDevOtpCode("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setLocalError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters long.");
      return;
    }

    try {
      setIsSendingOtp(true);
      const res = await sendOTP(email.trim(), "REGISTER");
      if (res.success) {
        setSuccessMsg(res.message || `Verification code generated for ${email}.`);
        if (res.devOtp) {
          setDevOtpCode(res.devOtp);
          setOtp(res.devOtp); // Auto-fill for convenience when SMTP is unconfigured
        }
        setStep(2);
      }
    } catch (err) {
      setLocalError(err.response?.data?.message || err.message || "Failed to send verification email.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Step 2: Verify OTP & Complete Registration
  const handleCompleteRegistration = async (e) => {
    e.preventDefault();
    setLocalError("");
    setSuccessMsg("");

    if (!otp || otp.trim().length < 6) {
      setLocalError("Please enter the 6-digit verification code.");
      return;
    }

    try {
      setIsSubmitting(true);
      await verifyOTP(email.trim(), otp.trim(), "REGISTER");

      const data = await signup({
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
        otp: otp.trim(),
      });
      
      if (data?.user?.onboardingCompleted) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/onboarding", { replace: true });
      }
    } catch (err) {
      setLocalError(err.response?.data?.message || err.message || "Email verification failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div>
          <div className="mx-auto w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            C
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {step === 1 ? "Create an Account" : "Verify Email Code"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {step === 1
              ? "Join CareerOS with email authentication"
              : `Enter the 6-digit verification code for ${email}`}
          </p>
        </div>

        {localError && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md text-xs text-red-700 font-medium">
            {localError}
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-md text-xs text-emerald-800 font-medium">
            {successMsg}
          </div>
        )}

        {step === 1 ? (
          <form className="mt-6 space-y-5" onSubmit={handleSendOtp}>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSendingOtp}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-md text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition disabled:opacity-50"
            >
              {isSendingOtp ? (
                <span className="flex items-center space-x-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Generating Verification Code...</span>
                </span>
              ) : (
                "Send Email Verification Code →"
              )}
            </button>
          </form>
        ) : (
          <form className="mt-6 space-y-5" onSubmit={handleCompleteRegistration}>
            {devOtpCode && (
              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-indigo-700 block">
                  ⚡ Verification Code (Local Dev Mode)
                </span>
                <span className="text-2xl font-black tracking-widest text-indigo-950 block">
                  {devOtpCode}
                </span>
                <p className="text-[10px] text-indigo-600">
                  (Auto-filled below! To receive real emails in your inbox, set EMAIL_USER & EMAIL_PASS in .env)
                </p>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                6-Digit Verification Code (OTP)
              </label>
              <input
                type="text"
                maxLength={6}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="w-full px-3 py-3 border border-indigo-300 rounded-xl shadow-sm text-center text-lg tracking-widest font-extrabold text-indigo-950 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-md text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center space-x-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Verifying Code & Creating Account...</span>
                  </span>
                ) : (
                  "Verify & Complete Registration ✓"
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-center text-xs font-medium text-gray-500 hover:text-gray-900 py-1"
              >
                ← Change Email or Details
              </button>
            </div>
          </form>
        )}

        <div className="text-center pt-2">
          <p className="text-xs text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;