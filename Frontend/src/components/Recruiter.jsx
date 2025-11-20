import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import companies from "./Org";
import OtpModal from "./ui/OtpModal";

export default function Recruiter() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mobile, setMobile] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [openOtp, setOpenOtp] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    if (!email || !fname || !mobile || !selectedCompany) {
      alert("Please fill all required fields before signup");
      return;
    }
    setOpenOtp(true);
  };

  const handleResend = async (email) => {
    console.log("Resending OTP to:", email);
    return Promise.resolve();
  };

  const handleVerify = async (email, otp) => {
    console.log("Verifying OTP:", otp, "for email:", email);
    alert("OTP Verified Successfully!");
    setOpenOtp(false);
    return Promise.resolve();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[linear-gradient(rgba(80,80,255,0.1)1px,transparent1px),linear-gradient(90deg,rgba(80,80,255,0.1)1px,transparent1px)] bg-[size:45px_45px] animate-pulse"></div>
      <div className="relative z-10 w-full max-w-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:flex items-end justify-center p-6 bg-gradient-to-br from-blue-700 via-blue-800 to-gray-900 relative" style={{ backgroundImage: "url('https://d8it4huxumps7.cloudfront.net/uploads/images/login/login-img-6.png?d=734x734')", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center 65px"}}></div>
        <div className="p-10 flex flex-col justify-center space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold text-white">Sign up as recruiter</h1>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSignup}>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-300 text-sm mb-1">Organization Email *</label>
              <input type="email" id="email" placeholder="Enter your email" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" required value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col">
                <label htmlFor="firstName" className="text-gray-300 text-sm mb-1">First Name *</label>
                <input type="text" id="firstName" placeholder="First Name" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" required value={fname} onChange={(e) => setFname(e.target.value)}/>
              </div>
              <div className="flex-1 flex flex-col">
                <label htmlFor="lastName" className="text-gray-300 text-sm mb-1">Last Name</label>
                <input type="text" id="lastName" placeholder="Last Name" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" value={lname} onChange={(e) => setLname(e.target.value)}/>
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="mobile" className="text-gray-300 text-sm mb-1">Mobile Number *</label>
              <div className="flex">
                <span className="inline-flex items-center px-4 rounded-l-lg bg-white/10 border border-gray-600 text-white">+91</span>
                <input type="tel" id="mobile" placeholder="Enter mobile number" className="flex-1 px-4 py-3 rounded-r-lg bg-white/10 border border-gray-600 border-l-0 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" required value={mobile} onChange={(e) => setMobile(e.target.value)}/>
              </div>
            </div>
            <div className="flex flex-col">
              <select className="w-full px-2 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
                <option value="" disabled>Select your organization</option>
                {companies.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="w-full py-3 bg-blue-600/50 rounded-lg text-white font-semibold hover:bg-blue-600/70 transition cursor-pointer mt-2">Sign up</button>
          </form>
          <p className="text-sm text-center text-gray-400 mt-2">Already have an account?
            <span className="text-blue-400 ml-1 cursor-pointer hover:underline" onClick={() => Navigate('/login')}>Login</span>
          </p>
        </div>
      </div>
      <OtpModal open={openOtp} email={email} onClose={() => setOpenOtp(false)} onResend={handleResend} onVerify={handleVerify}/>
    </div>
  );
}
