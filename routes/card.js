const express = require("express");
const bodyParser = require("body-parser");
const { query } = require("../js/queries");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/cards", async (req, res) => {
  try {
    const cards = await query("SELECT id, image, altText FROM cards"); // Modifier la requête SQL en fonction de vos besoins

    res.render('cards', { cards }); 

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

module.exports = router;
