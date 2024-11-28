<template>
  <v-container fluid class="pa-6">
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-form ref="form" lazy-validation>
      <v-stepper v-model="currentStep" class="mb-6 elevation-1">
        <v-stepper-header>
          <v-stepper-step :complete="currentStep > 1" step="1">
            Student Type
            <small>New or Existing Student</small>
          </v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step :complete="currentStep > 2" step="2">
            Student Details
            <small>Basic Information</small>
          </v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step :complete="currentStep > 3" step="3">
            Enrollment Details
            <small>Academic Information</small>
          </v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step step="4">
            Review
            <small>Verify Details</small>
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card class="mb-6">
              <v-card-title class="headline primary white--text pa-2">
                Select Student Type
              </v-card-title>
              <v-card-text class="pa-6">
                <v-radio-group
                  v-model="enrollmentForm.enrollmentType"
                  mandatory
                >
                  <v-radio label="New Student" value="new"></v-radio>
                  <v-radio label="Existing Student" value="old"></v-radio>
                </v-radio-group>

                <!-- <v-expand-transition>
                  <div v-if="enrollmentForm.enrollmentType === 'old'">
                    <v-autocomplete
                      v-model="selectedStudent"
                      :items="students"
                      item-text="fullName"
                      item-value="_id"
                      label="Select Student"
                      outlined
                      dense
                      prepend-inner-icon="mdi-account"
                      required
                      @change="handleStudentSelect"
                    ></v-autocomplete>
                  </div>
                </v-expand-transition> -->

                <v-expand-transition>
                  <div v-if="enrollmentForm.enrollmentType === 'old'">
                    <v-card>
                      <div class="d-flex justify-end pa-4">
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
                          @keyup.enter="handleSearch"
                        ></v-text-field>
                      </div>

                      <v-data-table
                        :headers="studentHeaders"
                        :items="students"
                        :search="search"
                        :loading="loading"
                        single-select
                        show-select
                        @item-selected="handleStudentSelect"
                      >
                        <template v-slot:item.name="{ item }">
                          <div class="d-flex align-center py-2">
                            <v-avatar
                              color="primary lighten-4"
                              size="40"
                              class="mr-3"
                            >
                              <span class="primary--text font-weight-medium">
                                {{ item.name.firstName[0]
                                }}{{ item.name.surname[0] }}
                              </span>
                            </v-avatar>
                            <div class="font-weight-medium">
                              {{ item.name.surname }}, {{ item.name.firstName }}
                              {{
                                item.name.middleName
                                  ? item.name.middleName[0] + "."
                                  : ""
                              }}
                              {{ item.name.nameExtension || "" }}
                            </div>
                          </div>
                        </template>

                        <template v-slot:item.course="{ item }">
                          <v-chip small outlined color="primary">
                            {{ item.course.courseCode }}
                          </v-chip>
                        </template>
                        <!-- 
                        <template v-slot:item.enrollmentStatus="{ item }">
                          <v-chip
                            :color="
                              getStatusColor(
                                item.enrollments?.[0]?.enrollmentStatus
                              )
                            "
                            small
                            class="text-capitalize"
                          >
                            {{
                              item.enrollments?.[0]?.enrollmentStatus ||
                              "pending"
                            }}
                          </v-chip>
                        </template> -->
                      </v-data-table>
                    </v-card>
                  </div>
                </v-expand-transition>
              </v-card-text>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card v-if="enrollmentForm.enrollmentType === 'new'" class="mb-6">
              <v-card-title class="headline primary white--text pa-2">
                Student Information
              </v-card-title>
              <v-card-text class="pa-6">
                <v-row>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="studentForm.name.surname"
                      label="Surname*"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="studentForm.name.firstName"
                      label="First Name*"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="studentForm.name.middleName"
                      label="Middle Name"
                      outlined
                      dense
                      hint="Optional"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="studentForm.name.nameExtension"
                      label="Name Extension"
                      outlined
                      dense
                      hint="E.g., Jr., Sr., III"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="3">
                    <v-select
                      v-model="studentForm.personalInfo.gender"
                      :items="['Male', 'Female']"
                      label="Gender"
                      outlined
                      dense
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-menu
                      v-model="dateMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="formattedDateOfBirth"
                          label="Date of Birth"
                          readonly
                          outlined
                          dense
                          v-bind="attrs"
                          v-on="on"
                          prepend-inner-icon="mdi-calendar"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="studentForm.dateOfBirth"
                        @input="dateMenu = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>

                  <v-col cols="6">
                    <v-text-field
                      v-model="studentForm.homeAddress"
                      label="Home Address"
                      outlined
                      dense
                      placeholder="Enter complete address"
                      prepend-inner-icon="mdi-map-marker"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <v-card class="mb-6">
              <v-card-title class="headline primary white--text pa-2">
                Required Documents
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="white" v-bind="attrs" v-on="on">
                      mdi-information
                    </v-icon>
                  </template>
                  <span>Please check documents that have been submitted</span>
                </v-tooltip>
              </v-card-title>
              <v-card-text class="pa-6">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-list>
                      <v-list-item>
                        <v-list-item-action>
                          <v-checkbox
                            v-model="enrollmentForm.requirements.form137"
                            color="primary"
                          ></v-checkbox>
                        </v-list-item-action>
                        <v-list-item-content>
                          <v-list-item-title>Form 137</v-list-item-title>
                          <v-list-item-subtitle>
                            Academic records from previous school
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-action>
                          <v-checkbox
                            v-model="enrollmentForm.requirements.goodMoral"
                            color="primary"
                          ></v-checkbox>
                        </v-list-item-action>
                        <v-list-item-content>
                          <v-list-item-title
                            >Good Moral Certificate</v-list-item-title
                          >
                          <v-list-item-subtitle>
                            Character certification from previous school
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-action>
                          <v-checkbox
                            v-model="
                              enrollmentForm.requirements.birthCertificate
                            "
                            color="primary"
                          ></v-checkbox>
                        </v-list-item-action>
                        <v-list-item-content>
                          <v-list-item-title
                            >Birth Certificate</v-list-item-title
                          >
                          <v-list-item-subtitle>
                            PSA/NSO authenticated copy
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-list>
                      <v-list-item>
                        <v-list-item-action>
                          <v-checkbox
                            v-model="enrollmentForm.requirements.pictures"
                            color="primary"
                          ></v-checkbox>
                        </v-list-item-action>
                        <v-list-item-content>
                          <v-list-item-title>2x2 Pictures</v-list-item-title>
                          <v-list-item-subtitle>
                            Recent ID photos (white background)
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-action>
                          <v-checkbox
                            v-model="
                              enrollmentForm.requirements.transcriptOfRecords
                            "
                            color="primary"
                          ></v-checkbox>
                        </v-list-item-action>
                        <v-list-item-content>
                          <v-list-item-title
                            >Transcript of Records</v-list-item-title
                          >
                          <v-list-item-subtitle>
                            For transferee students only
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card class="mb-6">
              <v-card-title class="headline primary white--text pa-2">
                Enrollment Information
              </v-card-title>
              <v-card-text class="pa-6">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="enrollmentForm.academicYear"
                      :items="academicYears"
                      label="Academic Year*"
                      outlined
                      dense
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="enrollmentForm.semester"
                      :items="['First', 'Second']"
                      label="Semester*"
                      outlined
                      dense
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="enrollmentForm.yearLevel"
                      :items="[1, 2, 3, 4]"
                      label="Year Level*"
                      outlined
                      dense
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="enrollmentForm.course"
                      :items="courses"
                      item-text="courseName"
                      item-value="_id"
                      label="Course*"
                      outlined
                      dense
                      prepend-inner-icon="mdi-school"
                      required
                    ></v-select>
                  </v-col>

                  <v-col cols="12">
                    <v-select
                      v-model="enrollmentForm.subject"
                      :items="formattedSubjects"
                      :loading="loading"
                      item-text="displayName"
                      item-value="_id"
                      label="Select Subject*"
                      outlined
                      dense
                      @change="addSubject"
                    >
                      <template v-slot:selection="{ item }">
                        <span
                          >{{ item.subject.DescriptiveTitle }} -
                          {{ item.section }} -
                          {{ formatSchedule(item.schedule) }}</span
                        >
                      </template>
                      <template v-slot:item="{ item }">
                        <v-list-item-content>
                          <v-list-item-title class="font-weight-bold">
                            {{ item.subject.DescriptiveTitle }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            <v-chip x-small class="mr-2"
                              >Section {{ item.section }}</v-chip
                            >
                            <v-chip x-small
                              >Units: {{ item.subject.Units }}</v-chip
                            >
                          </v-list-item-subtitle>
                          <div class="mt-2">
                            <v-chip small outlined>
                              {{ formatSchedule(item.schedule) }}
                            </v-chip>
                          </div>
                        </v-list-item-content>
                      </template>
                    </v-select>

                    <v-card
                      v-if="selectedSubjects.length"
                      outlined
                      class="mt-3"
                    >
                      <v-card-title class="py-2 px-4 subtitle-1 grey lighten-4">
                        <v-icon left small color="primary"
                          >mdi-clipboard-list</v-icon
                        >
                        Selected Subjects
                        <v-spacer></v-spacer>
                        <v-chip small
                          >{{ selectedSubjects.length }} subject(s)</v-chip
                        >
                      </v-card-title>
                      <v-list dense>
                        <v-list-item
                          v-for="subject in selectedSubjects"
                          :key="subject._id"
                        >
                          <v-list-item-content>
                            <v-list-item-title>
                              {{ subject.subject.DescriptiveTitle }}
                              <v-chip x-small color="primary" class="ml-2">{{
                                subject.subject.catNo
                              }}</v-chip>
                            </v-list-item-title>
                            <v-list-item-subtitle>
                              Section: {{ subject.section }} | Room:
                              {{ subject.schedule[0].room }} |
                              {{ formatSchedule(subject.schedule) }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-btn icon small @click="removeSubject(subject)">
                              <v-icon small color="error">mdi-delete</v-icon>
                            </v-btn>
                          </v-list-item-action>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="4">
            <v-slide-x-transition>
              <div class="form-section">
                <v-card class="mb-6">
                  <v-card-title
                    class="headline primary white--text d-flex align-center pa-2"
                  >
                    Review Enrollment Details
                    <v-spacer></v-spacer>
                    <v-btn color="white" text>
                      <v-icon left>mdi-printer</v-icon>
                      Print
                    </v-btn>
                  </v-card-title>

                  <v-card-text class="review-content py-4">
                    <div class="d-flex align-center mb-6">
                      <v-avatar size="120" color="grey lighten-2" class="mr-6">
                        <v-icon size="48" color="grey darken-2"
                          >mdi-account</v-icon
                        >
                      </v-avatar>
                      <div>
                        <div class="text-h4 primary--text mb-1">
                          {{
                            enrollmentForm.enrollmentType === "new"
                              ? `${studentForm.name.surname}, ${
                                  studentForm.name.firstName
                                } ${studentForm.name.middleName || ""} ${
                                  studentForm.name.nameExtension || ""
                                }`
                              : getStudentFullName(selectedStudent)
                          }}
                        </div>
                        <div class="text-h6 grey--text">
                          {{ getCourseNameById(enrollmentForm.course) }}
                        </div>
                      </div>
                    </div>

                    <div class="review-section mb-6">
                      <div class="section-header">
                        <v-icon color="primary" class="mr-2">mdi-school</v-icon>
                        <span class="text-h6">Enrollment Information</span>
                        <v-btn
                          text
                          small
                          color="primary"
                          class="float-right"
                          @click="editSection(3)"
                        >
                          <v-icon left small>mdi-pencil</v-icon>
                          Edit
                        </v-btn>
                      </div>
                      <v-divider class="my-3"></v-divider>

                      <v-row dense>
                        <v-col cols="12" sm="6" md="4">
                          <div class="info-item">
                            <div class="info-label">Academic Year</div>
                            <div class="info-value">
                              {{ enrollmentForm.academicYear }}
                            </div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <div class="info-item">
                            <div class="info-label">Semester</div>
                            <div class="info-value">
                              {{ enrollmentForm.semester }}
                            </div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <div class="info-item">
                            <div class="info-label">Year Level</div>
                            <div class="info-value">
                              {{ enrollmentForm.yearLevel }}
                            </div>
                          </div>
                        </v-col>
                      </v-row>
                    </div>

                    <template v-if="enrollmentForm.enrollmentType === 'new'">
                      <div class="review-section mb-6">
                        <div class="section-header">
                          <v-icon color="primary" class="mr-2"
                            >mdi-account-details</v-icon
                          >
                          <span class="text-h6">Student Information</span>
                          <v-btn
                            text
                            small
                            color="primary"
                            class="float-right"
                            @click="editSection(2)"
                          >
                            <v-icon left small>mdi-pencil</v-icon>
                            Edit
                          </v-btn>
                        </div>
                        <v-divider class="my-3"></v-divider>

                        <v-row dense>
                          <v-col cols="12" sm="6" md="4">
                            <div class="info-item">
                              <div class="info-label">Gender</div>
                              <div class="info-value">
                                {{ studentForm.personalInfo.gender }}
                              </div>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <div class="info-item">
                              <div class="info-label">Date of Birth</div>
                              <div class="info-value">
                                {{ formattedDateOfBirth }}
                              </div>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <div class="info-item">
                              <div class="info-label">Home Address</div>
                              <div class="info-value">
                                {{ studentForm.homeAddress }}
                              </div>
                            </div>
                          </v-col>
                        </v-row>
                      </div>

                      <div class="review-section mb-6">
                        <div class="section-header">
                          <v-icon color="primary" class="mr-2"
                            >mdi-file-document</v-icon
                          >
                          <span class="text-h6">Required Documents</span>
                          <v-btn
                            text
                            small
                            color="primary"
                            class="float-right"
                            @click="editSection(2)"
                          >
                            <v-icon left small>mdi-pencil</v-icon>
                            Edit
                          </v-btn>
                        </div>
                        <v-divider class="my-3"></v-divider>

                        <v-chip-group column>
                          <v-chip
                            v-if="enrollmentForm.requirements.form137"
                            small
                            >Form 137</v-chip
                          >
                          <v-chip
                            v-if="enrollmentForm.requirements.goodMoral"
                            small
                            >Good Moral</v-chip
                          >
                          <v-chip
                            v-if="enrollmentForm.requirements.birthCertificate"
                            small
                            >Birth Certificate</v-chip
                          >
                          <v-chip
                            v-if="enrollmentForm.requirements.pictures"
                            small
                            >2x2 Pictures</v-chip
                          >
                          <v-chip
                            v-if="
                              enrollmentForm.requirements.transcriptOfRecords
                            "
                            small
                            >Transcript</v-chip
                          >
                        </v-chip-group>
                      </div>
                    </template>

                    <div class="review-section mb-6">
                      <div class="section-header">
                        <v-icon color="primary" class="mr-2"
                          >mdi-clipboard-list</v-icon
                        >
                        <span class="text-h6">Selected Subjects</span>
                        <v-btn
                          text
                          small
                          color="primary"
                          class="float-right"
                          @click="editSection(3)"
                        >
                          <v-icon left small>mdi-pencil</v-icon>
                          Edit
                        </v-btn>
                      </div>
                      <v-divider class="my-3"></v-divider>

                      <v-card outlined>
                        <v-list dense>
                          <v-list-item
                            v-for="subject in selectedSubjects"
                            :key="subject._id"
                          >
                            <v-list-item-content>
                              <v-list-item-title>
                                {{ subject.subject.DescriptiveTitle }}
                                <v-chip x-small color="primary" class="ml-2">{{
                                  subject.subject.catNo
                                }}</v-chip>
                                <v-chip x-small class="ml-2"
                                  >Units: {{ subject.subject.Units }}</v-chip
                                >
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                Section: {{ subject.section }} | Room:
                                {{ subject.schedule[0].room }} |
                                {{ formatSchedule(subject.schedule) }}
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>

                          <v-list-item v-if="!selectedSubjects.length">
                            <v-list-item-content>
                              <v-list-item-title class="text-center grey--text">
                                No subjects selected
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-card>
                    </div>

                    <v-card outlined class="mb-6">
                      <v-card-text>
                        <v-checkbox
                          v-model="confirmEnrollment"
                          color="primary"
                          class="mt-0"
                        >
                          <template v-slot:label>
                            <div>
                              I confirm that all the information provided is
                              accurate and complete.
                              <span class="red--text">*</span>
                            </div>
                          </template>
                        </v-checkbox>
                      </v-card-text>
                    </v-card>
                  </v-card-text>
                </v-card>
              </div>
            </v-slide-x-transition>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>

      <v-card flat class="mt-6">
        <v-card-actions>
          <v-btn
            v-if="currentStep > 1"
            text
            color="primary"
            @click="previousStep"
          >
            <v-icon left>mdi-arrow-left</v-icon>
            Previous
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="currentStep < 4" color="primary" @click="nextStep">
            Next
            <v-icon right>mdi-arrow-right</v-icon>
          </v-btn>
          <v-btn
            v-else
            color="success"
            @click="submitEnrollment"
            :disabled="!confirmEnrollment"
            :loading="loading"
          >
            Submit
            <v-icon right>mdi-check</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
    >
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";
import students from "@/store/modules/students";

export default {
  name: "EnrollmentStepper",
  data: () => ({
    search: "",
    studentHeaders: [
      {
        text: "Name",
        value: "name",
        template: "item.name",
      },
      { text: "Student ID", value: "studentId" },
      {
        text: "Course",
        value: "course",
        template: "item.course",
      },
      // { text: "Status", value: "enrollmentStatus" },
    ],
    dateMenu: false,
    currentStep: 1,
    loading: false,
    confirmEnrollment: false,
    selectedStudent: null,
    academicYears: ["2023-2024", "2024-2025", "2025-2026"],

    studentForm: {
      name: {
        surname: "",
        firstName: "",
        middleName: "",
        nameExtension: "",
      },
      personalInfo: {
        gender: null,
      },
      dateOfBirth: null,
      homeAddress: "",
    },
    enrollmentForm: {
      enrollmentType: null,
      student: null,
      academicYear: "",
      semester: "",
      yearLevel: null,
      course: null,
      requirements: {
        form137: false,
        goodMoral: false,
        birthCertificate: false,
        pictures: false,
        transcriptOfRecords: false,
      },
    },
    availableSubjects: [],
    subjects: [],
    selectedSubjects: [],
    snackbar: {
      show: false,
      text: "",
      color: "success",
      timeout: 5000,
    },
  }),

  computed: {
    ...mapState("students", ["students"]),
    ...mapState("courses", ["courses"]),
    ...mapState("teacherLoad", ["loading"]),
    formattedDateOfBirth() {
      if (!this.studentForm.dateOfBirth) return "";
      return new Date(this.studentForm.dateOfBirth).toLocaleDateString();
    },
    formattedSubjects() {
      let subjects = [];
      this.subjects.forEach((subject) => {
        console.log(subject);
        subject.schedule.forEach((schedule) => {
          subjects.push({
            _id: `${subject._id}-${schedule.day}-${schedule.timeStart}`,
            subject: subject.subject,
            section: subject.section,
            schedule: [schedule],
            teacherLoadId: subject.teacherLoadId,
            displayName: `${subject.subject.DescriptiveTitle} - Section ${
              subject.section
            } - ${schedule.day} ${this.formatTime(schedule.timeStart)}`,
          });
        });
      });

      console.log(subjects);
      return subjects;
    },
  },

  methods: {
    ...mapActions("students", ["fetchStudents"]),
    ...mapActions("courses", ["fetchCourses"]),
    ...mapActions("enrollments", [
      "enrollNewStudent",
      "enrollContinuingStudent",
    ]),
    ...mapActions("teacherLoad", ["updateTeacherLoadStudents"]),

    getStatusColor(status) {
      const colors = {
        pending: "warning",
        evaluated: "info",
        enrolled: "success",
      };
      return colors[status] || "warning";
    },

    addSubject() {
      const selected = this.formattedSubjects.find(
        (s) => s._id === this.enrollmentForm.subject
      );
      if (
        selected &&
        !this.selectedSubjects.find((s) => s._id === selected._id)
      ) {
        this.selectedSubjects.push(selected);
      }
      this.enrollmentForm.subject = null;
    },

    removeSubject(subject) {
      this.selectedSubjects = this.selectedSubjects.filter(
        (s) => s._id !== subject._id
      );
    },

    nextStep() {
      if (this.validateCurrentStep()) {
        if (
          this.currentStep === 1 &&
          this.enrollmentForm.enrollmentType === "old"
        ) {
          this.currentStep = 3;
        } else {
          this.currentStep++;
        }
      }
    },

    editSection(step) {
      this.currentStep = step;
    },

    getStudentFullName(studentId) {
      const student = this.students.find((s) => s._id === studentId);
      return student ? student.fullName : "";
    },

    getCourseNameById(courseId) {
      const course = this.courses.find((c) => c._id === courseId);
      return course ? course.courseName : "";
    },

    previousStep() {
      if (
        this.currentStep === 3 &&
        this.enrollmentForm.enrollmentType === "old"
      ) {
        this.currentStep = 1;
      } else {
        this.currentStep--;
      }
    },
    validateCurrentStep() {
      if (
        this.currentStep === 1 &&
        this.enrollmentForm.enrollmentType === "old"
      ) {
        if (!this.selectedStudent) {
          return false;
        }
      }
      return true;
    },

    handleStudentSelect(item) {
      this.selectedStudent = item.item._id;

      if (this.selectedStudent) {
        const student = this.students.find(
          (s) => s._id === this.selectedStudent
        );
        if (student?.course) {
          this.enrollmentForm.course = student.course;
        }
      }
    },

    formatSchedule(schedule) {
      return schedule
        .map(
          (s) =>
            `${s.day} ${this.formatTime(s.timeStart)}-${this.formatTime(
              s.timeEnd
            )}`
        )
        .join(", ");
    },
    formatTime(time) {
      return moment(time, "HH:mm").format("h:mm A");
    },

    async fetchSubjects() {
      if (this.enrollmentForm.academicYear && this.enrollmentForm.semester) {
        this.subjects = await this.$store.dispatch(
          "teacherLoad/fetchAvailableSubjects",
          {
            academicYear: this.enrollmentForm.academicYear,
            semester: this.enrollmentForm.semester,
          }
        );

        console.log({ subjects: this.subjects });
      }
    },

    async submitEnrollment() {
      try {
        this.loading = true;
        const enrollmentData = {
          academicYear: this.enrollmentForm.academicYear,
          semester: this.enrollmentForm.semester,
          yearLevel: this.enrollmentForm.yearLevel,
          course: this.enrollmentForm.course,
          enrollmentType: this.enrollmentForm.enrollmentType,
          enrollmentStatus: "enrolled",
          subjects: this.selectedSubjects.map((subject) => ({
            subject: subject._id.split("-")[0],
            section: subject.section,
            teacherLoad: subject.teacherLoadId,
            status: "enrolled",
          })),
        };

        let response;
        if (this.enrollmentForm.enrollmentType === "new") {
          const studentData = {
            name: this.studentForm.name,
            personalInfo: this.studentForm.personalInfo,
            dateOfBirth: this.studentForm.dateOfBirth,
            homeAddress: this.studentForm.homeAddress,
            requirements: this.enrollmentForm.requirements,
            course: this.enrollmentForm.course,
          };

          response = await this.enrollNewStudent({
            studentData,
            enrollmentData,
          });

          if (response.status === "success") {
            await Promise.all(
              this.selectedSubjects.map((subject) =>
                this.updateTeacherLoadStudents({
                  teacherLoadId: subject.teacherLoadId,
                  data: {
                    subjectId: subject._id.split("-")[0],
                    studentId: response.data.student._id,
                    action: "add",
                  },
                })
              )
            );
          }
        } else {
          response = await this.enrollContinuingStudent({
            studentId: this.selectedStudent,
            enrollmentData,
          });

          if (response.status === "success") {
            await Promise.all(
              this.selectedSubjects.map((subject) =>
                this.updateTeacherLoadStudents({
                  teacherLoadId: subject.teacherLoadId,
                  data: {
                    subjectId: subject._id.split("-")[0],
                    studentId: this.selectedStudent,
                    action: "add",
                  },
                })
              )
            );
          }
        }

        if (response.status === "success") {
          this.$router.push("/enrollments");
        }
      } catch (error) {
        console.error("Error submitting enrollment:", error);
        this.showMessage(error.response.data.message);
      } finally {
        this.loading = false;
      }
    },
    showMessage(text, color = "success") {
      this.snackbar.text = text;
      this.snackbar.color = color;
      this.snackbar.show = true;
    },
  },

  async created() {
    try {
      this.loading = true;
      await Promise.all([
        this.fetchStudents(),
        this.fetchCourses(),
        this.fetchSubjects(),
      ]);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    } finally {
      this.loading = false;
    }
  },

  watch: {
    "enrollmentForm.academicYear"() {
      this.fetchSubjects();
    },
    "enrollmentForm.semester"() {
      this.fetchSubjects();
    },
  },
};
</script>

<style scoped>
.headline {
  font-size: 1rem !important;
  font-weight: 400;
}

.info-item {
  margin-bottom: 16px;
}

.info-label {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 4px;
}

.info-value {
  font-size: 1rem;
}
</style>
