<template>
  <v-container>
    <v-card elevation="2">
      <!-- Header Section -->
      <v-card-title class="d-flex align-center py-3">
        <v-icon large color="#d2691e" class="mr-2">mdi-shield-account</v-icon>
        <span class="text-h5">Role Management</span>
        <v-spacer></v-spacer>

        <!-- Search Field -->
        <v-text-field
          v-model="options.search"
          prepend-inner-icon="mdi-magnify"
          label="Search roles..."
          single-line
          hide-details
          outlined
          dense
          class="mr-4"
          style="max-width: 300px"
          @keyup.enter="handleSearch"
        ></v-text-field>

        <!-- Add Role Button -->
        <v-btn color="#d2691e" dark @click="openCreateDialog" class="px-4">
          <v-icon left>mdi-plus</v-icon>
          Add Role
        </v-btn>
      </v-card-title>

      <!-- Data Table -->
      <v-data-table
        :headers="headers"
        :items="roles"
        :loading="loading"
        :options.sync="options"
        :footer-props="{
          'items-per-page-options': [5, 10, 25, 50],
          showFirstLastPage: true,
        }"
        class="elevation-1"
      >
        <!-- Custom Column Slots -->
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
                @click="editRole(item)"
              >
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit Role</span>
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
            <span>Delete Role</span>
          </v-tooltip>
        </template>

        <!-- No Data/Loading States -->
        <template v-slot:no-data>
          <v-alert type="info" dense text>No roles found</v-alert>
        </template>

        <template v-slot:progress>
          <v-overlay absolute color="white">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </v-overlay>
        </template>
      </v-data-table>
    </v-card>

    <!-- Create/Edit Role Dialog -->
    <v-dialog v-model="dialog" max-width="500px" persistent>
      <v-card>
        <v-card-title class="headline white--text d-flex align-center" style="background-color: #a52a2a">
          {{ editMode ? 'Edit Role' : 'Create New Role' }}
          <v-spacer></v-spacer>
          <v-btn icon dark @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pt-6">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="form.name"
              :rules="formRules.name"
              label="Role Name"
              required
              outlined
              dense
            ></v-text-field>
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
            {{ editMode ? 'Save' : 'Create' }}
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
          Are you sure you want to delete role <strong>{{ roleToDelete?.name }}</strong>? This action cannot be undone.
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

    <!-- Snackbar for notifications -->
    <v-snackbar v-model="showSnackbar" :color="snackbarColor" :timeout="3000" top>
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="showSnackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'RoleListView',

  data: () => ({
    valid: false,
    dialog: false,
    deleteDialog: false,
    editMode: false,
    roleToDelete: null,
    showSnackbar: false,
    snackbarText: '',
    snackbarColor: 'success',
    options: {
      page: 1,
      itemsPerPage: 10,
      search: '',
    },
    form: {
      name: '',
    },
    formRules: {
      name: [
        v => !!v || 'Role name is required',
        v => (v && v.length >= 2) || 'Role name must be at least 2 characters',
      ],
    },
    headers: [
      {
        text: 'Role Name',
        align: 'start',
        value: 'name',
      },
      {
        text: 'Created At',
        value: 'createdAt',
      },
      {
        text: 'Updated At',
        value: 'updatedAt',
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false,
        align: 'end',
      },
    ],
  }),

  computed: {
    ...mapState('roles', ['roles', 'loading', 'error']),
  },

  methods: {
    ...mapActions('roles', ['fetchRoles', 'createRole', 'updateRole', 'deleteRole']),

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
      this.form = { name: '' };
      if (this.$refs.form) {
        this.$refs.form.reset();
      }
    },

    editRole(role) {
      this.editMode = true;
      this.form = { ...role };
      this.dialog = true;
    },

    async handleSubmit() {
      if (this.$refs.form.validate()) {
        try {
          if (this.editMode) {
            await this.updateRole({ id: this.form._id, roleData: this.form });
            this.showMessage('Role updated successfully');
          } else {
            await this.createRole(this.form);
            this.showMessage('Role created successfully');
          }
          this.closeDialog();
          await this.fetchRoles();
        } catch (error) {
          this.showMessage(this.error, 'error');
        }
      }
    },

    confirmDelete(role) {
      this.roleToDelete = role;
      this.deleteDialog = true;
    },

    async handleDelete() {
      if (!this.roleToDelete) return;

      try {
        await this.deleteRole(this.roleToDelete._id);
        this.deleteDialog = false;
        this.roleToDelete = null;
        await this.fetchRoles();
        this.showMessage('Role deleted successfully');
      } catch (error) {
        this.showMessage(this.error, 'error');
      }
    },

    showMessage(text, color = 'success') {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.showSnackbar = true;
    },

    handleSearch() {
      this.fetchRoles();
    },
  },

  async created() {
    try {
      await this.fetchRoles();
    } catch (error) {
      this.showMessage(this.error, 'error');
    }
  },

  watch: {
    options: {
      handler() {
        this.fetchRoles();
      },
      deep: true,
    },
  },
};
</script>