import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src/data');

const getFilePath = (filename) => path.join(DATA_DIR, filename);

export async function readData(filename) {
    try {
        const filePath = getFilePath(filename);
        if (!fs.existsSync(filePath)) {
            return [];
        }
        const content = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(content || '[]');
    } catch (error) {
        console.error(`Error reading ${filename}:`, error);
        return [];
    }
}

export async function writeData(filename, data) {
    try {
        const filePath = getFilePath(filename);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error(`Error writing ${filename}:`, error);
        return false;
    }
}

// Specialized helpers
export const getProducts = () => readData('products.json');
export const saveProducts = (data) => writeData('products.json', data);

export const getDonations = () => readData('donations.json');
export const saveDonations = (data) => writeData('donations.json', data);

export const getOrders = () => readData('orders.json');
export const saveOrders = (data) => writeData('orders.json', data);
