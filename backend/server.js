import app from "./app.js";

app.listen(process.env.PORT, () => {
  console.log(`server Listning on port ${process.env.PORT}`);
});
