import { model, models, Schema } from "mongoose";

const profileSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["villa", "apartment", "shop", "office"],
      required: true,
    },
    adType: {
      type: String,
      enum: ["sale", "rent", "fullMortgage"],
      required: true,
    },
    welfareAmenities: {
      type: [String],
      default: [],
    },
    rules: {
      type: [String],
      default: [],
    },
    constructionDate: {
      type: Date,
      required: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    tagTitle: String,
    tagDescription: String,
    author: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Profile = models.Profile || model("Profile", profileSchema);

export default Profile;
