import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import user_routes from "./handlers/users";
import order_routes from "./handlers/order";
import product_routes from "./handlers/products";

const app = express();
const corsConfig = {
  origin: "http://someotherdomain.com",
  optionsSuccessStatus: 200,
};
app.use(cors(corsConfig));
const corrs = cors(corsConfig);
app.use(bodyParser.json());

user_routes(app);
order_routes(app);
product_routes(app);

app.listen(3000, () => {
  console.log("lisening...");
});
export default app;
