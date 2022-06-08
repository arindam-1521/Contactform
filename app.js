var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
const app = express();
const port = 80;
const connectionparams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}
mongoose.connect(process.env.MONGODB_URL || "mongodb+srv://joypradhan:SnLbw6q-p9dF6KS@cluster0.eqnuobf.mongodb.net/Myfirst?retryWrites=true&w=majority", connectionparams).then(() => { console.log("connected to the db") }).catch((e) => { console.log(e) })



var contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    location: String,
    description: String
})
var Contact = mongoose.model('Contact', contactSchema);

app.use("/static", express.static("static"))
app.use(express.urlencoded())

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.get("/contact", (req, res) => {
    const params = {}
    res.render("contact.ejs", params)
})

app.post("/contact", (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
            res.send("This item is saved to the database")
        }).catch(() => {
            res.status(400).send("Item was not saved to database.")
        })
        // res.status(200).render("contact.pug")
})

app.listen(port, () => {
    console.log(`The server started successfully on port ${port}`)
})