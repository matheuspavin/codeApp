
import googleTranslate from '@vitalets/google-translate-api';

export const translations = {
    en: {
      topInstruction: 'Please paste this address label on the outside of the box.',
      bottomInstruction:
        'Please put this part inside the box on top of your products,\nso we can identify your return parcel upon arrival',
      orderLabel: 'Order Number:',
      nameLabel: 'Name:',
    },
    nl: {
      topInstruction: 'Plak dit retourlabel aan de buitenkant van het pakket.',
      bottomInstruction:
        'Leg dit gedeelte binnen in de doos bovenop je producten,\nzodat we je retourzending kunnen identificeren bij aankomst',
      orderLabel: 'Bestelnummer:',
      nameLabel: 'Naam:',
    },
  };

const phrases = {
  topInstruction: 'Please paste this address label on the outside of the box.',
  bottomInstruction: 'Please put this part inside the box on top of your products,\nso we can identify your return parcel upon arrival',
  orderLabel: 'Order Number:',
  nameLabel: 'Name:'
};

export async function generateTranslations(lang: string): Promise < Record < string, string >> {
  const entries = await Promise.all(
    Object.entries(phrases).map(async ([key, value]) => {
      const result = await googleTranslate.translate(value, { to: lang });
      return [key, result.text];
    })
  );

  const translated = Object.fromEntries(entries);
  return translated
}