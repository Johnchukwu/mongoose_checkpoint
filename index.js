const mongoose = require('mongoose');
const express = require('express')


// Connect to the database
mongoose.connect('mongodb+srv://John:Johnbull4u@atlascluster.uuhkipz.mongodb.net/Myblogappdb?retryWrites=true&w=majority&appName=AtlasCluster')
.then(() => {
    console.log('Connected to MongoDB....')

    const app = express();//express app instance
const port=4400;

const mongoose = require('mongoose');

// Connect to the database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define the person schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// Create the person model
const Person = mongoose.model('Person', personSchema);

// Create and Save a Record of a Model
const createAndSavePerson = (done) => {
  const person = new Person({
    name: "John Doe",
    age: 30,
    favoriteFoods: ["Pizza", "Burger"]
  });

  // Save the document
  person.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Create Many Records with model.create()
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Use model.findOne() to Return a Single Matching Document from Your Database
const findOnePersonByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    person.favoriteFoods.push('Hamburger');
    person.save((err, updatedPerson) => {
      if (err) return console.error(err);
      done(null, updatedPerson);
    });
  });
};

// Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, updatedPerson) => {
      if (err) return console.error(err);
      done(null, updatedPerson);
    }
  );
};

// Delete One Document Using model.findByIdAndRemove
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return console.error(err);
    done(null, removedPerson);
  });
};

// MongoDB and Mongoose - Delete Many Documents with model.remove()
const removeManyPeople = (done) => {
  Person.remove({ name: "Mary" }, (err, result) => {
    if (err) return console.error(err);
    done(null, result);
  });
};

// Chain Search Query Helpers to Narrow Search Results
const chainQuery = (done) => {
  Person.find({ favoriteFoods: "Burritos" })
    .sort({ name: 1 })
    .limit(2)
    .select('-age')
    .exec((err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
};



app.listen(port, () => {
    console.log(`server is listening at http://localhost:${port}`)
  })
  
  })
  