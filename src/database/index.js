import fs from 'fs';
import path from 'path';

const getDBPath = (fileName) => {
  const dir = path.dirname(new URL(import.meta.url).pathname); 
  const projectRoot = path.resolve(dir, '..', '..'); 
  return path.join(projectRoot, 'src', 'database', fileName); 
};

export const readDB = async (fileName) => {
  try {
    const filePath = getDBPath(fileName); 
    console.log('Reading from file:', filePath);  
    const data = await fs.promises.readFile(filePath, 'utf-8');
    return { ok: true, data: JSON.parse(data) };
  } catch (error) {
    console.error('Error reading from DB:', error);
    return { ok: false, error: error.message };
  }
};

export const writeDB = async (fileName, data) => {
  try {
    const filePath = getDBPath(fileName);
    console.log('Writing to file:', filePath);  
    await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2));
    return { ok: true };
  } catch (error) {
    console.error('Error writing to DB:', error);
    return { ok: false, error: error.message };
  }
};
