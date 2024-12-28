<template>
  <v-container>
    <v-card elevation="2">
      <v-card-title class="d-flex align-center py-3">
        <v-icon large color="#d2691e" class="mr-2">mdi-account-group</v-icon>
        <span class="text-h5">User Management</span>
        <v-spacer></v-spacer>

        <v-btn color="#d2691e" dark @click="openCreateDialog" class="px-4">
          <v-icon left>mdi-plus</v-icon>
          Add User
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="users"
        :loading="loading"
        :options.sync="options"
        :footer-props="{
          'items-per-page-options': [5, 10, 25, 50],
          showFirstLastPage: true,
        }"
        class="elevation-1"
      >
        <template v-slot:item.name.firstName="{ item }">
          {{ item.name.firstName }}
          {{ item.name.middleName ? item.name.middleName + " " : "" }}
          {{ item.name.surname }}
          {{ item.name.nameExtension ? item.name.nameExtension : "" }}
        </template>

        <template v-slot:item.accountStatus="{ item }">
          <v-chip
            :color="item.accountStatus === 'active' ? 'success' : 'error'"
            small
            label
          >
            {{ item.accountStatus }}
          </v-chip>
        </template>

        <template v-slot:item.role="{ item }">
          <v-chip
            v-for="role in item.role"
            :key="role._id"
            small
            class="mr-1"
            color="primary"
          >
            {{ role.name }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                small
                color="primary"
                class="mr-1"
                v-bind="attrs"
                v-on="on"
                @click="editUser(item)"
              >
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit User</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                small
                color="error"
                v-bind="attrs"
                v-on="on"
                @click="confirmDelete(item)"
              >
                <v-icon small>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Delete User</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>

    <!-- Create/Edit User Dialog -->
    <v-dialog v-model="dialog" max-width="700px" persistent>
      <v-card>
        <v-card-title
          class="headline white--text d-flex align-center"
          style="background-color: #a52a2a"
        >
          {{ editMode ? "Edit User" : "Create New User" }}
          <v-spacer></v-spacer>
          <v-btn icon dark @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pt-6">
          <v-form ref="form" v-model="valid" lazy-validation>
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
                  v-model="form.email"
                  :rules="formRules.email"
                  label="Email"
                  required
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.username"
                  :rules="formRules.required"
                  label="Username"
                  required
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.password"
                  :rules="editMode ? [] : formRules.required"
                  label="Password"
                  :required="!editMode"
                  type="password"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="form.role"
                  :items="roles"
                  item-text="name"
                  item-value="_id"
                  :rules="formRules.required"
                  label="Role"
                  required
                  multiple
                  chips
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.employeeId"
                  label="Employee ID"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <!-- After existing form fields -->
              <v-col cols="12" md="6">
                <v-select
                  v-model="form.academicInfo.department"
                  :items="departments"
                  item-text="name"
                  item-value="_id"
                  label="Department"
                  outlined
                  dense
                ></v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="form.academicInfo.employmentStatus"
                  :items="['full-time', 'part-time']"
                  label="Employment Status"
                  outlined
                  dense
                ></v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-menu
                  v-model="dateMenu"
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
                    @input="dateMenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="form.accountStatus"
                  :items="['active', 'inactive']"
                  label="Account Status"
                  required
                  outlined
                  dense
                ></v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="closeDialog">
            Cancel
          </v-btn>
          <v-btn
            color="#d2691e"
            :disabled="!valid"
            :loading="loading"
            @click="handleSubmit"
            dark
          >
            {{ editMode ? "Save" : "Create" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="headline error--text">
          Confirm Delete
        </v-card-title>
        <v-card-text>
          Are you sure you want to delete user
          <strong
            >{{ userToDelete?.name?.firstName }}
            {{ userToDelete?.name?.surname }}</strong
          >? This action cannot be undone.
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

    <v-snackbar
      v-model="showSnackbar"
      :color="snackbarColor"
      :timeout="3000"
      top
    >
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="showSnackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "UserListView",

  data: () => ({
    valid: false,
    dialog: false,
    deleteDialog: false,
    editMode: false,
    userToDelete: null,
    showSnackbar: false,
    snackbarText: "",
    snackbarColor: "success",
    options: {
      itemsPerPage: 10,
    },
    form: {
      name: {
        firstName: "",
        surname: "",
        middleName: "",
        nameExtension: "",
      },
      email: "",
      username: "",
      password: "",
      role: [],
      employeeId: "",
      accountStatus: "active",
      academicInfo: {
        department: null,
        employmentStatus: "full-time",
        dateHired: null,
      },
    },
    dateMenu: false,
    formRules: {
      required: [(v) => !!v || "This field is required"],
      email: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
    },
    headers: [
      {
        text: "Name",
        align: "start",
        value: "name.firstName",
        sortable: true,
      },
      { text: "Email", value: "email" },
      { text: "Username", value: "username" },
      { text: "Employee ID", value: "employeeId" },
      { text: "Roles", value: "role" },
      { text: "Status", value: "accountStatus" },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "end",
      },
    ],
  }),

  computed: {
    ...mapState("users", ["users", "loading", "error"]),
    ...mapState("roles", ["roles"]),
    ...mapState("departments", ["departments"]),
  },

  methods: {
    ...mapActions("users", [
      "fetchUsers",
      "createUser",
      "updateUser",
      "deleteUser",
    ]),
    ...mapActions("roles", ["fetchRoles"]),
    ...mapActions("departments", ["fetchDepartments"]),

    openCreateDialog() {
      this.dialog = true;
      this.editMode = false;
      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.reset();
        }
      });
    },

    closeDialog() {
      this.dialog = false;
      this.editMode = false;
      this.form = {
        name: {
          firstName: "",
          surname: "",
          middleName: "",
          nameExtension: "",
        },
        email: "",
        username: "",
        password: "",
        role: [],
        employeeId: "",
        accountStatus: "active",
        academicInfo: {
          department: null,
          employmentStatus: "full-time",
          dateHired: null,
        },
      };
      if (this.$refs.form) {
        this.$refs.form.reset();
      }
    },

    editUser(user) {
      console.log(user);
      this.editMode = true;

      this.form = {
        ...user,
        password: "",
        role: user.role.map((r) => r._id),
        academicInfo: {
          department: user.academicInfo?.department?._id || null,
          employmentStatus: user.academicInfo?.employmentStatus || "full-time",
          dateHired: user.academicInfo?.dateHired || null,
        },
      };

      this.dialog = true;
    },

    async handleSubmit() {
      if (this.$refs.form.validate()) {
        try {
          if (this.editMode) {
            await this.updateUser({ id: this.form._id, userData: this.form });
            this.showMessage("User updated successfully");
          } else {
            await this.createUser(this.form);
            this.showMessage("User created successfully");
          }
          this.closeDialog();
          await this.fetchUsers();
        } catch (error) {
          this.showMessage(error.message || "An error occurred", "error");
        }
      }
    },

    confirmDelete(user) {
      this.userToDelete = user;
      this.deleteDialog = true;
    },

    async handleDelete() {
      if (!this.userToDelete) return;

      try {
        await this.deleteUser(this.userToDelete._id);
        this.deleteDialog = false;
        this.userToDelete = null;
        await this.fetchUsers();
        this.showMessage("User deleted successfully");
      } catch (error) {
        this.showMessage(error.message || "An error occurred", "error");
      }
    },

    showMessage(text, color = "success") {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.showSnackbar = true;
    },
  },

  async created() {
    try {
      await Promise.all([
        this.fetchUsers(),
        this.fetchRoles(),
        this.fetchDepartments(),
      ]);
    } catch (error) {
      this.showMessage(error.message || "An error occurred", "error");
    }
  },
};
</script>
