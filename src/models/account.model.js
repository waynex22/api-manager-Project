const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const objectId = mongoose.Schema.Types.ObjectId;

const accountSchema = new Schema({
  _id: { type: objectId, auto: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address : {type: String , required: true},
  image_url: { type: String, required: true },
  status: { type: String, required: true, enum: ["Busy" , "Ready", "Working", "Off"], default: "Working"},
  department:{ type: String, required: true, enum: ["HR" , "IT" , "Finance", "Marketing", "Sales", "Production", "Logistics", "R&D", "Quality", "Maintenance", "Security", "Cleaning", "Canteen", "Reception", "Management", "Other"], default: "Other"},
  role: { type: String, required: true, enum: ["Manager" , "Leader" , "Employee"], default: "Employee" },
}, {
  versionKey: false,
  timestamps: true
});

accountSchema.pre('save', function (next) {
  const account = this;
  if (!account.isModified('password')) return next();
  bcrypt.hash(account.password, 10, (err, hashedPassword) => {
    if (err) return next(err);
    account.password = hashedPassword;
    next();
  });
});

const Account = mongoose.model('accounts', accountSchema);
module.exports = Account;
