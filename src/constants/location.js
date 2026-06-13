// Global Business Location - Single Source of Truth
// Ensure all location references use this constant

export const BUSINESS_LOCATION = {
  // Company Name
  name: 'Al Ansar Abaya',

  // Physical Address
  address: {
    street: 'Main GT Road',
    area: 'Amandara',
    city: 'Chakdara',
    district: 'Dir Lower',
    state: 'Khyber Pakhtunkhwa',
    country: 'Pakistan',
    postalCode: ''
  },

  // Full address strings for display
  fullAddress: 'Main GT Road, Amandara, Chakdara, Dir Lower, KPK, Pakistan',
  shortAddress: 'Main GT Road, Amandara, Dir Lower, KPK',
  displayAddress: 'Amandara, Chakdara, Dir Lower, Khyber Pakhtunkhwa, Pakistan',

  // Coordinates for Google Maps
  coordinates: {
    latitude: 34.66658048504189,
    longitude: 72.02653017631043
  },

  // Contact Information
  phone: {
    primary: '+92 349 9300253',
    country: '+92',
    number: '3499300253'
  },

  email: 'support@alansarabayah.com',

  // Google Maps Embed URL
  // Generated from: https://maps.google.com/maps?q=Al+Ansar+Abaya+Amandara
  mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.5296167178794!2d72.02653017631043!3d34.66658048504189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dc07af4ce36193%3A0x28d2031e21b737f9!2sAl%20Ansar%20Abaya!5e0!3m2!1sen!2s!4v1781334408440!5m2!1sen!2s',

  // Google Maps Link
  mapsLink: 'https://maps.google.com/?q=Al+Ansar+Abaya,Amandara,Chakdara,Dir+Lower',

  // Business Hours
  hours: {
    weekday: { open: '9:00 AM', close: '9:00 PM', days: 'Monday – Friday' },
    saturday: { open: '10:00 AM', close: '8:00 PM', days: 'Saturday' },
    sunday: { open: '11:00 AM', close: '6:00 PM', days: 'Sunday' }
  },

  // WhatsApp Business
  whatsapp: {
    phoneNumber: '+923499300253',
    link: 'https://wa.me/923499300253'
  },

  // Social Media
  social: {
    tiktok: {
      handle: '@alansarabaya',
      url: 'https://www.tiktok.com/@alansarabaya'
    }
  }
};

export default BUSINESS_LOCATION;
