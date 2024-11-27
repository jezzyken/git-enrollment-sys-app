<template>
  <v-container fluid class="pa-6">
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-form ref="form" lazy-validation>
      <v-stepper v-model="currentStep" class="mb-6 elevation-1">
        <v-stepper-header>
          <v-stepper-step :complete="currentStep > 1" step="1">
            Basic Info
            <small>Personal Details</small>
          </v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step :complete="currentStep > 2" step="2">
            Additional Info
            <small>Contact & Family</small>
          </v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step :complete="currentStep > 3" step="3">
            Education
            <small>Academic History</small>
          </v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step step="4">
            Review
            <small>Verify Details</small>
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-slide-x-transition>
              <div class="form-section">
                <v-card class="mb-6">
                  <v-card-title class="headline primary white--text mb-5 pa-2">
                    Profile Photo
                  </v-card-title>
                  <v-card-text class="text-center pa-6">
                    <v-avatar size="150" color="grey lighten-2" class="mb-4">
                      <v-img
                        v-if="imagePreview"
                        :src="imagePreview"
                        cover
                      ></v-img>
                      <v-icon v-else size="80" color="grey darken-2"
                        >mdi-account</v-icon
                      >
                    </v-avatar>
                    <div>
                      <v-btn
                        color="primary"
                        @click="$refs.imageInput.click()"
                        class="mx-2"
                      >
                        <v-icon left>mdi-camera</v-icon>
                        Upload Photo
                      </v-btn>
                      <v-btn
                        v-if="imagePreview"
                        color="error"
                        text
                        @click="removePhoto"
                        class="mx-2"
                      >
                        <v-icon left>mdi-delete</v-icon>
                        Remove
                      </v-btn>
                      <input
                        ref="imageInput"
                        type="file"
                        hidden
                        accept="image/*"
                        @change="previewImage"
                      />
                    </div>
                    <v-alert
                      type="info"
                      text
                      dense
                      class="mt-4 mx-auto"
                      max-width="400"
                    >
                      Please upload a clear, recent photo. Maximum size: 5MB
                    </v-alert>
                  </v-card-text>
                </v-card>

                <v-card class="mb-6">
                  <v-card-title class="headline primary white--text mb-5 pa-2">
                    Personal Information
                  </v-card-title>

                  <v-card-text>
                    <v-row
                      v-if="
                        $route.query.type === 'existing' ||
                        $route.params.action === 'edit'
                      "
                    >
                      <v-col cols="12" md="3">
                        <v-text-field
                          v-model="formData.studentId"
                          label="Student ID*"
                          outlined
                          dense
                          prepend-inner-icon="mdi-identifier"
                          :error-messages="getErrorMessages('studentId')"
                          @input="clearError('studentId')"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12" md="3">
                        <v-text-field
                          v-model="formData.name.surname"
                          label="Surname*"
                          outlined
                          dense
                          prepend-inner-icon="mdi-account"
                          :error-messages="getErrorMessages('surname')"
                          @input="clearError('surname')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-text-field
                          v-model="formData.name.firstName"
                          label="First Name*"
                          outlined
                          dense
                          prepend-inner-icon="mdi-account"
                          :error-messages="getErrorMessages('firstName')"
                          @input="clearError('firstName')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-text-field
                          v-model="formData.name.middleName"
                          label="Middle Name"
                          outlined
                          dense
                          prepend-inner-icon="mdi-account"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-text-field
                          v-model="formData.name.nameExtension"
                          label="Name Extension"
                          outlined
                          dense
                          prepend-inner-icon="mdi-account-plus"
                          hint="E.g., Jr., Sr., III"
                          persistent-hint
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12" md="6">
                        <v-select
                          v-model="formData.course"
                          :items="courseOptions"
                          item-text="courseName"
                          item-value="_id"
                          label="Course*"
                          outlined
                          dense
                          prepend-inner-icon="mdi-school"
                          :error-messages="getErrorMessages('course')"
                          @input="clearError('course')"
                          required
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.homeAddress"
                          label="Home Address"
                          outlined
                          dense
                          prepend-inner-icon="mdi-home"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12" md="4">
                        <v-menu
                          ref="dateMenu"
                          v-model="dateMenu"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          min-width="auto"
                          offset-y
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="formattedDate"
                              label="Date of Birth*"
                              readonly
                              outlined
                              dense
                              prepend-inner-icon="mdi-calendar"
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="formData.dateOfBirth"
                            @input="dateMenu = false"
                            scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="primary"
                              @click="dateMenu = false"
                              >Cancel</v-btn
                            >
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.dateMenu.save(formData.dateOfBirth)"
                              >OK</v-btn
                            >
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="formData.placeOfBirth"
                          label="Place of Birth"
                          outlined
                          dense
                          prepend-inner-icon="mdi-map-marker"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="formData.religion"
                          label="Religion"
                          outlined
                          dense
                          prepend-inner-icon="mdi-church"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </div>
            </v-slide-x-transition>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-slide-x-transition>
              <div class="form-section">
                <v-card class="mb-6">
                  <v-card-title class="headline primary white--text mb-5 pa-2">
                    Personal Details
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" md="4">
                        <v-select
                          v-model="formData.personalInfo.gender"
                          :items="genderOptions"
                          label="Gender*"
                          outlined
                          dense
                          prepend-inner-icon="mdi-human-male-female"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model.number="formData.personalInfo.height"
                          label="Height (cm)"
                          type="number"
                          outlined
                          dense
                          prepend-inner-icon="mdi-human-male-height"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model.number="formData.personalInfo.weight"
                          label="Weight (kg)"
                          type="number"
                          outlined
                          dense
                          prepend-inner-icon="mdi-weight"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="formData.personalInfo.citizenship"
                          label="Citizenship*"
                          outlined
                          dense
                          prepend-inner-icon="mdi-flag"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-select
                          v-model="formData.personalInfo.maritalStatus"
                          :items="maritalStatusOptions"
                          label="Marital Status"
                          outlined
                          dense
                          prepend-inner-icon="mdi-account-heart"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-select
                          v-model="formData.personalInfo.bloodType"
                          :items="bloodTypeOptions"
                          label="Blood Type"
                          outlined
                          dense
                          prepend-inner-icon="mdi-water"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <v-card class="mb-6">
                  <v-card-title class="headline primary white--text mb-5 pa-2">
                    Family Information
                    <v-spacer></v-spacer>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon color="white" v-bind="attrs" v-on="on">
                          mdi-information
                        </v-icon>
                      </template>
                      <span>Please provide complete names</span>
                    </v-tooltip>
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.familyInfo.mothersName"
                          label="Mother's Full Name"
                          outlined
                          dense
                          prepend-inner-icon="mdi-account-heart"
                          hint="Last Name, First Name, Middle Name"
                          persistent-hint
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.familyInfo.fathersName"
                          label="Father's Full Name"
                          outlined
                          dense
                          prepend-inner-icon="mdi-account"
                          hint="Last Name, First Name, Middle Name"
                          persistent-hint
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <v-card class="mb-6">
                  <v-card-title class="headline primary white--text mb-5 pa-2">
                    Contact Information
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.contactInfo.contactNumber"
                          label="Contact Number*"
                          outlined
                          dense
                          prepend-inner-icon="mdi-phone"
                          hint="Include country code (e.g., +63)"
                          persistent-hint
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.contactInfo.emailAddress"
                          label="Email Address*"
                          outlined
                          dense
                          prepend-inner-icon="mdi-email"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <v-card class="mb-6">
                  <v-card-title class="headline primary white--text mb-5 pa-2">
                    PWD Information
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-switch
                          v-model="formData.pwd.isPWD"
                          label="Person with Disability"
                          color="primary"
                          class="mt-0"
                        ></v-switch>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.pwd.disability"
                          label="Type of Disability"
                          :disabled="!formData.pwd.isPWD"
                          outlined
                          dense
                          prepend-inner-icon="mdi-wheelchair-accessibility"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <v-card class="mb-6">
                  <v-card-title class="headline primary white--text mb-5 pa-2">
                    Emergency Contact
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.emergencyContact.contactPerson"
                          label="Emergency Contact Person*"
                          outlined
                          dense
                          prepend-inner-icon="mdi-account-alert"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="formData.emergencyContact.contactNumber"
                          label="Emergency Contact Number*"
                          outlined
                          dense
                          prepend-inner-icon="mdi-phone-alert"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </div>
            </v-slide-x-transition>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-slide-x-transition>
              <div class="form-section">
                <v-card class="mb-6">
                  <v-card-title class="headline primary white--text mb-5 pa-2">
                    Educational Background
                  </v-card-title>
                  <v-card-text>
                    <div class="text-h6 mb-4 primary--text">
                      Elementary Education
                    </div>
                    <v-row>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="
                            formData.educationHistory.elementary.schoolName
                          "
                          label="School Name*"
                          outlined
                          dense
                          prepend-inner-icon="mdi-school"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="
                            formData.educationHistory.elementary.schoolAddress
                          "
                          label="School Address*"
                          outlined
                          dense
                          prepend-inner-icon="mdi-map-marker"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model.number="
                            formData.educationHistory.elementary.yearGraduated
                          "
                          label="Year Graduated*"
                          type="number"
                          outlined
                          dense
                          prepend-inner-icon="mdi-calendar"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-divider class="my-6"></v-divider>

                    <div class="text-h6 mb-4 primary--text">
                      Junior High School
                    </div>
                    <v-row>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="
                            formData.educationHistory.juniorHigh.schoolName
                          "
                          label="School Name*"
                          outlined
                          dense
                          prepend-inner-icon="mdi-school"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="
                            formData.educationHistory.juniorHigh.schoolAddress
                          "
                          label="School Address*"
                          outlined
                          dense
                          prepend-inner-icon="mdi-map-marker"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model.number="
                            formData.educationHistory.juniorHigh.yearGraduated
                          "
                          label="Year Graduated*"
                          type="number"
                          outlined
                          dense
                          prepend-inner-icon="mdi-calendar"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-divider class="my-6"></v-divider>

                    <div class="text-h6 mb-4 primary--text">
                      Senior High School
                    </div>
                    <v-row>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="
                            formData.educationHistory.seniorHigh.schoolName
                          "
                          label="School Name*"
                          outlined
                          dense
                          prepend-inner-icon="mdi-school"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="
                            formData.educationHistory.seniorHigh.schoolAddress
                          "
                          label="School Address*"
                          outlined
                          dense
                          prepend-inner-icon="mdi-map-marker"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model.number="
                            formData.educationHistory.seniorHigh.yearGraduated
                          "
                          label="Year Graduated*"
                          type="number"
                          outlined
                          dense
                          prepend-inner-icon="mdi-calendar"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <v-card class="mb-6">
                  <v-card-title class="headline primary white--text mb-5 pa-2">
                    Last School Attended
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" md="3">
                        <v-select
                          v-model="formData.lastSchoolAttended.academicLevel"
                          :items="academicLevelOptions"
                          label="Academic Level*"
                          outlined
                          dense
                          prepend-inner-icon="mdi-school-outline"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-text-field
                          v-model="formData.lastSchoolAttended.schoolName"
                          label="School Name*"
                          outlined
                          dense
                          prepend-inner-icon="mdi-school"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-text-field
                          v-model="formData.lastSchoolAttended.schoolAddress"
                          label="School Address*"
                          outlined
                          dense
                          prepend-inner-icon="mdi-map-marker"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-text-field
                          v-model="formData.lastSchoolAttended.yearGraduated"
                          label="Year Graduated*"
                          outlined
                          dense
                          prepend-inner-icon="mdi-calendar"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </div>
            </v-slide-x-transition>
          </v-stepper-content>

          <v-stepper-content step="4">
            <v-slide-x-transition>
              <div class="form-section">
                <v-card class="mb-6">
                  <v-card-title
                    class="headline primary white--text d-flex align-center mb-5 pa-2"
                  >
                    Review Your Information
                    <v-spacer></v-spacer>
                    <v-btn color="white" text>
                      <v-icon left>mdi-printer</v-icon>
                      Print
                    </v-btn>
                  </v-card-title>

                  <v-card-text class="review-content py-4">
                    <div class="d-flex align-center mb-6">
                      <v-avatar size="120" color="grey lighten-2" class="mr-6">
                        <v-img
                          v-if="imagePreview"
                          :src="imagePreview"
                          cover
                        ></v-img>
                        <v-icon v-else size="48" color="grey darken-2"
                          >mdi-account</v-icon
                        >
                      </v-avatar>
                      <div>
                        <div class="text-h4 primary--text mb-1">
                          {{ fullName }}
                        </div>
                        <div class="text-h6 grey--text">
                          {{ formData.course }}
                        </div>
                      </div>
                    </div>

                    <div class="review-section mb-6">
                      <div class="section-header">
                        <v-icon color="primary" class="mr-2"
                          >mdi-account-details</v-icon
                        >
                        <span class="text-h6">Basic Information</span>
                        <v-btn
                          text
                          small
                          color="primary"
                          class="float-right"
                          @click="editSection(1)"
                        >
                          <v-icon left small>mdi-pencil</v-icon>
                          Edit
                        </v-btn>
                      </div>
                      <v-divider class="my-3"></v-divider>
                      <v-row dense>
                        <v-col cols="12" sm="6" md="4">
                          <div class="info-item">
                            <div class="info-label">Student ID</div>
                            <div class="info-value">
                              {{ formData.studentId }}
                            </div>
                          </div>
                        </v-col>
                      </v-row>
                      <v-row dense>
                        <v-col cols="12" sm="6" md="4">
                          <div class="info-item">
                            <div class="info-label">Surname</div>
                            <div class="info-value">
                              {{ formData.name.surname }}
                            </div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <div class="info-item">
                            <div class="info-label">First Name</div>
                            <div class="info-value">
                              {{ formData.name.firstName }}
                            </div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <div class="info-item">
                            <div class="info-label">Middle Name</div>
                            <div class="info-value">
                              {{ formData.name.middleName || "Not provided" }}
                            </div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <div class="info-item">
                            <div class="info-label">Date of Birth</div>
                            <div class="info-value">{{ formattedDate }}</div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <div class="info-item">
                            <div class="info-label">Place of Birth</div>
                            <div class="info-value">
                              {{ formData.placeOfBirth || "Not provided" }}
                            </div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <div class="info-item">
                            <div class="info-label">Religion</div>
                            <div class="info-value">
                              {{ formData.religion || "Not provided" }}
                            </div>
                          </div>
                        </v-col>
                      </v-row>
                    </div>

                    <div class="review-section mb-6">
                      <div class="section-header">
                        <v-icon color="primary" class="mr-2"
                          >mdi-card-account-details</v-icon
                        >
                        <span class="text-h6">Personal Details</span>
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
                              {{ formData.personalInfo.gender }}
                            </div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <div class="info-item">
                            <div class="info-label">Height</div>
                            <div class="info-value">
                              {{
                                formData.personalInfo.height
                                  ? `${formData.personalInfo.height} cm`
                                  : "Not provided"
                              }}
                            </div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <div class="info-item">
                            <div class="info-label">Weight</div>
                            <div class="info-value">
                              {{
                                formData.personalInfo.weight
                                  ? `${formData.personalInfo.weight} kg`
                                  : "Not provided"
                              }}
                            </div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <div class="info-item">
                            <div class="info-label">Citizenship</div>
                            <div class="info-value">
                              {{ formData.personalInfo.citizenship }}
                            </div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <div class="info-item">
                            <div class="info-label">Marital Status</div>
                            <div class="info-value">
                              {{
                                formData.personalInfo.maritalStatus ||
                                "Not provided"
                              }}
                            </div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <div class="info-item">
                            <div class="info-label">Blood Type</div>
                            <div class="info-value">
                              {{
                                formData.personalInfo.bloodType ||
                                "Not provided"
                              }}
                            </div>
                          </div>
                        </v-col>
                      </v-row>
                    </div>

                    <div class="review-section mb-6">
                      <div class="section-header">
                        <v-icon color="primary" class="mr-2"
                          >mdi-contacts</v-icon
                        >
                        <span class="text-h6">Contact Information</span>
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
                        <v-col cols="12" sm="6">
                          <div class="info-item">
                            <div class="info-label">Contact Number</div>
                            <div class="info-value">
                              {{ formData.contactInfo.contactNumber }}
                            </div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div class="info-item">
                            <div class="info-label">Email Address</div>
                            <div class="info-value">
                              {{ formData.contactInfo.emailAddress }}
                            </div>
                          </div>
                        </v-col>
                      </v-row>
                    </div>

                    <div class="review-section mb-6">
                      <div class="section-header">
                        <v-icon color="primary" class="mr-2"
                          >mdi-account-group</v-icon
                        >
                        <span class="text-h6">Family Information</span>
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
                        <v-col cols="12" sm="6">
                          <div class="info-item">
                            <div class="info-label">Mother's Name</div>
                            <div class="info-value">
                              {{
                                formData.familyInfo.mothersName ||
                                "Not provided"
                              }}
                            </div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div class="info-item">
                            <div class="info-label">Father's Name</div>
                            <div class="info-value">
                              {{
                                formData.familyInfo.fathersName ||
                                "Not provided"
                              }}
                            </div>
                          </div>
                        </v-col>
                      </v-row>
                    </div>

                    <div class="review-section mb-6">
                      <div class="section-header">
                        <v-icon color="primary" class="mr-2">mdi-school</v-icon>
                        <span class="text-h6">Educational Background</span>
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

                      <div class="mb-4">
                        <div
                          class="text-subtitle-1 font-weight-bold primary--text mb-2"
                        >
                          Elementary Education
                        </div>
                        <v-row dense>
                          <v-col cols="12" sm="6" md="4">
                            <div class="info-item">
                              <div class="info-label">School Name</div>
                              <div class="info-value">
                                {{
                                  formData.educationHistory.elementary
                                    .schoolName
                                }}
                              </div>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <div class="info-item">
                              <div class="info-label">School Address</div>
                              <div class="info-value">
                                {{
                                  formData.educationHistory.elementary
                                    .schoolAddress
                                }}
                              </div>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <div class="info-item">
                              <div class="info-label">Year Graduated</div>
                              <div class="info-value">
                                {{
                                  formData.educationHistory.elementary
                                    .yearGraduated
                                }}
                              </div>
                            </div>
                          </v-col>
                        </v-row>
                      </div>

                      <div class="mb-4">
                        <div
                          class="text-subtitle-1 font-weight-bold primary--text mb-2"
                        >
                          Junior High School
                        </div>
                        <v-row dense>
                          <v-col cols="12" sm="6" md="4">
                            <div class="info-item">
                              <div class="info-label">School Name</div>
                              <div class="info-value">
                                {{
                                  formData.educationHistory.juniorHigh
                                    .schoolName
                                }}
                              </div>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <div class="info-item">
                              <div class="info-label">School Address</div>
                              <div class="info-value">
                                {{
                                  formData.educationHistory.juniorHigh
                                    .schoolAddress
                                }}
                              </div>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <div class="info-item">
                              <div class="info-label">Year Graduated</div>
                              <div class="info-value">
                                {{
                                  formData.educationHistory.juniorHigh
                                    .yearGraduated
                                }}
                              </div>
                            </div>
                          </v-col>
                        </v-row>
                      </div>

                      <div class="mb-4">
                        <div
                          class="text-subtitle-1 font-weight-bold primary--text mb-2"
                        >
                          Senior High School
                        </div>
                        <v-row dense>
                          <v-col cols="12" sm="6" md="4">
                            <div class="info-item">
                              <div class="info-label">School Name</div>
                              <div class="info-value">
                                {{
                                  formData.educationHistory.seniorHigh
                                    .schoolName
                                }}
                              </div>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <div class="info-item">
                              <div class="info-label">School Address</div>
                              <div class="info-value">
                                {{
                                  formData.educationHistory.seniorHigh
                                    .schoolAddress
                                }}
                              </div>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <div class="info-item">
                              <div class="info-label">Year Graduated</div>
                              <div class="info-value">
                                {{
                                  formData.educationHistory.seniorHigh
                                    .yearGraduated
                                }}
                              </div>
                            </div>
                          </v-col>
                        </v-row>
                      </div>
                    </div>

                    <v-card outlined class="mb-6">
                      <v-card-text>
                        <v-checkbox
                          v-model="confirmInformation"
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
          <v-btn v-else color="success" @click="submitForm" :loading="loading">
            Submit Profile
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "StudentProfileForm",
  data: () => ({
    confirmInformation: false,
    currentStep: 1,
    dateMenu: false,
    imagePreview: null,
    helpDialog: false,
    errors: {},
    snackbar: {
      show: false,
      text: "",
      color: "success",
      timeout: 5000,
    },
    genderOptions: ["Male", "Female", "Other"],
    maritalStatusOptions: ["Single", "Married", "Widowed", "Divorced"],
    bloodTypeOptions: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    academicLevelOptions: [
      "Elementary",
      "Junior High",
      "Senior High",
      "College",
    ],
    courseOptions: [],
    formData: {
      studentId: null,
      name: {
        surname: "",
        firstName: "",
        middleName: "",
        nameExtension: "",
      },
      course: "",
      homeAddress: "",
      dateOfBirth: null,
      placeOfBirth: "",
      religion: "",
      personalInfo: {
        gender: "",
        height: null,
        weight: null,
        citizenship: "",
        maritalStatus: "",
        bloodType: "",
      },
      familyInfo: {
        mothersName: "",
        fathersName: "",
      },
      contactInfo: {
        contactNumber: "",
        emailAddress: "",
      },
      pwd: {
        isPWD: false,
        disability: "",
      },
      emergencyContact: {
        contactPerson: "",
        contactNumber: "",
      },
      educationHistory: {
        elementary: {
          schoolName: "",
          schoolAddress: "",
          yearGraduated: null,
        },
        juniorHigh: {
          schoolName: "",
          schoolAddress: "",
          yearGraduated: null,
        },
        seniorHigh: {
          schoolName: "",
          schoolAddress: "",
          yearGraduated: null,
        },
      },
      lastSchoolAttended: {
        academicLevel: "",
        schoolName: "",
        schoolAddress: "",
        yearGraduated: "",
      },
      image: "",
    },
  }),

  computed: {
    ...mapGetters("students", ["loading", "error", "currentStudent"]),

    formattedDate() {
      if (!this.formData.dateOfBirth) return "";
      return new Date(this.formData.dateOfBirth).toLocaleDateString();
    },

    fullName() {
      const { surname, firstName, middleName, nameExtension } =
        this.formData.name;
      let name = `${surname}, ${firstName}`;
      if (middleName) name += ` ${middleName}`;
      if (nameExtension) name += ` ${nameExtension}`;
      return name;
    },
  },

  async created() {
    const studentId = this.$route.query.studentId;

    await Promise.all([
      this.loadCourseOptions(),
      studentId ? this.loadExistingProfile(studentId) : Promise.resolve(),
    ]);
  },

  methods: {
    ...mapActions("students", [
      "createStudent",
      "fetchStudent",
      "updateStudent",
    ]),
    ...mapActions("courses", ["fetchCourses"]),

    formatEducationLevel(key) {
      switch (key) {
        case "elementary":
          return "Elementary Education";
        case "juniorHigh":
          return "Junior High School";
        case "seniorHigh":
          return "Senior High School";
        default:
          return key;
      }
    },

    nextStep() {
      if (this.currentStep < 4) {
        this.currentStep++;
      }
    },

    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },

    previewImage(event) {
      const file = event.target.files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          this.showMessage("Image size should not exceed 5MB", "error");
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },

    removePhoto() {
      this.imagePreview = null;
      this.formData.image = "";
      if (this.$refs.imageInput) {
        this.$refs.imageInput.value = "";
      }
    },

    getErrorMessages(field) {
      return this.errors[field] || [];
    },

    clearError(field) {
      delete this.errors[field];
    },

    showMessage(text, color = "success") {
      this.snackbar.text = text;
      this.snackbar.color = color;
      this.snackbar.show = true;
    },

    async submitForm() {
      if (!this.confirmInformation) {
        this.showMessage("Please confirm your information", "warning");
        return;
      }

      try {
        const submitData = {
          ...this.formData,
          dateOfBirth: this.formData?.dateOfBirth
            ? new Date(this.formData.dateOfBirth).toISOString()
            : null,
          image: this.imagePreview || "",
        };

        const studentId = this.$route.query.studentId;

        if (studentId) {
          await this.updateStudent({
            id: studentId,
            studentData: submitData,
          });
          this.showMessage("Profile updated successfully!");
        } else {
          await this.createStudent(submitData);
          this.showMessage("Profile created successfully!");
        }

        this.$router.push({
          name: "StudentList",
          query: { success: studentId ? "profile-updated" : "profile-created" },
        });
      } catch (error) {
        console.error("Error submitting form:", error);
        this.showMessage(
          error?.response?.data?.message ||
            "Error saving profile. Please try again.",
          "error"
        );
      }
    },

    editSection(section = 1) {
      this.currentStep = section;
    },

    resetForm() {
      this.$refs.form.reset();
      this.removePhoto();
      this.currentStep = 1;
      this.errors = {};
    },

    async loadExistingProfile(id) {
      try {
        await this.fetchStudent(id);
        if (this.currentStudent) {
          this.formData = this.mergeWithDefaults(this.currentStudent);
          if (this.currentStudent?.image) {
            this.imagePreview = this.currentStudent.image;
          }
        }
      } catch (error) {
        this.showMessage("Error loading student profile", "error");
      }
    },
    mergeWithDefaults(data) {
      const defaults = this.$options.data().formData;
      return {
        ...defaults,
        ...data,
        name: { ...defaults.name, ...data?.name },
        personalInfo: { ...defaults.personalInfo, ...data?.personalInfo },
        familyInfo: { ...defaults.familyInfo, ...data?.familyInfo },
        contactInfo: { ...defaults.contactInfo, ...data?.contactInfo },
        pwd: { ...defaults.pwd, ...data?.pwd },
        emergencyContact: {
          ...defaults.emergencyContact,
          ...data?.emergencyContact,
        },
        educationHistory: {
          elementary: {
            ...defaults.educationHistory.elementary,
            ...data?.educationHistory?.elementary,
          },
          juniorHigh: {
            ...defaults.educationHistory.juniorHigh,
            ...data?.educationHistory?.juniorHigh,
          },
          seniorHigh: {
            ...defaults.educationHistory.seniorHigh,
            ...data?.educationHistory?.seniorHigh,
          },
        },
        lastSchoolAttended: {
          ...defaults.lastSchoolAttended,
          ...data?.lastSchoolAttended,
        },
      };
    },

    async loadCourseOptions() {
      try {
        await this.fetchCourses();
        this.courseOptions = this.$store.state.courses.courses;
      } catch (error) {
        this.showMessage("Failed to load courses", "error");
      }
    },
  },

  watch: {
    "formData.pwd.isPWD"(newVal) {
      if (!newVal) {
        this.formData.pwd.disability = "";
      }
    },
  },
};
</script>

