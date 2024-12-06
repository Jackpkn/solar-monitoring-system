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
exports.getSolarData = exports.addSolarData = void 0;
const db_1 = __importDefault(require("../config/db"));
// Define DynamoDB table name
const tableName = 'SolarData';
// Add solar data to DynamoDB
const addSolarData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        TableName: tableName,
        Item: data,
    };
    try {
        yield db_1.default.put(params).promise();
        return { message: 'Data added successfully' };
    }
    catch (error) {
        console.error('Error adding data:', error);
        throw new Error('Error adding data to DynamoDB');
    }
});
exports.addSolarData = addSolarData;
// Fetch solar data by ID from DynamoDB
const getSolarData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        TableName: tableName,
        Key: { id },
    };
    try {
        const result = yield db_1.default.get(params).promise();
        return result.Item;
    }
    catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Error fetching data from DynamoDB');
    }
});
exports.getSolarData = getSolarData;
