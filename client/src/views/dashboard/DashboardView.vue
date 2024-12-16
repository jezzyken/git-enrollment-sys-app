<template>
  <v-container fluid class="dashboard-container pa-4">
    <v-row>
      <v-col cols="12">
        <v-card elevation="2" class="header-card">
          <v-card-title
            class="d-flex justify-space-between align-center px-6 py-4"
          >
            <div>
              <h1 class="text-h4 font-weight-bold primary--text">
                Academic Dashboard
              </h1>
              <span class="text-subtitle-1 grey--text"
                >Overview and Analytics</span
              >
            </div>
            <v-chip color="primary" outlined class="px-4">
              <v-icon left small>mdi-calendar</v-icon>
              AY: {{ currentAcademicYear }}
            </v-chip>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="loading">
      <v-col cols="12" class="text-center pa-12">
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
        ></v-progress-circular>
        <div class="mt-4 text-subtitle-1">Loading dashboard data...</div>
      </v-col>
    </v-row>

    <v-row v-else-if="error">
      <v-col cols="12">
        <v-alert
          prominent
          type="error"
          border="left"
          elevation="2"
          class="mb-6"
        >
          <v-row align="center">
            <v-col class="grow">{{ error }}</v-col>
            <v-col class="shrink">
              <v-btn color="white" text @click="refreshDashboard">
                Retry
              </v-btn>
            </v-col>
          </v-row>
        </v-alert>
      </v-col>
    </v-row>

    <template v-else>
      <!-- Stats Cards -->
      <v-row class="mt-6">
        <v-col
          v-for="(stat, index) in statsCards"
          :key="index"
          cols="12"
          sm="6"
          md="3"
        >
          <v-card elevation="2" :class="`stats-card stats-card-${index + 1}`">
            <v-card-text class="pa-6">
              <div class="d-flex flex-column">
                <span class="stats-title">{{ stat.title }}</span>
                <span class="text-h3 font-weight-bold stats-value">{{
                  stat.value
                }}</span>
              </div>
              <v-icon class="stats-icon" size="48">
                {{ stat.icon }}
              </v-icon>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-6">
        <v-col cols="12" md="8">
          <v-card elevation="2" height="500">
            <v-card-title class="py-4 px-6">
              <v-icon left color="primary">mdi-chart-bar</v-icon>
              Enrollment Distribution by Course
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pa-6" style="height: 400px">
              <bar-chart
                v-if="enrollmentChartData"
                :chart-data="enrollmentChartData"
                :options="enhancedChartOptions"
                :height="350"
              />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card elevation="2" height="500">
            <v-card-title class="py-4 px-6">
              <v-icon left color="primary">mdi-account-multiple-plus</v-icon>
              Recent Enrollments
            </v-card-title>
            <v-divider></v-divider>
            <v-list dense class="pa-0">
              <v-list-item
                v-for="enrollment in recentEnrollments"
                :key="enrollment._id"
                class="px-4"
              >
                <v-list-item-avatar color="primary" class="my-1">
                  <span class="white--text">
                    {{ enrollment.student.name.firstName.charAt(0) }}
                  </span>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-medium">
                    {{ enrollment.student.name.surname }},
                    {{ enrollment.student.name.firstName }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-caption">
                    {{ enrollment.course.courseName }} - Year
                    {{ enrollment.yearLevel }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action class="text-caption">
                  {{ formatDate(enrollment.registrationDate) }}
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BarChart from "@/components/charts/BarChart";

export default {
  name: "Dashboard",

  components: {
    BarChart,
  },

  data: () => ({
    selectedYear: "2024-2025",
    selectedSemester: "First",
    search: "",
    academicYears: ["2023-2024", "2024-2025", "2025-2026"],
    semesters: ["First", "Second"],
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  }),

  computed: {
    ...mapGetters("dashboard", [
      "stats",
      "enrollmentsByCourse",
      "recentEnrollments",
      "loading",
      "error",
      "currentAcademicYear",
    ]),

    statsCards() {
      if (!this.stats) return [];
      return [
        {
          title: "Total Enrollments",
          value: this.stats.totalEnrollments,
          icon: "mdi-account-group",
          color: "primary",
        },
        {
          title: "Active Professors",
          value: this.stats.totalProfessors,
          icon: "mdi-teach",
          color: "success",
        },
        {
          title: "Total Subjects",
          value: this.stats.totalSubjects,
          icon: "mdi-book-open-variant",
          color: "warning",
        },
        {
          title: "Total Courses",
          value: this.stats.totalCourses,
          icon: "mdi-school",
          color: "info",
        },
      ];
    },

    enrollmentChartData() {
      if (!this.enrollmentsByCourse?.length) return null;
      return {
        labels: this.enrollmentsByCourse.map((item) => item._id),
        datasets: [
          {
            label: "Total Students",
            backgroundColor: "#1976D2",
            data: this.enrollmentsByCourse.map((item) => item.totalStudents),
          },
        ],
      };
    },
  },

  methods: {
    ...mapActions("dashboard", [
      "fetchAllDashboardData",
      "updateAcademicYear",
      "updateSemester",
    ]),

    formatDate(date) {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },

    async handleYearChange(year) {
      await this.updateAcademicYear(year);
      this.refreshDashboard();
    },

    async handleSemesterChange(semester) {
      await this.updateSemester(semester);
      this.refreshDashboard();
    },

    async refreshDashboard() {
      try {
        await this.fetchAllDashboardData();
      } catch (error) {
        console.error("Error refreshing dashboard:", error);
      }
    },
  },

  async created() {
    await this.refreshDashboard();
  },
};
</script>

<style scoped>
.stats-card {
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.stats-card:hover {
  transform: translateY(-5px);
}

.stats-title {
  font-size: 1.1rem;
  opacity: 0.9;
  color: rgba(255, 255, 255, 0.9);
}

.stats-value {
  color: white;
  margin-top: 8px;
}

.stats-icon {
  position: absolute;
  right: 16px;
  bottom: 16px;
  color: rgba(255, 255, 255, 0.3);
}

.stats-card-1 {
  background: linear-gradient(135deg, #1976D2 0%, #64B5F6 100%);
}

.stats-card-2 {
  background: linear-gradient(135deg, #2E7D32 0%, #81C784 100%);
}

.stats-card-3 {
  background: linear-gradient(135deg, #F57C00 0%, #FFB74D 100%);
}

.stats-card-4 {
  background: linear-gradient(135deg, #0288D1 0%, #4FC3F7 100%);
}

.stats-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stats-card:hover::after {
  opacity: 1;
}

@media (max-width: 600px) {
  .stats-value {
    font-size: 2rem !important;
  }
  
  .stats-icon {
    font-size: 36px !important;
  }
  
  .stats-title {
    font-size: 1rem;
  }
}
</style>
