const { Router } =require("express");
const Room =require("../models/Room.js");
const router = new Router();

router.get("/rooms", async (req, res) => {
  const rooms = await Room.find();
  res.json({ rooms });
});

module.exports = router;
