<template>
  <v-container>
    <v-card class="mb-4">
      <v-row align="center" no-gutters>
        <v-col cols="12">
          <div class="d-flex justify-space-between pa-4">
            <v-text-field
              v-model="options.search"
              prepend-inner-icon="mdi-magnify"
              placeholder="Search students..."
              hide-details
              single-line
              filled
              rounded
              dense
              class="search-field"
              style="max-width: 400px"
              @keyup.enter="handleSearch"
            ></v-text-field>

            <div class="d-flex">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    color="primary"
                    class="mr-2"
                  >
                    <v-icon left>mdi-filter</v-icon>
                    Filter
                  </v-btn>
                </template>
                <v-card min-width="300" class="pa-4">
                  <v-select
                    v-model="filters.course"
                    label="Course"
                    :items="courses"
                    clearable
                    dense
                    outlined
                    class="mb-2"
                  ></v-select>
                  <v-select
                    v-model="filters.year"
                    label="Year Level"
                    :items="[1, 2, 3, 4]"
                    clearable
                    dense
                    outlined
                    class="mb-2"
                  ></v-select>
                  <v-select
                    v-model="filters.section"
                    label="Section"
                    :items="['A', 'B', 'C']"
                    clearable
                    dense
                    outlined
                  ></v-select>
                  <div class="d-flex justify-end mt-4">
                    <v-btn text @click="resetFilters" class="mr-2">Reset</v-btn>
                    <v-btn color="primary" @click="applyFilters">Apply</v-btn>
                  </div>
                </v-card>
              </v-menu>

              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    color="primary"
                    class="mr-2"
                  >
                    <v-icon left>mdi-download</v-icon>
                    Download
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="downloadExcel">
                    <v-list-item-icon>
                      <v-icon>mdi-file-excel</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Excel</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="downloadPDF">
                    <v-list-item-icon>
                      <v-icon>mdi-file-pdf</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>PDF</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-btn
                color="primary"
                :to="{
                  name: 'StudentForm',
                  params: { action: 'add' },
                }"
              >
                <v-icon left>mdi-plus</v-icon>
                New Student
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>

      <v-card>
      <v-data-table
        :headers="headers"
        :items="students"
        :loading="loading"
        :options.sync="options"
        :server-items-length="totalStudents"
        :footer-props="{
          'items-per-page-options': [10, 25, 50],
          showFirstLastPage: true,
        }"
      >
        <template v-slot:item.user.fullName="{ item }">
          <div class="d-flex align-center py-2">
            <v-avatar color="primary lighten-4" size="40" class="mr-3">
              <span class="primary--text font-weight-medium">
                {{ item.name.firstName[0] }}{{ item.name.surname[0] }}
              </span>
            </v-avatar>
            <div>
              <div class="font-weight-medium">
                {{ item.name.surname }}, {{ item.name.firstName }}
                {{ item.name.middleName ? item.name.middleName[0] + "." : "" }}
                {{ item.name.nameExtension || "" }}
              </div>
            </div>
          </div>
        </template>

        <template v-slot:item.course="{ item }">
          <v-chip small outlined color="primary">
            {{ item.course }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <div class="d-flex justify-end">
            <v-btn
              icon
              small
              color="primary"
              class="mr-2"
              :to="{
                name: 'StudentForm',
                params: { studentId: item._id, action: 'edit' },
              }"
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
            <v-icon size="64" color="grey lighten-1"
              >mdi-account-school-outline</v-icon
            >
            <div class="text-h6 grey--text text--darken-1 mt-4">
              No students found
            </div>
            <div class="text-body-2 grey--text mt-2">
              Try adjusting your search or filters
            </div>
          </div>
        </template>

        <template v-slot:loading>
          <div class="pa-8 text-center">
            <v-progress-circular
              indeterminate
              color="primary"
              size="64"
            ></v-progress-circular>
            <div class="text-h6 primary--text mt-4">Loading students...</div>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <!-- Delete Dialog -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="error--text">
          <v-icon left color="error">mdi-alert-circle</v-icon>
          Confirm Delete
        </v-card-title>

        <v-card-text class="pt-4">
          Are you sure you want to delete this student record?
          <div class="mt-4 pa-4 grey lighten-4 rounded">
            <div class="font-weight-medium">
              {{ studentToDelete?.user?.firstName }}
              {{ studentToDelete?.user?.lastName }}
            </div>
            <div class="caption text-medium-emphasis">
              ID: {{ studentToDelete?.studentId }}
            </div>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="handleDelete" :loading="loading"
            >Delete</v-btn
          >
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
import { mapState, mapActions } from "vuex";

export default {
  name: "StudentListView",

  data: () => ({
    filters: {
      course: null,
      year: null,
      section: null,
    },
    deleteDialog: false,
    options: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    headers: [
      {
        text: "Student Name",
        value: "user.fullName",
        sortable: true,
      },
      {
        text: "Student ID",
        value: "studentId",
        sortable: true,
      },
      {
        text: "Course",
        value: "course",
        sortable: true,
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "end",
      },
    ],

    loading: false,
    studentToDelete: null,
    snackbar: false,
    snackbarColor: "",
    snackbarText: "",
  }),

  computed: {
    ...mapState("students", ["students", "totalStudents"]),
  },

  methods: {
    ...mapActions("students", ["fetchStudents", "deleteStudent"]),

    resetFilters() {
      this.filters = {
        course: null,
        year: null,
        section: null,
      };
      this.fetchStudents();
    },

    applyFilters() {
      this.options.page = 1;
      this.fetchStudents({ ...this.options, filters: this.filters });
    },

    downloadExcel() {
      // Implement Excel download
    },

    downloadPDF() {
      // Implement PDF download
    },

    confirmDelete(item) {
      this.studentToDelete = item;
      this.deleteDialog = true;
    },

    async handleDelete() {
      this.loading = true;
      try {
        await this.deleteStudent(this.studentToDelete._id);
        this.showSnackbarMessage("Student deleted successfully!", "success");
        this.fetchStudents();
      } catch (error) {
        this.showSnackbarMessage(
          error.response?.data?.message || "Failed to delete student!",
          "error"
        );
      } finally {
        this.loading = false;
        this.deleteDialog = false;
      }
    },

    showSnackbarMessage(text, color) {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.snackbar = true;
    },

    async handleSearch() {
      this.options.page = 1;
      await this.fetchStudents();
    },


  },

  created() {
    this.fetchStudents();
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
