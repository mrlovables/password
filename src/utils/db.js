import path from "path";
import { LowSync, JSONFileSync } from "@commonify/lowdb";
import { remote } from "electron";

// const APP = process.type === "renderer" ? remote.app : app]

var homePath = remote.app.getPath("home");

// // Use JSON file for storage
const dbFile = path.join(homePath, "db.json");

const adapter = new JSONFileSync(dbFile);
const db = new LowSync(adapter);

// // Read data from JSON file, this will set db.data content
db.read();
// console.log("db", db, db.data);
// // If file.json doesn't exist, db.data will be null
// // Set default data
// // db.data = db.data || { posts: [] } // Node < v15.x
// db.data ||= { posts: [] }; // Node >= 15.x
db.data = db.data || { groupData: {} };
// db.data.groupData.push("test");
db.write();
export default db;
