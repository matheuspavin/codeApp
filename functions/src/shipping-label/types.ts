/** Necessary information to generate the shipping label */

export interface LabelData {
    /** Order reference number */
    orderNumber: string;
    /** Customer's full name */
    customerName: string;
    /** Company name of the customer */
    company: string;
    /** Full address of the customer */
    address: string;
    /** Postal code of the customer */
    zipCode: string;
    /** City of the customer */
    city: string;
    /** Country of the customer */
    country: string;
    /** Language code for the label */
    language: string;
  }