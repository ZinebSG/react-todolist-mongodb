import { MongoClient } from "mongodb";
import { connectToDatabase, getCollection } from "./db.js";
import crypto from "crypto";

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const database = client.db("todolist");
const collection = database.collection("Tasks");

export async function fetchTasks() {
  await connectToDatabase();

  const collection = getCollection("Tasks");
  const tasks = await collection.find({}).toArray();
  console.log(tasks);
  return tasks;
}

export const createTasks = async ({ name, completed }) => {
  await connectToDatabase();
  const collection = getCollection("Tasks");
  const uuid = crypto.randomUUID();
  const task = {
    id: uuid,
    name,
    completed,
  };

  const result = await collection.insertOne(task);
  return result;
};

export const updateTasks = async ({ id, name, completed }) => {
  await connectToDatabase();
  const collection = getCollection("Tasks");

  const result = await collection.findOneAndUpdate(
    { id },
    { $set: { name, completed } },
    { returnDocument: "after" }
  );

  return result.value;
};

export const deleteTasks = async (id) => {
  await connectToDatabase();
  const collection = getCollection("Tasks");

  const result = await collection.deleteOne({ id });

  return result;
};
