import express from "express";
import cors from "cors";
import { fetchTasks, createTasks, updateTasks, deleteTasks } from "./task.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Configuration CORS
app.use(
  cors({
    origin: "http://localhost:3000", // l'URL de votre frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Route de test
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Récupération des tâches
app.get("/task", async (req, res) => {
  try {
    const tasks = await fetchTasks(); // Appelle la fonction pour récupérer les tâches
    console.log("Tâches récupérées :", tasks); // Affiche les tâches dans la console pour déboguer

    res.json(tasks); // Retourne les tâches au client
  } catch (err) {
    console.error("Erreur lors de la récupération des tâches :", err);
    res.status(500).send("Erreur serveur lors de la récupération des tâches.");
  }
});

// Création d'une tâche
app.post("/task", async (req, res) => {
  try {
    const task = req.body;
    const response = await createTasks(task);
    res.send(response);
  } catch (err) {
    res.status(400).send(`Error creating tasks: ${err}`);
  }
});

// Mise à jour d'une tâche
app.put("/task", async (req, res) => {
  try {
    const task = req.body;
    const response = await updateTasks(task);
    res.send(response);
  } catch (err) {
    res.status(400).send(`Error updating tasks: ${err}`);
  }
});

// Suppression d'une tâche
app.delete("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteTasks(id);
    res.send(response);
  } catch (err) {
    res.status(400).send(`Error deleting tasks: ${err}`);
  }
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
