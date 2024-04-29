var express = require("express");
const axios = require("axios");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const GHOST_KEY = process.env.GHOST_KEY;
  const base_url = `https://blog.pastel.codes/ghost/api/v3/content/posts/?key=${GHOST_KEY}`;

  axios
    .all([
      axios.get(`${base_url}&limit=3`),
      axios.get(`${base_url}&limit=3&filter=tag:project`),
    ])
    .then(
      axios.spread((response1, response2) => {
        var base = {
          title: "About",
          description: "Who??? What??? AAAAaaa, about me.",
        };
        var blog = JSON.parse(
          JSON.stringify(response1.data).split('"posts":').join('"blog":')
        );
        var projects = JSON.parse(
          JSON.stringify(response2.data).split('"posts":').join('"project":')
        );
        var out = Object.assign(base, blog, projects);

        res.render("about", out);
      })
    )
    .catch((error) => {
      var base = {
        title: "About",
        description: "Who??? What??? AAAAaaa, about me.",
      };
      var out = Object.assign(base);
      console.log("error", error);
      res.render("about", out);
    });
});

module.exports = router;
