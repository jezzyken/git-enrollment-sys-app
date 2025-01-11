<template>
  <v-container fluid class="pa-6">
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card class="rounded-lg" elevation="2">
          <v-skeleton-loader v-if="loading" type="card-heading, list-item-three-line"></v-skeleton-loader>

          <template v-else>
            <v-row no-gutters>
              <v-col cols="12" sm="2" class="pa-4 d-flex justify-center align-center">
                <v-avatar size="120" color="grey lighten-2">
                  <v-img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0hukRkoCl4HSLWAfbr5mvuFRaF2DOhmJQtQ&s"
                    :alt="currentStudent?.name?.firstName"></v-img>
                  <!-- <span v-else class="text-h4 font-weight-medium">
                    {{ getInitials(currentStudent?.name) }}
                  </span> -->
                </v-avatar>
              </v-col>

              <v-col cols="12" sm="6" class="pa-4">
                <div class="d-flex align-center mb-2">
                  <h1 class="text-h4 font-weight-medium">
                    {{ currentStudent?.name?.firstName }}
                    {{ currentStudent?.name?.surname }}
                    <span v-if="currentStudent?.name?.nameExtension" class="text-subtitle-1">
                      {{ currentStudent?.name?.nameExtension }}
                    </span>
                  </h1>
                  <v-chip class="ml-4" :color="getStatusColor(currentStudent?.accountStatus)" small label>
                    {{ currentStudent?.accountStatus }}
                  </v-chip>
                </div>

                <div class="d-flex flex-wrap align-center grey--text text--darken-1">
                  <div class="mr-4 mb-2">
                    <v-icon small class="mr-1">mdi-card-account-details</v-icon>
                    {{ currentStudent?.studentId || "No ID" }}
                  </div>
                  <div class="mr-4 mb-2">
                    <v-icon small class="mr-1">mdi-school</v-icon>
                    {{
                      currentStudent?.course?.courseName || "No course assigned"
                    }}
                  </div>
                  <div class="mr-4 mb-2">
                    <v-icon small class="mr-1">mdi-email</v-icon>
                    {{
                      currentStudent?.contactInfo?.emailAddress || "No email"
                    }}
                  </div>
                  <div class="mb-2">
                    <v-icon small class="mr-1">mdi-phone</v-icon>
                    {{
                      currentStudent?.contactInfo?.contactNumber || "No contact"
                    }}
                  </div>
                </div>
              </v-col>

              <!-- Quick Stats Section -->
              <v-col cols="12" sm="4" class="grey lighten-4 pa-4">
                <div class="text-subtitle-2 mb-3">Student Information</div>
                <v-row dense>
                  <v-col cols="6">
                    <div class="caption grey--text mb-1">Gender</div>
                    <div class="body-2">
                      {{ currentStudent?.personalInfo?.gender || "N/A" }}
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div class="caption grey--text mb-1">Birth Date</div>
                    <div class="body-2">
                      {{ formatDate(currentStudent?.dateOfBirth) }}
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div class="caption grey--text mb-1">Address</div>
                    <div class="body-2">
                      {{ currentStudent?.homeAddress || "No address provided" }}
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </template>
        </v-card>
      </v-col>
    </v-row>

    <v-card class="mb-6 rounded-lg" elevation="2">
      <v-card-text>
        <v-row align="center">
          <v-col cols="12" sm="4">
            <v-select v-model="selectedAcademicYear" :items="academicYears" label="Academic Year" outlined dense
              hide-details prepend-inner-icon="mdi-calendar" @change="fetchEnrollment"></v-select>
          </v-col>
          <v-col cols="12" sm="4">
            <v-select v-model="selectedSemester" :items="['First', 'Second']" label="Semester" outlined dense
              hide-details prepend-inner-icon="mdi-book-open-variant" @change="fetchEnrollment"></v-select>
          </v-col>
          <v-col cols="12" sm="4" class="text-right">
            <v-btn color="primary" @click="fetchEnrollment" :loading="loading" class="px-6">
              <v-icon left>mdi-refresh</v-icon>
              Refresh
            </v-btn>

            <v-btn v-if="currentEnrollment?.enrollmentStatus !== 'enrolled'" color="success" @click="saveEnrollment"
              class="px-6 ml-2">
              <v-icon left>mdi-file</v-icon>
              save
            </v-btn>
            <v-btn v-else color="accent" @click="onPrintItem" class="px-6 ml-2">
              <v-icon left>mdi-printer</v-icon>
              print
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mb-6 rounded-lg" elevation="2">
      <v-card-title class="py-4 px-6">
        <v-icon left color="primary" class="mr-2">mdi-information</v-icon>
        Enrollment Information
        <v-spacer></v-spacer>
        <v-chip :color="getStatusColor(currentEnrollment?.enrollmentStatus)"
          :text-color="getStatusTextColor(currentEnrollment?.enrollmentStatus)" label pill class="px-4">
          <v-icon left small>{{
            getStatusIcon(currentEnrollment?.enrollmentStatus)
            }}</v-icon>
          {{ currentEnrollment?.enrollmentStatus || "No Status" }}
        </v-chip>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="pa-6">
        <v-row>
          <v-col cols="12" md="3">
            <div class="info-block">
              <div class="caption grey--text">Enrollment Type</div>
              <div class="text-h6 font-weight-medium text-capitalize">
                {{ currentEnrollment?.enrollmentType || "N/A" }}
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="3">
            <div class="info-block">
              <div class="caption grey--text">Year Level</div>
              <div class="text-h6 font-weight-medium">
                {{ currentEnrollment?.yearLevel || "N/A" }}
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="3">
            <div class="info-block">
              <div class="caption grey--text">Registration Date</div>
              <div class="text-h6 font-weight-medium">
                {{ formatDate(currentEnrollment?.registrationDate) }}
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="3">
            <div class="info-block">
              <div class="caption grey--text">Total Units</div>
              <div class="text-h6 font-weight-medium">
                {{ currentEnrollment?.totalUnits || 0 }}
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-tabs v-model="activeTab" class="mb-6" backgroundColor="white" grow>
      <v-tab>
        <v-icon left>mdi-book-multiple</v-icon>
        Evaluated Subjects
      </v-tab>
      <v-tab>
        <v-icon left>mdi-calendar-clock</v-icon>
        Class Schedule
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="activeTab">
      <v-tab-item>
        <v-card class="rounded-lg" elevation="2">
          <v-card class="rounded-lg" elevation="2">
            <v-card-title class="py-4 px-6">
              <v-icon left color="primary" class="mr-2">mdi-book-multiple</v-icon>
              Evaluated Subjects
              <v-spacer></v-spacer>
              <v-text-field v-model="search" append-icon="mdi-magnify" label="Search subjects" single-line hide-details
                outlined dense class="custom-search-field" style="max-width: 300px"></v-text-field>
            </v-card-title>

            <v-data-table :headers="subjectHeaders" :items="currentEnrollment?.subjects || []" :loading="loading"
              :search="search" class="elevation-0" :footer-props="{
                'items-per-page-options': [10, 20, 50],
                'items-per-page-text': 'Subjects per page',
              }">
              <template v-slot:item.subject="{ item }">
                <div class="d-flex flex-column">
                  <span class="font-weight-medium">{{
                    item.subject?.DescriptiveTitle
                    }}</span>
                  <span class="caption grey--text">{{ item.subject?.catNo }}</span>
                </div>
              </template>

              <template v-slot:item.units="{ item }">
                <v-chip small outlined color="primary">
                  {{ item.subject?.units }} units
                </v-chip>
              </template>

              <template v-if="currentEnrollment?.enrollmentStatus !== 'enrolled'" v-slot:item.actions="{ item }">
                <v-btn small color="primary" outlined @click="assignSubject(item)" class="mr-2">
                  <v-icon left small>mdi-account-plus</v-icon>
                  Assign
                </v-btn>
              </template>
            </v-data-table>
          </v-card>

        </v-card>


        <v-card class="mt-6 rounded-lg" v-if="assignedTeacherLoads.length > 0" elevation="2">
          <v-card-title class="py-4 px-6">
            <v-icon left color="primary" class="mr-2">mdi-account-group</v-icon>
            Assigned Class Schedule
            <v-chip class="ml-4" small color="primary" outlined>
              {{ assignedTeacherLoads.length }} assignments
            </v-chip>
          </v-card-title>


          <v-data-table :headers="assignedTeacherHeaders" :items="assignedTeacherLoads" class="elevation-0">
            <template v-slot:item.schedule="{ item }">
              <div v-for="(sched, index) in item.schedule" :key="index" class="schedule-item">
                <v-chip x-small label class="mr-2" color="secondary" text-color="white">
                  {{ sched.day }}
                </v-chip>
                {{ sched.timeStart }} - {{ sched.timeEnd }}
                <div class="caption grey--text">Room {{ sched.room }}</div>
              </div>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-btn small color="error" text @click="removeAssignment(item.subjectId)">
                <v-icon left small>mdi-delete</v-icon>
                Remove
              </v-btn>
            </template>
          </v-data-table>
        </v-card>

        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card class="rounded-lg" elevation="2">
          <student-schedule :student-id="$route.params.id" :academic-year="selectedAcademicYear"
            :semester="selectedSemester" />
        </v-card>
      </v-tab-item>
    </v-tabs-items>


    <!-- <student-schedule
      :student-id="$route.params.id"
      :academic-year="selectedAcademicYear"
      :semester="selectedSemester"
    /> -->

    <v-dialog v-model="assignDialog" max-width="900px" scrollable>
      <v-card>
        <v-card-title class="primary white--text py-4 px-6">
          <v-icon left color="white">mdi-account-tie</v-icon>
          Assign Subject Teacher
          <v-spacer></v-spacer>
          <v-chip color="white" label text-color="primary">
            {{ selectedSubject?.catNo }}
          </v-chip>
        </v-card-title>

        <v-card-text class="pa-6">
          <v-text-field v-model="teacherSearch" append-icon="mdi-magnify" label="Search teachers" outlined dense
            class="mb-4"></v-text-field>

          <v-data-table :headers="teacherLoadHeaders" :items="teacherLoads" :loading="loadingTeachers"
            :search="teacherSearch" class="elevation-1">
            <template v-slot:item.professor="{ item }">
              <div class="d-flex align-center">
                <v-avatar size="32" color="primary" class="mr-2">
                  <span class="white--text">
                    {{ getInitials(item.professor?.name) }}
                  </span>
                </v-avatar>
                <div>
                  {{ item.professor?.name?.firstName }}
                  {{ item.professor?.name?.surname }}
                </div>
              </div>
            </template>

            <template v-slot:item.schedule="{ item }">
              <div v-for="(sched, index) in item.schedule" :key="index" class="schedule-item">
                <v-chip x-small label class="mr-2" color="secondary" text-color="white">
                  {{ sched.day }}
                </v-chip>
                {{ sched.timeStart }} - {{ sched.timeEnd }}
                <div class="caption grey--text">Room {{ sched.room }}</div>
              </div>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-btn small color="primary" @click="selectTeacherLoad(item)" :disabled="item.isFull">
                Select
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn text @click="closeAssignDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <registration-form-print
      ref="registrationFormPrint"
      :student="currentStudent"
      :enrollment="currentEnrollment"
      :schedules="getStudentSchedule.schedule"
      :merged-schedules="mergedSchedules"
     v-if="currentEnrollment && showRegistrationForm"
    />

    <v-snackbar v-model="showError" color="error" timeout="5000" bottom right>
      {{ error }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="showError = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import moment from "moment";
import StudentSchedule from "../../components/StudentSchedule.vue"
import RegistrationFormPrint from "../../components/RegistrationFormPrint.vue"

export default {
  name: "EnrollmentView",
  components: {
    StudentSchedule,
    RegistrationFormPrint
  },
  data: () => ({
    activeTab: 0,
    selectedAcademicYear: "",
    selectedSemester: "First",
    showError: false,
    assignDialog: false,
    selectedSubject: null,
    teacherLoads: [],
    loadingTeachers: false,
    teacherLoadHeaders: [
      { text: "Professor", value: "professor", width: "30%" },
      { text: "Schedule", value: "schedule", width: "40%" },
      { text: "Section", value: "section", width: "15%" },
      { text: "Actions", value: "actions", width: "15%" },
    ],
    assignedTeacherHeaders: [
      { text: "Subject", value: "subjectCode", width: "20%" },
      { text: "Professor", value: "professor", width: "25%" },
      { text: "Section", value: "section", width: "15%" },
      { text: "Schedule", value: "schedule", width: "30%" },
      { text: "Actions", value: "actions", width: "10%" },
    ],
    assignedTeacherLoads: [],
    teacherSearch: "",
    search: "",
    showRegistrationForm: false,
  }),

  computed: {
    ...mapState({
      currentEnrollment: (state) => state.enrollments.currentEnrollment,
      loading: (state) => state.enrollments.loading,
      error: (state) => state.enrollments.error,
      currentStudent: (state) => state.students.currentStudent,
    }),

    ...mapGetters({
      getStudentSchedule: "teacherLoad/getStudentSchedule"
    }),

    academicYears() {
      const startYear = 2023;
      const endYear = 2030;
      const years = [];

      for (let year = startYear; year < endYear; year++) {
        years.push(`${year}-${year + 1}`);
      }

      return years;
    },

    subjectHeaders() {
      const baseHeaders = [
        { text: "Subject", value: "catNo", width: "35%" },
        { text: "Descriptive Title", value: "DescriptiveTitle", width: "35%" },
        { text: "Units", value: "units", width: "30%" },
      ];

      if (this.currentEnrollment?.enrollmentStatus !== 'enrolled') {
        baseHeaders.push({ text: "Actions", value: "actions", width: "15%" });
        baseHeaders[2].width = "15%";
      }

      return baseHeaders;
    },
    mergedSchedules() {
    if (!this.currentEnrollment || !this.getStudentSchedule.schedule) {
      return [];
    }
    return this.mergeSchedulesBySubjectCode(
      this.currentEnrollment,
      this.getStudentSchedule.schedule
    );
  },
  },

  methods: {
    ...mapActions({
      fetchStudentEnrollments: "enrollments/fetchStudentEnrollments",
      fetchTeacherLoads: "teacherLoad/fetchTeacherLoads",
      fetchStudent: "students/fetchStudent",
      updateEnrollmentStatus: "enrollments/updateEnrollmentStatus",
      updateTeacherLoadStudents: "teacherLoad/updateTeacherLoadStudents",
      fetchStudentSchedule: "teacherLoad/fetchStudentSchedule",
    }),

    getStatusIcon(status) {
      const icons = {
        pending: "mdi-clock-outline",
        evaluated: "mdi-clipboard-check-outline",
        enrolled: "mdi-check-circle-outline",
        rejected: "mdi-close-circle-outline",
        cancelled: "mdi-cancel",
        incomplete: "mdi-alert-circle-outline",
        withdrawn: "mdi-logout-variant",
        processing: "mdi-progress-clock",
        waitlisted: "mdi-account-clock",
        onhold: "mdi-pause-circle-outline",
      };

      return icons[status?.toLowerCase()] || "mdi-help-circle-outline";
    },

    getStatusTextColor(status) {
      const colors = {
        pending: "white",
        evaluated: "white",
        enrolled: "white",
      };
      return colors[status] || "white";
    },

    getInitials(name) {
      if (!name) return "NA";
      return `${name.firstName?.[0] || ""}${name.surname?.[0] || ""
        }`.toUpperCase();
    },

    formatDate(date) {
      return date ? moment(date).format("MMMM D, YYYY") : "Not provided";
    },

    getStatusColor(status) {
      const colors = {
        pending: "warning",
        evaluated: "info",
        enrolled: "success",
        active: "success",
      };
      return colors[status] || "grey";
    },

    getCourseDisplay(course) {
      console.log(course);
      return course?.courseName || "No course assigned";
    },

    async fetchEnrollment() {
      if (!this.selectedAcademicYear || !this.selectedSemester) return;

      try {
        await this.fetchStudentEnrollments({
          studentId: this.$route.params.id,
          query: {
            academicYear: this.selectedAcademicYear,
            semester: this.selectedSemester,
          },
        });
      } catch (error) {
        this.showError = true;
      }
    },

    async assignSubject(subject) {
      this.selectedSubject = subject;
      this.assignDialog = true;

      console.log(subject);

      const params = {
        academicYear: this.selectedAcademicYear,
        semester: this.selectedSemester,
        yearLevel: this.currentEnrollment?.yearLevel,
        subjectId: subject?._id,
      };

      try {
        this.loadingTeachers = true;
        const response = await this.fetchTeacherLoads(params);
        console.log(response);
        this.teacherLoads = response;
      } catch (error) {
        console.error("Error fetching teacher loads:", error);
        this.showError = true;
      } finally {
        this.loadingTeachers = false;
      }
    },

    selectTeacherLoad(teacherLoad) {
      const assignment = {
        teacherLoadId: teacherLoad._id,
        professor: `${teacherLoad.professor?.name?.firstName} ${teacherLoad.professor?.name?.surname}`,
        section: teacherLoad.section,
        subjectId: this.selectedSubject?._id,
        subjectCode: this.selectedSubject?.catNo,
        schedule: teacherLoad.schedule,
        professorsId: teacherLoad.professor._id,
      };

      const existingIndex = this.assignedTeacherLoads.findIndex(
        (a) => a.subjectId === assignment.subjectId
      );

      if (existingIndex >= 0) {
        this.assignedTeacherLoads[existingIndex] = assignment;
      } else {
        this.assignedTeacherLoads.push(assignment);
      }

      this.closeAssignDialog();
    },

    async saveEnrollment() {
      try {
        await this.updateEnrollmentStatus(this.currentEnrollment._id);

        await this.updateTeacherLoadStudents({
          data: this.assignedTeacherLoads.map((assignment) => {
            return {
              teacherLoadId: assignment.teacherLoadId,
              subjectId: assignment.subjectId,
              studentId: this.currentStudent._id,
            };
          }),
        });
      } catch (error) {
        console.log(error);
      }
    },
    removeAssignment(subjectId) {
      this.assignedTeacherLoads = this.assignedTeacherLoads.filter(
        (assignment) => assignment.subjectId !== subjectId
      );
    },

    async onPrintItem() {
      this.showRegistrationForm = true;
      await this.$nextTick();
      const mergedSchedules = this.mergeSchedulesBySubjectCode(
        this.currentEnrollment, 
        this.getStudentSchedule.schedule
      );
      
      const printDialog = this.$refs.registrationFormPrint;
      if (printDialog) {
        await printDialog.generatePDF();
      }
      this.showRegistrationForm = false;
    },

    mergeSchedulesBySubjectCode(enrollment, classSchedules) {
      const evaluatedSubjects = enrollment.subjects.map(subject => ({
        catNo: subject.catNo,
        DescriptiveTitle: subject.DescriptiveTitle,
        units: subject.units,
        schedule: null,
        grades: null,
        section: null,
        professor: null,
      }));

      const mergedSchedules = evaluatedSubjects.map(subject => {
        const matchingSchedule = classSchedules.find(
          schedule => schedule.subjectCode === subject.catNo
        );

        return {
          ...subject,
          schedule: matchingSchedule?.schedule || null,
          grades: matchingSchedule?.grades || null,
          section: matchingSchedule?.section || null,
          professor: matchingSchedule?.professor || null,
        };
      });

      return mergedSchedules;
    },

    closeAssignDialog() {
      this.assignDialog = false;
      this.selectedSubject = null;
      this.teacherLoads = [];
    },

    async initialized() {
      this.selectedAcademicYear = this.academicYears[1];
      await this.fetchStudent(this.$route.params.id);
      await this.fetchStudentSchedule({
        studentId: this.$route.params.id,
        academicYear: this.selectedAcademicYear,
        semester: this.selectedSemester,
      });
      this.fetchEnrollment();
    },
  },

  async created() {
    this.initialized()
  },

  watch: {
    error(val) {
      if (val) this.showError = true;
    },
  },
};
</script>

<style scoped>
.info-block {
  padding: 16px;
  border-radius: 8px;
  background: #f5f5f5;
  height: 100%;
}

.schedule-item {
  margin-bottom: 4px;
}

.schedule-item:last-child {
  margin-bottom: 0;
}

.custom-search-field ::v-deep .v-input__slot {
  min-height: 40px !important;
}

.v-avatar {
  border: 3px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.v-chip {
  text-transform: capitalize;
}
</style>
