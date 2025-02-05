<template>
  <v-container>
    <!-- Student Type Tabs -->
    <v-card class="mb-4">
      <v-tabs
        v-model="selectedTab"
        background-color="primary"
        dark
        @change="handleTabChange"
      >
        <v-tab value="all">All Students</v-tab>
        <v-tab value="regular">Regular Students</v-tab>
        <v-tab value="irregular">Irregular Students</v-tab>
      </v-tabs>
    </v-card>

    <!-- Search and Add Card -->
    <v-card class="mb-4">
      <v-row align="center" no-gutters>
        <v-col cols="12">
          <div class="d-flex justify-space-between pa-4">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              placeholder="Search students..."
              hide-details
              single-line
              filled
              rounded
              dense
              class="search-field"
              style="max-width: 400px"
            ></v-text-field>

            <div class="d-flex">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" v-bind="attrs" v-on="on">
                    <v-icon left>mdi-plus</v-icon>
                    Add Student
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item
                    v-for="type in ['New', 'Existing']"
                    :key="type"
                    :to="{
                      name: 'StudentForm',
                      params: { action: 'add' },
                      query: { type: type.toLowerCase() },
                    }"
                  >
                    <v-list-item-title>{{ type }} Student</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <!-- Data Table -->
    <v-card>
      <v-data-table
        :headers="headers"
        :items="filteredStudents"
        :loading="loading"
        :items-per-page="options.itemsPerPage"
        @update:options="handleTableUpdate"
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
              <div class="caption text-medium-emphasis">
                {{ item.studentId }}
              </div>
            </div>
          </div>
        </template>

        <template v-slot:item.studentType="{ item }">
          <v-chip
            :color="item.enrollments?.[0]?.studentType === 'regular' ? 'success' : 'warning'"
            small
            class="text-capitalize"
          >
            {{ item.enrollments?.[0]?.studentType || 'N/A' }}
          </v-chip>
        </template>

        <template v-slot:item.course="{ item }">
          <v-chip small outlined color="primary">
            {{ item.course.courseCode }}
          </v-chip>
        </template>

        <template v-slot:item.enrollmentStatus="{ item }">
          <v-chip
            :color="getStatusColor(item.enrollments?.[0]?.enrollmentStatus)"
            small
            class="text-capitalize"
          >
            {{ item.enrollments?.[0]?.enrollmentStatus || "pending" }}
          </v-chip>
        </template>

        <template v-slot:item.studentStatus="{ item }">
          <template v-if="item.enrollments?.[0]?.studentStatus">
            <v-chip
              :color="getStatusColor(item.enrollments[0].studentStatus)"
              small
              class="text-capitalize"
            >
              {{ item.enrollments[0].studentStatus }}
            </v-chip>
          </template>
        </template>

        <template v-slot:item.actions="{ item }">
          <div class="d-flex justify-end">
            <v-btn icon small color="info" @click="selectStudent(item)">
              <v-icon small>mdi-eye</v-icon>
            </v-btn>

            <v-btn
              icon
              small
              color="primary"
              :to="{
                name: 'StudentForm',
                params: { action: 'edit' },
                query: { studentId: item._id },
              }"
            >
              <v-icon small>mdi-pencil</v-icon>
            </v-btn>

            <v-btn icon small color="error" @click="confirmDelete(item)">
              <v-icon small>mdi-delete</v-icon>
            </v-btn>
          </div>
        </template>

        <!-- No Data Template -->
        <template v-slot:no-data>
          <div class="pa-8 text-center">
            <v-icon size="64" color="grey lighten-1">mdi-account-school-outline</v-icon>
            <div class="text-h6 grey--text text--darken-1 mt-4">
              No students found
            </div>
            <div class="text-body-2 grey--text mt-2">
              Try adjusting your search or filters
            </div>
          </div>
        </template>

        <!-- Loading Template -->
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
          <v-btn color="error" @click="handleDelete" :loading="loading">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
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
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "StudentListView",

  data: () => ({
    selectedTab: 'all',
    search: "",
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
      sortBy: ['user.fullName'],
      sortDesc: [false],
    },
    headers: [
      {
        text: "Student Name",
        value: "user.fullName",
        sortable: true,
      },
      {
        text: "Student Type",
        value: "studentType",
        sortable: true,
      },
      {
        text: "Course",
        value: "course",
        sortable: true,
      },
      {
        text: "Enrollment Status",
        value: "enrollmentStatus",
        sortable: true,
      },
      {
        text: "Student Status",
        value: "studentStatus",
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
    ...mapGetters("students", ["filteredStudent"]),

    filteredStudents() {
      return this.filterStudentsByType();
    },
  },

  methods: {
    ...mapActions("students", ["fetchStudents", "deleteStudent"]),

    handleTabChange() {
      this.filterStudentsByType();
    },

    filterStudentsByType() {
      let filteredStudents = this.$store.getters["students/filteredStudent"](this.search);
      
      switch (this.selectedTab) {
        case 1:
          return filteredStudents.filter(student => 
            student.enrollments?.[0]?.studentStatus === 'regular'
          );
        case 2:
          return filteredStudents.filter(student => 
            student.enrollments?.[0]?.studentStatus === 'irregular'
          );
        default:
          return filteredStudents;
      }
    },

    getStatusColor(status) {
      const colors = {
        pending: "warning",
        evaluated: "info",
        enrolled: "success",
        regular: "success",
        irregular: "warning"
      };
      return colors[status] || "warning";
    },

    handleTableUpdate(options) {
      this.options = options;
      this.fetchStudents();
    },

    resetFilters() {
      this.filters = {
        course: null,
        year: null,
        section: null,
      };
      this.selectedTab = 'all';
      this.fetchStudents();
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

    selectStudent(item) {
      this.$router.push({
        name: "Student Profile",
        params: { id: item._id },
      });
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