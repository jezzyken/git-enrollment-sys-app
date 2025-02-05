<template>
  <v-container>
    <v-card class="mb-4">
      <v-row align="center" no-gutters>
        <v-col cols="12">
          <div class="d-flex justify-space-between pa-4">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              placeholder="Search subjects..."
              hide-details
              single-line
              filled
              rounded
              dense
              class="search-field"
              style="max-width: 400px"
            ></v-text-field>

            <v-btn color="primary" @click="openCreateDialog">
              <v-icon left>mdi-plus</v-icon>
              New Subject
            </v-btn>
          </div>

          <div class="px-4 pb-4 d-flex flex-wrap align-center mt-5">
            <v-select
              v-model="filters.course"
              :items="courseOptions"
              item-text="courseCode"
              item-value="_id"
              label="Filter by Course"
              clearable
              class="mr-4"
              style="min-width: 200px"
              dense
            >
              <template v-slot:selection="{ item }">
                <v-chip color="primary" text-color="white" small label>
                  {{ item.courseCode }}
                </v-chip>
              </template>
              <template v-slot:item="{ item }">
                <v-chip
                  color="primary"
                  text-color="white"
                  small
                  label
                  class="mr-2"
                >
                  {{ item.courseCode }}
                </v-chip>
                <span class="text-caption">{{ item.courseName }}</span>
              </template>
            </v-select>

            <v-select
              v-model="filters.yearLevel"
              :items="yearLevels"
              label="Filter by Year Level"
              clearable
              class="mr-4"
              style="min-width: 150px"
              dense
            ></v-select>

            <v-select
              v-model="filters.semester"
              :items="semesters"
              label="Filter by Semester"
              clearable
              style="min-width: 150px"
              dense
            ></v-select>

            <v-btn
              text
              color="primary"
              @click="resetFilters"
              class="ml-2"
              :disabled="!hasActiveFilters"
            >
              <v-icon left small>mdi-filter-off</v-icon>
              Clear Filters
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <!-- Data Table -->
    <v-card>
      <v-data-table
        :headers="headers"
        :items="filteredSubjects"
        :loading="loading"
        :search="search"
        :items-per-page="10"
        :footer-props="{
          'items-per-page-options': [10, 25, 50, -1],
          'items-per-page-text': 'Rows per page:',
        }"
      >
        <template v-slot:item.prerequisites="{ item }">
          <v-chip
            v-for="prereq in item.prerequisites"
            :key="prereq"
            class="mr-1 my-1"
            small
            outlined
            color="secondary"
          >
            {{ prereq }}
          </v-chip>
        </template>

        <template v-slot:item.course="{ item }">
          <v-chip
            v-for="course in item.course"
            :key="course._id"
            class="mr-1 my-1"
            small
            color="primary"
            text-color="white"
          >
            {{ course.courseCode }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <div class="d-flex justify-end">
            <v-btn
              icon
              small
              color="primary"
              class="mr-2"
              @click="editSubject(item)"
            >
              <v-icon small>mdi-pencil</v-icon>
            </v-btn>

            <v-btn icon small color="error" @click="confirmDelete(item)">
              <v-icon small>mdi-delete</v-icon>
            </v-btn>
          </div>
        </template>

        <template v-slot:no-data>
          <div class="pa-8 text-center">
            <v-icon size="64" color="grey lighten-1">mdi-book-outline</v-icon>
            <div class="text-h6 grey--text text--darken-1 mt-4">
              No subjects found
            </div>
            <div class="text-body-2 grey--text mt-2">
              Try adjusting your search or add a new subject
            </div>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <!-- Create/Edit Dialog -->
    <v-dialog v-model="createDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{
            editMode ? "Edit Subject" : "New Subject"
          }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.catNo"
                    :rules="formRules.catNo"
                    label="Course Code*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.units"
                    type="number"
                    :rules="formRules.units"
                    label="Units*"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-text-field
                v-model="form.DescriptiveTitle"
                :rules="formRules.DescriptiveTitle"
                label="Descriptive Title*"
                required
              ></v-text-field>

              <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="form.yearLevel"
                    :items="yearLevels"
                    :rules="formRules.yearLevel"
                    label="Year Level*"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="form.semester"
                    :items="semesters"
                    :rules="formRules.semester"
                    label="Semester*"
                    required
                  ></v-select>
                </v-col>
              </v-row>

              <v-combobox
                v-model="form.prerequisites"
                :items="prerequisiteOptions"
                label="Prerequisites"
                multiple
                chips
                hint="Enter prerequisites or select from existing subjects"
                persistent-hint
              ></v-combobox>

              <v-select
                v-model="form.course"
                :items="courseOptions"
                item-text="courseCode"
                item-value="_id"
                label="Select Courses"
                multiple
                chips
                required
              >
                <template v-slot:selection="{ item }">
                  <v-chip color="primary" text-color="white" small label>
                    {{ item.courseCode }}
                  </v-chip>
                </template>
                <template v-slot:item="{ item }">
                  <v-chip
                    color="primary"
                    text-color="white"
                    small
                    label
                    class="mr-2"
                  >
                    {{ item.courseCode }}
                  </v-chip>
                  <span class="text-caption">{{ item.courseName }}</span>
                </template>
              </v-select>
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeCreateDialog">Cancel</v-btn>
          <v-btn
            color="primary"
            :disabled="!valid"
            :loading="loading"
            @click="handleCreate"
          >
            {{ editMode ? "Save" : "Create" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="error--text">
          <v-icon left color="error">mdi-alert-circle</v-icon>
          Confirm Delete
        </v-card-title>

        <v-card-text class="pt-4">
          Are you sure you want to delete this subject?
          <div class="mt-4 pa-4 grey lighten-4 rounded">
            <div class="font-weight-medium">
              {{ subjectToDelete?.DescriptiveTitle }}
            </div>
            <div class="caption text-medium-emphasis">
              Course Code: {{ subjectToDelete?.catNo }}
            </div>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="handleDelete" :loading="loading">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar
      v-model="showSnackbar"
      :color="snackbarColor"
      :timeout="3000"
      top
      right
    >
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="showSnackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "SubjectListView",

  data: () => ({
    valid: false,
    search: "",
    options: {
      page: 1,
      itemsPerPage: 10,
    },
    createDialog: false,
    deleteDialog: false,
    subjectToDelete: null,
    yearLevels: [1, 2, 3, 4],
    semesters: ["First", "Second"],
    filters: {
      course: null,
      yearLevel: null,
      semester: null,
    },
    form: {
      catNo: "",
      DescriptiveTitle: "",
      units: null,
      prerequisites: [],
      yearLevel: null,
      semester: "",
      course: [],
    },
    formRules: {
      catNo: [
        (v) => !!v || "Course Code is required",
        (v) =>
          (v && v.length >= 2) || "Course Code must be at least 2 characters",
        (v) =>
          /^[A-Za-z0-9\s-]+$/.test(v) ||
          "Course Code can only contain letters, numbers, spaces, and hyphens",
      ],
      DescriptiveTitle: [
        (v) => !!v || "Descriptive title is required",
        (v) => (v && v.length >= 3) || "Title must be at least 3 characters",
        (v) => (v && v.length <= 100) || "Title must not exceed 100 characters",
      ],
      units: [
        (v) => !!v || "Units are required",
        (v) => !isNaN(v) || "Units must be a number",
        (v) => v > 0 || "Units must be greater than 0",
        (v) => Number.isInteger(Number(v)) || "Units must be a whole number",
      ],
      yearLevel: [
        (v) => !!v || "Year level is required",
        (v) => [1, 2, 3, 4].includes(Number(v)) || "Invalid year level",
      ],
      semester: [
        (v) => !!v || "Semester is required",
        (v) => ["First", "Second"].includes(v) || "Invalid semester",
      ],
    },
    headers: [
      { text: "Course Code", value: "catNo" },
      { text: "Descriptive Title", value: "DescriptiveTitle" },
      { text: "Units", value: "units" },
      { text: "Prerequisites", value: "prerequisites" },
      { text: "Year Level", value: "yearLevel" },
      { text: "Semester", value: "semester" },
      { text: "Courses", value: "course" },
      { text: "Actions", value: "actions", sortable: false, align: "end" },
    ],
    editMode: false,
    loading: false,
    snackbarColor: "",
    snackbarText: "",
    showSnackbar: false,
  }),

  computed: {
    ...mapState("subjects", ["subjects", "totalSubjects"]),
    ...mapState("courses", ["courses"]),

    hasActiveFilters() {
      return Object.values(this.filters).some((filter) => filter !== null);
    },

    courseOptions() {
      return this.courses.map((course) => ({
        _id: course._id,
        courseCode: course.courseCode,
        courseName: course.courseName,
        courseColor: course.courseColor,
      }));
    },

    prerequisiteOptions() {
      return this.subjects
        .map((subject) => subject.catNo)
        .filter((catNo) => !this.editMode || catNo !== this.form.catNo);
    },

    filteredSubjects() {
      return this.subjects.filter((subject) => {
        // Course filter
        if (this.filters.course) {
          const hasCourse = subject.course.some(
            (c) => c._id === this.filters.course
          );
          if (!hasCourse) return false;
        }

        // Year level filter
        if (
          this.filters.yearLevel !== null &&
          subject.yearLevel !== this.filters.yearLevel
        ) {
          return false;
        }

        // Semester filter
        if (
          this.filters.semester &&
          subject.semester !== this.filters.semester
        ) {
          return false;
        }

        return true;
      });
    },
  },

  methods: {
    ...mapActions("subjects", [
      "fetchSubjects",
      "createSubject",
      "updateSubject",
      "deleteSubject",
    ]),
    ...mapActions("courses", ["fetchCourses"]),

    resetFilters() {
      this.filters = {
        course: null,
        yearLevel: null,
        semester: null,
      };
      localStorage.removeItem("subjectFilters");
    },

    openCreateDialog() {
      this.editMode = false;
      this.createDialog = true;
      this.resetForm();
    },

    closeCreateDialog() {
      this.createDialog = false;
      this.editMode = false;
      this.resetForm();
      if (this.$refs.form) {
        this.$refs.form.resetValidation();
      }
    },

    resetForm() {
      this.form = {
        catNo: "",
        DescriptiveTitle: "",
        units: null,
        prerequisites: [],
        yearLevel: null,
        semester: "",
        course: [],
      };
      this.valid = false;

      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.reset();
          this.$refs.form.resetValidation();
        }
      });
    },

    validateForm() {
      if (!this.$refs.form.validate()) {
        this.showSnackbarMessage(
          "Please fill in all required fields correctly.",
          "error"
        );
        return false;
      }

      if (!this.validateUnits()) {
        return false;
      }

      if (!this.validatePrerequisites()) {
        return false;
      }

      if (!this.validateCourses()) {
        return false;
      }

      return true;
    },

    validateUnits() {
      const units = Number(this.form.units);
      if (isNaN(units) || units <= 0) {
        this.showSnackbarMessage("Units must be a positive number.", "error");
        return false;
      }
      return true;
    },

    validatePrerequisites() {
      if (this.form.prerequisites.length > 0) {
        const cleanPrereqs = [
          ...new Set(this.form.prerequisites.filter((p) => p && p.trim())),
        ];

        this.form.prerequisites = cleanPrereqs;

        if (cleanPrereqs.includes(this.form.catNo)) {
          this.showSnackbarMessage(
            "A subject cannot be a prerequisite of itself.",
            "error"
          );
          return false;
        }
      }
      return true;
    },

    validateCourses() {
      if (!this.form.course || this.form.course.length === 0) {
        this.showSnackbarMessage("Please select at least one course.", "error");
        return false;
      }
      return true;
    },

    async handleCreate() {
      if (!this.validateForm()) {
        return;
      }

      this.loading = true;

      try {
        const subjectData = {
          catNo: this.form.catNo.trim(),
          DescriptiveTitle: this.form.DescriptiveTitle.trim(),
          units: Number(this.form.units),
          prerequisites: this.form.prerequisites,
          yearLevel: Number(this.form.yearLevel),
          semester: this.form.semester,
          course: this.form.course,
        };

        if (this.editMode) {
          await this.updateSubject({
            id: this.form._id,
            subjectData,
          });
          this.showSnackbarMessage("Subject updated successfully!", "success");
        } else {
          await this.createSubject(subjectData);
          this.showSnackbarMessage("Subject created successfully!", "success");
        }

        await this.fetchSubjects();
        this.closeCreateDialog();
      } catch (error) {
        let errorMessage = "An error occurred while saving the subject.";

        if (error.response?.data?.message) {
          if (error.response.data.message.includes("duplicate")) {
            errorMessage = "A subject with this Course Code already exists.";
          } else {
            errorMessage = error.response.data.message;
          }
        }

        this.showSnackbarMessage(errorMessage, "error");
      } finally {
        this.loading = false;
      }
    },

    editSubject(item) {
      this.editMode = true;
      this.form = {
        _id: item._id,
        catNo: item.catNo,
        DescriptiveTitle: item.DescriptiveTitle,
        units: item.units,
        prerequisites: item.prerequisites ? [...item.prerequisites] : [],
        yearLevel: item.yearLevel,
        semester: item.semester,
        course: item.course ? item.course.map((c) => c._id) : [],
      };
      this.createDialog = true;
    },

    confirmDelete(item) {
      this.subjectToDelete = item;
      this.deleteDialog = true;
    },

    async handleDelete() {
      this.loading = true;
      try {
        await this.deleteSubject(this.subjectToDelete._id);
        this.showSnackbarMessage("Subject deleted successfully!", "success");
        await this.fetchSubjects();
      } catch (error) {
        this.showSnackbarMessage(
          error.response?.data?.message || "Failed to delete subject!",
          "error"
        );
      } finally {
        this.loading = false;
        this.deleteDialog = false;
      }
    },

    showSnackbarMessage(message, color) {
      this.snackbarText = message;
      this.snackbarColor = color;
      this.showSnackbar = true;
    },

    saveFiltersToLocalStorage() {
      localStorage.setItem("subjectFilters", JSON.stringify(this.filters));
    },

    loadFiltersFromLocalStorage() {
      const savedFilters = localStorage.getItem("subjectFilters");
      if (savedFilters) {
        this.filters = JSON.parse(savedFilters);
      }
    },
  },

  watch: {
    "form.catNo"(newVal) {
      if (newVal) {
        this.form.catNo = newVal.toUpperCase();
      }
    },

    "form.units"(newVal) {
      if (newVal && Number(newVal) <= 0) {
        this.form.units = null;
      }
    },

    "form.prerequisites": {
      handler(newVal) {
        if (newVal && Array.isArray(newVal)) {
          const uniquePrereqs = [...new Set(newVal)];
          if (uniquePrereqs.length !== newVal.length) {
            this.$nextTick(() => {
              this.form.prerequisites = uniquePrereqs;
            });
          }
        }
      },
      deep: true,
    },

    filters: {
      handler() {
        this.saveFiltersToLocalStorage();
      },
      deep: true,
    },
  },

  async created() {
    this.loadFiltersFromLocalStorage();
    await Promise.all([this.fetchSubjects(), this.fetchCourses()]);
  },
};
</script>

<style scoped>
.v-select.filter-select {
  max-width: 200px;
}

.filter-chip {
  margin: 2px;
}

.v-chip {
  margin: 2px;
}

.error-text {
  color: var(--v-error-base);
  font-size: 12px;
  margin-top: 4px;
}

.form-section {
  margin-bottom: 24px;
}

.required-field::after {
  content: "*";
  color: var(--v-error-base);
  margin-left: 4px;
}
</style>
