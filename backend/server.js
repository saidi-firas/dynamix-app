import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import ImportData from "./DataImport.js";
import productRoute from "./Routes/ProductRoutes.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from "./Routes/UserRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";
import pdfuserRoutes from "./Routes/pdfuser.js";
import Product from "./Models/ProductModel.js";
import { protect, admin } from "./Middleware/AuthMiddleware.js";
import asyncHandler from "express-async-handler";
import User from "./Models/UserModel.js";
import Order from "./Models/OrderModel.js";

dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());
app.use(cors());

// API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/pdfuser", pdfuserRoutes);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// DELETE USER BY ID
app.delete(
  "/userdell/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.remove();
      res.status(200).json({ message: "user deleted" });
    } else {
      res.status(404).send("user not found");
    }
  })
);

// get top rating products
app.get("/rating", async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});

//get recommend two  products
app.get(
  "/recommend",
  asyncHandler(async (req, res) => {
    try {
      const products = await Product.aggregate([{ $sample: { size: 9 } }]);
      res.json(products);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);

// get latest product added to the store  (for home page)
app.get(
  "/latest",
  asyncHandler(async (req, res) => {
    try {
      const products = await Product.find({}).sort({ _id: -1 }).limit(6);
      res.json(products);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);

// Route to get products by category
app.get("/products/category/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ categories: category });
    res.send(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// get all categories from the database
app.get("/allcategories", async (req, res) => {
  try {
    const categories = await Product.find().distinct("categories");
    res.send(categories);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//GET USER STATS

app.get("/stats", async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
//GET ORDERS STATS BY MONTH AND YEAR

app.get("/ordersstats", async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await Order.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

//order incom

app.get("/income", async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.send(income);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server run in port ${PORT}`));
