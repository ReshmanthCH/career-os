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
      const msg = err.response?.data?.message || err.message || "Failed to send verification email.";
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
    <div className="min-h-screen flex items-center justify-center bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Glow Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full space-y-8 bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-slate-800 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-3">
          <DevrynLogo size="xl" showText={false} />
          <h2 className="text-2xl font-black text-white tracking-tight">
            {step === 1 ? (
              <span>Create <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Devryn Account</span></span>
            ) : (
              "Verify Email Code"
            )}
          </h2>
          <p className="text-xs text-slate-400 font-medium text-center">
            {step === 1
              ? "Join Devryn Software Engineering Platform"
              : `Enter the 6-digit verification code sent to ${email}`}
          </p>
        </div>

        {localError && (
          <div className="bg-rose-950/60 border border-rose-800/80 p-3.5 rounded-2xl text-xs text-rose-300 font-medium">
            {localError}
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-950/60 border border-emerald-800/80 p-3.5 rounded-2xl text-xs text-emerald-300 font-medium">
            {successMsg}
          </div>
        )}

        {step === 1 ? (
          <form className="space-y-4 text-xs" onSubmit={handleSendOtp}>
            <div>
              <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium transition"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@example.com"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium transition"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium transition"
              />
            </div>

            <button
              type="submit"
              disabled={isSendingOtp}
              className="w-full py-3.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition disabled:opacity-50 mt-2"
            >
              {isSendingOtp ? "Generating Verification Code..." : "Send Email Verification Code →"}
            </button>
          </form>
        ) : (
          <form className="space-y-4 text-xs" onSubmit={handleCompleteRegistration}>
            {devOtpCode && (
              <div className="p-3.5 bg-indigo-950/60 border border-indigo-800/80 rounded-2xl text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-indigo-400 block">
                  ⚡ Verification Code (Local Dev Mode)
                </span>
                <span className="text-2xl font-black tracking-widest text-indigo-200 block">
                  {devOtpCode}
                </span>
              </div>
            )}

            <div>
              <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                6-Digit Verification Code (OTP)
              </label>
              <input
                type="text"
                maxLength={6}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="w-full px-4 py-3 bg-slate-950 border border-indigo-800/80 rounded-xl text-center text-lg tracking-widest font-extrabold text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition disabled:opacity-50"
            >
              {isSubmitting ? "Verifying Code..." : "Verify & Complete Devryn Account ✓"}
            </button>
          </form>
        )}

        <div className="text-center pt-2 border-t border-slate-800/80">
          <p className="text-xs text-slate-400">
            Already registered?{" "}
            <Link to="/login" className="font-bold text-indigo-400 hover:text-indigo-300 transition">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;