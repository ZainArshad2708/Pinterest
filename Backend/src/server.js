import "dotenv/config";
import bcrypt from "bcryptjs";
import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const backendRoot = path.resolve(__dirname, "..");
const dataDirectory = path.join(backendRoot, "data");
const uploadDirectory = path.join(backendRoot, "uploads");
fs.mkdirSync(dataDirectory, { recursive: true });
fs.mkdirSync(uploadDirectory, { recursive: true });

const database = new Database(path.join(dataDirectory, "pinterest.sqlite"));
database.pragma("journal_mode = WAL");
database.pragma("foreign_keys = ON");
database.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE COLLATE NOCASE,
    password_hash TEXT NOT NULL,
    about TEXT NOT NULL DEFAULT '',
    pronouns TEXT NOT NULL DEFAULT '',
    account_type TEXT NOT NULL DEFAULT 'personal',
    profile_visibility TEXT NOT NULL DEFAULT 'public',
    settings_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS pins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    image_url TEXT NOT NULL,
    ratio TEXT NOT NULL DEFAULT '4 / 5',
    author_id INTEGER,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
  CREATE TABLE IF NOT EXISTS authors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    avatar_url TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pin_id INTEGER NOT NULL,
    author_id INTEGER NOT NULL,
    body TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pin_id) REFERENCES pins(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
  );
  CREATE TABLE IF NOT EXISTS boards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`);

const userColumns = database.prepare("PRAGMA table_info(users)").all().map((column) => column.name);
const migrations = {
  about: "ALTER TABLE users ADD COLUMN about TEXT NOT NULL DEFAULT ''",
  pronouns: "ALTER TABLE users ADD COLUMN pronouns TEXT NOT NULL DEFAULT ''",
  account_type: "ALTER TABLE users ADD COLUMN account_type TEXT NOT NULL DEFAULT 'personal'",
  profile_visibility: "ALTER TABLE users ADD COLUMN profile_visibility TEXT NOT NULL DEFAULT 'public'",
  settings_json: "ALTER TABLE users ADD COLUMN settings_json TEXT NOT NULL DEFAULT '{}'",
};
Object.entries(migrations).forEach(([column, statement]) => {
  if (!userColumns.includes(column)) database.exec(statement);
});
const pinColumns = database.prepare("PRAGMA table_info(pins)").all().map((column) => column.name);
if (!pinColumns.includes("author_id")) database.exec("ALTER TABLE pins ADD COLUMN author_id INTEGER");

const defaultPins = [
  ["A soft corner to unwind", "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=85", "4 / 5"],
  ["Beautiful little things", "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=700&q=85", "4 / 3"],
  ["The perfect pasta night", "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=85", "4 / 5"],
  ["Fresh summer look", "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=85", "4 / 6"],
  ["Seaside state of mind", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=85", "4 / 3"],
  ["Simple flower arrangement", "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=700&q=85", "4 / 5"],
  ["Morning light", "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=700&q=85", "4 / 6"],
  ["A little sweet treat", "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=700&q=85", "4 / 4"],
  ["Wander farther", "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=700&q=85", "4 / 5"],
  ["Notes from the garden", "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=700&q=85", "4 / 3"],
  ["Everyday makeup", "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=85", "4 / 5"],
  ["Layers for fall", "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=85", "4 / 6"],
  ["A well made table", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=4", "4 / 4"],
  ["Citrus on the counter", "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=700&q=85", "4 / 5"],
  ["A place to read", "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=700&q=85", "4 / 3"],
  ["Easy neutral manicure", "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=700&q=85", "4 / 5"],
  ["Sunday brunch", "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=700&q=85", "4 / 4"],
  ["Clay and texture", "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=700&q=85", "4 / 5"],
  ["Warm morning coffee", "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=85", "4 / 5"],
  ["A calm workspace", "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=700&q=85", "4 / 3"],
  ["Green spaces", "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=700&q=85", "4 / 6"],
  ["Weekend road trip", "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=700&q=85", "4 / 5"],
  ["Minimal kitchen", "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=700&q=85", "4 / 4"],
  ["Fresh market flowers", "https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=700&q=85", "4 / 5"],
  ["Blue hour by the sea", "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=85", "4 / 6"],
  ["Vintage details", "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=700&q=85", "4 / 3"],
  ["Golden hour outfit", "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=700&q=85", "4 / 5"],
  ["Lemon cake", "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=700&q=85", "4 / 4"],
  ["Small balcony garden", "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=700&q=85", "4 / 5"],
  ["Modern architecture", "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=700&q=85", "4 / 6"],
  ["Cozy reading nook", "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=85", "4 / 3"],
  ["Pasta from scratch", "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=700&q=85", "4 / 5"],
  ["Neutral bedroom", "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=85", "4 / 6"],
  ["Painted ceramics", "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=700&q=85", "4 / 4"],
  ["Mountain weekend", "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=700&q=85", "4 / 5"],
  ["Simple breakfast", "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=700&q=85", "4 / 3"],
  ["Soft linen textures", "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=700&q=85", "4 / 6"],
  ["City lights", "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=700&q=85", "4 / 5"],
  ["Freshly baked bread", "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=85", "4 / 4"],
  ["Tropical escape", "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=85", "4 / 5"],
  ["Creative studio", "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&q=85", "4 / 6"],
  ["Sunday flowers", "https://images.unsplash.com/photo-1455582916367-25f75bfc6710?auto=format&fit=crop&w=700&q=85", "4 / 3"],
  ["Earthy living room", "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=75", "4 / 5"],
  ["Poolside afternoon", "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=700&q=85", "4 / 6"],
  ["Handmade paper", "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=700&q=85", "4 / 4"],
  ["Street style notes", "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=700&q=85", "4 / 5"],
  ["A bright hallway", "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=85", "4 / 3"],
  ["Fresh fruit bowl", "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=700&q=85", "4 / 5"],
  ["Quiet countryside", "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=75", "4 / 6"],
];

const authors = [
  ["Maya Chen", "https://i.pravatar.cc/100?img=47"],
  ["Olivia Carter", "https://i.pravatar.cc/100?img=32"],
  ["Noah Williams", "https://i.pravatar.cc/100?img=12"],
  ["Ava Martinez", "https://i.pravatar.cc/100?img=49"],
  ["Ethan Brooks", "https://i.pravatar.cc/100?img=68"],
  ["Sofia Wilson", "https://i.pravatar.cc/100?img=44"],
  ["Liam Anderson", "https://i.pravatar.cc/100?img=5"],
  ["Emma Davis", "https://i.pravatar.cc/100?img=23"],
  ["Lucas Moore", "https://i.pravatar.cc/100?img=8"],
  ["Isabella Taylor", "https://i.pravatar.cc/100?img=25"],
];

const insertAuthor = database.prepare("INSERT INTO authors (name, avatar_url) VALUES (?, ?)");
if (database.prepare("SELECT 1 FROM authors LIMIT 1").get() === undefined) {
  const seedAuthors = database.transaction(() => authors.forEach(([name, avatar]) => insertAuthor.run(name, avatar)));
  seedAuthors();
}
const authorCount = database.prepare("SELECT COUNT(*) AS count FROM authors").get().count;
database.prepare("UPDATE pins SET author_id = ((id - 1) % ?) + 1 WHERE author_id IS NULL").run(authorCount);

const commentBodies = [
  "This is such a beautiful idea.",
  "Saving this for later inspiration!",
  "The colors and composition are perfect.",
  "I love how calm this feels.",
  "This would fit perfectly on my mood board.",
  "Absolutely adding this to my favorites.",
];

function seedCommentsForPin(pinId) {
  if (database.prepare("SELECT 1 FROM comments WHERE pin_id = ? LIMIT 1").get(pinId)) return;
  const insertComment = database.prepare("INSERT INTO comments (pin_id, author_id, body) VALUES (?, ?, ?)");
  const seed = database.transaction(() => commentBodies.forEach((body, index) => insertComment.run(pinId, (index % authorCount) + 1, body)));
  seed();
}

function seedPinsForUser(userId) {
  const insertPin = database.prepare("INSERT INTO pins (user_id, title, image_url, ratio) VALUES (?, ?, ?, ?)");
  const existingTitles = new Set(database.prepare("SELECT title FROM pins WHERE user_id = ?").all(userId).map((pin) => pin.title));
  const seed = database.transaction(() => defaultPins.forEach(([title, imageUrl, ratio]) => {
    if (!existingTitles.has(title)) insertPin.run(userId, title, imageUrl, ratio);
  }));
  seed();
  database.prepare("UPDATE pins SET author_id = ((id - 1) % ?) + 1 WHERE user_id = ? AND author_id IS NULL").run(authorCount, userId);
  database.prepare("SELECT id FROM pins WHERE user_id = ?").all(userId).forEach(({ id }) => seedCommentsForPin(id));
}

const seedUser = database.prepare("SELECT id FROM users WHERE email = ?").get("demo@pinterest.local");
if (!seedUser) {
  const result = database.prepare("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)").run("Zain Arshad", "demo@pinterest.local", bcrypt.hashSync("password123", 12));
  seedPinsForUser(result.lastInsertRowid);
}

const app = express();
const port = Number(process.env.PORT || 4000);
const jwtSecret = process.env.JWT_SECRET || "development-only-secret";
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json({ limit: "1mb" }));
app.use("/uploads", express.static(uploadDirectory));

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDirectory,
    filename: (_request, file, callback) => callback(null, `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9._-]/g, "")}`),
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_request, file, callback) => callback(null, file.mimetype.startsWith("image/")),
});

const publicUser = ({ id, name, email, about = "", pronouns = "", account_type = "personal", profile_visibility = "public", settings_json = "{}" }) => ({
  id,
  name,
  email,
  about,
  pronouns,
  accountType: account_type,
  profileVisibility: profile_visibility,
  settings: JSON.parse(settings_json || "{}"),
});
const createToken = (user) => jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "7d" });
const requireAuth = (request, response, next) => {
  const token = request.headers.authorization?.replace("Bearer ", "");
  if (!token) return response.status(401).json({ message: "Authentication required" });
  try {
    request.user = database.prepare("SELECT id, name, email FROM users WHERE id = ?").get(jwt.verify(token, jwtSecret).id);
    if (!request.user) throw new Error("User not found");
    next();
  } catch {
    response.status(401).json({ message: "Invalid or expired token" });
  }
};

app.get("/api/health", (_request, response) => response.json({ status: "ok" }));

app.post("/api/auth/register", async (request, response) => {
  const name = request.body.name?.trim();
  const email = request.body.email?.trim().toLowerCase();
  const password = request.body.password || "";
  if (!name || !email || password.length < 8) return response.status(400).json({ message: "Name, email, and an 8-character password are required" });
  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const result = database.prepare("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)").run(name, email, passwordHash);
    const user = { id: result.lastInsertRowid, name, email };
    seedPinsForUser(user.id);
    response.status(201).json({ user, token: createToken(user) });
  } catch (error) {
    response.status(error.code === "SQLITE_CONSTRAINT_UNIQUE" ? 409 : 500).json({ message: error.code === "SQLITE_CONSTRAINT_UNIQUE" ? "Email is already registered" : "Could not create account" });
  }
});

app.post("/api/auth/login", async (request, response) => {
  const email = request.body.email?.trim().toLowerCase();
  const password = request.body.password || "";
  const user = database.prepare("SELECT id, name, email, password_hash FROM users WHERE email = ?").get(email);
  if (!user || !(await bcrypt.compare(password, user.password_hash))) return response.status(401).json({ message: "Invalid email or password" });
  const safeUser = publicUser(user);
  response.json({ user: safeUser, token: createToken(safeUser) });
});

app.get("/api/auth/me", requireAuth, (request, response) => {
  const user = database.prepare("SELECT id, name, email, about, pronouns, account_type, profile_visibility, settings_json FROM users WHERE id = ?").get(request.user.id);
  response.json({ user: publicUser(user) });
});

app.patch("/api/auth/profile", requireAuth, (request, response) => {
  const current = database.prepare("SELECT * FROM users WHERE id = ?").get(request.user.id);
  const settings = request.body.settings || JSON.parse(current.settings_json || "{}");
  database.prepare("UPDATE users SET name = ?, about = ?, pronouns = ?, account_type = ?, profile_visibility = ?, settings_json = ? WHERE id = ?").run(
    request.body.name?.trim() || current.name,
    request.body.about ?? current.about,
    request.body.pronouns ?? current.pronouns,
    ["personal", "business"].includes(request.body.accountType) ? request.body.accountType : current.account_type,
    ["public", "private"].includes(request.body.profileVisibility) ? request.body.profileVisibility : current.profile_visibility,
    JSON.stringify(settings),
    current.id,
  );
  const updated = database.prepare("SELECT id, name, email, about, pronouns, account_type, profile_visibility, settings_json FROM users WHERE id = ?").get(current.id);
  response.json({ user: publicUser(updated) });
});

app.post("/api/auth/password", requireAuth, async (request, response) => {
  if (!request.body.currentPassword || !request.body.newPassword || request.body.newPassword.length < 8) return response.status(400).json({ message: "Both passwords are required and the new password must be 8 characters" });
  const user = database.prepare("SELECT password_hash FROM users WHERE id = ?").get(request.user.id);
  if (!(await bcrypt.compare(request.body.currentPassword, user.password_hash))) return response.status(400).json({ message: "Current password is incorrect" });
  database.prepare("UPDATE users SET password_hash = ? WHERE id = ?").run(await bcrypt.hash(request.body.newPassword, 12), request.user.id);
  response.json({ message: "Password updated" });
});

app.delete("/api/auth/account", requireAuth, (request, response) => {
  database.prepare("DELETE FROM users WHERE id = ?").run(request.user.id);
  response.status(204).end();
});

app.get("/api/auth/export", requireAuth, (request, response) => {
  const user = database.prepare("SELECT id, name, email, about, pronouns, account_type, profile_visibility, settings_json FROM users WHERE id = ?").get(request.user.id);
  const pins = database.prepare("SELECT id, title, description, image_url AS imageUrl, ratio, created_at AS createdAt FROM pins WHERE user_id = ?").all(request.user.id);
  const boards = database.prepare("SELECT id, name, created_at AS createdAt FROM boards WHERE user_id = ?").all(request.user.id);
  response.json({ user: publicUser(user), pins, boards });
});

app.get("/api/pins", requireAuth, (request, response) => {
  seedPinsForUser(request.user.id);
  const search = request.query.search?.trim() || "";
  const pins = database.prepare(`SELECT p.id, p.title, p.description, p.image_url AS imageUrl, p.ratio, COALESCE(a.name, u.name) AS authorName, COALESCE(a.avatar_url, 'https://i.pravatar.cc/100?u=' || u.id) AS authorAvatar FROM pins p JOIN users u ON u.id = p.user_id LEFT JOIN authors a ON a.id = p.author_id WHERE p.user_id = ? AND p.title LIKE ? ORDER BY p.id DESC`).all(request.user.id, `%${search}%`);
  response.json({ pins });
});

app.get("/api/pins/:id", requireAuth, (request, response) => {
  const pin = database.prepare(`SELECT p.id, p.title, p.description, p.image_url AS imageUrl, p.ratio, COALESCE(a.name, u.name) AS authorName, COALESCE(a.avatar_url, 'https://i.pravatar.cc/100?u=' || u.id) AS authorAvatar FROM pins p JOIN users u ON u.id = p.user_id LEFT JOIN authors a ON a.id = p.author_id WHERE p.id = ? AND p.user_id = ?`).get(request.params.id, request.user.id);
  if (!pin) return response.status(404).json({ message: "Pin not found" });
  seedCommentsForPin(pin.id);
  const comments = database.prepare("SELECT c.id, c.body, c.created_at AS createdAt, a.name AS authorName, a.avatar_url AS authorAvatar FROM comments c JOIN authors a ON a.id = c.author_id WHERE c.pin_id = ? ORDER BY c.id ASC").all(pin.id);
  response.json({ pin: { ...pin, comments } });
});

app.post("/api/pins", requireAuth, upload.single("image"), (request, response) => {
  const title = request.body.title?.trim() || "Untitled pin";
  const description = request.body.description?.trim() || "";
  const imageUrl = request.file ? `/uploads/${request.file.filename}` : request.body.imageUrl?.trim();
  if (!imageUrl) return response.status(400).json({ message: "An image is required" });
  const result = database.prepare("INSERT INTO pins (user_id, title, description, image_url) VALUES (?, ?, ?, ?)").run(request.user.id, title, description, imageUrl);
  const pin = database.prepare("SELECT id, title, description, image_url AS imageUrl, ratio, u.name AS authorName, 'https://i.pravatar.cc/100?u=' || u.id AS authorAvatar FROM pins p JOIN users u ON u.id = p.user_id WHERE p.id = ?").get(result.lastInsertRowid);
  response.status(201).json({ pin });
});

app.put("/api/pins/:id", requireAuth, upload.single("image"), (request, response) => {
  const pin = database.prepare("SELECT * FROM pins WHERE id = ? AND user_id = ?").get(request.params.id, request.user.id);
  if (!pin) return response.status(404).json({ message: "Pin not found" });
  const imageUrl = request.file ? `/uploads/${request.file.filename}` : pin.image_url;
  database.prepare("UPDATE pins SET title = ?, description = ?, image_url = ? WHERE id = ?").run(request.body.title?.trim() || "Untitled pin", request.body.description?.trim() || "", imageUrl, pin.id);
  const updatedPin = database.prepare("SELECT p.id, p.title, p.description, p.image_url AS imageUrl, p.ratio, u.name AS authorName, 'https://i.pravatar.cc/100?u=' || u.id AS authorAvatar FROM pins p JOIN users u ON u.id = p.user_id WHERE p.id = ?").get(pin.id);
  response.json({ pin: updatedPin });
});

app.delete("/api/pins/:id", requireAuth, (request, response) => {
  const result = database.prepare("DELETE FROM pins WHERE id = ? AND user_id = ?").run(request.params.id, request.user.id);
  if (!result.changes) return response.status(404).json({ message: "Pin not found" });
  response.status(204).end();
});

app.get("/api/boards", requireAuth, (request, response) => {
  const boards = database.prepare("SELECT id, name, 0 AS pinCount FROM boards WHERE user_id = ? ORDER BY id DESC").all(request.user.id);
  response.json({ boards });
});

app.post("/api/boards", requireAuth, (request, response) => {
  const name = request.body.name?.trim();
  if (!name) return response.status(400).json({ message: "Board name is required" });
  const result = database.prepare("INSERT INTO boards (user_id, name) VALUES (?, ?)").run(request.user.id, name);
  response.status(201).json({ board: { id: result.lastInsertRowid, name, pinCount: 0 } });
});

app.use((error, _request, response, _next) => response.status(400).json({ message: error.message || "Request failed" }));
app.listen(port, () => console.log(`Pinterest API listening on http://localhost:${port}`));
