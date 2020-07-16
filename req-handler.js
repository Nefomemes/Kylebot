module.exports = {
    execute(imports){

        imports.app.get("*", (req, res) => {
  res.send("200 - OK");
});
    }
}