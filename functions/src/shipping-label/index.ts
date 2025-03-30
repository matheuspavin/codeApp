import express from "express";
import { createShippingLabel } from "./createShippingLabel";
import path from "path";
/**
 * Route: get the shipping label
 * 
 * @param req Express request
 * @param res Express response
 */
export const shippingLabel = async (req: express.Request, res: express.Response) => {
  //  Your implementation
  const labelData = {
    orderNumber: 'CODE-1339',
    customerName: 'Test User',
    company: 'CODE Internet Applications',
    address: 'Frederik Matthesstraat 30',
    zipCode: '2613 ZZ',
    city: 'Delft',
    country: 'Netherlands',
  };
  
  createShippingLabel(labelData, path.join(__dirname, '../../../assets/output-label.pdf'));


  return res.send('Your label is returned here');
}