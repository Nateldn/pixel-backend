//@ts-check


// Place this right after the schemas have been defined / before sequelize sync?
// User.hasMany(Image);
// Image.belongsTo(User);


const { sequelize } = require("./db/connection");



// const app = async (yargsObj) => {
//     try {
//         await sequelize.sync();
//         if (yargsObj.add) {
//             await addMovie({title: yargsObj.title, actor: yargsObj.actor, director: yargsObj.director});
//             console.log(JSON.stringify(await listMovies(), null, 2));
//         } else {
//             console.log("Incorrect command");
//         }
//         await sequelize.close();
//     } catch (error) {
//         console.log(error);
//     }
// }





const express = require("express");
const cors = require("cors");
const userRouter = require("./user/userRoutes");
const imageRouter = require("./image/imageRoutes");
const app = express();
const port = (process.env.PORT || 5000);


// // app will use its .json() method to parse everything it receives as it will be json
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(imageRouter);


// app.listen(port, () => {
//     console.log(`Listening on port ${port}`)
// })






async function checkDBconnection() {
	console.log(`Checking database connection...`);
	try {
		await sequelize.authenticate();
		console.log('Database connection OK!');
		
        sequelize.sync();
	} catch (error) {
		console.log('Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}
}

async function server() {
	await checkDBconnection();

	console.log(`Starting server on port ${port}...`);

	app.listen(port, () => {
		console.log(`Server started on port ${port}.`);
	});
}

server();
