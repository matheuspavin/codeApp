import PDFDocument from 'pdfkit';
import path from 'path';
import getStream from 'get-stream';
import { PassThrough } from 'stream';
import { LabelData } from './types';
import { translations } from './i18n';

export class ShippingLabelGenerator {
  private doc: PDFKit.PDFDocument;
  private triangleColor = '#D32F2F';
  private triangleWidth = 15;
  private triangleHeight = 10;

  constructor(
    private data: LabelData,
    private language: keyof typeof translations = 'nl'
  ) {
    this.doc = new PDFDocument({ size: 'A4', margin: 50 });
  }

  private get translator() {
    return translations[this.language];
  }


  public async generate(): Promise < Buffer > {
  const stream = this.doc.pipe(new PassThrough());
  this.drawLogo();
  this.drawReturnAddress();
  this.drawPostageBox();
  this.drawTopInstruction();
  this.drawCutLine();
  this.drawBottomInstruction();
  this.drawOrderInfo();
  this.doc.end();

  return await getStream.buffer(stream);
}

  private drawLogo() {
  const logoPath = path.resolve(__dirname, '../../../assets/code-logo.png');
  this.doc.image(logoPath, 80, 75, { width: 182 });
}

  private drawReturnAddress() {
  this.doc.font('Helvetica-Bold').fontSize(18);
  const x = 80;
  let y = 150;

  this.doc.text(this.data.company, x, y);
  this.doc.text(this.data.address, x, this.doc.y + 2);
  this.doc.text(`${this.data.zipCode} ${this.data.city}`, x, this.doc.y + 2);
  this.doc.text(this.data.country, x, this.doc.y + 2);
}

  private drawPostageBox() {
  const x = 435, y = 80, width = 85, height = 100;
  this.doc.font('Helvetica').fontSize(15);

  this.doc.rect(x, y, width, height).lineWidth(1).strokeColor('black').stroke();

  const text = 'POSTAGE\nREQUIRED';
  this.doc.fontSize(12).fillColor('black').text(text, x, y + 35, {
    width,
    align: 'center',
    lineGap: 7,
  });
}

  private drawTriangle(x: number, y: number, direction: 'up' | 'down') {
  const { triangleWidth: w, triangleHeight: h } = this;
  if (direction === 'up') {
    this.doc.moveTo(x, y - h).lineTo(x - w / 2, y).lineTo(x + w / 2, y).fill(this.triangleColor);
  } else {
    this.doc.moveTo(x, y).lineTo(x - w / 2, y - h).lineTo(x + w / 2, y - h).fill(this.triangleColor);
  }
}

  private drawTopInstruction() {
  const x = 80;
  const triangleX1 = x + 50;
  const triangleX2 = x + 390;
  let y = this.doc.y + 210;

  this.drawTriangle(triangleX1, y, 'up');
  this.drawTriangle(triangleX2, y, 'up');

  this.doc.font('Helvetica').fontSize(11).fillColor(this.triangleColor).text(
    this.translator.topInstruction,
    x + 17,
    y - this.triangleHeight + 5,
    { width: 400, align: 'center' }
  );
}

  private drawCutLine() {
  const x = 80;
  let y = this.doc.y + 20;
  this.doc.moveTo(x, y).lineTo(520, y).dash(3, { space: 1 }).strokeColor('black').stroke().undash();
}

  private drawBottomInstruction() {
  const x = 80;
  const triangleX1 = x + 50;
  const triangleX2 = x + 390;
  let y = this.doc.y + 45;

  this.drawTriangle(triangleX1, y, 'down');
  this.drawTriangle(triangleX2, y, 'down');

  this.doc.font('Helvetica').fontSize(11).fillColor(this.triangleColor).text(
    this.translator.bottomInstruction,
    x + 17,
    y - this.triangleHeight - 5,
    { width: 400, align: 'center', lineGap: 0 }
  );
}

  private drawOrderInfo() {
  const xLabel = 80;
  const xValue = xLabel + 150;
  let y = this.doc.y + 90;

  this.doc.font('Helvetica').fontSize(18).fillColor('black').text(this.translator.orderLabel, xLabel, y);
  this.doc.font('Helvetica-Bold').text(this.data.orderNumber, xValue, y);

  y += 50;

  this.doc.font('Helvetica').text(this.translator.nameLabel, xLabel, y);
  this.doc.font('Helvetica-Bold').text(this.data.customerName, xValue, y);
}

  
}