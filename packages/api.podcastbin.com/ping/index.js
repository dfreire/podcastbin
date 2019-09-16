import sh from "../common/shiphold";

module.exports = async (req, res) => {
  const episodes = await sh
    .select()
    .from("podcastbin.episode")
    .run();

  res.json({ ping: "pong", episodes });
};
