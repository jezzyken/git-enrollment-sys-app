<template>
  <div id="registration-form" class="registration-form">
    <div class="form-header">
      <div class="school-info text-center">
        <p>Republic of the Philippines</p>
        <h2>GLAN INSTITUTE OF TECHNOLOGY</h2>
        <p>Calabanit, Glan, Sarangani Province</p>
      </div>
    </div>

    <div class="form-header">
      <div class="school-info text-center">
        <div class="text-center">
          <h3 class="text-center mb-4">REGISTRATION FORM</h3>
        </div>
      </div>
    </div>

    <div class="form-content">
      <div class="student-info mb-4">
        <div class="info-row">
          <span>ID No.: {{ student?.studentId }}</span>
          <span>Reg. Date: {{ formatDate(enrollment?.registrationDate) }}</span>
        </div>
        <div class="info-row">
          <span>NAME: {{ formatName(student?.name) }}</span>
          <span>Scholarship: ___________</span>
        </div>
        <div class="info-row">
          <span>Course/Major: {{ student?.course?.courseName }}</span>
          <span>Semester: {{ enrollment?.semester }}</span>
        </div>
        <div class="info-row">
          <span>Year Level: {{ formatYearLevel(enrollment?.yearLevel) }}</span>
          <span>Section: {{ schedules[0]?.section || "A" }}</span>
          <span>Academic Year: {{ enrollment?.academicYear }}</span>
        </div>
      </div>

      <table class="schedule-table">
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Description</th>
            <th>Units</th>
            <th>Professor</th>
            <th>Days/Time</th>
            <th>Room</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="subject in mergedSchedules" :key="subject.catNo">
            <td>{{ subject.catNo }}</td>
            <td>{{ subject.DescriptiveTitle }}</td>
            <td class="text-center">{{ subject.units }}</td>
            <td>{{ subject.professor || "TBA" }}</td>
            <td>
              {{ formatSchedule(subject.schedule) }}
            </td>
            <td class="text-center">{{ subject.schedule?.room || "TBA" }}</td>
          </tr>
          <tr class="total-row">
            <td colspan="2" class="text-right">Total Units:</td>
            <td class="text-center">{{ calculateTotalUnits() }}</td>
            <td colspan="3"></td>
          </tr>
        </tbody>
      </table>

      <!-- Signature Section -->
      <div class="signature-section">
        <div class="signature-block">
          <div class="signature-line"></div>
          <p>Student's Signature</p>
        </div>
        <div class="signature-block">
          <div class="signature-line"></div>
          <p>Program Head</p>
        </div>
        <div class="signature-block">
          <div class="signature-line"></div>
          <p>College Registrar</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import html2pdf from "html2pdf.js";

export default {
  name: "RegistrationFormPrint",
  props: {
    student: {
      type: Object,
      required: true,
    },
    enrollment: {
      type: Object,
      required: true,
    },
    schedules: {
      type: Array,
      required: true,
    },
    mergedSchedules: {
      type: Array,
      required: true,
    },
  },
  methods: {
    formatDate(date) {
      return moment(date).format("MM/DD/YYYY");
    },
    formatName(name) {
      if (!name) return "";
      return `${name.surname}, ${name.firstName} ${
        name.nameExtension || ""
      }`.trim();
    },
    formatYearLevel(level) {
      const levels = {
        1: "FIRST",
        2: "SECOND",
        3: "THIRD",
        4: "FOURTH",
      };
      return levels[level] || level;
    },
    formatSchedule(schedule) {
      if (!schedule) return "TBA";
      return `${schedule.day} ${schedule.timeStart}-${schedule.timeEnd}`;
    },
    calculateTotalUnits() {
      return this.mergedSchedules.reduce(
        (total, subject) => total + subject.units,
        0
      );
    },
    async generatePDF() {
      const element = document.getElementById("registration-form");
      const opt = {
        margin: 0.5,
        filename: `registration-form-${this.student?.studentId}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
    },
  },
};
</script>

<style scoped>
.registration-form {
  padding: 20px;
  max-width: 8.5in;
  margin: 0 auto;
  background: white;
  font-family: Arial, sans-serif;
}

.form-header {
  text-align: center;
  margin-bottom: 20px;
}

.school-info h2 {
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
}

.student-info {
  margin: 20px 0;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.schedule-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 11px;
}

.schedule-table th,
.schedule-table td {
  border: 1px solid #000;
  padding: 6px;
  vertical-align: middle;
}

.total-row {
  font-weight: bold;
}

.signature-section {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}

.signature-block {
  width: 200px;
  text-align: center;
}

.signature-line {
  border-bottom: 1px solid #000;
  margin-bottom: 5px;
}

@media print {
  .registration-form {
    padding: 0;
  }
}
</style>
