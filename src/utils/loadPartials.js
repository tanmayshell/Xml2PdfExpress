import { promisify } from 'util';
import { readFile } from 'fs';
import handlebars from 'handlebars';
const readFileAsync = promisify(readFile);

// Function to load partials
export const loadpartials = async () => {
  try {
    // Read Partial Handlebars file
    const header = await readFileAsync('header.hbs', 'utf-8');

    //Register partial
    handlebars.registerPartial('header', header);
  } catch (error) {
    console.error('Can not load partials');
  }
};
