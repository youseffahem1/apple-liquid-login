// "use client"
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import "../globals.css"

// export default function Login() {
//   const router = useRouter();
//   const [msg, setMsg] = useState("");
//   const [error, setError] = useState(false);
//   const [input, setInput] = useState({
//     username: "",
//     password: "",
//   });
//   async function login() {
//     const res = await fetch("http://127.0.0.1:8000/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         username: input.username,
//         password: input.password,
//       }),
//     });
//     const data = await res.json();
//     if (!res.ok) {
//       setMsg(data.detail);
//       setError(true);
//       setTimeout(() => {
//         setMsg("");
//       }, 2000);
//     } else {
//       setMsg("Login Success");
//       setError(false);
//       setTimeout(() => {
//         setMsg("");
//       }, 2000);
//       localStorage.setItem("token", data.token);
//        setTimeout(() => {
//         router.push("/dashboard")
//     }, 2500);
//     }

//   }

//   return (
//     <div className="login">
//         <h1 className="login-title">
//             Login
//         </h1>
//       <input
//         className="login-username"
//         placeholder="Username"
//         value={input.username}
//         onChange={(e) => setInput({ ...input, username: e.target.value })}
//       />
//       <input
//         placeholder="Password"
//         className="login-password"
//         type="password"
//         value={input.password}
//         onChange={(e) => setInput({ ...input, password: e.target.value })}
//       />
//       <button className="login-btn" onClick={login}>
//         Login
//       </button>
//       <p>
//         Not Have Any Account? <span onClick={()=> router.push("/register")} style={{color:"#207be4",cursor:"pointer"}}>Signup</span>
//       </p>
//       {msg&&(
//         <p style={{color:error?"white":"#4ade80",backgroundColor:error?"#ac161626":"#22c55e26"}} className="login-message">
//             {msg}
//         </p>
//       )}
//     </div>
//   );
// }
