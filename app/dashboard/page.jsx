// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import "../globals.css";

// export default function Dashboard() {
//   const [username, setUsername] = useState("");
//   const [studentName, setStudentName] = useState("");
//   const [currentSubject, setCurrentSubject] = useState("");
//   const [subjectsList, setSubjectsList] = useState([]);
//   const [students, setStudents] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("username");
//     if (storedUser) {
//       setUsername(storedUser);
//       fetchStudents();
//     } else {
//       router.push("/");
//     }
//   }, [router]);

//   const fetchStudents = async () => {
//     try {
//       const res = await fetch("http://localhost/api/get_students.php");
//       const data = await res.json();
//       if (data.status === "success") {
//         setStudents(data.students || []);
//       }
//     } catch (error) {
//       console.error("خطأ في جلب الطلاب:", error);
//     }
//   };

//   const handleAddSubject = (e) => {
//     e.preventDefault();
//     if (currentSubject.trim() !== "") {
//       setSubjectsList([...subjectsList, currentSubject.trim()]);
//       setCurrentSubject("");
//     }
//   };

//   const handleRemoveSubject = (indexToRemove) => {
//     setSubjectsList(subjectsList.filter((_, index) => index !== indexToRemove));
//   };

//   const handleSaveStudent = async (e) => {
//     e.preventDefault();
//     if (subjectsList.length === 0) {
//       alert("الرجاء إضافة مادة واحدة على الأقل");
//       return;
//     }

//     const res = await fetch("http://localhost/api/add_student.php", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         name: studentName,
//         subjects: subjectsList.join(" - "),
//       }),
//     });
//     const data = await res.json();

//     if (data.status === "success") {
//       alert("تم تسجيل بيانات الطالب بنجاح");
//       setStudentName("");
//       setSubjectsList([]);
//       fetchStudents();
//     } else {
//       alert("حدث خطأ أثناء الحفظ");
//     }
//   };

//   const handleDeleteStudent = async (studentId) => {
//     if (!confirm("هل أنت متأكد من حذف هذا الطالب؟")) return;

//     const res = await fetch("http://localhost/api/delete_student.php", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id: studentId }),
//     });
//     const data = await res.json();

//     if (data.status === "success") {
//       alert("تم حذف الطالب بنجاح");
//       fetchStudents();
//     } else {
//       alert("حدث خطأ أثناء الحذف");
//     }
//   };

//   const handleClearAll = async () => {
//     if (
//       !confirm(
//         "هل أنت متأكد من حذف جميع الطلاب؟ هذا الإجراء لا يمكن التراجع عنه!",
//       )
//     )
//       return;

//     const res = await fetch("http://localhost/api/clear_students.php", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//     });
//     const data = await res.json();

//     if (data.status === "success") {
//       alert("تم حذف جميع الطلاب بنجاح");
//       fetchStudents();
//     } else {
//       alert("حدث خطأ أثناء الحذف");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("username");
//     router.push("/");
//   };

//   const totalStudents = students.length;
//   const totalSubjects = students.reduce(
//     (sum, s) => sum + (s.subjects?.length || 0),
//     0,
//   );
//   const averageGrade =
//     students.length > 0
//       ? (
//           students.reduce((sum, s) => sum + (s.average || 0), 0) /
//           students.length
//         ).toFixed(1)
//       : "0";

//   return (
//     <div
//       className="glass-container"
//       style={{ maxWidth: "800px", width: "95%" }}
//     >
//       <div className="user-header">
//         <div>
//           <h3>
//             أهلاً بك، <span className="neon-text">{username}</span>
//           </h3>
//           <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#718096" }}>
//             نظام إدارة الطلاب
//           </p>
//         </div>
//         <button onClick={handleLogout} className="btn-logout">
//           تسجيل الخروج
//         </button>
//       </div>

//       <div className="stats-container">
//         <div className="stat-item">
//           <span className="stat-number">{totalStudents}</span>
//           <span className="stat-label">👨‍🎓 الطلاب</span>
//         </div>
//         <div className="stat-item">
//           <span className="stat-number">{totalSubjects}</span>
//           <span className="stat-label">📚 المواد</span>
//         </div>
//         <div className="stat-item">
//           <span className="stat-number">{averageGrade}</span>
//           <span className="stat-label">📊 المعدل</span>
//         </div>
//       </div>

