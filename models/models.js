var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var donorSchema = new mongoose.Schema({
	name: String,
	address: { street1: String, street2: String, city: String, state: String, zip_code: Number, country:String},
	email: String,
    contact_no: Number
});

var orphanageSchema = new mongoose.Schema({
	name: String,
	address: { street1: String, street2: String, city: String, state: String, zip_code: Number, country:String},
	email: String,
    contact_no: Number,
    authenticated: {type:Boolean, default:false},
    no_of_people: Number
});

var donationSchema = new mongoose.Schema({
	donated_by: {type: Schema.Types.ObjectId, ref:'Donors'},
	donated_to: {type: Schema.Types.ObjectId, ref:'Orphanages'},
    donated_items: [ {item: String, quantity:Number} ],
	donation_date: {type: Date, default: Date.now}
});

var postSchema = new mongoose.Schema({
	posted_by: {type: Schema.Types.ObjectId, ref:'Donors'},
	claims: [ {type: Schema.Types.ObjectId, ref:'Orphanages'} ],
    items: [ {item: String, quantity:Number} ],
	creation_date: {type: Date, default: Date.now},
    expiry_date: {type: Date, default: Date.now},
    updation_date: {type: Date, default: Date.now},
    activated:{type: Boolean, default: false};
});

var loginSchema = new mongoose.Schema({
	username: String,
	password: String, //hash created from password
    role: String,
	created_at: {type: Date, default: Date.now}
})

mongoose.model('Donors', donorSchema);
mongoose.model('Orphanages', orphanageSchema);
mongoose.model('Donations', donationSchema);
mongoose.model('Posts', postSchema);
mongoose.model('Login', loginSchema);