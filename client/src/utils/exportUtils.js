import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

export const exportToExcel = (data, filename = "students") => {
  const excelData = data.map((student) => ({
    "Student ID": student.studentId || "N/A",
    "First Name": student.name.firstName,
    "Middle Name": student.name.middleName || "",
    "Last Name": student.name.surname,
    "Name Extension": student.name.nameExtension || "",
    Course: student.course.courseCode,
    "Year Level": student.enrollments?.[0]?.yearLevel || "N/A",
    Status: student.enrollments?.[0]?.enrollmentStatus || "pending",
    Gender: student.personalInfo?.gender || "N/A",
    Address: student.homeAddress || "N/A",
  }));

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(excelData);

  XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

export const exportToPDF = (data, filename = "students") => {
  const doc = new jsPDF();
  const columns = [
    { header: "Student ID", dataKey: "id" },
    { header: "Name", dataKey: "name" },
    { header: "Course", dataKey: "course" },
    { header: "Year", dataKey: "year" },
    { header: "Status", dataKey: "status" },
  ];

  const pdfData = data.map((student) => ({
    id: student.studentId || "N/A",
    name: `${student.name.surname}, ${student.name.firstName} ${
      student.name.middleName ? student.name.middleName[0] + "." : ""
    } ${student.name.nameExtension || ""}`.trim(),
    course: student.course.courseCode,
    year: student.enrollments?.[0]?.yearLevel
      ? `${student.enrollments[0].yearLevel}`
      : "N/A",
    status: (
      student.enrollments?.[0]?.enrollmentStatus || "pending"
    ).toUpperCase(),
  }));

  doc.setFontSize(16);
  doc.text("Student List", 14, 15);
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);

  doc.autoTable({
    columns,
    body: pdfData,
    startY: 30,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [63, 81, 181] },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    margin: { top: 30 },
  });

  doc.save(`${filename}.pdf`);
};
