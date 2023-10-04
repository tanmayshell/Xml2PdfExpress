import express from 'express';
import { generatePDF } from '../controllers/pdfController.js';

const router = express.Router();

// Route to generate PDF from XML
// 'generate-pdf' is the endpoint
router.get('/generate-pdf', generatePDF);

export default router;
