<template>
  <v-container>
    <v-card class="mb-4">
      <v-row align="center" no-gutters>
        <v-col cols="12">
          <div class="d-flex justify-space-between pa-4">
            <v-text-field
              v-model="options.search"
              prepend-inner-icon="mdi-magnify"
              placeholder="Search departments..."
              hide-details
              single-line
              filled
              rounded
              dense
              class="search-field"
              style="max-width: 300px"
              @keyup.enter="fetchDepartments"
            ></v-text-field>

            <v-btn color="primary" @click="openCreateDialog">
              <v-icon left>mdi-plus</v-icon>
              New Department
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <v-card>
      <v-data-table
        :headers="headers"
        :items="departments"
        :loading="loading"
        :options.sync="options"
        :server-items-length="totalDepartments"
        :items-per-page="10"
      >
        <template v-slot:item.actions="{ item }">
          <div class="d-flex justify-end">
            <v-btn
              icon
              small
              color="primary"
              class="mr-2"
              @click="editDepartment(item)"
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
            <v-icon size="64" color="grey lighten-1">mdi-domain</v-icon>
            <div class="text-h6 grey--text text--darken-1 mt-4">
              No departments found
            </div>
            <div class="text-body-2 grey--text mt-2">
              Try adjusting your search or add a new department
            </div>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <!-- Department Form Dialog -->
    <v-dialog v-model="createDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{
            editMode ? "Edit Department" : "New Department"
          }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.name"
                    :rules="formRules.name"
                    label="Department Name"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
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

    <!-- Delete Dialog -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="error--text">
          <v-icon left color="error">mdi-alert-circle</v-icon>
          Confirm Delete
        </v-card-title>

        <v-card-text class="pt-4">
          Are you sure you want to delete this department?
          <div class="mt-4 pa-4 grey lighten-4 rounded">
            <div class="font-weight-medium">
              {{ departmentToDelete?.name }}
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
  name: "DepartmentListView",

  data: () => ({
    valid: false,
    options: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    createDialog: false,
    deleteDialog: false,
    departmentToDelete: null,
    form: { name: "" },
    formRules: {
      name: [(v) => !!v || "Department name is required"],
    },
    headers: [
      { text: "Department Name", align: "start", value: "name" },
      { text: "Actions", value: "actions", sortable: false, align: "end" },
    ],
    editMode: false,
    loading: false,
    snackbarColor: "",
    snackbarText: "",
    showSnackbar: false,
  }),

  computed: {
    ...mapState("departments", ["departments", "totalDepartments"]),
  },

  methods: {
    ...mapActions("departments", [
      "fetchDepartments",
      "createDepartment",
      "updateDepartment",
      "deleteDepartment",
    ]),

    openCreateDialog() {
      this.editMode = false;
      this.createDialog = true;
      this.form = { name: "" };
    },

    closeCreateDialog() {
      this.createDialog = false;
      this.form = { name: "" };
      if (this.$refs.form) this.$refs.form.reset();
    },

    async handleCreate() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          if (this.editMode) {
            await this.updateDepartment({
              id: this.form._id,
              departmentData: this.form,
            });
            this.showSnackbarMessage(
              "Department updated successfully!",
              "success"
            );
          } else {
            await this.createDepartment(this.form);
            this.showSnackbarMessage(
              "Department created successfully!",
              "success"
            );
          }
          this.fetchDepartments();
          this.closeCreateDialog();
        } catch (error) {
          this.showSnackbarMessage(
            error.response?.data?.message || "An error occurred!",
            "error"
          );
        } finally {
          this.loading = false;
        }
      }
    },

    editDepartment(item) {
      this.editMode = true;
      this.form = { ...item };
      this.createDialog = true;
    },

    confirmDelete(item) {
      this.departmentToDelete = item;
      this.deleteDialog = true;
    },

    async handleDelete() {
      this.loading = true;
      try {
        await this.deleteDepartment(this.departmentToDelete._id);
        this.showSnackbarMessage("Department deleted successfully!", "success");
        this.fetchDepartments();
      } catch (error) {
        this.showSnackbarMessage("Failed to delete department!", "error");
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

    async handleSearch() {
      this.options.page = 1;
      await this.fetchDepartments();
    },
  },

  created() {
    this.fetchDepartments();
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