<style scoped>
.v-card {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.headline {
  font-size: 1rem !important;
  font-weight: 400;
}

.v-text-field.dense {
  margin-top: 8px;
  margin-bottom: 8px;
}

.form-section {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.v-stepper {
  box-shadow: none;
  border: 1px solid #e0e0e0;
}

.v-stepper-header {
  box-shadow: none;
  border-bottom: 1px solid #e0e0e0;
}

.v-stepper-step {
  padding: 24px;
}

.v-stepper-step small {
  font-size: 0.75rem;
  opacity: 0.7;
}

.v-avatar {
  border: 2px solid #e0e0e0;
  transition: all 0.3s ease;
}

.v-avatar:hover {
  border-color: var(--v-primary-base);
}

.primary--text {
  font-weight: 600;
}

.v-card-title {
  letter-spacing: 0.0125em;
}

.v-card-text {
  color: rgba(0, 0, 0, 0.87);
}

.v-btn {
  text-transform: none;
  letter-spacing: 0.0125em;
}

.error-text {
  color: var(--v-error-base);
  font-size: 0.75rem;
  margin-top: 4px;
}

.v-input--dense {
  margin-top: 0 !important;
}

.required::after {
  content: "*";
  color: var(--v-error-base);
  margin-left: 4px;
}

.form-divider {
  margin: 32px 0;
  border-top: 1px solid #e0e0e0;
}
</style>
