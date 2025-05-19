import { User } from "./ExampleUser";
import { sequelize } from "../database";
import chalk from "chalk";
/**
 * Test suit for database models.
 */
async function testUserModel(): Promise<boolean> {
  let testPassed: boolean = false;
  const newUser = await User.create({
    name: "newUser",
  });
  testPassed = newUser.name === "newUser";
  console.log("new user name = " + newUser.name);
  await newUser.destroy();
  return testPassed;
}

async function RunTests() {
  try {
    await sequelize.sync({ force: true });
    let userModelTestResult: boolean = await testUserModel(); //await on the Promise from testUserModel
    if (userModelTestResult) {
      console.log("UserModel Test: " + chalk.green("PASSED"));
    } else {
      console.log("UserModel Test: " + chalk.red("FAILED"));
    }
  } catch (err) {
    console.log(
      chalk.red("Test suite encountered an error: " + (err as Error).toString())
    );
  } finally {
    await sequelize.close(); // cleanly close the db
  }
}

RunTests();
