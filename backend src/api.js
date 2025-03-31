const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const cors = require("cors");

const conString = "mongodb://127.0.0.1:27017";

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/get-users", (req, res) => {
  MongoClient.connect(conString).then((co) => {
    var database = co.db("video-library");
    database
      .collection("tblusers")
      .find({})
      .toArray()
      .then((document) => {
        res.send(document);
        res.end();
      });
  });
});



app.get("/get-admin", (req, res) => {
  MongoClient.connect(conString).then((co) => {
    var database = co.db("video-library");
    database
      .collection("tbladmin")
      .find({})
      .toArray()
      .then((document) => {
        res.send(document);
        res.end();
      });
  });
});

app.get("/get-videos", (req, res) => {
  MongoClient.connect(conString).then((co) => {
    var database = co.db("video-library");
    database
      .collection("tblvideos")
      .find({})
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

app.get("/get-categories", (req, res) => {
  MongoClient.connect(conString).then((co) => {
    var database = co.db("video-library");
    database
      .collection("tblcategories")
      .find({})
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

app.get("/get-user/:userid", (req, res) => {
  MongoClient.connect(conString).then((co) => {
    var database = co.db("video-library");
    database
      .collection("tblusers")
      .findOne({ userid: req.params.userid })
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

app.get("/get-video/:id", (req, res) => {
  MongoClient.connect(conString).then((co) => {
    var database = co.db("video-library");
    database
      .collection("tblvideos")
      .findOne({ videoid: parseInt(req.params.id) })
      .then((response) => {
        res.send(response);
      })
      .catch((error) => {
        res.status(404).json("Internal error");
      });
  });
});

app.get("/filter-videos/:categoryid", (req, res) => {
  MongoClient.connect(conString).then((co) => {
    var database = co.db("video-library");
    database
      .collection("tblvideos")
      .findOne({ videoid: parseInt(req.params.categoryid) })
      .then((documents) => {
        res.send({ msg: documents });
        res.end();
      })
      .catch((error) => {
        res.status(404).json({ msg: error });
      });
  });
});

app.post("/register-user", (req, res) => {
  MongoClient.connect(conString).then((co) => {
    var database = co.db("video-library");

    var user = {
      userid: req.body.userid,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      mobile: req.body.mobile,
    };

    database
      .collection("tblusers")
      .insertOne(user)
      .then(() => {
        console.log("user register");
        res.send("user registered");
        res.end();
      });
  });
});

app.post("/add-category", (req, res) => {
  MongoClient.connect(conString).then((co) => {
    var database = co.db("video-library");

    var category = {
      categoryid: parseInt(req.body.categoryid),
      categoryname: req.body.categoryname,
    };

    database
      .collection("tblcategories")
      .insertOne(category)
      .then(() => {
        console.log("category added");
        res.send("user registered");
        res.end();
      });
  });
});

app.post("/add-video", (req, res) => {
  MongoClient.connect(conString).then((co) => {
    var database = co.db("video-library");

    var video = {
      videoid: parseInt(req.body.videoid),
      title: req.body.title,
      url: req.body.url,
      description: req.body.description,
      likes: parseInt(req.body.likes),
      dislike: parseInt(req.body.dislike),
      views: parseInt(req.body.views),
      categoryid: parseInt(req.body.categoryid),
      comments: [req.body.comments],
    };

    database
      .collection("tblvideos")
      .insertOne(video)
      .then(() => {
        console.log("video added");
        res.send("video added");
        res.end();
      });
  });
});

app.put("/edit-video/:id", (req, res) => {
  MongoClient.connect(conString).then((co) => {
    var database = co.db("video-library");

    var video = {
      videoid: parseInt(req.body.videoid),
      title: req.body.title,
      url: req.body.url,
      description: req.body.description,
      likes: parseInt(req.body.likes),
      dislike: parseInt(req.body.dislike),
      views: parseInt(req.body.views),
      categoryid: parseInt(req.body.categoryid),
      comments: [req.body.comments],
    };

    database
      .collection("tblvideos")
      .updateOne({ videoid: parseInt(req.params.id) }, { $set: video })
      .then(() => {
        console.log("video edite successfully...");
        res.send("video edite successfully...");
        res.end();
      });
  });
});

app.delete("/delete-video/:id", (req, res) => {
  MongoClient.connect(conString).then((co) => {
    var database = co.db("video-library");
    database
      .collection("tblvideos")
      .deleteOne({ videoid: parseInt(req.params.id) })
      .then(() => {
        console.log("video deleted...");
        res.send("video deleted....");
        res.end();
      });
  });
});

app.listen(3040);
console.log("server started : http://127.0.0.1:3040");
