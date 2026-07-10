// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import "../globals.css";

// export default function Register() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       alert("كلمتا المرور غير متطابقتين");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost/api/register.php", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });
//       const data = await res.json();

//       if (data.status === "success") {
//         alert("✅ تم التسجيل بنجاح! يرجى تسجيل الدخول");
//         router.push("/");
//       } else {
//         alert(data.message || "حدث خطأ أثناء التسجيل");
//       }
//     } catch (error) {
//       alert("حدث خطأ في الاتصال بالخادم");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="glass-container">
//       <h2>🌟 حساب جديد</h2>
//       <p style={{ color: "#718096", marginBottom: "30px", fontSize: "15px" }}>
//         أنشئ حسابك وابدأ بإدارة الطلاب
//       </p>
//       <form onSubmit={handleRegister}>
//         <input
//           type="text"
//           placeholder="اسم المستخدم"
//           className="input-field"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="كلمة المرور"
//           className="input-field"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="تأكيد كلمة المرور"
//           className="input-field"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />
//         <button type="submit" className="btn-submit" disabled={loading}>
//           {loading ? "جاري التسجيل..." : "🎉 تسجيل"}
//         </button>
//       </form>
//       <Link href="/" className="link-text">
//         لديك حساب بالفعل؟ <span>تسجيل الدخول</span>
//       </Link>
//     </div>
//   );
// }
