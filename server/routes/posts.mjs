// Get a list of 50 posts
router.get("/", async (req, res) => {
    let collection = await db.collection("posts");
    let results = await collection.find({})
      .limit(50)
      .toArray();
    res.send(results).status(200);
  });

// Fetches the latest posts
router.get("/latest", async (req, res) => {
    let collection = await db.collection("posts");
    let results = await collection.aggregate([
      {"$project": {"author": 1, "title": 1, "tags": 1, "date": 1}},
      {"$sort": {"date": -1}},
      {"$limit": 3}
    ]).toArray();
    res.send(results).status(200);
  });

// Get a single post
router.get("/:id", async (req, res) => {
    let collection = await db.collection("posts");
    let query = {_id: ObjectId(req.params.id)};
    let result = await collection.findOne(query);
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });

