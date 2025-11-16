import { useNavigate } from 'react-router-dom';
export default function SignUi() {
  const Navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[linear-gradient(rgba(80,80,255,0.1)1px,transparent1px),linear-gradient(90deg,rgba(80,80,255,0.1)1px,transparent1px)] bg-[size:45px_45px] animate-pulse"></div>
      <div className="relative z-10 w-full max-w-5xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:flex items-end justify-center p-6 bg-gradient-to-br from-blue-700 via-blue-800 to-gray-900 relative" style={{ backgroundImage: "url('https://d8it4huxumps7.cloudfront.net/uploads/images/login/login-img-1.png?d=734x734')", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center -18px"}}></div>
        <div className="p-10 flex flex-col justify-center space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold text-white">Create a new account</h1>
            <p className="text-gray-300 text-sm">Sign up to begin your job search</p>
          </div>
          <div className="w-full flex items-start justify-center gap-3 py-6 px-6 bg-orange-500/10 border border-amber-500 rounded-lg flex-col text-white font-medium hover:bg-orange-500/20 transition cursor-pointer" onClick={()=>Navigate('/candidate')}>
            <img src="/user.svg" alt="google" className="w-5 h-5"/>
            <h1 className="text-2xl">Signup as a Candidate</h1>
            <h1 className='text-white/70'>Explore Opportunities, Build Skills, Start Your Career</h1>
          </div>
          <div className="w-full flex items-start justify-center gap-3 py-6 px-6 bg-sky-500/10 border border-indigo-500 rounded-lg flex-col text-white font-medium hover:bg-sky-500/20 transition cursor-pointer" onClick={()=>Navigate('/recruiter')}>
            <img src="/search.svg" alt="google" className="w-5 h-5"/>
            <h1 className="text-2xl">Signup as a Recruiter</h1>
            <h1 className='text-white/70'>Discover Candidates, Evaluate Skills, Make Impact</h1>
          </div>
          <p className="text-sm text-center text-gray-400 mt-2">Already have an account?
            <span className="text-blue-400 ml-1 cursor-pointer hover:underline" onClick={()=>Navigate('/login')}>Login</span>
          </p>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-32 h-32 bg-blue-500/10 rounded-full top-0 left-5 animate-ping"></div>
        <div className="absolute w-20 h-20 bg-purple-500/10 rounded-full bottom-10 right-10 animate-bounce"></div>
        <div className="absolute w-24 h-24 bg-pink-500/10 rounded-full top-1/3 right-1/4 animate-pulse"></div>
      </div>
    </div>
  );
}
