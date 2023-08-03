import cors from "cors";
import express, { Request, Response } from "express";
import fs from "fs";
import { Pool } from "pg";

const allowedOrigins = ["http://localhost:3000"];

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const app = express();
app.use(cors(corsOptions));

// PostgreSQL configuration
const pool = new Pool({
  user: "grangeal",
  host: "localhost",
  password: "<PASSWORD>",
  database: "awardit",
});

// Test the database connection
pool.connect((err, client, done) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  console.log("Connected to PostgreSQL database!");

  // Release the client back to the pool
  done();
});

app.get("/posts", async (req: Request, res: Response) => {
  try {
    const itemsPerPage = 10; // Adjust the number of items per page as needed
    const page = parseInt(req.query.page as string, 10) || 1;
    const offset = (page - 1) * itemsPerPage;

    // Fetch the data from the "reddit_awards" table
    const result = await pool.query(
      "SELECT * FROM reddit_posts ORDER BY totalCost DESC OFFSET $1 LIMIT $2",
      [offset, itemsPerPage]
    );

    // Use the approximate row count estimation
    const totalApproximateRows = await pool.query(
      "SELECT reltuples FROM pg_class WHERE relname = 'reddit_posts'"
    );
    const totalRows = parseFloat(totalApproximateRows.rows[0].reltuples);
    const totalPages = Math.ceil(totalRows / itemsPerPage);

    const posts = result.rows.map((p) => {
      const castedCoins = p.coins as Coin[];

      const freshCoins = castedCoins.map((c) => {
        return {
          coin_price: parseInt(c.M.coin_price.N),
          count: parseInt(c.M.count.N),
          icon: c.M.icon.S,
          name: c.M.name.S,
        };
      });

      return {
        ...p,
        coins: freshCoins,
      };
    });

    const response = {
      page: page,
      totalPages: totalPages,
      posts,
    };

    res.json(response);
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/load-data", async (req: Request, res: Response) => {
  try {
    const rawData = fs.readFileSync("export.json", "utf8");
    const data = JSON.parse(rawData);

    const items = data.Items;

    // Insert each item into the "reddit_posts" table
    for (const item of items) {
      const subReddit = item.subReddit.S;
      const totalCost = Number(item.totalCost.N);
      const permalink = item.permalink.S;
      const coins = JSON.stringify(item.coins.L);
      const id = item.id.S;
      const title = item.title.S;

      // Prepare and execute the INSERT query
      await pool.query(
        "INSERT INTO reddit_posts (subReddit, totalCost, permalink, coins, id, title) VALUES ($1, $2, $3, $4, $5, $6)",
        [subReddit, totalCost, permalink, coins, id, title]
      );
    }

    res.status(200).json({ message: "Data loaded successfully" });
  } catch (err) {
    console.error("Error loading data:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export interface Coin {
  M: M;
}

export interface M {
  icon: Icon;
  name: Name;
  count: Count;
  coin_price: CoinPrice;
}

export interface Icon {
  S: string;
}

export interface Name {
  S: string;
}

export interface Count {
  N: string;
}

export interface CoinPrice {
  N: string;
}
