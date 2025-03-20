const corsOption = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    process.env.DASHBOARD_URL,
    process.env.PORTFOLIO_URL,
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

export { corsOption };
