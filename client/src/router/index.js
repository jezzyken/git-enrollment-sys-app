import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/LoginView.vue"),
    meta: { guest: true },
  },
  {
    path: "/",
    component: () => import("@/layouts/DashboardLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        redirect: "/dashboard",
      },
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/DashboardView.vue"),
      },
      {
        path: "/users",
        name: "Users",
        component: () => import("@/views/users/UserListView.vue"),
      },
      {
        path: "/profile",
        name: "Profile",
        component: () => import("@/views/users/ProfileView.vue"),
      },
      {
        path: "/academics/departments",
        name: "Departments",
        component: () => import("@/views/academics/DepartmentListView.vue"),
      },
      {
        path: "/academics/courses",
        name: "Courses",
        component: () => import("@/views/academics/CourseListView.vue"),
      },
      {
        path: "/academics/subjects",
        name: "Subjects",
        component: () => import("@/views/academics/SubjectListView.vue"),
      },
      {
        path: "/academics/schedules",
        name: "Schedules",
        component: () => import("@/views/academics/ClassScheduleView.vue"),
      },
      {
        path: "/students",
        name: "StudentList",
        component: () => import("@/views/users/StudentListView.vue"),
      },
      {
        path: "/students/:action(add|edit|view)",
        name: "StudentForm",
        component: () => import("@/views/users/StudentFormView.vue"),
        props: true,
      },
      {
        path: "/students/:id/profile",
        name: "Student Profile",
        component: () => import("@/views/users/StudentProfile.vue"),
      },
      {
        path: "/teachers",
        name: "Teacchers",
        component: () => import("@/views/users/TeacherListView.vue"),
      },
      {
        path: "/teachers/:id/class-schedule",
        name: "Class Schedule",
        component: () => import("@/views/users/TeacherClassScheduleView.vue"),
      },
      {
        path: "/professor/:id/profile",
        name: "Teacher Profile",
        component: () => import("@/views/users/ProfessorProfile.vue"),
      },
      {
        path: "/enrollment",
        name: "Enrollment",
        component: () => import("@/views/enrollment/EnrollmentForm.vue"),
      },
      {
        path: "/reports",
        component: () => import("@/views/reports/ReportsView.vue"),
        children: [
          {
            path: "",
            name: "Reports",
          },
          {
            path: "teachers",
            name: "TeacherReport",
            component: () => import("@/views/reports/TeacherReport.vue"),
            meta: {
              title: "Teacher Reports",
              requiresAuth: true,
            },
          },
          {
            path: "students",
            name: "StudentReport",
            component: () => import("@/views/reports/StudentReport.vue"),
            meta: {
              title: "Student Reports",
              requiresAuth: true,
            },
          },
          {
            path: "schedules",
            name: "ScheduleReport",
            component: () => import("@/views/reports/ClassSchduleReport.vue"),
            meta: {
              title: "Class Schedule Reports",
              requiresAuth: true,
            },
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = store.getters["auth/isAuthenticated"];

  console.log(requiresAuth, isAuthenticated);
  console.log("auth");

  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (to.meta.guest && isAuthenticated) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
