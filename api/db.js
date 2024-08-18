import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017/";
let client;
let database;

export async function connectToDatabase() {
  try {
    client = new MongoClient(uri);
    await client.connect();
    console.log("Connexion à MongoDB réussie!");

    database = client.db("todolist");

    console.log("Connexion à la base de donnée!");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error);
    process.exit(1); // Arrêtez le serveur si la connexion échoue
  }
}

connectToDatabase();

export const getCollection = (collectionName) => {
  return database.collection(collectionName);
};
