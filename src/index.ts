import "./loadEnvironment.js";
import createDebug from "debug";
import chalk from "chalk";
import app from "./server/index.js";
import connectToDatabase from "./database/connectToDatabase.js";

const debug = createDebug("grandma-cookbook-api:root");

const port = process.env.PORT ?? 4000;

const mongoDbConnection = process.env.MONGODB_CONNECTION;

if (!mongoDbConnection) {
  debug(chalk.red("Missing environment variables"));
  process.exit(1);
}

app.listen(port, () => {
  debug(chalk.green(`Listening on http://localhost:${port}`));
});

try {
  await connectToDatabase(mongoDbConnection);

  debug(chalk.blue("Connected to database"));
} catch (error: unknown) {
  debug(`Error connecting to database: ${chalk.red((error as Error).message)}`);
}
