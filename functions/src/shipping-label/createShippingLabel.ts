import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

interface LabelData {
    orderNumber: string;
    customerName: string;
    company: string;
    address: string;
    zipCode: string;
    city: string;
    country: string;
}

export function createShippingLabel(data: LabelData, outputPath: string): void {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    doc.pipe(fs.createWriteStream(outputPath));


    // Logo
    const logoPath = path.resolve(__dirname, '../../../assets/code-logo.png');

    doc.image(logoPath, 80, 75, { width: 182 });

   //Shipping Label
    doc.font('Helvetica-Bold').fontSize(18);

    const labelX = 80;     
    const labelY = 150;      

    doc.text(data.company, labelX, labelY);
    doc.text(data.address, labelX, doc.y + 2);
    doc.text(`${data.zipCode} ${data.city}`, labelX, doc.y + 2);
    doc.text(data.country, labelX, doc.y + 2);

    //Stamp part
    const postageBoxX = 435;
    const postageBoxY = 80;
    const postageBoxWidth = 85;
    const postageBoxHeight = 100;

    doc.font('Helvetica').fontSize(15);

    doc
        .rect(postageBoxX, postageBoxY, postageBoxWidth, postageBoxHeight)
        .lineWidth(1)
        .strokeColor('black')
        .stroke();

    const postageText = 'POSTAGE\nREQUIRED';
    doc
        .fontSize(12)
        .fillColor('black')
        .text(postageText, postageBoxX, postageBoxY + 35, {
            width: postageBoxWidth,
            align: 'center',
            lineGap: 7,
        });

    // Label Instructions
    const labelSectionX = 80;
    const triangleBeginX = labelSectionX + 50;
    let labelSectionY = doc.y + 210;

    const triangleColor = '#D32F2F';
    const triangleWidth = 15;
    const triangleHeight = 10;

    //Triangles before the text
    doc
        .moveTo(triangleBeginX, labelSectionY - triangleHeight)
        .lineTo(triangleBeginX - triangleWidth / 2, labelSectionY)
        .lineTo(triangleBeginX + triangleWidth / 2, labelSectionY)
        .fill(triangleColor);

    doc
        .moveTo(labelSectionX + 390, labelSectionY - triangleHeight)
        .lineTo(labelSectionX + 390 - triangleWidth / 2, labelSectionY)
        .lineTo(labelSectionX + 390 + triangleWidth / 2, labelSectionY)
        .fill(triangleColor);

    //Top instruction
    doc
        .font('Helvetica')
        .fontSize(11)
        .fillColor(triangleColor)
        .text(
            'Please paste this address label on the outside of the box.',
            labelSectionX + 17,
            labelSectionY - triangleHeight + 5,
            { width: 400, align: 'center' }
        );

    // ✂️ DOTTED CUT LINE
    labelSectionY = doc.y + 20;

    doc
        .moveTo(labelSectionX, labelSectionY)
        .lineTo(postageBoxX + postageBoxWidth, labelSectionY)
        .dash(3, { space: 1 })
        .strokeColor('black')
        .stroke()
        .undash();

    //Triangles for the down instruction
    labelSectionY += 45;

    doc
        .moveTo(triangleBeginX, labelSectionY)
        .lineTo(triangleBeginX - triangleWidth / 2, labelSectionY - triangleHeight)
        .lineTo(triangleBeginX + triangleWidth / 2, labelSectionY - triangleHeight)
        .fill(triangleColor);

    doc
        .moveTo(labelSectionX + 390, labelSectionY)
        .lineTo(labelSectionX + 390 - triangleWidth / 2, labelSectionY - triangleHeight)
        .lineTo(labelSectionX + 390 + triangleWidth / 2, labelSectionY - triangleHeight)
        .fill(triangleColor);

    //Bottom instruction
    doc
        .font('Helvetica')
        .fontSize(11)
        .fillColor(triangleColor)
        .text(
            'Please put this part inside the box on top of your products,\nso we can identify your return parcel upon arrival',
            labelSectionX + 17,
            labelSectionY - triangleHeight - 5,
            { width: 400, align: 'center', lineGap: 0 }
        );

    // ✂️ Dotted Cut Line
    labelSectionY = doc.y + 15;


    labelSectionY = doc.y + 90;

    const labelDataX = labelSectionX;
    const valueX = labelDataX + 150;

    doc
        .font('Helvetica')
        .fontSize(18)
        .fillColor('black')
        .text('Order Number:', labelDataX, labelSectionY);

    doc
        .font('Helvetica-Bold')
        .text(data.orderNumber, valueX, labelSectionY);

    labelSectionY += 50;

    doc
        .font('Helvetica')
        .text('Name:', labelDataX, labelSectionY);

    doc
        .font('Helvetica-Bold')
        .text(data.customerName, valueX, labelSectionY);


    doc.end();
}