const mongoose = require('mongoose'); 
const studentSchema = new mongoose.Schema(
  {
    //2
    name: {
        type: String,
    },
    //9
    members: {
        type: [String],
    },
  },
);
 
const Team = mongoose.model('Team', studentSchema, 'Teams');
 
module.exports = Team;