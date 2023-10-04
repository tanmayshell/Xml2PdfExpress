import puppeteer from 'puppeteer';
import { promisify } from 'util';
import { readFile } from 'fs';
import handlebars from 'handlebars';
import { parseXml } from '../../src/utils/parseXml.js';
import { loadpartials } from '../../src/utils/loadPartials.js';

//
const readFileAsync = promisify(readFile);

// Function to generate PDF from XML data 
const generatePDF = async (req, res) => {
  try {
    // Read XML data from the file
    const xmlData = await readFileAsync('task.xml', 'utf-8');

    // Parse XML data to create JS object
    const jsObject = await parseXml(xmlData);

    //Load Partials
    await loadpartials();

    // Read Handlebar Template
    const template = await readFileAsync('task.hbs', 'utf-8');

    // Compile template
    const compiledTemplate = handlebars.compile(template);

    // Define input context
    const inputs = {
      title: 'Movies and Series',
      header: 'This is a partial',
      footer: 'This is the footer',
      movies: jsObject.binge.movies[0].movie,
      series: jsObject.binge.series[0].serie,
    };

    //Generate HTML content
    const html = compiledTemplate(inputs);

    /* Puppeteer library launches a headless browser, create a new page and set the content 
    to XML data */

    // Launch Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set content to XML data
    await page.setContent(html);

    // Generate PDF and store it in 'pdfbuffer'
    const pdfBuffer = await page.pdf();

    // Close Puppeteer
    await browser.close();

    // Set necessary HTTP headers for the response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="output.pdf');

    // Send generated PDF as response
    res.send(pdfBuffer);
  } catch (error) {
    // Show Error Message
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { generatePDF };
