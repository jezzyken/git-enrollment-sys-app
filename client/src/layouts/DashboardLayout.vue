<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      :mini-variant.sync="mini"
      width="240"
      mini-variant-width="64"
      :temporary="$vuetify.breakpoint.mobile"
      color="#a52a2a"
      dark
    >
      <v-list-item class="px-2 py-4">
        <v-list-item-avatar>
          <v-avatar color="white darken-1" size="48">
            <span class="initial text-body-1">{{ userInitials }}</span>
          </v-avatar>
        </v-list-item-avatar>

        <v-list-item-content v-if="!mini">
          <v-list-item-title class="white--text text-subtitle-1">
            {{ userFullName }}
          </v-list-item-title>
          <v-list-item-subtitle class="white--text text-caption">
            {{ formattedRoles }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list dense class="drawer-list">
        <v-list-item>
          <v-list-item-icon>
            <v-icon class="white--text">mdi-home-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content v-if="!mini">
            <v-list-item-title class="white--text"
              >GIT Enrollment System</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <template v-for="item in menuItems">
          <!-- Regular menu item -->
          <v-list-item
            v-if="!item.children"
            :key="item.title"
            :to="item.to"
            link
            class="drawer-item white--text"
            :class="{ 'active-item': $route.path === item.to }"
          >
            <v-list-item-icon>
              <v-icon class="white--text">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content v-if="!mini">
              <v-list-item-title class="white--text">{{
                item.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- Group with sub-items -->
          <v-list-group
            v-else
            :key="item.title"
            :prepend-icon="item.icon"
            class="drawer-item"
            :value="isGroupActive(item)"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title class="white--text">{{
                  item.title
                }}</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="child in item.children"
              :key="child.title"
              :to="child.to"
              link
              class="drawer-sub-item white--text"
              :class="{ 'active-item': $route.path === child.to }"
            >
              <v-list-item-icon>
                <v-icon class="white--text">{{ child.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content v-if="!mini">
                <v-list-item-title class="white--text">{{
                  child.title
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="white" elevation="1">
      <v-app-bar-nav-icon
        @click.stop="toggleDrawer"
        color="#a52a2a"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="brown--text text--darken-4"
        >GIT Enrollment System</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon color="#a52a2a">mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="item in accountMenu"
            :key="item.title"
            @click="handleAction(item.action)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "DashboardLayout",

  data: () => ({
    drawer: true,
    mini: false,
    allMenuItems: {
      dashboard: {
        title: "Dashboard",
        icon: "mdi-view-dashboard",
        to: "/dashboard",
      },
      enrollment: {
        title: "Enrollment",
        icon: "mdi-view-dashboard",
        to: "/enrollment",
      },
      academics: {
        title: "Academics",
        icon: "mdi-school",
        children: [
          {
            title: "Subjects",
            icon: "mdi-book-open-variant",
            to: "/academics/subjects",
          },
          {
            title: "Courses",
            icon: "mdi-book-multiple",
            to: "/academics/courses",
          },
          {
            title: "Departments",
            icon: "mdi-domain",
            to: "/academics/departments",
          },
        ],
      },
      professor: {
        title: "Professor",
        icon: "mdi-account-tie",
        to: "/teachers",
      },
      students: {
        title: "Students",
        icon: "mdi-account-group",
        to: "/students",
      },
      users: { title: "Users", icon: "mdi-account-multiple", to: "/users" },
      roles: { title: "Roles", icon: "mdi-account-multiple", to: "/roles" },
      reports: { title: "Reports", icon: "mdi-file-chart", to: "/reports" },
    },
    accountMenu: [
      {
        title: "Profile",
        icon: "mdi-account",
        action: "goToProfile",
      },
      {
        title: "Logout",
        icon: "mdi-logout",
        action: "logout",
      },
    ],
  }),

  computed: {
    userData() {
      return JSON.parse(localStorage.getItem("user"))?.user || null;
    },

    userRoles() {
      return this.userData?.role?.map(r => r.name.toLowerCase()) || [];
    },

    userInitials() {
      if (!this.userData) return "";

      const firstName = this.userData.name.firstName.charAt(0) || "";
      const surname = this.userData.name.surname.charAt(0) || "";
      return (firstName + surname).toUpperCase();
    },

    userFullName() {
      if (!this.userData) return "";

      const firstName = this.capitalizeFirstLetter(
        this.userData.name.firstName
      );
      const surname = this.capitalizeFirstLetter(this.userData.name.surname);
      return `${firstName} ${surname}`;
    },

    formattedRoles() {
      if (!this.userData?.role || !this.userData.role.length) return "";

      return this.userData.role
        .map((role) => this.capitalizeFirstLetter(role.name))
        .join(" • ");
    },

    menuItems() {
      const roleMenuMap = {
        'program head': ['dashboard', 'enrollment', 'professor', 'students'],
        'registrar': ['dashboard', 'enrollment', 'students'],
        'admin': Object.keys(this.allMenuItems), 
      };

      const allowedMenus = new Set();
      this.userRoles.forEach(role => {
        const menus = roleMenuMap[role] || [];
        menus.forEach(menu => allowedMenus.add(menu));
      });

      return Object.keys(this.allMenuItems)
        .filter(key => allowedMenus.has(key))
        .map(key => this.allMenuItems[key]);
    },
  },

  methods: {
    ...mapActions("auth", ["logout"]),

    capitalizeFirstLetter(string) {
      if (!string) return "";
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },

    isGroupActive(item) {
      if (!item.children) return false;
      return item.children.some((child) => this.$route.path === child.to);
    },

    toggleDrawer() {
      if (this.$vuetify.breakpoint.mobile) {
        this.drawer = !this.drawer;
      } else {
        this.mini = !this.mini;
        this.drawer = true;
      }
    },

    goToProfile() {
      this.$router.push({ name: "Profile" });
    },

    handleAction(action) {
      if (this[action]) {
        this[action]();
      }
    },
  },

  watch: {
    $route() {
      if (this.$vuetify.breakpoint.mobile) {
        this.drawer = false;
      }
    },
  },
};
</script>

<style>
.drawer-list {
  color: white !important;
}

.drawer-list .v-list-item__icon .v-icon {
  color: white !important;
}

.v-list-group__header.v-list-item--active:before {
  opacity: 0.12;
  background-color: white !important;
}

.v-list-group__header .v-list-group__header__prepend-icon.v-icon {
  color: white !important;
}

.v-list-group__header .v-list-group__header__append-icon.v-icon {
  color: white !important;
}

.active-item {
  background-color: rgba(255, 255, 255, 0.12) !important;
  color: white !important;
}

.active-item .v-icon {
  color: white !important;
}

.v-list-group--active > .v-list-group__header {
  background-color: rgba(255, 255, 255, 0.08) !important;
}

.drawer-sub-item.active-item {
  background-color: rgba(255, 255, 255, 0.12) !important;
  color: white !important;
  margin-left: 8px !important;
  border-radius: 0 4px 4px 0 !important;
}

.drawer-item:hover,
.drawer-sub-item:hover {
  background-color: rgba(255, 255, 255, 0.04) !important;
}

.v-list-item,
.v-icon,
.v-list-item__title {
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out !important;
}

.v-list-item__avatar {
  min-width: 48px !important;
}

.v-list-item__subtitle {
  white-space: normal !important;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.initial{
  color: #a52a2a
}
</style>
