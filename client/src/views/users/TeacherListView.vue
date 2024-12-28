<template>
  <v-container>
    <v-card class="mb-4">
      <v-row align="center" no-gutters>
        <v-col cols="12">
          <div class="d-flex justify-space-between pa-4">
            <v-text-field
              v-model="options.search"
              prepend-inner-icon="mdi-magnify"
              placeholder="Search professors..."
              hide-details
              single-line
              filled
              rounded
              dense
              class="search-field"
              style="max-width: 300px"
              @keyup.enter="fetchProfessors"
            ></v-text-field>

            <v-btn color="primary" @click="openCreateDialog">
              <v-icon left>mdi-plus</v-icon>
              New Professor
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <v-card>
      <v-data-table
        :headers="headers"
        :items="professors"
        :loading="loading"
        :options.sync="options"
        :server-items-length="totalProfessors"
        :items-per-page="10"
      >
        <template v-slot:item.select="{ item }">
          <v-btn x-small color="primary" @click="selectProfessor(item)" dark>
            Select
          </v-btn>
        </template>

        <template v-slot:item.fullName="{ item }">
          {{
            `${item.name.surname}, ${item.name.firstName} ${
              item.name.middleName || ""
            }${item.name.nameExtension ? " " + item.name.nameExtension : ""}`
          }}
        </template>

        <template v-slot:item.academicInfo.department="{ item }">
          {{ item.academicInfo.department.name }}
        </template>

        <template v-slot:item.academicInfo.employmentStatus="{ item }">
          {{ item.academicInfo.employmentStatus }}
        </template>

        <template v-slot:item.academicInfo.dateHired="{ item }">
          {{ formatEmploymentDate(item.academicInfo.dateHired) }}
        </template>

        <template v-slot:item.actions="{ item }">
          <div class="d-flex justify-end">
            <v-btn
              icon
              small
              color="primary"
              class="mr-2"
              @click="editProfessor(item)"
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
            <v-icon size="64" color="grey lighten-1">mdi-account-tie</v-icon>
            <div class="text-h6 grey--text text--darken-1 mt-4">
              No professors found
            </div>
            <div class="text-body-2 grey--text mt-2">
              Try adjusting your search or add a new professor
            </div>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-card-title
          class="headline white--text d-flex align-center"
          style="background-color: #a52a2a"
        >
          {{ editMode ? "Edit Professor" : "Create New Professor" }}
          <v-spacer></v-spacer>
          <v-btn icon dark @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-form ref="form" v-model="formValid" @submit.prevent>
          <v-card-text class="pt-6">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.name.firstName"
                    :rules="formRules.required"
                    label="First Name"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.name.surname"
                    :rules="formRules.required"
                    label="Last Name"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.name.middleName"
                    label="Middle Name"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.name.nameExtension"
                    label="Name Extension"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.employeeId"
                    :rules="formRules.required"
                    label="Employee ID"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="form.academicInfo.department"
                    :items="departments"
                    item-text="name"
                    item-value="_id"
                    :rules="formRules.required"
                    label="Department"
                    required
                    outlined
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="form.academicInfo.employmentStatus"
                    :items="['full-time', 'part-time', 'adjunct', 'visiting']"
                    label="Employment Status"
                    :rules="formRules.required"
                    required
                    outlined
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-menu
                    v-model="dateHiredMenu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.academicInfo.dateHired"
                        label="Date Hired"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        outlined
                        dense
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.academicInfo.dateHired"
                      @input="dateHiredMenu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="form.accountStatus"
                    :items="['active', 'inactive', 'on-leave', 'terminated']"
                    label="Account Status"
                    outlined
                    dense
                  ></v-select>
                </v-col>
              </v-row>
          </v-card-text>

          <v-card-actions>
            <v-btn text color="grey darken-1" @click="closeDialog">
              Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="handleSubmit"
              :loading="loading"
              :disabled="!formValid"
            >
              {{ editMode ? "Save Changes" : "Create Professor" }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="headline error--text">Confirm Delete</v-card-title>
        <v-card-text>
          Are you sure you want to delete this professor?
          <div class="mt-2">
            <strong>
              {{ professorToDelete?.name?.surname }},
              {{ professorToDelete?.name?.firstName }}
              {{ professorToDelete?.name?.middleName }}
            </strong>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="deleteDialog = false">
            Cancel
          </v-btn>
          <v-btn color="error" @click="handleDelete" :loading="loading">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
  name: "ProfessorListView",

  data: () => ({
    dialog: false,
    deleteDialog: false,
    dateHiredMenu: false,
    formValid: false,
    options: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    headers: [
      { text: "Select", value: "select", sortable: false, width: "80px" },
      { text: "Employee ID", value: "employeeId" },
      { text: "Name", value: "fullName" },
      { text: "Department", value: "academicInfo.department.name" },
      { text: "Position", value: "academicInfo.position" },
      { text: "Employment Status", value: "academicInfo.employmentStatus" },
      { text: "Date Hired", value: "academicInfo.dateHired" },
      { text: "Actions", value: "actions", sortable: false, align: "end" },
    ],
    form: {
      employeeId: "",
      name: {
        firstName: "",
        surname: "",
        middleName: "",
        nameExtension: "",
      },
      academicInfo: {
        department: null,
        employmentStatus: "full-time",
        dateHired: null,
      },
      accountStatus: "active",
      role: [],
    },
    rules: {
      required: [(v) => !!v || "This field is required"],
    },
    editMode: false,
    loading: false,
    professorToDelete: null,
    snackbar: false,
    snackbarColor: "",
    snackbarText: "",
    formRules: {
      required: [(v) => !!v || "This field is required"],
    },
  }),

  computed: {
    ...mapState("professors", ["professors", "totalProfessors"]),
    ...mapState("departments", ["departments"]),
    ...mapState("roles", ["roles"]),
  },

  methods: {
    ...mapActions("professors", [
      "fetchProfessors",
      "createProfessor",
      "updateProfessor",
      "deleteProfessor",
    ]),
    ...mapActions("departments", ["fetchDepartments"]),
    ...mapActions("roles", ["fetchRoles"]),

    formatEmploymentDate(date) {
      return date ? moment(date).format("YYYY-MM-DD") : "N/A";
    },

    resetForm() {
      this.form = {
        employeeId: "",
        name: {
          surname: "",
          firstName: "",
          middleName: "",
          nameExtension: "",
        },
        academicInfo: {
          department: null,
          position: "",
          employmentStatus: "",
          dateHired: "",
        },
        accountStatus: "active",
      };
      if (this.$refs.form) this.$refs.form.resetValidation();
    },

    openCreateDialog() {
      this.editMode = false;
      this.dialog = true;
      this.resetForm();
    },

    closeDialog() {
      this.dialog = false;
      this.$nextTick(() => {
        this.resetForm();
      });
    },

    editProfessor(item) {
      this.editMode = true;
      this.form = {
        _id: item._id,
        employeeId: item.employeeId,
        name: { ...item.name },
        academicInfo: {
          ...item.academicInfo,
          dateHired: moment(item.academicInfo.dateHired).format("YYYY-MM-DD"),
        },
        accountStatus: item.accountStatus,
        role: item.role.map((r) => r._id),
      };
      this.dialog = true;
    },

    confirmDelete(item) {
      this.professorToDelete = item;
      this.deleteDialog = true;
    },

    async handleSubmit() {


      if (!this.$refs.form.validate()) return;

      this.loading = true;
      try {
        const professorRole = this.roles.find(
          (role) => role.name.toLowerCase() === "professor"
        );
        if (!professorRole) {
          throw new Error("Professor role not found");
        }

        this.form.role = [professorRole._id];

        if (this.editMode) {
          await this.updateProfessor({
            id: this.form._id,
            professorData: this.form,
          });
          this.showSnackbarMessage(
            "Professor updated successfully!",
            "success"
          );
        } else {
          await this.createProfessor(this.form);
          this.showSnackbarMessage(
            "Professor created successfully!",
            "success"
          );
        }

        this.closeDialog();
        this.fetchProfessors();
      } catch (error) {
        this.showSnackbarMessage(
          error.response?.data?.message || "An error occurred!",
          "error"
        );
      } finally {
        this.loading = false;
      }
    },

    async handleDelete() {
      this.loading = true;
      try {
        await this.deleteProfessor(this.professorToDelete._id);
        this.showSnackbarMessage("Professor deleted successfully!", "success");
        this.fetchProfessors();
      } catch (error) {
        this.showSnackbarMessage(
          error.response?.data?.message || "Failed to delete professor!",
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

    async loadInitialData() {
      try {
        this.loading = true;
        await Promise.all([
          this.fetchProfessors(),
          this.fetchDepartments(),
          this.fetchRoles(),
        ]);
      } catch (error) {
        this.showSnackbarMessage("Failed to load data", "error");
      } finally {
        this.loading = false;
      }
    },

    selectProfessor(item) {
      this.$router.push({
        name: "Teacher Profile",
        params: { id: item._id },
      });
    },
  },

  created() {
    this.loadInitialData();
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
