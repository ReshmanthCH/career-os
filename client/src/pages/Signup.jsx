import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { sendOTP, verifyOTP } from "../services/authService";
import DevrynLogo from "../components/common/DevrynLogo";

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
      setLocalError("Please fill in all required fields.");
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
      const msg = err.response?.data?.message || err.message || "Failed to send verification code.";
      setLocalError(msg);
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
      const msg = err.response?.data?.message || err.message || "Email verification failed.";
      setLocalError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col items-center justify-center space-y-3">
          <DevrynLogo size="lg" showText={false} />
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              {step === 1 ? "Create your Devryn account" : "Verify your email"}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {step === 1
                ? "Sign up for the software engineering & placement platform"
                : `Enter the 6-digit verification code sent to ${email}`}
            </p>
          </div>
        </div>

        {localError && (
          <div className="bg-red-50 border border-red-200 p-3.5 rounded-xl text-xs text-red-700 font-medium">
            {localError}
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl text-xs text-emerald-800 font-medium">
            {successMsg}
          </div>
        )}

        {step === 1 ? (
          <form className="space-y-4 text-xs" onSubmit={handleSendOtp}>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 font-medium transition"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 font-medium transition"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 font-medium transition"
              />
            </div>

            <button
              type="submit"
              disabled={isSendingOtp}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs transition disabled:opacity-50 mt-2"
            >
              {isSendingOtp ? "Generating code..." : "Send Verification Code →"}
            </button>
          </form>
        ) : (
          <form className="space-y-4 text-xs" onSubmit={handleCompleteRegistration}>
            {devOtpCode && (
              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-indigo-700 block">
                  Verification Code (Local Dev Mode)
                </span>
                <span className="text-2xl font-bold tracking-widest text-indigo-900 block">
                  {devOtpCode}
                </span>
              </div>
            )}

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                6-Digit Verification Code (OTP)
              </label>
              <input
                type="text"
                maxLength={6}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-center text-lg tracking-widest font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs transition disabled:opacity-50"
            >
              {isSubmitting ? "Verifying..." : "Verify & Complete Registration ✓"}
            </button>
          </form>
        )}

        <div className="text-center pt-3 border-t border-slate-100">
          <p className="text-xs text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;