import { shiphold } from "ship-hold";

const { MY_DB_URI } = process.env;

export default shiphold({
  connectionString: MY_DB_URI,
  ssl: true
});
