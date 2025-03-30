import { ShippingLabelGenerator } from '../generateShippingLabel';
import { LabelData } from '../types';

describe('ShippingLabelGenerator', () => {
  const mockLabelData: LabelData = {
    orderNumber: 'CODE-1339',
    customerName: 'Test User',
    company: 'CODE Internet Applications',
    address: 'Frederik Matthesstraat 30',
    zipCode: '2613 ZZ',
    city: 'Delft',
    country: 'The Netherlands',
    language: 'en',
  };

  it('should generate a simple PDF buffer', async () => {
    const generator = new ShippingLabelGenerator(mockLabelData);
    const pdfBuffer = await generator.generate();

    expect(pdfBuffer).toBeInstanceOf(Buffer);
    expect(pdfBuffer.length).toBeGreaterThan(100);
  });
  
});