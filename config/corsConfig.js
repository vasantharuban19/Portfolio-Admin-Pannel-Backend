const corsOption = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    process.env.DASHBOARD_URL,
    process.env.PORTFOLIO_URL,
    "https://my-portfolio-flame-two-94.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

export { corsOption };
