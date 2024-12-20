const mongoose = require("mongoose");

module.exports = function (fastify, opts, next) {
  const Schema = mongoose.Schema;
  const { v4: uuidv4 } = require('uuid');

  const vijayStockSchema = new mongoose.Schema(
    {
      _id: {type: String, default:  () => { let res = uuidv4(); return res.id}, alias: "vijayBook_id" },

      meltingDate: {
        type: Date,
        required: true,
      },
      meltingCategory: {
        type: [String],
        required: true,
        enums: ["Gold", "Bhuka"],
      },
      meltingDescription: {
        type: String,
        required: true,
      },
      meltingWeight: {
        type: [String],
        required: true,
      },
      meltingPurity: {
        type: [String],
        required: false,
      },
      meltingConversion: {
        type: [String],
        required: false,
      },
      meltingIssue: {
        type: String,
        required: true,
      },
      meltingIssueActual: {
        type: String,
        required: true,
      },
      meltingReceive: {
        type: String,
        required: true,
      },
      meltingBhuka: {
        type: String,
        required: true,
      },
      meltingLoss: {
        type: String,
        required: true,
      },
      tarpattaDate: {
        type: Date,
        required: true,
      },
      tarpattaDescription: {
        type: String,
        required: false,
      },
      tarpattaIssue: {
        type: [String],
        required: true,
      },
      // tarpattaIssueTotal: {
      //   type: String,
      //   required: true,
      // },
      tarpattaReceive: {
        type: [String],
        required: true,
      },
      // tarpattaReceiveTotal: {
      //   type: String,
      //   required: true,
      // },
      tarpattaBhuka: {
        type: [String],
        required: true,
      },
      // tarpattaBhukaTotal: {
      //   type: String,
      //   required: true,
      // },
      tarpattaLoss: {
        type: String,
        required: true,
      },
      // tarpattaLossTotal: {
      //   type: String,
      //   required: true,
      // },
      createdBy: {
        type: String,
        required: false,
      },
      modifiedBy: {
        type: String,
        required: false,
      },
      is_melting_receiver_updated: {
        type: Boolean,
        required: true,
        default: false,
      },
      is_deleted_flag: {
        type: Boolean,
        required: true,
        default: false,
      },
      issue_to_kareegar: {
        type: String,
        required: true,
        enums: ["Vijay", "Manish"],
      },
      vijayDate: {
        type: Date,
        required: true,
      },
      vijayDescription: {
        type: String,
        required: false,
      },
      vijayIssue: {
        type: [String],
        required: true,
      },
      vijayReceive: {
        type: [String],
        required: true,
      },
      vijayBhuka: {
        type: [String],
        required: true,
      },
      vijayLoss: {
        type: String,
        required: true,
      },
      manishDate: {
        type: Date,
        required: true,
      },
      manishDescription: {
        type: String,
        required: false,
      },
      manishIssue: {
        type: [String],
        required: true,
      },
      manishReceive: {
        type: [String],
        required: true,
      },
      manishBhuka: {
        type: [String],
        required: true,
      },
      manishLoss: {
        type: String,
        required: true,
      },
      solderDate: {
        type: [Date],
        required: true,
      },
      solderLotNo:{
        type: [String],
        required: false,  
      },
      solderItem:{
        type: [String],
        required: false,  
      },
      solderMelting:{
        type: [String],
        required: false,  
      },
      solderChainIssue: {
        type: [String],
        required: false,
      },
      solderChainReceive: {
        type: [String],
        required: false,
      },
      solderBhuka: {
        type: [String],
        required: false,
      },
      solderTotal: {
        type: [String],
        required: false,
      },
      solderPowder: {
        type: [String],
        required: false,
      },
      solderR1: {
        type: [String],
        required: false,
      },
      solderR2: {
        type: [String],
        required: false,
      },
      is_solder_updated: {
        type: [String],
        required: false,
      },
      jointDate: {
        type: [Date],
        required: true,
      },
      jointLotNo:{
        type: [String],
        required: false,  
      },
      jointItem:{
        type: [String],
        required: false,  
      },
      jointMelting:{
        type: [String],
        required: false,  
      },
      jointChainIssue: {
        type: [String],
        required: false,
      },
      jointChainReceive: {
        type: [String],
        required: false,
      },
      jointBhuka: {
        type: [String],
        required: false,
      },
      jointTotal: {
        type: [String],
        required: false,
      },
      jointPowder: {
        type: [String],
        required: false,
      },
      jointR1: {
        type: [String],
        required: false,
      },
      jointR2: {
        type: [String],
        required: false,
      },
      is_joint_updated: {
        type: [String],
        required: false,
      },
      user_id: { type: Schema.Types.ObjectId, ref: "User" },
    },
    {
      timestamps: true,
    }
  );

  mongoose.model("vijay-book", vijayStockSchema);
  next();
};
