const mongoose = require("mongoose");


const { Schema, model, models } = mongoose;

// Define the user schema
const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: [true, 'Email already exists!'],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        unique: [true, 'Username already exists!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String,
    }
});

const User = model('User', userSchema);


// Function to connect to the database
async function connectToDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/promptopia", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to the database.");
    } catch (error) {
        console.error("Database connection error:", error);
    }
}

// Main function to create a dummy user
(async () => {
    await connectToDB();

    try {
        const dummyUser = await User.create({
            username: "admin123",
            email: "admin@example.com",
            image: "/assets/images/logo.svg",
        });

        console.log("Dummy user created:", dummyUser);
    } catch (error) {
        console.error("Error creating dummy user:", error);
    } finally {
        mongoose.connection.close(); // Close the database connection after operation
    }
})();
