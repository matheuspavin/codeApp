import express from "express";
import { ShippingLabelGenerator } from "./generateShippingLabel";
import { LabelData } from "./types";
/**
 * Express route handler that generates a PDF shipping label.
 *
 * @route POST /get-label
 * @param {express.Request} req - The HTTP request, with label data in the body.
 * @param {express.Response} res - The HTTP response, returns a PDF file.
 * @returns {Promise<void>} Sends a PDF buffer or error response.
 */
export const shippingLabel = async (req: express.Request, res: express.Response) => {
  //  Your implementation
  try {
    const payload = req.body;
    const language = payload.language || 'en';
    const labelData: LabelData = {
      orderNumber: payload.order,
      customerName: payload.name,
      company: payload.return_address.company,
      address: payload.return_address.address,
      zipCode: payload.return_address.zip_code,
      city: payload.return_address.city,
      country: payload.return_address.country,
      language: language
    };

    const generator = new ShippingLabelGenerator(labelData);
    const pdfBuffer = await generator.generate();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=shipping-label.pdf');
    res.send(pdfBuffer);

  } catch (error) {
    console.error('Error generating label:', error);
    res.status(500).send('Failed to generate shipping label');
  }
}