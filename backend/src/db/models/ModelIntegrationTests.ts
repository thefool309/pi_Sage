import { TestParseAndSaveScanVsExpectedOutput } from "../../api/services/testServicesHere";
import { User } from "./ExampleUser";
import chalk, { Chalk } from 'chalk';
import { sequelize } from '../database';
/**
 * Test suit for database models.
 */
async function testUserModel() : Promise<boolean> {
    let testPassed : boolean = false;
    const newUser = await User.create({
        name: "newUser"
    });
    testPassed = newUser?.name === "newUser";
    await newUser.destroy();
    return testPassed;
}

async function RunTests() {
    try {
    await sequelize.sync({force: true});
    let userModelTestResult: boolean = await testUserModel();
        if (userModelTestResult) {
            console.log("UserModel Test: " + chalk.green("PASSED"));
        }
        else {
            console.log("UserModel Test: " + chalk.red("FAILED"));
        }
    }
    catch (err){
        console.error(chalk.red("Test suite encountered an error: "), err);
    }
    finally {
        await sequelize.close(); // cleanly close the db
    }

}

RunTests();