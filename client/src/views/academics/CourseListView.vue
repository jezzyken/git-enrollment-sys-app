<template>
  <v-container>
    <v-card class="mb-4">
      <v-row align="center" no-gutters>
        <v-col cols="12">
          <div class="d-flex justify-space-between pa-4">
            <v-text-field
              v-model="options.search"
              prepend-inner-icon="mdi-magnify"
              placeholder="Search courses..."
              hide-details
              single-line
              filled
              rounded
              dense
              class="search-field"
              style="max-width: 400px"
              @keyup.enter="fetchCourses"
            ></v-text-field>

            <v-btn color="primary" @click="openCreateDialog">
              <v-icon left>mdi-plus</v-icon>
              New Course
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <v-card>
      <v-data-table
        :headers="headers"
        :items="courses"
        :loading="loading"
        :items-per-page="10"
      >
        <template v-slot:item.actions="{ item }">
          <div class="d-flex justify-end">
            <v-btn
              icon
              small
              color="primary"
              class="mr-2"
              @click="openEditDialog(item)"
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
              No courses found
            </div>
            <div class="text-body-2 grey--text mt-2">
              Try adjusting your search or add a new course
            </div>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <!-- Course Form Dialog -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.courseName"
                  label="Course Name"
                  :error-messages="nameError"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.courseCode"
                  label="Course Abbreviation"
                  :error-messages="codeError"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeDialog">Cancel</v-btn>
          <v-btn
            color="primary"
            :loading="loading"
            @click="saveCourse"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Dialog -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="error--text">
          <v-icon left color="error">mdi-alert-circle</v-icon>
          Confirm Delete
        </v-card-title>

        <v-card-text class="pt-4">
          Are you sure you want to delete this course?
          <div class="mt-4 pa-4 grey lighten-4 rounded">
            <div class="font-weight-medium">
              {{ courseToDelete?.courseName }}
            </div>
            <div class="caption text-medium-emphasis">
              Code: {{ courseToDelete?.courseCode }}
            </div>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="deleteDialog = false">Cancel</v-btn>
          <v-btn
            color="error"
            @click="handleDelete"
            :loading="loading"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="4000"
      top
      right
    >
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'CourseListView',

  data: () => ({
    dialog: false,
    deleteDialog: false,
    options: {
      search: '',
    },
    headers: [
      {
        text: 'Course Name',
        value: 'courseName',
        sortable: true,
      },
      {
        text: 'Course Abbreviation',
        value: 'courseCode',
        sortable: true,
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false,
        align: 'end',
      },
    ],
    editedItem: {
      courseName: '',
      courseCode: '',
    },
    defaultItem: {
      courseName: '',
      courseCode: '',
    },
    courseToDelete: null,
    nameError: '',
    codeError: '',
    snackbar: false,
    snackbarColor: '',
    snackbarText: '',
  }),

  computed: {
    ...mapState('courses', ['courses', 'loading']),
    formTitle() {
      return !this.editedItem._id ? 'New Course' : 'Edit Course';
    },
  },

  methods: {
    ...mapActions('courses', [
      'fetchCourses',
      'createCourse',
      'updateCourse',
      'deleteCourse',
    ]),

    openCreateDialog() {
      this.editedItem = { ...this.defaultItem };
      this.dialog = true;
    },

    openEditDialog(item) {
      this.editedItem = { ...item };
      this.dialog = true;
    },

    closeDialog() {
      this.dialog = false;
      this.nameError = '';
      this.codeError = '';
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
      });
    },

    async saveCourse() {
      if (!this.validateForm()) return;

      try {
        if (this.editedItem._id) {
          await this.updateCourse({
            id: this.editedItem._id,
            courseData: this.editedItem,
          });
          this.showSnackbarMessage('Course updated successfully!', 'success');
        } else {
          await this.createCourse(this.editedItem);
          this.showSnackbarMessage('Course created successfully!', 'success');
        }
        this.closeDialog();
        this.fetchCourses();
      } catch (error) {
        this.showSnackbarMessage(
          error.response?.data?.message || 'Operation failed!',
          'error'
        );
      }
    },

    validateForm() {
      let isValid = true;
      this.nameError = '';
      this.codeError = '';

      if (!this.editedItem.courseName) {
        this.nameError = 'Course name is required';
        isValid = false;
      }
      if (!this.editedItem.courseCode) {
        this.codeError = 'Course abbreviation is required';
        isValid = false;
      }

      return isValid;
    },

    confirmDelete(item) {
      this.courseToDelete = item;
      this.deleteDialog = true;
    },

    async handleDelete() {
      try {
        await this.deleteCourse(this.courseToDelete._id);
        this.showSnackbarMessage('Course deleted successfully!', 'success');
        this.fetchCourses();
      } catch (error) {
        this.showSnackbarMessage(
          error.response?.data?.message || 'Failed to delete course!',
          'error'
        );
      } finally {
        this.deleteDialog = false;
      }
    },

    showSnackbarMessage(text, color) {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.snackbar = true;
    },
  },

  created() {
    this.fetchCourses();
  },
};
</script>

<style scoped>
.v-data-table {
  border-radius: 8px;
}

@media (max-width: 600px) {
  .search-field {
    max-width: 100% !important;
    margin-bottom: 16px;
  }

  .d-flex {
    flex-wrap: wrap;
  }

  .v-btn {
    margin-bottom: 8px;
  }
}
</style>