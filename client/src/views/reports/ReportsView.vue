<template>
  <v-container fluid>
    <!-- Page Header with Gradient Background -->
    <v-card class="mb-6 header-card" elevation="2">
      <v-row no-gutters align="center" class="pa-6">
        <v-col cols="12" sm="4">
          <div class="header-title">
            <h2 class="white--text">Academic Reports Dashboard</h2>
            <span class="subtitle-1 grey--text text--lighten-2">
              Analytics and Statistics
            </span>
          </div>
        </v-col>

        <v-col cols="12" sm="8">
          <v-row align="center" justify="end">
            <v-col cols="auto">
              <v-select
                v-model="selectedAcademicYear"
                :items="academicYears"
                label="Academic Year"
                dense
                outlined
                hide-details
                class="filter-select"
                background-color="white"
              ></v-select>
            </v-col>

            <v-col cols="auto">
              <v-select
                v-model="selectedSemester"
                :items="semesters"
                label="Semester"
                dense
                outlined
                hide-details
                class="filter-select"
                background-color="white"
              ></v-select>
            </v-col>

            <v-col cols="auto">
              <v-btn
                color="white"
                @click="generateReports"
                :loading="loading"
                elevation="2"
              >
                <v-icon left>mdi-sync</v-icon>
                Generate Reports
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <!-- Error Alert -->
    <v-slide-y-transition>
      <v-alert
        v-if="error"
        type="error"
        dismissible
        @input="clearError"
        class="mb-4"
        elevation="2"
      >
        {{ error }}
      </v-alert>
    </v-slide-y-transition>

    <!-- Summary Cards -->
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-card class="summary-card primary" elevation="2">
          <v-card-text>
            <div class="summary-content">
              <div class="summary-icon">
                <v-icon x-large color="white">mdi-account-group</v-icon>
              </div>
              <div class="summary-data">
                <div class="text-h4 white--text">{{ getTotalStudents }}</div>
                <div class="subtitle-2 white--text">Total Students</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="summary-card success" elevation="2">
          <v-card-text>
            <div class="summary-content">
              <div class="summary-icon">
                <v-icon x-large color="white">mdi-account</v-icon>
              </div>
              <div class="summary-data">
                <div class="text-h4 white--text">{{ getTotalTeachers }}</div>
                <div class="subtitle-2 white--text">Active Faculty</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="summary-card warning" elevation="2">
          <v-card-text>
            <div class="summary-content">
              <div class="summary-icon">
                <v-icon x-large color="white">mdi-book-open-variant</v-icon>
              </div>
              <div class="summary-data">
                <div class="text-h4 white--text">{{ getTotalSubjects }}</div>
                <div class="subtitle-2 white--text">Active Subjects</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="summary-card info" elevation="2">
          <v-card-text>
            <div class="summary-content">
              <div class="summary-icon">
                <v-icon x-large color="white">mdi-office-building</v-icon>
              </div>
              <div class="summary-data">
                <div class="text-h4 white--text">
                  {{ departmentFaculty.length }}
                </div>
                <div class="subtitle-2 white--text">Departments</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Main Reports -->
    <v-row class="mt-6">
      <!-- Enrollment Statistics -->
      <v-col cols="12" md="6">
        <v-card height="100%" class="report-card" elevation="2">
          <v-card-title class="report-title">
            <v-icon left color="primary">mdi-chart-bar</v-icon>
            Enrollment Statistics
            <v-spacer></v-spacer>
            <v-btn
              icon
              @click="downloadReport('enrollment')"
              :loading="downloading.enrollment"
            >
              <v-icon>mdi-download</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-4">
            <v-data-table
              :headers="enrollmentHeaders"
              :items="enrollmentStats"
              :items-per-page="5"
              dense
              class="elevation-1"
              :loading="loading"
              loading-text="Loading enrollment data..."
            >
              <template v-slot:item.count="{ item }">
                <v-chip
                  :color="getStatusColor(item._id.enrollmentStatus)"
                  small
                  label
                >
                  {{ item.count }}
                </v-chip>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Teacher Loads -->
      <v-col cols="12" md="6">
        <v-card height="100%" class="report-card" elevation="2">
          <v-card-title class="report-title">
            <v-icon left color="success">mdi-account-tie</v-icon>
            Teacher Loads
            <v-spacer></v-spacer>
            <v-btn
              icon
              @click="downloadReport('teacherLoads')"
              :loading="downloading.teacherLoads"
            >
              <v-icon>mdi-download</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-4">
            <v-data-table
              :headers="teacherLoadHeaders"
              :items="teacherLoads"
              :items-per-page="5"
              dense
              class="elevation-1"
              :loading="loading"
              loading-text="Loading teacher loads..."
            >
              <template v-slot:item.totalUnits="{ item }">
                <v-chip :color="getUnitLoadColor(item.totalUnits)" small label>
                  {{ item.totalUnits }}
                </v-chip>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Subject Statistics -->
      <v-col cols="12" md="6">
        <v-card height="100%" class="report-card" elevation="2">
          <v-card-title class="report-title">
            <v-icon left color="warning">mdi-book-multiple</v-icon>
            Subject Statistics
            <v-spacer></v-spacer>
            <v-btn
              icon
              @click="downloadReport('subjects')"
              :loading="downloading.subjects"
            >
              <v-icon>mdi-download</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-4">
            <v-data-table
              :headers="subjectStatHeaders"
              :items="subjectStats"
              :items-per-page="5"
              dense
              class="elevation-1"
              :loading="loading"
              loading-text="Loading subject statistics..."
            >
              <template v-slot:item.totalStudents="{ item }">
                <v-chip
                  :color="getStudentCountColor(item.totalStudents)"
                  small
                  label
                >
                  {{ item.totalStudents }}
                </v-chip>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Department Faculty -->
      <v-col cols="12" md="6">
        <v-card height="100%" class="report-card" elevation="2">
          <v-card-title class="report-title">
            <v-icon left color="info">mdi-domain</v-icon>
            Department Faculty
            <v-spacer></v-spacer>
            <v-btn
              icon
              @click="downloadReport('faculty')"
              :loading="downloading.faculty"
            >
              <v-icon>mdi-download</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-4">
            <v-data-table
              :headers="departmentFacultyHeaders"
              :items="departmentFaculty"
              :items-per-page="5"
              dense
              class="elevation-1"
              :loading="loading"
              loading-text="Loading department data..."
            >
              <template v-slot:item.totalFaculty="{ item }">
                <v-chip
                  :color="getFacultyCountColor(item.totalFaculty)"
                  small
                  label
                >
                  {{ item.totalFaculty }}
                </v-chip>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export default {
  name: "ReportsPage",

  data: () => ({
    selectedAcademicYear: "",
    selectedSemester: "",
    semesters: ["First", "Second"],
    downloading: {
      enrollment: false,
      teacherLoads: false,
      subjects: false,
      faculty: false,
    },
    enrollmentHeaders: [
      { text: "Year Level", value: "_id.yearLevel", align: "start" },
      { text: "Status", value: "_id.enrollmentStatus" },
      { text: "Count", value: "count" },
    ],
    teacherLoadHeaders: [
      { text: "Professor", value: "professorName", align: "start" },
      { text: "Total Units", value: "totalUnits" },
      { text: "Subjects", value: "subjectCount" },
      { text: "Students", value: "totalStudents" },
    ],
    subjectStatHeaders: [
      { text: "Subject", value: "subjectName", align: "start" },
      { text: "Sections", value: "totalSections" },
      { text: "Students", value: "totalStudents" },
    ],
    departmentFacultyHeaders: [
      { text: "Department", value: "departmentName", align: "start" },
      { text: "Faculty Count", value: "totalFaculty" },
    ],
  }),

  computed: {
    ...mapState("reports", ["loading", "error"]),
    ...mapGetters("reports", [
      "enrollmentStats",
      "teacherLoads",
      "subjectStats",
      "departmentFaculty",
    ]),

    getTotalStudents() {
      return this.enrollmentStats.reduce((acc, curr) => acc + curr.count, 0);
    },

    getTotalTeachers() {
      return this.teacherLoads.length;
    },

    getTotalSubjects() {
      return this.subjectStats.length;
    },

    academicYears() {
      const startYear = 2023;
      const endYear = 2030;
      const years = [];

      for (let year = startYear; year < endYear; year++) {
        years.push(`${year}-${year + 1}`);
      }

      return years;
    },
  },

  methods: {
    ...mapActions("reports", [
      "fetchEnrollmentStatistics",
      "fetchTeacherLoads",
      "fetchSubjectStatistics",
      "fetchDepartmentFaculty",
    ]),

    clearError() {
      this.$store.commit("reports/CLEAR_ERROR");
    },

    getStatusColor(status) {
      const colors = {
        pending: "warning",
        evaluated: "info",
        enrolled: "success",
      };
      return colors[status] || "grey";
    },

    getUnitLoadColor(units) {
      if (units <= 15) return "success";
      if (units <= 21) return "warning";
      return "error";
    },

    getStudentCountColor(count) {
      if (count <= 30) return "success";
      if (count <= 40) return "warning";
      return "error";
    },

    getFacultyCountColor(count) {
      if (count <= 5) return "error";
      if (count <= 10) return "warning";
      return "success";
    },

    async generateReports() {
      try {
        const params = {
          academicYear: this.selectedAcademicYear,
          semester: this.selectedSemester,
        };

        await Promise.all([
          this.fetchEnrollmentStatistics(params),
          this.fetchTeacherLoads(params),
          this.fetchSubjectStatistics(params),
          this.fetchDepartmentFaculty(),
        ]);
      } catch (error) {
        console.error("Error generating reports:", error);
      }
    },

    async downloadReport(type) {
      this.downloading[type] = true;
      try {
        let data, filename;

        switch (type) {
          case "enrollment":
            data = this.enrollmentStats;
            filename = "enrollment-statistics";
            break;
          case "teacherLoads":
            data = this.teacherLoads;
            filename = "teacher-loads";
            break;
          case "subjects":
            data = this.subjectStats;
            filename = "subject-statistics";
            break;
          case "faculty":
            data = this.departmentFaculty;
            filename = "department-faculty";
            break;
        }

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, "Report");
        const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });

        const blob = new Blob([wbout], { type: "application/octet-stream" });
        saveAs(
          blob,
          `${filename}-${this.selectedAcademicYear}-${this.selectedSemester}.xlsx`
        );
      } catch (error) {
        console.error(`Error downloading ${type} report:`, error);
        this.$store.commit("SET_ERROR", `Failed to download ${type} report`);
      } finally {
        this.downloading[type] = false;
      }
    },
  },

  created() {
    this.selectedAcademicYear = this.academicYears[0];
    this.selectedSemester = this.semesters[0];
    this.generateReports();
  },
};
</script>

