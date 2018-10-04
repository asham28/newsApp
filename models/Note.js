// Require Mongoose 
// ============================
var mongoose = require("mongoose"); 

// Reference to moongoose Schema Constructor 
// ==========================================
var Schema = mongoose.Schema; 

// Create Note Schema 
var NoteSchema = new Schema({
    body: {
        type: String
    }
}); 

// Create Note Model from NoteSchema 
var Note = mongoose.model("Note", NoteSchema); 

// Export the model 
module.exports = Note; 