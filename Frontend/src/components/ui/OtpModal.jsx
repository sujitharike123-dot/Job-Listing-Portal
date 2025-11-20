import React, { useEffect, useState } from "react";

/**
 * Props:
 * - open: boolean
 * - email: string
 * - onClose(): close modal
 * - onResend(email): promise to resend OTP (optional)
 * - onVerify(email, otp): promise to verify OTP (optional)
 */

export default function OtpModal({ open, email, onClose, onResend, onVerify }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const maskEmail = (email) => {
    if (!email) return "";
    const [user, domain] = email.split("@");
    return (user[0] + "*".repeat(Math.max(user.length - 1, 1)) + "@" + domain);
  };

  useEffect(() => {
    if (!open) return;
    setOtp(["", "", "", "", "", ""]);
    setTimer(60);
    setSent(true);
    setErr("");
  }, [open]);
  useEffect(() => {
    if (!open) return;
    if (timer === 0) return;
    const id = setTimeout(() => setTimer((prev) => prev - 1), 1000);
    return () => clearTimeout(id);
  }, [timer, open]);

  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      setErr("Enter all 6 digits");
      return;
    }

    setLoading(true);
    setErr("");

    try {
      if (onVerify) await onVerify(email, code);
    } catch (e) {
      setErr("Invalid OTP");
    }

    setLoading(false);
  };

  const handleResend = async () => {
    if (!onResend) return;
    setTimer(60);
    setOtp(["", "", "", "", "", ""]);
    setErr("");
    try {
      await onResend(email);
      setSent(true);
    } catch (e) {
      setErr("Failed to resend OTP");
    }
  };
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-50">
      <div className="bg-gray-900/80 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white">Please verify your email</h3>
          <p className="text-sm text-gray-300">We sent a one-time password to <span className="font-medium">{maskEmail(email)}</span></p>
        </div>
        <div className="grid grid-cols-6 gap-3 mb-4">
          {otp.map((val, idx) => (
            <input key={idx} id={`otp-${idx}`} value={val} onChange={(e) => handleOtpChange(e.target.value, idx)} onKeyDown={(e) => {if (e.key === "Backspace" && !otp[idx] && idx > 0) {document.getElementById(`otp-${idx - 1}`)?.focus();}}}className="w-full bg-white/10 text-center py-3 rounded text-white text-lg" maxLength={1}/>
          ))}
        </div>
        {err && <p className="text-red-400 text-sm text-center mb-2">{err}</p>}
        <div className="text-sm text-gray-400 mb-4 text-center">
          {sent && timer > 0 ? (
            <span>OTP sent • {timer}s left</span>
          ) : (
            <button onClick={handleResend} className="text-blue-400 underline cursor-pointer">Resend OTP</button>
          )}
        </div>
        <div className="flex gap-3 cursor-pointer">
          <button onClick={handleVerify} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg cursor-pointer">Verify Email</button>
          <button onClick={onClose} className="flex-1 text-gray-300 hover:underline bg-transparent py-3 rounded-lg border border-white/6 cursor-pointer">Close</button>
        </div>
      </div>
    </div>
  );

}
