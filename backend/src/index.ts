import app from "./app";
import { config } from "./config";

app.listen(config.PORT_NO, () => {
  console.log(`Server listening on port ${config.PORT_NO}.`);
});
