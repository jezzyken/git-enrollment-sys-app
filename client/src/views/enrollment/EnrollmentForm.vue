<template>
  <v-container fluid class="pa-6">
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-form ref="form" lazy-validation>
      <v-stepper v-model="currentStep" class="mb-6 elevation-1">
        <v-stepper-header>
          <template v-if="!isRegistrar">
            <v-stepper-step :complete="currentStep > 1" step="1">
              Student Type
              <small>New or Existing Student</small>
            </v-stepper-step>
            <v-divider></v-divider>
          </template>

          <v-stepper-step
            :complete="currentStep > 2"
            :step="isRegistrar ? 1 : 2"
          >
            Student Details
            <small>Basic Information</small>
          </v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step
            :complete="currentStep > 3"
            :step="isRegistrar ? 2 : 3"
          >
            Enrollment Details
            <small>Academic Information</small>
          </v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step :step="isRegistrar ? 3 : 4">
            Review
            <small>Verify Details</small>
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1" v-if="!isRegistrar">
            <v-card class="mb-6">
              <v-card-title class="headline primary white--text pa-2">
                {{ isProgramHead ? "Select Student" : "Select Student Type" }}
              </v-card-title>
              <v-card-text class="pa-6">
                <v-radio-group
                  v-if="!isProgramHead"
                  v-model="enrollmentForm.enrollmentType"
                  mandatory
                >
                  <v-radio label="New Student" value="new"></v-radio>
                  <v-radio label="Existing Student" value="old"></v-radio>
                </v-radio-group>

                <v-expand-transition>
                  <div
                    v-if="
                      isProgramHead || enrollmentForm.enrollmentType === 'old'
                    "
                  >
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
                      <v-list-item>
                        <v-list-item-action>
                          <v-checkbox
                            v-model="enrollmentForm.requirements.placementForm"
                            color="primary"
                          ></v-checkbox>
                        </v-list-item-action>
                        <v-list-item-content>
                          <v-list-item-title>Placement Form</v-list-item-title>
                          <v-list-item-subtitle>
                            Student Evaluation
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
                    <v-text-field
                      v-model="enrollmentForm.section"
                      label="Section*"
                      outlined
                      dense
                      required
                      placeholder="Enter section"
                    ></v-text-field>
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
                    <v-card class="mb-6" v-if="previousSubjects.length">
                      <v-card-title class="headline primary white--text pa-2">
                        Previous Semester Subjects
                      </v-card-title>
                      <v-card-text class="pa-0">
                        <v-data-table
                          :headers="previousSubjectHeaders"
                          :items="previousSubjects"
                          dense
                          disable-sort
                          hide-default-footer
                        >
                          <template v-slot:item.grade="{ item }">
                            <v-chip small outlined color="secondary">
                              {{ item.grade }}
                            </v-chip>
                          </template>
                          <template v-slot:item.remarks="{ item }">
                            <v-chip
                              small
                              :color="getRemarksColor(item.remarks)"
                            >
                              {{ item.remarks }}
                            </v-chip>
                          </template>
                        </v-data-table>
                      </v-card-text>
                    </v-card>

                    <v-select
                      v-model="enrollmentForm.subjects"
                      :items="subjects"
                      :loading="loading"
                      item-text="DescriptiveTitle"
                      item-value="_id"
                      label="Select Subjects*"
                      outlined
                      dense
                      multiple
                      chips
                      :menu-props="{ maxHeight: '400px' }"
                    >
                      <template v-slot:selection="{ item, index }">
                        <v-chip
                          v-if="index < 2"
                          small
                          close
                          @click:close="removeSubject(item._id)"
                        >
                          <span
                            >{{ item.catNo }} -
                            {{ item.DescriptiveTitle }}</span
                          >
                          <v-chip x-small class="ml-2 primary"
                            >{{ item.units }} units</v-chip
                          >
                        </v-chip>
                        <span v-if="index === 2" class="grey--text caption">
                          (+{{ enrollmentForm.subjects.length - 2 }} others)
                        </span>
                      </template>

                      <template v-slot:item="{ item, attrs, on }">
                        <v-list-item
                          v-bind="attrs"
                          v-on="on"
                          :disabled="!validatePrerequisites(item)"
                        >
                          <v-list-item-content>
                            <v-list-item-title>
                              {{ item.catNo }} - {{ item.DescriptiveTitle }}
                              <v-chip x-small color="primary" class="ml-2"
                                >{{ item.units }} units</v-chip
                              >
                              <v-chip
                                x-small
                                color="error"
                                class="ml-2"
                                v-if="hasFailedPrerequisite(item)"
                              >
                                Failed Prerequisites
                              </v-chip>
                            </v-list-item-title>
                            <v-list-item-subtitle class="caption">
                              Prerequisites:
                              {{ item.prerequisites.join(", ") || "None" }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                    </v-select>

                    <!-- Subject List Card -->
                    <v-card class="mt-4" outlined>
                      <v-list dense>
                        <v-subheader>Selected Subjects</v-subheader>

                        <v-list-item
                          v-for="subject in selectedSubjects"
                          :key="subject._id"
                        >
                          <v-list-item-content>
                            <v-list-item-title class="d-flex align-center">
                              <span
                                >{{ subject.catNo }} -
                                {{ subject.DescriptiveTitle }}</span
                              >
                              <v-chip x-small color="primary" class="ml-2"
                                >{{ subject.units }} units</v-chip
                              >
                            </v-list-item-title>
                            <v-list-item-subtitle class="caption">
                              Prerequisites:
                              {{ subject.prerequisites.join(", ") || "None" }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-btn
                              icon
                              small
                              color="error"
                              @click="removeSubject(subject._id)"
                            >
                              <v-icon>mdi-delete</v-icon>
                            </v-btn>
                          </v-list-item-action>
                        </v-list-item>

                        <v-list-item v-if="!selectedSubjects.length">
                          <v-list-item-content>
                            <v-list-item-title class="text-center grey--text">
                              No subjects selected
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>

                        <!-- Total Units Display -->
                        <v-divider></v-divider>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title class="font-weight-medium">
                              Total Units: {{ totalUnits }}
                            </v-list-item-title>
                          </v-list-item-content>
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
                    <!-- <v-btn color="white" text>
                      <v-icon left>mdi-printer</v-icon>
                      Print
                    </v-btn> -->
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
                        <v-col cols="12" sm="6" md="4">
                          <div class="info-item">
                            <div class="info-label">Section</div>
                            <div class="info-value">
                              {{ enrollmentForm.section }}
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
                              <v-list-item-title class="d-flex align-center">
                                <span
                                  >{{ subject.catNo }} -
                                  {{ subject.DescriptiveTitle }}</span
                                >
                                <v-chip x-small color="primary" class="ml-2"
                                  >{{ subject.units }} units</v-chip
                                >
                              </v-list-item-title>
                              <v-list-item-subtitle class="caption">
                                Prerequisites:
                                {{ subject.prerequisites.join(", ") || "None" }}
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

                          <v-divider></v-divider>
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title class="font-weight-medium">
                                Total Units: {{ totalUnits }}
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
      section: "",
      subjects: [],
      requirements: {
        form137: false,
        goodMoral: false,
        birthCertificate: false,
        pictures: false,
        transcriptOfRecords: false,
      },
    },
    availableSubjects: [],
    // selectedSubjects: [],
    subjects: [],
    previousSubjectHeaders: [
      { text: "Subject Code", value: "catNo" },
      { text: "Description", value: "DescriptiveTitle" },
      { text: "Units", value: "units" },
      { text: "Grade", value: "grade" },
      { text: "Remarks", value: "remarks" },
    ],
    previousSubjects: [],
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
    formattedDateOfBirth() {
      if (!this.studentForm.dateOfBirth) return "";
      return new Date(this.studentForm.dateOfBirth).toLocaleDateString();
    },

    selectedSubjects() {
      return this.enrollmentForm.subjects
        .map((subjectId) =>
          this.subjects.find((subject) => subject._id === subjectId)
        )
        .filter(Boolean);
    },

    totalUnits() {
      return this.selectedSubjects.reduce(
        (total, subject) => total + subject.units,
        0
      );
    },

    userRoles() {
      const user = JSON.parse(localStorage.getItem("user"))?.user;
      return user?.role?.map((r) => r.name.toLowerCase()) || [];
    },

    isAdmin() {
      return this.userRoles.includes("admin");
    },

    isProgramHead() {
      return this.userRoles.includes("program head");
    },

    isRegistrar() {
      return this.userRoles.includes("registrar");
    },

    initialStep() {
      if (this.isRegistrar) return 2;
      return 1;
    },

    academicYears() {
      const startYear = 2023;
      const endYear = 2030;
      const years = [];

      for (let year = startYear; year < endYear; year++) {
        years.push(`${year}-${year + 1}`);
      }

      return years;
    },
  },

  methods: {
    ...mapActions("students", ["fetchStudents"]),
    ...mapActions("courses", ["fetchCourses"]),
    ...mapActions("enrollments", [
      "enrollNewStudent",
      "enrollContinuingStudent",
    ]),
    ...mapActions("teacherLoad", [
      "updateTeacherLoadStudents",
      "fetchStudentSubjectGrade",
    ]),

    getStatusColor(status) {
      const colors = {
        pending: "warning",
        evaluated: "info",
        enrolled: "success",
      };
      return colors[status] || "warning";
    },

    removeSubject(subjectId) {
      this.enrollmentForm.subjects = this.enrollmentForm.subjects.filter(
        (id) => id !== subjectId
      );
    },

    getGradeColor(grade) {
      return grade >= 75 ? "success" : "error";
    },

    getRemarksColor(remarks) {
      return remarks === "Passed" ? "success" : "error";
    },

    validatePrerequisites(subject) {
      if (!subject.prerequisites?.length) return true;

      return subject.prerequisites.every((prereq) => {
        const prevSubject = this.previousSubjects.find(
          (s) => s.catNo === prereq
        );
        if (!prevSubject) return false;
        return prevSubject.remarks === "Passed";
      });
    },

    hasFailedPrerequisite(subject) {
      if (!subject.prerequisites?.length) return false;

      return subject.prerequisites.some((prereq) => {
        const prevSubject = this.previousSubjects.find(
          (s) => s.catNo === prereq
        );
        return prevSubject?.remarks === "Failed";
      });
    },

    nextStep() {
      if (this.validateCurrentStep()) {
        if (this.currentStep === 1) {
          if (
            this.isProgramHead ||
            this.enrollmentForm.enrollmentType === "old"
          ) {
            this.currentStep = 3;
          } else {
            this.currentStep++;
          }
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
      if (this.isRegistrar && this.currentStep <= 2) {
        return;
      }

      if (
        this.currentStep === 3 &&
        (this.isProgramHead || this.enrollmentForm.enrollmentType === "old")
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

    async fetchSubjects() {
      if (
        this.enrollmentForm.yearLevel &&
        this.enrollmentForm.semester &&
        this.enrollmentForm.course
      ) {
        const [subjects, grades] = await Promise.all([
          this.$store.dispatch("subjects/fetchSubjects", {
            semester: this.enrollmentForm.semester,
            yearLevel: this.enrollmentForm.yearLevel,
            course: this.enrollmentForm.course,
          }),
          this.fetchStudentSubjectGrade({
            semester: this.enrollmentForm.semester,
            yearLevel: this.enrollmentForm.yearLevel,
            course: this.enrollmentForm.course,
            student: this.selectedStudent,
            academicYear: this.enrollmentForm.academicYear,
          }),
        ]);

        this.previousSubjects = grades;
        this.subjects = subjects;
      }
    },

    // async fetchSubjects() {
    //   if (
    //     this.enrollmentForm.yearLevel &&
    //     this.enrollmentForm.semester &&
    //     this.enrollmentForm.course
    //   ) {
    //     const response = await this.$store.dispatch("subjects/fetchSubjects", {
    //       semester: this.enrollmentForm.semester,
    //       yearLevel: this.enrollmentForm.yearLevel,
    //       course: this.enrollmentForm.course,
    //     });

    //     this.subjects = response;

    //     const studentGrade = await this.fetchStudentSubjectGrade({
    //       semester: this.enrollmentForm.semester,
    //       yearLevel: this.enrollmentForm.yearLevel,
    //       course: this.enrollmentForm.course._id,
    //       student: this.selectedStudent,
    //       academicYear: this.enrollmentForm.academicYear,
    //     });

    //     this.previousSubjects = studentGrade;
    //   }
    // },

    async submitEnrollment() {
      try {
        this.loading = true;
        const enrollmentData = {
          academicYear: this.enrollmentForm.academicYear,
          semester: this.enrollmentForm.semester,
          yearLevel: this.enrollmentForm.yearLevel,
          course: this.enrollmentForm.course,
          enrollmentType: this.enrollmentForm.enrollmentType,
          subjects: this.enrollmentForm.subjects,
          enrollmentStatus: "evaluated",
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
        } else {
          response = await this.enrollContinuingStudent({
            studentId: this.selectedStudent,
            enrollmentData,
          });
        }

        if (response.status === "success") {
          this.showMessage("Enrollment successfully submitted!", "success");
          this.resetForm();
          this.currentStep = 1;
          this.confirmEnrollment = false;
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

    resetForm() {
      this.enrollmentForm = {
        enrollmentType: null,
        student: null,
        academicYear: "",
        semester: "",
        yearLevel: null,
        course: null,
        section: "",
        subjects: [],
        requirements: {
          form137: false,
          goodMoral: false,
          birthCertificate: false,
          pictures: false,
          transcriptOfRecords: false,
        },
      };

      this.studentForm = {
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
      };

      this.selectedStudent = null;
      this.search = "";

      this.subjects = [];
      this.previousSubjects = [];

      this.dateMenu = false;
      this.loading = false;
      this.confirmEnrollment = false;

      if (this.$refs.form) {
        this.$refs.form.resetValidation();
        this.$refs.form.reset();
      }

      this.snackbar = {
        show: false,
        text: "",
        color: "success",
        timeout: 5000,
      };

      if (this.$refs.studentsTable) {
        this.$refs.studentsTable.clearSelection();
      }
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

      if (this.isProgramHead) {
        this.enrollmentForm.enrollmentType = "old";
      } else if (this.isRegistrar) {
        this.enrollmentForm.enrollmentType = "new";
      }

      this.currentStep = this.initialStep;
    } catch (error) {
      console.error("Error fetching initial data:", error);
    } finally {
      this.loading = false;
    }
  },

  watch: {
    "enrollmentForm.enrollmentType"(newValue) {
      if (newValue === "new") {
        this.selectedStudent = null;
        this.search = "";
      }
    },

    "enrollmentForm.semester": {
      async handler() {
        this.enrollmentForm.subjects = [];
        await this.fetchSubjects();
      },
    },
    "enrollmentForm.yearLevel": {
      async handler() {
        this.enrollmentForm.subjects = [];
        await this.fetchSubjects();
      },
    },
    "enrollmentForm.course": {
      async handler() {
        this.enrollmentForm.subjects = [];
        await this.fetchSubjects();
      },
    },
    currentStep(newValue) {
      if (this.$refs.form) {
        this.$refs.form.resetValidation();
      }
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
