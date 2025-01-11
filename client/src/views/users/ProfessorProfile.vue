<template>
  <v-container fluid>
    <v-card class="mb-4">
      <div class="profile-header"></div>
      <v-row no-gutters>
        <v-col cols="12" md="3" class="text-center profile-picture-section">
          <div class="profile-picture-container">
            <v-avatar size="150" class="profile-avatar">
              <v-img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0hukRkoCl4HSLWAfbr5mvuFRaF2DOhmJQtQ&s"
                :alt="professorFullName"
              ></v-img>
              <!-- <v-icon v-else size="80" color="grey lighten-1"
                >mdi-account</v-icon
              > -->
            </v-avatar>
            <!-- <v-btn
              small
              color="primary"
              dark
              class="change-photo-btn"
              @click="triggerFileInput"
            >
              <v-icon small left>mdi-camera</v-icon>
              Change Photo
            </v-btn> -->
            <input
              type="file"
              ref="fileInput"
              accept="image/*"
              style="display: none"
              @change="handleFileUpload"
            />
          </div>
        </v-col>

        <v-col cols="12" md="9">
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <div class="text-h5 font-weight-bold mb-2">
                  {{ professorFullName }}
                </div>
                <div class="text-subtitle-1 grey--text mb-4">
                  {{ professor?.academicInfo?.position || "Faculty Member" }}
                </div>
              </v-col>

              <v-col cols="12" md="6">
                <v-list dense>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-card-account-details</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-subtitle>Employee ID</v-list-item-subtitle>
                      <v-list-item-title>{{
                        professor?.employeeId
                      }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-domain</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-subtitle>Department</v-list-item-subtitle>
                      <v-list-item-title>{{
                        professor?.academicInfo?.department?.name
                      }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-calendar-clock</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-subtitle>Date Hired</v-list-item-subtitle>
                      <v-list-item-title>{{
                        formatDate(professor?.academicInfo?.dateHired)
                      }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>

              <!-- Employment Information -->
              <v-col cols="12" md="6">
                <v-list dense>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-briefcase</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-subtitle
                        >Employment Status</v-list-item-subtitle
                      >
                      <v-list-item-title class="text-capitalize">{{
                        professor?.academicInfo?.employmentStatus
                      }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-account-check</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-subtitle
                        >Account Status</v-list-item-subtitle
                      >
                      <v-list-item-title>
                        <v-chip
                          :color="getStatusColor(professor?.accountStatus)"
                          small
                          label
                          text-color="white"
                        >
                          {{ professor?.accountStatus }}
                        </v-chip>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-book-education</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-subtitle>Current Load</v-list-item-subtitle>
                      <v-list-item-title>
                        {{ currentSemesterUnits }} Units
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>

    <!-- Teaching Load Section -->
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>Teaching Schedule</span>
        <div class="d-flex align-center">
          <v-select
            v-model="selectedSemester"
            :items="['First', 'Second']"
            label="Semester"
            dense
            outlined
            hide-details
            class="mr-2"
            style="min-width: 120px"
          ></v-select>
          <v-select
            v-model="selectedYear"
            :items="academicYears"
            label="Academic Year"
            dense
            outlined
            hide-details
            class="mr-2"
            style="min-width: 150px"
          ></v-select>
          <v-btn color="primary" @click="openAddLoadDialog()" class="ml-2">
            <v-icon left>mdi-plus</v-icon>
            Add Subject
          </v-btn>
        </div>
      </v-card-title>

      <v-data-table
        :headers="teachingLoadHeaders"
        :items="currentTeachingLoad.flatMap((load) => load.subjects)"
        :loading="loading"
        class="mt-4"
      >
        <template v-slot:item.schedule="{ item }">
          <div v-for="(sched, index) in item.schedule" :key="index">
            <div class="d-flex align-center">
              <v-icon small class="mr-1">mdi-clock-outline</v-icon>
              <span
                >{{ sched.day }}: {{ formatTime(sched.timeStart) }} -
                {{ formatTime(sched.timeEnd) }}</span
              >
            </div>
            <div class="caption grey--text ml-4">Room: {{ sched.room }}</div>
          </div>
        </template>

        <template v-slot:item.subject.name="{ item }">
          <div class="font-weight-medium">
            {{ item.subject?.DescriptiveTitle || "No Title" }}
          </div>
          <div class="caption grey--text">
            {{ item.subject?.catNo || "No Code" }}
          </div>
        </template>

        <template v-slot:item.students="{ item }">
          <v-chip small @click="viewStudents(item)">
            {{ (item.students || []).length }} students
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn
            icon
            small
            color="primary"
            class="mr-2"
            @click="openAddLoadDialog(item)"
          >
            <v-icon small>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon small color="error" @click="confirmDeleteSubject(item)">
            <v-icon small>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="addLoadDialog" max-width="800px">
      <v-card>
        <v-card-title class="headline">
          {{ isEditing ? "Edit Subject Load" : "Add Subject Load" }}
        </v-card-title>
        <v-form ref="loadForm" v-model="loadFormValid">
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="newLoad.subject"
                  :items="availableSubjects"
                  item-text="DescriptiveTitle"
                  item-value="_id"
                  label="Subject"
                  :rules="rules.required"
                  :disabled="isEditing"
                  outlined
                >
                  <template v-slot:selection="{ item }">
                    {{ item?.DescriptiveTitle || "Select Subject" }}
                    <span
                      class="grey--text text-caption ml-2"
                      v-if="item?.catNo"
                    >
                      ({{ item.catNo }})
                    </span>
                  </template>
                  <template v-slot:item="{ item }">
                    <v-list-item-content>
                      <v-list-item-title>{{
                        item?.DescriptiveTitle || "No Title"
                      }}</v-list-item-title>
                      <v-list-item-subtitle>{{
                        item?.catNo || "No Code"
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-select>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="newLoad.section"
                  label="Section"
                  :rules="rules.required"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>

            <div class="mb-4">
              <div class="d-flex justify-space-between align-center mb-5">
                <div class="subtitle-1">Schedule</div>
                <v-btn small color="primary" @click="addScheduleSlot">
                  <v-icon left small>mdi-plus</v-icon>
                  Add Time Slot
                </v-btn>
              </div>

              <v-row
                v-for="(slot, index) in newLoad.schedule"
                :key="index"
                class="mb-2"
              >
                <v-col cols="12" sm="3">
                  <v-select
                    v-model="slot.day"
                    :items="days"
                    label="Day"
                    :rules="rules.required"
                    dense
                    outlined
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="slot.timeStart"
                    label="Start Time"
                    type="time"
                    :rules="rules.required"
                    dense
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="slot.timeEnd"
                    label="End Time"
                    type="time"
                    :rules="rules.required"
                    dense
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="2">
                  <v-text-field
                    v-model="slot.room"
                    label="Room"
                    :rules="rules.required"
                    dense
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="1" class="d-flex align-center">
                  <v-btn
                    icon
                    small
                    color="error"
                    @click="removeScheduleSlot(index)"
                    :disabled="index === 0 && newLoad.schedule.length === 1"
                  >
                    <v-icon small>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="closeAddLoadDialog">Cancel</v-btn>
            <v-btn
              color="primary"
              :loading="loading"
              :disabled="!loadFormValid"
              @click="submitLoad"
            >
              {{ isEditing ? "Save Changes" : "Add Subject" }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <!-- Students List Dialog -->
    <v-dialog v-model="studentsDialog" max-width="900px">
      <v-card>
        <v-card-title>
          <span>Students List</span>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="studentSearch"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table
          :headers="studentHeaders"
          :items="selectedSubjectStudents"
          :search="studentSearch"
          :loading="loading"
          class="mt-4"
        >
          <template v-slot:item.course="{ item }">
            {{ item.student?.course?.name }}
          </template>

          <template v-slot:item.grades.final="{ item }">
            <template v-if="editingStudent === item._id">
              <v-text-field
                v-model="item.grades.final"
                type="number"
                dense
                outlined
                hide-details
                min="0"
                max="100"
                @input="updateRemarks(item)"
              ></v-text-field>
            </template>
            <span v-else>{{ item.grades.final || "N/A" }}</span>
          </template>

          <template v-slot:item.grades.remarks="{ item }">
            <v-chip
              small
              :color="item.grades.remarks === 'Passed' ? 'success' : 'error'"
              text-color="white"
            >
              {{ item.grades.remarks || "N/A" }}
            </v-chip>
          </template>

          <template v-slot:item.actions="{ item }">
            <template v-if="editingStudent === item._id">
              <v-btn icon small color="success" @click="editingStudent = null">
                <v-icon>mdi-check</v-icon>
              </v-btn>
              <!-- <v-btn icon small color="error" @click="editingStudent = null">
                <v-icon>mdi-close</v-icon>
              </v-btn> -->
            </template>
            <v-btn
              v-else
              icon
              small
              color="primary"
              @click="editingStudent = item._id"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
        </v-data-table>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="hasGradeChanges && !editingStudent"
            color="primary"
            :loading="updating"
            @click="updateAllGrades"
            dark
          >
            Update All Grades
          </v-btn>
          <v-btn text @click="closeStudentsDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="headline error--text">
          Confirm Delete
        </v-card-title>
        <v-card-text>
          Are you sure you want to remove this subject from the teaching load?
          <div class="mt-2">
            <strong>{{ subjectToDelete?.subject?.name }}</strong>
            <div class="caption grey--text">
              Section: {{ subjectToDelete?.section }}
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" :loading="loading" @click="deleteSubject">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="imageDialog" max-width="500px">
      <v-card>
        <v-card-title>Upload Profile Picture</v-card-title>
        <v-card-text>
          <v-img
            v-if="previewImage"
            :src="previewImage"
            max-height="300"
            contain
            class="mb-4"
          ></v-img>
          <div v-else class="text-center pa-4">
            <v-icon size="64" color="grey lighten-1">mdi-image</v-icon>
            <div class="text-subtitle-1 grey--text mt-2">No image selected</div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="cancelImageUpload">Cancel</v-btn>
          <v-btn
            color="primary"
            :loading="uploading"
            :disabled="!previewImage"
            @click="uploadImage"
          >
            Upload
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="3000" top>
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";

export default {
  name: "ProfessorProfileView",

  data: () => ({
    selectedYear: "",
    selectedSemester: "First",
    addLoadDialog: false,
    studentsDialog: false,
    deleteDialog: false,
    imageDialog: false,
    studentSearch: "",
    loadFormValid: false,
    uploading: false,
    previewImage: null,
    selectedFile: null,
    subjectToDelete: null,
    selectedSubjectStudents: [],
    isEditing: false,
    editingId: null,
    newLoad: {
      subject: null,
      section: "",
      schedule: [
        {
          day: "",
          timeStart: "",
          timeEnd: "",
          room: "",
        },
      ],
    },
    item: [],
    teachingLoadHeaders: [
      { text: "Subject", value: "subject.name", width: "25%" },
      { text: "Schedule", value: "schedule", width: "35%" },
      { text: "Section", value: "section", width: "15%" },
      { text: "Students", value: "students", width: "15%" },
      { text: "Actions", value: "actions", sortable: false, width: "10%" },
    ],
    studentHeaders: [
      { text: "Student ID", value: "student.studentId" },
      { text: "Name", value: "student.fullName" },
      { text: "Course", value: "student.course.courseCode" },
      { text: "Final Grade", value: "grades.final" },
      { text: "Remarks", value: "grades.remarks" },

      { text: "Actions", value: "actions" },
    ],
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    rules: {
      required: [(v) => !!v || "This field is required"],
      subject: [
        (v) => (!!v && !!v.DescriptiveTitle) || "Please select a valid subject",
      ],
    },
    snackbar: false,
    snackbarColor: "",
    snackbarText: "",
    editingStudent: null,
    updating: false,
    selectedTeacherLoadId: null,
  }),

  computed: {
    ...mapState({
      professor: (state) => state.professors.currentProfessor,
      teachingLoad: (state) => state.teacherLoad.teacherLoads,
      subjects: (state) => state.subjects.subjects,
      loading: (state) => state.professors.loading || state.teacherLoad.loading,
    }),

    professorFullName() {
      if (!this.professor?.name) return "";
      const { surname, firstName, middleName, nameExtension } =
        this.professor.name;
      return `${surname}, ${firstName} ${middleName || ""} ${
        nameExtension ? nameExtension : ""
      }`.trim();
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

    currentTeachingLoad() {
      if (!this.teachingLoad || !Array.isArray(this.teachingLoad)) return [];

      console.log({ load: this.teachingLoad });

      return this.teachingLoad
        .filter(
          (load) =>
            load.academicYear === this.selectedYear &&
            load.semester === this.selectedSemester &&
            load.status === "active"
        )
        .map((load) => ({
          ...load,
          subjects: (load.subjects || []).map((subj) => ({
            ...subj,
            subject: {
              ...subj.subject,
              DescriptiveTitle:
                subj.subject?.DescriptiveTitle || "Untitled Subject",
              catNo: subj.subject?.catNo || "No Code",
            },
            students: subj.students || [],
          })),
        }));
    },
    currentSemesterUnits() {
      return this.currentTeachingLoad.reduce(
        (total, load) => total + (load.totalUnits || 0),
        0
      );
    },

    availableSubjects() {
      if (!this.subjects || !Array.isArray(this.subjects)) return [];

      const currentSubjectIds = this.currentTeachingLoad
        ?.map((load) => load.subject?._id)
        .filter((id) => id != null);

      return this.subjects
        .filter((subject) => subject && subject.DescriptiveTitle)
        .filter((subject) => !currentSubjectIds.includes(subject._id))
        .map((subject) => ({
          ...subject,
          DescriptiveTitle: subject.DescriptiveTitle || "Untitled Subject",
          catNo: subject.catNo || "No Code",
        }));
    },

    hasGradeChanges() {
      return this.selectedSubjectStudents.some((s) => s.grades.final);
    },
  },

  methods: {
    ...mapActions({
      fetchProfessor: "professors/fetchProfessor",
      fetchProfessorTeacherLoads: "teacherLoad/fetchProfessorTeacherLoads",
      createTeacherLoad: "teacherLoad/createTeacherLoad",
      updateTeacherLoad: "teacherLoad/updateTeacherLoad",
      updateStudentGrade: "teacherLoad/updateStudentGrade",
      deleteTeacherLoad: "teacherLoad/deleteTeacherLoad",
      fetchSubjects: "subjects/fetchSubjects",
      fetchCourses: "courses/fetchCourses",
    }),

    getCourseInfo(courseId) {
      return this.$store.state.courses.courses.find((c) => c._id === courseId);
    },

    formatDate(date) {
      return date ? moment(date).format("MMMM D, YYYY") : "N/A";
    },

    formatTime(time) {
      return moment(time, "HH:mm").format("hh:mm A");
    },

    getStatusColor(status) {
      const colors = {
        active: "success",
        inactive: "grey",
        "on-leave": "warning",
        terminated: "error",
      };
      return colors[status] || "grey";
    },

    updateRemarks(item) {
      const grade = parseFloat(item.grades.final);
      if (!isNaN(grade)) {
        item.grades.remarks = grade <= 3 ? "Passed" : "Failed";
      } else {
        item.grades.remarks = "N/A";
      }
    },

    getRemarkColor(grade) {
      return parseFloat(grade) >= 75 ? "success" : "error";
    },

    getRemarkText(grade) {
      return parseFloat(grade) >= 75 ? "Passed" : "Failed";
    },

    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      if (!file.type.includes("image/")) {
        this.showSnackbarMessage("Please select an image file", "error");
        return;
      }

      this.selectedFile = file;
      this.previewImage = URL.createObjectURL(file);
      this.imageDialog = true;
    },

    async uploadImage() {
      if (!this.selectedFile) return;

      this.uploading = true;
      try {
        const formData = new FormData();
        formData.append("profilePicture", this.selectedFile);

        await this.updateProfessorImage({
          id: this.professor._id,
          formData,
        });

        this.showSnackbarMessage(
          "Profile picture updated successfully",
          "success"
        );
        this.imageDialog = false;
      } catch (error) {
        this.showSnackbarMessage(
          error.response?.data?.message || "Failed to update profile picture",
          "error"
        );
      } finally {
        this.uploading = false;
      }
    },

    cancelImageUpload() {
      this.imageDialog = false;
      this.previewImage = null;
      this.selectedFile = null;
      this.$refs.fileInput.value = "";
    },

    openAddLoadDialog(item = null) {
      this.isEditing = Boolean(item);
      if (item) {
        this.editingId = item._id;
        this.newLoad = {
          subject: item.subject?._id,
          section: item.section || "",
          schedule: Array.isArray(item.schedule)
            ? JSON.parse(JSON.stringify(item.schedule))
            : [
                {
                  day: "",
                  timeStart: "",
                  timeEnd: "",
                  room: "",
                },
              ],
        };
      } else {
        this.editingId = null;
        this.resetLoadForm();
      }
      this.addLoadDialog = true;
    },

    async updateAllGrades() {
      if (!this.selectedTeacherLoadId) {
        this.showSnackbarMessage("Teacher load ID not found", "error");
        return;
      }

      this.updating = true;
      try {
        await this.updateStudentGrade({
          teacherLoadId: this.selectedTeacherLoadId,
          subjectId: this.selectedSubjectId,
          students: this.selectedSubjectStudents.map((student) => ({
            student: student._id,
            grades: student.grades,
          })),
        });

        this.showSnackbarMessage("Grades updated successfully", "success");
        this.studentsDialog = false;
      } catch (error) {
        this.showSnackbarMessage("Failed to update grades", "error");
      }
      this.updating = false;
    },

    closeAddLoadDialog() {
      this.addLoadDialog = false;
      this.isEditing = false;
      this.editingId = null;
      this.resetLoadForm();
    },

    resetLoadForm() {
      this.newLoad = {
        subject: null,
        section: "",
        schedule: [
          {
            day: "",
            timeStart: "",
            timeEnd: "",
            room: "",
          },
        ],
      };
      if (this.$refs.loadForm) {
        this.$refs.loadForm.resetValidation();
      }
    },

    addScheduleSlot() {
      this.newLoad.schedule.push({
        day: "",
        timeStart: "",
        timeEnd: "",
        room: "",
      });
    },

    removeScheduleSlot(index) {
      this.newLoad.schedule.splice(index, 1);
    },

    async submitLoad() {
      if (!this.$refs.loadForm.validate()) return;

      try {
        const payload = {
          professor: this.professor?._id,
          academicYear: this.selectedYear,
          semester: this.selectedSemester,
          subjects: [
            {
              subject: this.newLoad.subject,
              section: this.newLoad.section,
              schedule: this.newLoad.schedule.map((schedule) => ({
                day: schedule.day,
                timeStart: schedule.timeStart,
                timeEnd: schedule.timeEnd,
                room: schedule.room,
              })),
              students: [],
            },
          ],
        };

        const conflictResult = await this.$store.dispatch(
          "teacherLoad/checkScheduleConflicts",
          {
            schedule: this.newLoad.schedule,
            skipSubjectId: this.isEditing ? this.editingId : null,
            professorId: payload.professor,
          }
        );

        if (conflictResult.hasConflict) {
          const { day, existingTime, room, professor, isSameProfessor } =
            conflictResult.conflictDetails;
          let conflictMessage = isSameProfessor
            ? `You already have a class scheduled on ${day} at ${existingTime}`
            : `Room ${room} is already occupied on ${day} at ${existingTime} by ${professor.name?.firstName} ${professor.name?.surname}`;

          this.showSnackbarMessage(conflictMessage, "error");
          return;
        }

        if (!payload.professor || !payload.subjects[0].subject) {
          throw new Error("Missing required fields");
        }

        if (this.isEditing) {
          console.log(this.isEditing);
          const teacherLoad = this.currentTeachingLoad.find((load) =>
            load.subjects.some((s) => s._id === this.editingId)
          );

          if (!teacherLoad) {
            throw new Error("Teacher load not found");
          }

          const updatedSubjects = teacherLoad.subjects.map((subject) =>
            subject._id === this.editingId
              ? { ...subject, ...payload.subjects[0] }
              : subject
          );

          await this.updateTeacherLoad({
            id: teacherLoad._id,
            data: {
              ...teacherLoad,
              subjects: updatedSubjects,
            },
          });

          this.showSnackbarMessage("Schedule updated successfully", "success");
        } else {
          await this.createTeacherLoad(payload);
          this.showSnackbarMessage(
            "Subject added to teaching load successfully",
            "success"
          );
        }

        this.closeAddLoadDialog();
        await this.fetchProfessorTeacherLoads(this.professor._id);
      } catch (error) {
        console.error("Error submitting load:", error);
        this.showSnackbarMessage(
          error.response?.data?.message ||
            `Failed to ${this.isEditing ? "update" : "add"} subject`,
          "error"
        );
      }
    },

    viewStudents(item) {
      const teacherLoad = this.currentTeachingLoad.find((load) =>
        load.subjects.some((subject) => subject._id === item._id)
      );

      this.selectedTeacherLoadId = teacherLoad?._id;
      this.selectedSubjectStudents = item?.students || [];
      this.selectedSubjectId = item._id;
      this.studentsDialog = true;
    },

    confirmDeleteSubject(item) {
      this.subjectToDelete = item;
      this.deleteDialog = true;
    },

    async deleteSubject(subject) {
      try {
        const teacherLoad = this.currentTeachingLoad.find((load) =>
          load.subjects.some((s) => s._id === subject._id)
        );

        if (!teacherLoad) {
          throw new Error("Teacher load not found");
        }

        const updatedSubjects = teacherLoad.subjects.filter(
          (s) => s._id !== subject._id
        );

        await this.updateTeacherLoad({
          id: teacherLoad._id,
          data: {
            ...teacherLoad,
            subjects: updatedSubjects,
          },
        });

        this.showSnackbarMessage("Subject removed successfully", "success");
        this.deleteDialog = false;
        await this.fetchProfessorTeacherLoads(this.professor._id);
      } catch (error) {
        console.error("Error deleting subject:", error);
        this.showSnackbarMessage(
          error.response?.data?.message || "Failed to remove subject",
          "error"
        );
      }
    },

    showSnackbarMessage(text, color) {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.snackbar = true;
    },

    async loadInitialData() {
      const professorId = this.$route.params.id;
      if (!professorId) {
        this.showSnackbarMessage("Invalid professor ID", "error");
        return;
      }

      try {
        await Promise.all([
          this.fetchProfessor(professorId),
          this.fetchProfessorTeacherLoads(professorId),
          this.fetchSubjects(),
          this.fetchCourses(),
        ]);
        this.selectedYear = this.academicYears[0];
      } catch (error) {
        console.error("Error loading data:", error);
        this.showSnackbarMessage("Failed to load data", "error");
      }
    },

    closeStudentsDialog() {
      this.studentsDialog = false;
      this.editingStudent = null;
      this.selectedSubjectStudents = [];
      this.selectedSubjectId = null;
      this.selectedTeacherLoadId = null;
    },
  },

  created() {
    this.loadInitialData();
  },
};
</script>

<style scoped>
.profile-header {
  height: 100px;
  background: linear-gradient(to right, #a52a2a, #d2691e);
}

.profile-picture-section {
  margin-top: -50px;
  padding-bottom: 20px;
}

.profile-picture-container {
  display: inline-block;
  position: relative;
}

.profile-avatar {
  border: 4px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.change-photo-btn {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}

.v-list-item {
  min-height: 48px !important;
}

.v-list-item__icon {
  margin: 12px 16px 12px 0 !important;
}

@media (max-width: 960px) {
  .profile-picture-section {
    margin-top: -75px;
  }

  .profile-avatar {
    width: 120px !important;
    height: 120px !important;
  }
}

@media (max-width: 600px) {
  .profile-header {
    height: 80px;
  }

  .profile-picture-section {
    margin-top: -60px;
  }

  .profile-avatar {
    width: 100px !important;
    height: 100px !important;
  }

  .change-photo-btn {
    transform: translateX(-50%) scale(0.8);
  }
}
</style>
