const express = require('express')
const connectDB = require('./config/db')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const path = require('path');
const Course= require("./models/Course");
const Content= require("./models/content");


//Nhập khẩu router
const posts = require('./routes/posts')

//Khởi động App 
const app = express()

// //Khởi động Handlebars
// app.engine('handlebars', exphbs.engine())
// app.set('view engine', 'handlebars')

//Khởi động bodyparser middelware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Set the default templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Khoi dong methodOverride middleware
app.use(methodOverride('_method'))

//Khởi động express middleware
app.use(express.json())

//Kết nối cơ sở dữ liệu
connectDB()

//Một số routes cơ bản có thể đưa vào file riêng trong thư mục routes
app.get('/', (req, res)=> res.render('index'))
app.get('/about', (req, res)=> res.render('about'))


app.use((req, res, next) => {
    //check => return res.send()
    console.log('>>> run into my middleware')
    console.log(req.method)
    next();
})

//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




//add

app.get('/profile/add', function(req, res){
  
  res.render('add')
})

app.post('/profile/add', function(req, res){
console.log(req.body.masv)

        var newCoures = new Course({
    masv: req.body.masv,
    hovaten: req.body.hovaten,
        })
        newCoures.save((err) =>{
          if (err) {
            res.json({ "kq": 0, "errMsg": err });
        } else {
            res.redirect('/profile');
        }
        })
    }) 



//profile
app.set('view engine')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.get('/profile',(req, res)=>{

  Course.find((err, char) => {
    console.log(char[0])
    if (err) {
        res.json({ "kq": 0, "errMsg": err })
    } else {
      Content.find((err, data) => {
        if (err) {
            res.json({ "kq": 0, "errMsg": err })
        } else {
            res.render("index", {data,element:char[0]})
        }
    })
    
  }
})

})


//add stt
app.post('/post', function(req, res){
    console.log(req.body.masv)
    
            var newContent = new Content({
        content: req.body.content
            })
            newContent.save((err) =>{
              if (err) {
                res.json({ "kq": 0, "errMsg": err });
            } else {
                res.redirect('/profile');
            }
            })
        }) 


app.delete('/profile/:id', (req, res)=>{
  const email = req.params.id;

  profile.findByIdAndDelete(id)
  .then(result =>{
    res.json({ redirect: '/profile'})
  })
  .catch(err =>{
    console.log(err);

  })
})





//Mang routes vào để sử dụng
app.use('/posts', posts)

const PORT = 5000;



app.listen(PORT, () => console.log('Server đã khởi động tại UDA-WEBSOCIAL ${UDA-WEBSOCIAL}'))