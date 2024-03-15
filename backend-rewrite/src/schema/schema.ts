import mongoose from "mongoose";

const user = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// https://mongoosejs.com/docs/populate.html#populate-virtuals
// Virtual populate used to query "kids" array field for user containing all their kids
user.virtual("kids", {
  ref: "kid",
  localField: "_id",
  foreignField: "parent",
  justOne: false,
});

const kid = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    birthYear: {
      type: Number,
      required: true,
      max: new Date().getFullYear() - 1, // Kid can't be born in the future
    },
    gender: {
      type: String,
      required: true,
      enum: ["Boy", "Girl", "Non-binary", "Prefer not to say"],
    },
    image: {
      type: String,
    },
    hearingAid: {
      left: {
        type: Boolean,
        required: true,
      },
      right: {
        type: Boolean,
        required: true,
      },
    },
    quizScore: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Compound index to make sure kid names are unique within the scope of the same parent
// (What kind of parents name both their kids Jimmy)
kid.index(
  {
    parent: 1,
    firstName: 1,
  },
  { unique: true }
);

// https://mongoosejs.com/docs/populate.html#populate-virtuals
// Virtual populate used to query "audiograms" array field for kid containing all their audiograms
kid.virtual("audiograms", {
  ref: "audiogram",
  localField: "_id",
  foreignField: "owner",
  justOne: false,
});

// Simpler rigid schema
const audiogram = new mongoose.Schema(
  {
    leftEar: {
      "500hz": {
        type: Number,
        required: true,
      },
      "1000hz": {
        type: Number,
        required: true,
      },
      "2000hz": {
        type: Number,
        required: true,
      },
      "5000hz": {
        type: Number,
        required: true,
      },
      "8000hz": {
        type: Number,
        required: true,
      },
    },
    rightEar: {
      "500hz": {
        type: Number,
        required: true,
      },
      "1000hz": {
        type: Number,
        required: true,
      },
      "2000hz": {
        type: Number,
        required: true,
      },
      "5000hz": {
        type: Number,
        required: true,
      },
      "8000hz": {
        type: Number,
        required: true,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "kid",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Average left ear hearing. Calculated at query time
audiogram.virtual("leftAverage").get(function () {
  return (
    (this.leftEar["500hz"] +
      this.leftEar["1000hz"] +
      this.leftEar["2000hz"] +
      this.leftEar["5000hz"] +
      this.leftEar["8000hz"] +
      0.0) /
    5
  );
});

// Average right ear hearing. Calculated at query time
audiogram.virtual("rightAverage").get(function () {
  return (
    (this.rightEar["500hz"] +
      this.rightEar["1000hz"] +
      this.rightEar["2000hz"] +
      this.rightEar["5000hz"] +
      this.rightEar["8000hz"] +
      0.0) /
    5
  );
});

// More complicated but extensible schema. Kept as reference
/* const audiogram = new mongoose.Schema(
  {
    leftEar: [
      {
        frequency: {
          type: Number,
          enum: [500, 1000, 2000, 5000, 8000],
        },
        inaudible: Number,
      },
    ],
    rightEar: [
      {
        frequency: {
          type: Number,
          enum: [500, 1000, 2000, 5000, 8000],
        },
        inaudible: Number,
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "kid",
      required: true,
    },
  },
  { timestamps: true }
);

// Average left ear hearing. Calculated at query time
audiogram.virtual("leftAverage").get(
    function() {
        return this.leftEar.reduce((acc,tone) => acc+tone.inaudible,0.0)/this.leftEar.length
    }
)

// Average right ear hearing. Calculated at query time
audiogram.virtual("rightAverage").get(
    function() {
        return this.rightEar.reduce((acc,tone) => acc+tone.inaudible,0.0)/this.rightEar.length
    }
) */

// console.log("user's virtual fields =>", user.virtuals);
// console.log("user's virtual fields =>", kid.virtuals);
const User = mongoose.model("user", user);
const Kid = mongoose.model("kid", kid);
const Audiogram = mongoose.model("audiogram", audiogram);

export { User, Kid, Audiogram };
