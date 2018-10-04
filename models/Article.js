// Require Mongoose 
// ============================
var mongoose = require("mongoose"); 

// Reference to moongoose Schema Constructor 
// ==========================================
var Schema = mongoose.Schema; 

// Create Article Schema 
var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }, 
    link: {
        type: String, 
        required: true,
        unique: true
    }, 
    saved: {
        type: Boolean,
        unique: true
    }, 
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }]
});

// Create Note Model from ArticleSchema 
var Article = mongoose.model("Article", ArticleSchema); 

// Export the model 
module.exports = Article; 