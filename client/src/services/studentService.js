import api from "./api";

export default {
  createStudent(profileData) {
    const formData = new FormData();

    if (profileData.image) {
      const imageData = profileData.image.split(",")[1];
      const blob = this.dataURLtoBlob(imageData);
      formData.append("image", blob, "profile.jpg");
    }

    Object.keys(profileData).forEach((key) => {
      if (key !== "image") {
        if (typeof profileData[key] === "object") {
          formData.append(key, JSON.stringify(profileData[key]));
        } else {
          formData.append(key, profileData[key]);
        }
      }
    });

    return api.post("/student", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  updateStudent(id, profileData) {
    const formData = new FormData();

    if (profileData.image) {
      const imageData = profileData.image.split(",")[1];
      const blob = this.dataURLtoBlob(imageData);
      formData.append("image", blob, "profile.jpg");
    }

    Object.keys(profileData).forEach((key) => {
      if (key !== "image") {
        if (typeof profileData[key] === "object") {
          formData.append(key, JSON.stringify(profileData[key]));
        } else {
          formData.append(key, profileData[key]);
        }
      }
    });

    return api.patch(`/student/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  getAllStudents(id) {
    return api.get(`/student`);
  },

  getStudent(id) {
    return api.get(`/student/${id}`);
  },

  dataURLtoBlob(dataurl) {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  },
};
