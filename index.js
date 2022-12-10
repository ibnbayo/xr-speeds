const express = require("express");
const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const cors = require("cors");
const BookModel = require("./models/book");
const PostModel = require("./models/post");
const app = express()
const port = process.env.PORT || 3004;
const { PaginationParameters } = require('mongoose-paginate-v2');
app.use(cors());;

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://ibnbayo:Poiuy123@cluster0.nsytvrp.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }
);
app.post("/insert", async (req, res) => {
    const postName = req.body.postName;
    const postAuthor = req.body.postAuthor;
    const postContent = req.body.postContent;
    const postCategory = req.body.postCategory;
    const postTags = req.body.postTags;
    const postUrl = req.body.postUrl;
    const postLength = req.body.postLength;
    const post = new PostModel({
        postName: postName, 
        postAuthor: postAuthor, 
        postContent: postContent, 
        postCategory: postCategory,
        postTags: postTags,
        postUrl: postUrl,
        postLength: postLength,
    });

    try {
        await post.save();
        res.send("inserted data");
    } catch (err) {
        console.log(err);
    }
});


app.get('/pagination/', (req, res) => {
  const query = { /* query object to filter the results */ };
  const options = {
    page: req.query.page || 1,
    limit: req.query.limit || 5,
    sort: { createdAt: -1 }
  };

//    PostModel.paginate(...new PaginationParameters(req).get()).then((result) => {
// //   PostModel.paginate(query, options, (err, result) => {
//     // if (err) {
//     //   const { docs, totalDocs, limit, totalPages } = result;

//   // Send the paginated results as a JSON response
//   res.json(result);
// //     {
// //     totalResults: totalDocs,
// //     totalPages: totalPages,
// //     resultsPerPage: limit,
// //     results: docs,
// //   });
//     // } else {
//     //   res.json(result);
//     // }
//   });


PostModel.paginate({}, options).then((result) => {
  res.json(result);
});
  console.log(new PaginationParameters(app).get());
});



app.get("/", async (req, res) => {
    // FoodModel.find({$where: {foodName:  "Apple"}}, )
    PostModel.find({}, (err, results) => {
        if (err) {
            res.send(err);
        }

        res.send(results);
    });
});

app.get("/recent", async (req, res) => {
  PostModel.find({})
    .sort({ createdAt: -1 })
    .limit(10)
    .exec((err, results) => {
      if (err) {
        res.send(err);
      }

      res.send(results);
    });
});

app.put("/update", async (req, res) => {
    const id = req.body.id;
    const postName = req.body.postName;
    const postAuthor = req.body.postAuthor;
    const postContent = req.body.postContent;
    const postCategory = req.body.postCategory;
    try {
        await PostModel.findById(id, (err, updatePost) => {
            updatePost.postName = postName;
            updatePost.postAuthor = postAuthor;
            updatePost.postContent = postContent;
            updatePost.postCategory = postCategory;
            updatePost.save();
            res.send("updated");
        });
    } catch (err) {
        console.log(err);
    }
});

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await PostModel.findByIdAndRemove(id).exec();
    res.send("deleted");
});

app.listen(3004, () => {
    console.log("server running on port 3004");
});




