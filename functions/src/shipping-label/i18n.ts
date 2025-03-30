
import { translate } from '@vitalets/google-translate-api';
import { phrases } from './languages/labelPhrases';

export interface TranslationBlock {
    postageRequired: string;
    topInstruction: string;
    bottomInstruction: string;
    orderLabel: string;
    nameLabel: string;
}

export const translations: Record<string, TranslationBlock> = {
    en: {
        postageRequired: 'POSTAGE\nREQUIRED',
        topInstruction: 'Please paste this address label on the outside of the box.',
        bottomInstruction:
            'Please put this part inside the box on top of your products,\nso we can identify your return parcel upon arrival',
        orderLabel: 'Order Number:',
        nameLabel: 'Name:',
    },
    nl: {
        postageRequired: 'PORTO\nVEREIST',
        topInstruction: 'Plak dit retourlabel aan de buitenkant van het pakket.',
        bottomInstruction:
            'Leg dit gedeelte binnen in de doos bovenop je producten,\nzodat we je retourzending kunnen identificeren bij aankomst',
        orderLabel: 'Bestelnummer:',
        nameLabel: 'Naam:',
    },
}
export type TranslationKey = keyof typeof translations.en;

export async function generateTranslations(lang: string): Promise<Record<string, string>> {
    const entries = await Promise.all(
        Object.entries(phrases).map(async ([key, value]) => {
            const result = await translate(value, { to: lang });
            return [key, result.text];
        })
    );

    const translated = Object.fromEntries(entries);
    return translated
}