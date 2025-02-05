<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="headline">
        {{ isEditing ? "Edit Subject Load" : "Add Subject Load" }}
      </v-card-title>

      <v-card-text>
        <v-row class="mb-4">
          <v-col cols="12" sm="4">
            <v-select
              v-model="selectedCourses"
              :items="coursesToShow"
              item-text="courseCode"
              item-value="courseCode"
              label="Select Courses"
              multiple
              chips
              small-chips
              deletable-chips
              :loading="loading"
              :disabled="loading"
              clearable
              outlined
              dense
              @change="handleCourseChange"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip
                  v-if="index < 2"
                  x-small
                  color="primary"
                  text-color="white"
                  close
                  @click:close="removeSelectedCourse(item)"
                >
                  {{ item.courseCode }}
                </v-chip>
                <span v-else-if="index === 2" class="grey--text text-caption">
                  (+{{ selectedCourses.length - 2 }} more)
                </span>
              </template>
              <template v-slot:item="{ item }">
                <v-list-item-content>
                  <v-list-item-title>
                    <v-chip
                      x-small
                      color="primary"
                      text-color="white"
                      class="mr-2"
                    >
                      {{ item.courseCode }}
                    </v-chip>
                    {{ item.courseName }}
                  </v-list-item-title>
                </v-list-item-content>
              </template>
            </v-select>
          </v-col>

          <v-col cols="12" sm="4">
            <v-select
              v-model="yearLevelFilter"
              :items="[1, 2, 3, 4]"
              label="Year Level"
              clearable
              outlined
              dense
            ></v-select>
          </v-col>

          <v-col cols="12" sm="4">
            <v-select
              v-model="semesterFilter"
              :items="['First', 'Second']"
              label="Semester"
              clearable
              outlined
              dense
            ></v-select>
          </v-col>
        </v-row>

        <v-form ref="loadForm" v-model="loadFormValid">
          <!-- Subject Selection Table -->
          <v-col cols="12">
            <v-data-table
              v-model="selectedSubjectRow"
              :headers="subjectHeaders"
              :items="availableSubjects"
              :search="searchQuery"
              item-key="_id"
              show-select
              single-select
              :loading="loading"
              :no-data-text="noDataText"
              dense
              class="elevation-1"
              :disabled="isEditing"
              @click:row="selectSubject"
              :items-per-page="5"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Select Subject</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-text-field
                    v-model="searchQuery"
                    append-icon="mdi-magnify"
                    label="Search Subject"
                    single-line
                    hide-details
                    dense
                  ></v-text-field>
                  <v-spacer></v-spacer>
                </v-toolbar>
              </template>

              <template v-slot:item.catNo="{ item }">
                <div>{{ item.catNo }}</div>
                <div class="caption grey--text">{{ item.units }} units</div>
              </template>

              <template v-slot:item.course="{ item }">
                <div class="d-flex align-center">
                  <v-chip
                    x-small
                    label
                    class="mr-1"
                    v-for="course in item.course"
                    :key="course._id"
                    color="primary"
                    text-color="white"
                  >
                    {{ course.courseCode }}
                  </v-chip>
                </div>
              </template>

              <template v-slot:item.yearLevel="{ item }">
                Year {{ item.yearLevel }}
              </template>

              <template v-slot:item.prerequisites="{ item }">
                <div v-if="item.prerequisites && item.prerequisites.length > 0">
                  {{ item.prerequisites.join(", ") }}
                </div>
                <div v-else class="caption grey--text">None</div>
              </template>
            </v-data-table>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="newLoad.section"
              label="Section"
              :rules="rules.required"
              outlined
            ></v-text-field>
          </v-col>

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
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="cancel">Cancel</v-btn>
        <v-btn
          color="primary"
          :loading="loading"
          :disabled="!loadFormValid"
          @click="submit"
        >
          {{ isEditing ? "Save Changes" : "Add Subject" }}
        </v-btn>
      </v-card-actions>
    </v-card>

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
  name: "AddSubjectLoad",

  data: () => ({
    selectedYear: "",
    selectedSemester: "First",
    searchQuery: "",
    yearLevelFilter: null,
    semesterFilter: null,
    courseDialog: false,
    courseSearch: "",
    selectedCourses: [],
    selectedSubjectRow: [],
    courseHeaders: [
      {
        text: "Course Code",
        value: "courseCode",
        width: "30%",
      },
      {
        text: "Course Name",
        value: "courseName",
        width: "70%",
      },
    ],
    subjectHeaders: [
      {
        text: "Code",
        value: "catNo",
        width: "10%",
      },
      {
        text: "Description",
        value: "DescriptiveTitle",
        width: "30%",
      },
      {
        text: "Course",
        value: "course",
        width: "20%",
      },
      {
        text: "Year Level",
        value: "yearLevel",
        width: "10%",
      },
      {
        text: "Semester",
        value: "semester",
        width: "10%",
      },
      {
        text: "Prerequisites",
        value: "prerequisites",
        width: "20%",
      },
    ],
    loadFormValid: false,
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
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    rules: {
      required: [(v) => !!v || "This field is required"],
    },
    snackbar: false,
    snackbarColor: "",
    snackbarText: "",
    editingStudent: null,
    updating: false,
    selectedTeacherLoadId: null,
    selectedSubjectId: null,
    currentUser: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  }),

  computed: {
    ...mapState({
      professor: (state) => state.professors.currentProfessor,
      teachingLoad: (state) => state.teacherLoad.teacherLoads,
      subjects: (state) => state.subjects.subjects,
      loading: (state) =>
        state.professors.loading ||
        state.teacherLoad.loading ||
        state.courses.loading,
      courses: (state) => state.courses.courses,
      departmentCourses: (state) => state.courses.departmentCourses,
    }),

    coursesToShow() {
      return this.isAdmin ? this.courses : this.departmentCourses;
    },
    selectedCoursesDisplay() {
      if (!this.selectedCourses.length) return "";
      if (this.selectedCourses.length === 1) {
        return this.selectedCourses[0].courseCode;
      }
      return `${this.selectedCourses[0].courseCode} +${
        this.selectedCourses.length - 1
      } more`;
    },

    noDataText() {
      if (this.loading) return "Loading subjects...";
      if (this.availableSubjects.length === 0) {
        if (
          this.searchQuery ||
          this.selectedCourses.length ||
          this.yearLevelFilter ||
          this.semesterFilter
        ) {
          return "No subjects match the selected filters";
        }
        return "No available subjects";
      }
      return "No data available";
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

    availableSubjects() {
      if (!this.subjects || !Array.isArray(this.subjects)) return [];

      const currentSubjectIds = this.currentTeachingLoad
        ?.flatMap((load) =>
          load.subjects?.map((subject) => subject.subject?._id)
        )
        .filter((id) => id != null);

      let filteredSubjects = this.subjects
        .filter((subject) => subject && subject.DescriptiveTitle)
        .filter((subject) =>
          this.isEditing && this.newLoad.subject === subject._id
            ? true
            : !currentSubjectIds.includes(subject._id)
        )
        .filter((subject) => subject.active);

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filteredSubjects = filteredSubjects.filter(
          (subject) =>
            subject.DescriptiveTitle.toLowerCase().includes(query) ||
            subject.catNo.toLowerCase().includes(query)
        );
      }

      // Updated course filtering logic
      if (this.selectedCourses.length > 0) {
        filteredSubjects = filteredSubjects.filter((subject) =>
          subject.course.some((course) =>
            this.selectedCourses.includes(course.courseCode)
          )
        );
      }

      if (this.yearLevelFilter) {
        filteredSubjects = filteredSubjects.filter(
          (subject) => subject.yearLevel === this.yearLevelFilter
        );
      }

      if (this.semesterFilter) {
        filteredSubjects = filteredSubjects.filter(
          (subject) => subject.semester === this.semesterFilter
        );
      }

      return filteredSubjects.map((subject) => ({
        ...subject,
        DescriptiveTitle: subject.DescriptiveTitle || "Untitled Subject",
        catNo: subject.catNo || "No Code",
      }));
    },

    isAdmin() {
      if (!this.currentUser) return false;
      return this.currentUser.user.role.some((role) => role.name === "admin");
    },
  },

  methods: {
    ...mapActions({
      fetchProfessor: "professors/fetchProfessor",
      fetchProfessorTeacherLoads: "teacherLoad/fetchProfessorTeacherLoads",
      createTeacherLoad: "teacherLoad/createTeacherLoad",
      updateTeacherLoad: "teacherLoad/updateTeacherLoad",
      fetchSubjects: "subjects/fetchSubjects",
      fetchCourses: "courses/fetchCourses",
      fetchCoursesByDepartment: "courses/fetchCoursesByDepartment",
    }),

    formatTime(time) {
      return moment(time, "HH:mm").format("hh:mm A");
    },

    clearSelectedCourses() {
      this.selectedCourses = [];
    },

    selectSubject(item) {
      console.log(item);
      this.newLoad.subject = item._id;
      this.selectedSubjectRow = [item];
    },

    addScheduleSlot() {
      this.newLoad.schedule.push({
        day: "",
        timeStart: "",
        timeEnd: "",
        room: "",
      });
    },

    removeSelectedCourse(course) {
      this.selectedCourses = this.selectedCourses.filter(
        (code) => code !== course.courseCode
      );
    },

    handleCourseChange() {
      this.searchQuery = "";
    },

    async loadCourses() {
      console.log("lload course", this.isAdmin);
      try {
        if (this.isAdmin) {
          await this.fetchCourses();
        } else if (this.currentUser?.department) {
          await this.fetchCoursesByDepartment(this.currentUser.department);
        }
      } catch (error) {
        this.showSnackbarMessage("Failed to load courses", "error");
      }
    },

    async submit() {
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

        console.log(payload.subjects[0].subject, payload.professor);

        if (!payload.professor || !payload.subjects[0].subject) {
          throw new Error("Missing required fields");
        }

        if (this.isEditing) {
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

        this.$router.push(`/professor/${this.professor._id}/profile`);
      } catch (error) {
        console.error("Error submitting load:", error);
        this.showSnackbarMessage(
          error.response?.data?.message ||
            `Failed to ${this.isEditing ? "update" : "add"} subject`,
          "error"
        );
      }
    },

    cancel() {
      this.$router.push(`/professor/${this.professor._id}/profile`);
    },

    showSnackbarMessage(text, color) {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.snackbar = true;
    },

    removeScheduleSlot(index) {
      if (this.newLoad.schedule.length > 1) {
        this.newLoad.schedule.splice(index, 1);
      } else {
        this.showSnackbarMessage(
          "Cannot remove the last schedule slot",
          "error"
        );
      }
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
          this.fetchSubjects(),
          this.loadCourses(),
          this.fetchProfessorTeacherLoads(professorId),
        ]);

        this.selectedYear = this.academicYears[0];

        if (this.$route.params.subjectId) {
          this.isEditing = true;
          this.editingId = this.$route.params.subjectId;

          const teacherLoad = this.currentTeachingLoad.find((load) =>
            load.subjects.some((s) => s._id === this.editingId)
          );

          if (teacherLoad) {
            const subject = teacherLoad.subjects.find(
              (s) => s._id === this.editingId
            );

            if (subject && subject.subject) {
              this.newLoad = {
                subject: subject.subject._id,
                section: subject.section || "",
                schedule: Array.isArray(subject.schedule)
                  ? JSON.parse(JSON.stringify(subject.schedule))
                  : [
                      {
                        day: "",
                        timeStart: "",
                        timeEnd: "",
                        room: "",
                      },
                    ],
              };

              const subjectToSelect = this.subjects.find(
                (s) => s._id === subject.subject._id
              );

              if (subjectToSelect) {
                await this.$nextTick();
                // Set the search query to the subject's title
                this.searchQuery = subjectToSelect.DescriptiveTitle;
                this.selectedSubjectRow = [subjectToSelect];

                if (subjectToSelect.course) {
                  this.selectedCourses = subjectToSelect.course.map(
                    (c) => c.courseCode
                  );
                  this.yearLevelFilter = subjectToSelect.yearLevel;
                  this.semesterFilter = subjectToSelect.semester;
                }
              }
            }
          }
        }
      } catch (error) {
        console.error("Error loading data:", error);
        this.showSnackbarMessage("Failed to load data", "error");
      }
    },
  },

  watch: {
    selectedCourses: {
      handler(newVal) {
        console.log("Selected courses:", newVal);
      },
      deep: true,
    },
    selectedSubjectRow: {
      handler(newVal) {
        console.log("Selected subject row changed:", newVal);
      },
      deep: true,
    },
  },

  created() {
    this.loadInitialData();
  },
};
</script>

<style scoped>
.course-table {
  max-height: 400px;
}

.course-chip {
  margin-right: 4px;
}
</style>