//       <div style={{ marginBottom: "30px" }}>
//         <h2 style={{ marginBottom: "20px", fontSize: "22px" }}>
//           تسجيل طالب جديد
//         </h2>

//         <form onSubmit={handleSaveStudent}>
//           <input
//             type="text"
//             placeholder="اسم الطالب الرباعي"
//             className="input-field"
//             value={studentName}
//             onChange={(e) => setStudentName(e.target.value)}
//             required
//           />

//           <div className="subject-input-group">
//             <input
//               type="text"
//               placeholder="أدخل اسم المادة..."
//               className="input-field"
//               value={currentSubject}
//               onChange={(e) => setCurrentSubject(e.target.value)}
//               style={{ marginBottom: "0", borderRadius: "14px 0 0 14px" }}
//             />
//             <button
//               onClick={handleAddSubject}
//               type="button"
//               className="btn-add-subject"
//             >
//               إضافة المادة
//             </button>
//           </div>

//           <div className="subjects-display-area">
//             {subjectsList.length === 0 ? (
//               <p style={{ color: "#aaa", fontSize: "14px" }}>
//                 لم يتم إضافة مواد بعد...
//               </p>
//             ) : (
//               subjectsList.map((sub, index) => (
//                 <span
//                   key={index}
//                   className="subject-tag"
//                   onClick={() => handleRemoveSubject(index)}
//                   title="انقر للحذف"
//                 >
//                   {sub} ✕
//                 </span>
//               ))
//             )}
//           </div>

//           <button
//             type="submit"
//             className="btn-submit"
//             style={{ marginTop: "20px" }}
//           >
//             حفظ بيانات الطالب بالكامل
//           </button>
//         </form>
//       </div>

//       <div>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "16px",
//           }}
//         >
//           <h2 style={{ margin: 0, fontSize: "20px" }}>📋 قائمة الطلاب</h2>
//           {students.length > 0 && (
//             <button
//               onClick={handleClearAll}
//               className="btn-clear-all"
//               style={{ width: "auto", padding: "8px 16px", fontSize: "14px" }}
//             >
//               🗑️ حذف الكل
//             </button>
//           )}
//         </div>

//         {students.length === 0 ? (
//           <div
//             style={{
//               textAlign: "center",
//               padding: "40px 20px",
//               background: "rgba(255,255,255,0.3)",
//               borderRadius: "16px",
//               border: "2px dashed rgba(102,126,234,0.2)",
//             }}
//           >
//             <p style={{ color: "#718096", fontSize: "16px" }}>
//               📭 لا يوجد طلاب مسجلين
//             </p>
//             <p style={{ color: "#a0aec0", fontSize: "14px" }}>
//               أضف طالباً جديداً باستخدام النموذج أعلاه
//             </p>
//           </div>
//         ) : (
//           students.map((student, index) => (
//             <div key={student.id || index} className="student-card">
//               <div className="student-header">
//                 <div className="student-info">
//                   <div className="student-name">{student.name}</div>
//                   <div className="student-id">
//                     🆔 #{student.id || index + 1}
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => handleDeleteStudent(student.id)}
//                   className="btn-delete-student"
//                   title="حذف الطالب"
//                 >
//                   ✕
//                 </button>
//               </div>

//               <div className="student-subjects">
//                 {student.subjects &&
//                   student.subjects.map((subject, idx) => (
//                     <span key={idx} className="subject-badge">
//                       📖 {subject.name}
//                       <span className="grade">({subject.grade || "—"})</span>
//                     </span>
//                   ))}
//               </div>

//               <div className="student-footer">
//                 <div className="student-average">
//                   📊 المعدل:{" "}
//                   <span>
//                     {student.average ? student.average.toFixed(1) : "—"}
//                   </span>
//                 </div>
//                 <div style={{ fontSize: "13px", color: "#718096" }}>
//                   📚 {student.subjects?.length || 0} مادة
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
