const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userEmail: {
      type: String,
      index: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userFirstName: {
      type: String,
      required: true,
    },
    userLastName: {
      type: String,
      required: true,
    },
    userContactNumber: {
      type: String,
      required: true,
    },
    userUploadedImagesUrls: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

//static methods
userSchema.static("findByUserEmail", async function (userEmail) {
  return await this.findOne({
    userEmail: { $regex: `^${userEmail}$`, $options: "i" },
  }).exec();
});

//static methods
userSchema.static(
  "findByUserEmailAndUpdate",
  async function (userEmail, updateObj) {
    let filePath = updateObj.filePath;
    delete updateObj.filePath;
    let pushObj=filePath===null?{}:{$push: { userUploadedImagesUrls: filePath }}
    console.log(filePath)
    return await this.updateOne(
      { userEmail: { $regex: `^${userEmail}$`, $options: "i" } },
      { $set: { ...updateObj },  ...pushObj}
    ).exec();
  }
);

module.exports = mongoose.model(process.env.USER_COLLECTION, userSchema);
