export const phrases = {
    postageRequired: 'POSTAGE\nREQUIRED',
    topInstruction: 'Please paste this address label on the outside of the box.',
    bottomInstruction:
      'Please put this part inside the box on top of your products,\nso we can identify your return parcel upon arrival',
    orderLabel: 'Order Number:',
    nameLabel: 'Name:',
  } as const;
  
  export type PhraseKey = keyof typeof phrases;