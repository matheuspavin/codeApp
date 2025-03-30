
import { shippingLabel } from '../index';
import { ShippingLabelGenerator } from '../generateShippingLabel';
import { Request, Response } from 'express';

jest.mock('../generateShippingLabel', () => {
    return {
        ShippingLabelGenerator: jest.fn().mockImplementation(() => ({
            generate: jest.fn().mockResolvedValue(Buffer.from('fake-pdf'))
        }))
    };
});

describe('shippingLabel route', () => {
    // Mock request and response objects
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = {
            body: {
                return_address: {
                    company: 'CODE Internet Applications',
                    address: 'Frederik Matthesstraat 30',
                    zipCode: '2613 ZZ',
                    city: 'Delft',
                    country: 'The Netherlands',
                },
                order: "CODE-1339",
                name: "Test User",
                language: "en"
            }
        };

        res = {
            setHeader: jest.fn(),
            send: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
    });

    it('should respond with a PDF buffer and correct headers', async () => {
        await shippingLabel(req as Request, res as Response);

        expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/pdf');
        expect(res.setHeader).toHaveBeenCalledWith(
            'Content-Disposition',
            'inline; filename=shipping-label.pdf'
        );
        expect(res.send).toHaveBeenCalledWith(expect.any(Buffer));
    });

    it('should handle errors and return 500', async () => {
        // Force generator to throw
        (ShippingLabelGenerator as jest.Mock).mockImplementation(() => {
            return {
                generate: jest.fn().mockRejectedValue(new Error('Boom'))
            };
        });

        await shippingLabel(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Failed to generate shipping label');
    });
});