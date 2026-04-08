export const servicePricingData = {
  Startup: {
    Proprietorship: [
      {
        name: 'Proprietorship Basic',
        description: 'Suitable for new founders who want essential registration and filing support.',
        price: 'Rs 1,499',
        includes: [
          'Business consultation',
          'Document checklist support',
          'Registration filing assistance',
          'Basic compliance guidance',
        ],
      },
      {
        name: 'Proprietorship Standard',
        description: 'Best for active businesses needing registration plus recurring compliance help.',
        price: 'Rs 7,899',
        includes: [
          'Everything in Basic',
          'GST registration support',
          'Monthly filing guidance',
          'Priority email support',
        ],
      },
      {
        name: 'Proprietorship Premium',
        description: 'Complete package for businesses looking for ongoing tax and compliance operations.',
        price: 'Rs 19,899',
        includes: [
          'Everything in Standard',
          'Dedicated compliance expert',
          'ITR and year-end assistance',
          'Advanced reporting support',
        ],
      },
    ],
    Partnership: [
      {
        name: 'Partnership Deed',
        description: 'Get your partnership firm deed drafted and registration-ready with expert support.',
        price: 'Rs 2,899',
        includes: [
          'Partnership deed draft',
          'PAN card registration',
          'Document preparation support',
          'Bank account opening assistance',
        ],
      },
      {
        name: 'Partnership - Deed & GST',
        description: 'Ideal for new firms that need deed setup along with GST registration support.',
        price: 'Rs 10,899',
        includes: [
          'Partnership deed draft',
          'PAN card registration',
          'GST registration',
          'GSTR-1 filing guidance',
        ],
      },
      {
        name: 'Partnership - Deed, GST & ITR',
        description: 'Complete package for partnership firms with GST and tax filing assistance.',
        price: 'Rs 14,899',
        includes: [
          'Partnership deed draft',
          'PAN card registration',
          'GST registration',
          'ITR filing support',
        ],
      },
    ],
  },
}

export const getServicePricing = (category, service) => {
  return servicePricingData?.[category]?.[service] ?? []
}
