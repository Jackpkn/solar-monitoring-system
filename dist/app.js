"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const solarDataRoutes_1 = __importDefault(require("./routes/solarDataRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// API routes
app.use('/api', solarDataRoutes_1.default);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