<style scoped>
.header-card {
  background: linear-gradient(120deg, #a52a2a 0%, #d2691e 100%);
}

.header-title {
  h2 {
    margin-bottom: 4px;
    font-weight: 500;
  }
}

.filter-select {
  min-width: 160px;
  max-width: 200px;

  ::v-deep .v-input__slot {
    background-color: rgba(255, 255, 255, 0.9) !important;
  }
}

.summary-card {
  border-radius: 8px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
}

.summary-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.summary-icon {
  background: rgba(255, 255, 255, 0.2);
  padding: 16px;
  border-radius: 50%;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
}

.summary-data {
  flex-grow: 1;
}

.report-card {
  border-radius: 8px;
  overflow: hidden;
  height: 100%;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  }
}

.report-title {
  background-color: #f5f5f5;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
}

::v-deep .v-data-table {
  border-radius: 4px;

  .v-data-table__wrapper {
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 4px;

      &:hover {
        background: #666;
      }
    }
  }

  th {
    font-weight: 600 !important;
    background-color: #f5f5f5 !important;
  }

  tbody tr {
    transition: background-color 0.2s;

    &:hover {
      background-color: #f5f5f5 !important;
    }
  }
}

.v-chip {
  font-weight: 500;
}

@media (max-width: 600px) {
  .filter-select {
    min-width: 120px;
  }

  .header-title {
    margin-bottom: 16px;
  }
}
</style>
