module.exports = (app, db) => {
  app.get( "/items", (req, res) =>
    db.item.findAll().then( (result) => res.json(result))
  );
}
