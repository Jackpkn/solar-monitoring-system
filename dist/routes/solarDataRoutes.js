"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const solarDataController_1 = require("../controllers/solarDataController");
const router = express_1.default.Router();
// Route to add solar data
router.post('/solar', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, solarDataController_1.addSolarData)(req.body);
        return res.status(201).send(response); // Return response
    }
    catch (error) {
        next(error); // Pass error to the error handler
    }
}));
// Route to get solar data by ID
router.get('/solar/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, solarDataController_1.getSolarData)(req.params.id);
        if (!data) {
            return res.status(404).send({ message: 'Data not found' });
        }
        return res.send(data); // Return response
    }
    catch (error) {
        next(error); // Pass error to the error handler
    }
}));
exports.default = router;
