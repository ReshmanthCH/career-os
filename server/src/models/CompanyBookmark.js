import mongoose from "mongoose";

const companyBookmarkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

companyBookmarkSchema.index({ user: 1, company: 1 }, { unique: true });

const CompanyBookmark = mongoose.model("CompanyBookmark", companyBookmarkSchema);

export default CompanyBookmark;
