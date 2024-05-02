const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
const dburi = process.env.dbURI;
mongoose.connect(dburi, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

const userSchema = new mongoose.Schema({
  admin: String,
  password: String
});
const User = mongoose.model('User', userSchema);

const ResourcesSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  videoUrl: String, 
});
const Resources = mongoose.model('Resources', ResourcesSchema);

const uploadSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  link: { type: String, default: '' },
  dateTime: { type: Date, default: Date.now }
});

const upload = mongoose.model('Uploads', uploadSchema);

const studentSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  dateTime: { type: Date, default: Date.now }
});

const Student = mongoose.model('Students', studentSchema);

const attendanceSchema = new mongoose.Schema({
  email: { type: String, required: true },
  date: { type: Date, default: Date.now },
  present: { type: Boolean, default: false }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);


app.get("/", async (req, res) => {
  res.json({ message: "API's are working!" });
})

app.post('/api/register', async (req, res) => {
  const { admin, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      admin,
      password: hashedPassword
    });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { admin, password } = req.body;
  try {
    const user = await User.findOne({admin});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/upload', async (req, res) => {
  try {
    const { title, description, imageUrl, videoUrl } = req.body;
    const resources = new Resources({
      title,
      description,
      imageUrl,
      videoUrl
    });

    await resources.save();
    res.status(201).send('Resources uploaded successfully.');
  } catch (error) {
    console.error('Error uploading Resources:', error);
    res.status(500).send('Internal server error.');
  }
});

app.get('/api/resources', async (req, res) => {
  try {
    const resources = await Resources.find();
    res.json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).send('Internal server error.');
  }
});

app.post('/api/updates', async (req, res) => {
  try {
    const { title, description, imageUrl, link, dateTime } = req.body;
    const newUpload = new upload({
      title,
      description,
      imageUrl,
      link: link || '',
      dateTime // Store the provided date and time
    });

    await newUpload.save();
    res.status(201).json({ message: 'Upload successful' });
  } catch (error) {
    console.error('Error uploading:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/newupdates', async (req, res) => {
  try {
    const updates = await upload.find();
    res.json(updates);
  } catch (error) {
    console.error('Error fetching updates:', error);
    res.status(500).send('Internal server error.');
  }
});

app.delete("/api/deleteupdates/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    console.log(postId)
    await upload.findByIdAndDelete(postId);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/addstudent", async (req, res) => {
  try {
    const { email, name } = req.body;
    const newStudent = new Student({
      email,
      name
    });

    await newStudent.save();

    const newAttendance = new Attendance({
      email,
      present: false
    });
    await newAttendance.save();

    res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ error: "Server error" });
  }
});


app.get('/api/getstudents', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).send('Internal server error.');
  }
});

app.post('/api/attendance', async (req, res) => {
  try {
    const { email, present } = req.body;
    
    const existingAttendance = await Attendance.findOne({ email, date: { $gte: new Date().setHours(0, 0, 0, 0) } });
    
    if (existingAttendance) {
      if (existingAttendance.present && !present) {
        await Attendance.findByIdAndUpdate(existingAttendance._id, { present: false });
        return res.status(200).json({ message: 'Attendance updated to absent' });
      }
      else if (!existingAttendance.present && present) {
        await Attendance.findByIdAndUpdate(existingAttendance._id, { present: true });
        return res.status(200).json({ message: 'Attendance updated to present' });
      }
      else {
        return res.status(400).json({ error: 'Attendance status is not changed' });
      }
    } else {
      const newAttendance = new Attendance({
        email,
        present
      });
      await newAttendance.save();
      res.status(201).json({ message: 'Attendance recorded successfully' });
    }
  } catch (error) {
    console.error('Error recording attendance:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


app.get('/api/attendance/stats/:email', async (req, res) => {
  try {
    const { email } = req.params;

    // Get the current date
    const currentDate = new Date();
    // Set the hours, minutes, seconds, and milliseconds to 0 to get the start of the day
    currentDate.setHours(0, 0, 0, 0);

    // Find the attendance record for the specified email and the current date
    const currentAttendance = await Attendance.findOne({ email, date: { $gte: currentDate } });

    // Count the total days and present days for the student's email
    const totalDays = await Attendance.countDocuments({ email });
    const presentDays = await Attendance.countDocuments({ email, present: true });
    const absentDays = totalDays - presentDays;

    // Prepare the response object
    const response = {
      totalDays,
      presentDays,
      absentDays,
      currentAttendancePresent: currentAttendance ? currentAttendance.present : null
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching attendance statistics:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


app.get('/api/attendance/stats', async (req, res) => {
  try {
    const attendanceStats = await Attendance.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }, // Extract date part only
          totalDays: { $sum: 1 },
          totalPresent: { $sum: { $cond: [{ $eq: ['$present', true] }, 1, 0] } }
        }
      },
      {
        $group: {
          _id: null, // Group without any specific field
          distinctCount: { $addToSet: '$_id' }, // Collect distinct dates
          detailedStats: { $push: '$$ROOT' } // Collect detailed statistics for each date
        }
      },
      {
        $project: {
          _id: 0,
          distinctCount: { $size: '$distinctCount' },
          detailedStats: 1
        }
      }
    ]);

    res.json(attendanceStats[0]); // Return the first document (should be the only one)
  } catch (error) {
    console.error('Error fetching attendance statistics:', error);
    res.status(500).json({ error: 'Server error' });
  }
});




app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});