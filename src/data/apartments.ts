import { Apartment, FaqItem, Testimonial } from '../types/apartment';

export const BUSINESS_INFO = {
  name: 'Vvichelae',
  brandExtension: 'STAYS & SUITES',
  fullName: 'Vvichelae Stays & Suites',
  descriptor: 'Serviced Apartments • Short-Let Living',
  tagline: 'Feel at Home, Wherever Life Takes You.',
  location: 'Lagos, Nigeria',
  whatsappDisplay: '08144084281',
  whatsappLink: 'https://wa.me/2348144084281',
  email: 'vvichelae@gmail.com',
};

export const HERO_IMAGE = {
  src: '/src/assets/images/hero_lagos_living_1795554197894.jpg',
  alt: 'Sunlit modern Vvichelae apartment living room in Lagos with linen sofa, warm oak table, olive and terracotta cushions',
};

export const VIDEO_SHOWCASES = {
  homeTour: {
    heading: 'Step Inside Your Next Stay.',
    subheading: 'A calm walkthrough of living spaces, dining corners, and sunlit bedrooms prepared for your arrival in Lagos.',
    videoSrc: '/videos/vvichelae-apartment-tour.mp4',
    posterSrc: '/src/assets/images/video_tour_poster_1795554197411.jpg',
    posterAlt: 'Open plan modern serviced apartment in Lagos featuring living room, timber dining table, and bedroom doorway',
    previewFrames: [
      {
        src: '/src/assets/images/video_tour_poster_1795554197411.jpg',
        label: 'Open living and dining flow',
      },
      {
        src: '/src/assets/images/apt3_twobed_bedroom_1795554202353.jpg',
        label: 'Restful bedroom retreat',
      },
      {
        src: '/src/assets/images/apt2_onebed_kitchen_1795554200794.jpg',
        label: 'Equipped residential kitchen',
      },
    ],
  },
  apartmentsExperience: {
    heading: 'More Than a Stay. A Place to Feel at Home.',
    subheading: 'Thoughtful interiors designed for unhurried mornings, quiet work hours, and relaxed evenings across Lagos.',
    videoSrc: '/videos/vvichelae-apartment-experience.mp4',
    posterSrc: '/src/assets/images/video_experience_poster_1795554198106.jpg',
    posterAlt: 'Afternoon light across a modern Lagos apartment lounge and stone kitchen island',
    previewFrames: [
      {
        src: '/src/assets/images/video_experience_poster_1795554198106.jpg',
        label: 'Sunlit lounge and kitchen island',
      },
      {
        src: '/src/assets/images/apt5_vi_living_1795554306983.jpg',
        label: 'Balcony light and calm seating',
      },
      {
        src: '/src/assets/images/apt6_ikoyi_terrace_1795554247349.jpg',
        label: 'Private dining salon and terrace',
      },
    ],
  },
};

export const APARTMENTS: Apartment[] = [
  {
    id: 'studio-yaba',
    slug: 'studio-apartment-yaba',
    name: 'Studio Apartment',
    location: 'Yaba, Lagos',
    neighbourhood: 'Yaba',
    pricePerNight: 45000,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: true,
    shortDescription:
      'A neat, sunlit studio in Yaba tailored for solo travellers or couples seeking calm convenience on the Lagos mainland.',
    fullDescription:
      'Set in a quiet residential pocket of Yaba, this demonstration Studio Apartment brings together warmth and everyday practicality. Designed for short visits, academic stays, or business trips across mainland Lagos, it offers a comfortable queen bed, a compact kitchenette for light meals, reliable cooling, and secure entry so you can settle in effortlessly.',
    amenities: [
      'WiFi',
      'Air conditioning',
      'Kitchenette',
      'Comfortable bed',
      'Smart TV',
      'Secure access',
    ],
    images: [
      {
        src: '/src/assets/images/apt1_studio_main_1795554199149.jpg',
        alt: 'Studio Apartment in Yaba showing queen bed with ivory and terracotta linens, armchair, and smart TV',
        caption: 'Main sleeping and seating area with natural daylight',
      },
      {
        src: '/src/assets/images/apt1_studio_kitchen_1795554198794.jpg',
        alt: 'Compact kitchenette inside Studio Apartment in Yaba with kettle, induction hob, and window bistro table',
        caption: 'Practical kitchenette and sunlit dining corner for two',
      },
      {
        src: '/src/assets/images/apt1_studio_bath_1795554199817.jpg',
        alt: 'Clean modern bathroom in Studio Apartment in Yaba with walk in glass shower and folded olive towels',
        caption: 'Fresh tiled bathroom with walk in shower',
      },
    ],
  },
  {
    id: 'one-bedroom-ikeja',
    slug: 'one-bedroom-apartment-ikeja',
    name: 'One Bedroom Apartment',
    location: 'Ikeja, Lagos',
    neighbourhood: 'Ikeja',
    pricePerNight: 65000,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: true,
    shortDescription:
      'A calm one bedroom residence in Ikeja featuring a dedicated work desk, full kitchen, and private parking.',
    fullDescription:
      'Ideal for corporate visitors and couples arriving through Ikeja, this demonstration One Bedroom Apartment pairs a serene private bedroom with a welcoming living area and dedicated work desk. Enjoy home cooked meals in the fully equipped kitchen, catch up on work with steady WiFi, and rest easily knowing onsite parking is arranged.',
    amenities: [
      'WiFi',
      'Air conditioning',
      'Fully equipped kitchen',
      'Smart TV',
      'Workspace',
      'Parking',
    ],
    images: [
      {
        src: '/src/assets/images/apt2_onebed_living_1795554200334.jpg',
        alt: 'One Bedroom Apartment living room in Ikeja with beige sofa, wooden work desk, and smart TV',
        caption: 'Living room and dedicated workspace by the window',
      },
      {
        src: '/src/assets/images/apt2_onebed_bedroom_1795554200663.jpg',
        alt: 'One Bedroom Apartment bedroom in Ikeja with wooden bed frame, crisp ivory linens, and warm lamp',
        caption: 'Quiet private bedroom with natural timber finishes',
      },
      {
        src: '/src/assets/images/apt2_onebed_kitchen_1795554200794.jpg',
        alt: 'Fully equipped kitchen in One Bedroom Apartment in Ikeja with gas hob, oven, refrigerator, and breakfast bar',
        caption: 'Fully equipped kitchen with breakfast seating',
      },
    ],
  },
  {
    id: 'two-bedroom-lekki',
    slug: 'two-bedroom-apartment-lekki',
    name: 'Two Bedroom Apartment',
    location: 'Lekki, Lagos',
    neighbourhood: 'Lekki',
    pricePerNight: 95000,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    featured: true,
    shortDescription:
      'Bright coastal inspired living in Lekki for up to four guests, complete with dining space, parking, and washing machine.',
    fullDescription:
      'Filled with soft natural daylight, this demonstration Two Bedroom Apartment in Lekki welcomes small families, friends, or visiting colleagues. Stretch out in the comfortable living room, share meals around the timber dining table, and enjoy practical home comforts including an in unit washing machine and convenient parking.',
    amenities: [
      'WiFi',
      'Air conditioning',
      'Kitchen',
      'Smart TV',
      'Parking',
      'Comfortable living room',
      'Washing machine',
    ],
    images: [
      {
        src: '/src/assets/images/apt3_twobed_living_1795554201375.jpg',
        alt: 'Two Bedroom Apartment living and dining area in Lekki with textured sofa, jute rug, and tall windows',
        caption: 'Sunlit living and dining area',
      },
      {
        src: '/src/assets/images/apt3_twobed_bedroom_1795554202353.jpg',
        alt: 'Primary bedroom in Two Bedroom Apartment in Lekki with upholstered headboard and olive throw',
        caption: 'Primary bedroom suite with warm timber accents',
      },
      {
        src: '/src/assets/images/apt3_twobed_kitchen_1795554202150.jpg',
        alt: 'Modern fitted kitchen in Two Bedroom Apartment in Lekki with integrated washing machine and oven',
        caption: 'Fitted kitchen with integrated washing machine',
      },
    ],
  },
  {
    id: 'three-bedroom-surulere',
    slug: 'three-bedroom-apartment-surulere',
    name: 'Three Bedroom Apartment',
    location: 'Surulere, Lagos',
    neighbourhood: 'Surulere',
    pricePerNight: 140000,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 3,
    featured: false,
    shortDescription:
      'Generous family accommodation in Surulere welcoming up to six guests with a spacious lounge, dining area, and full kitchen.',
    fullDescription:
      'Created with families and larger groups in mind, this demonstration Three Bedroom Apartment in Surulere offers room to gather without feeling crowded. Relax together in the spacious living room, prepare family dinners around the six seater oak dining table, and enjoy smart TVs, air conditioning, washing machine convenience, and private parking.',
    amenities: [
      'WiFi',
      'Air conditioning',
      'Fully equipped kitchen',
      'Parking',
      'Smart TVs',
      'Spacious living room',
      'Washing machine',
    ],
    images: [
      {
        src: '/src/assets/images/apt4_threebed_living_1795554320837.jpg',
        alt: 'Spacious family living room in Three Bedroom Apartment in Surulere with L shaped sofa and terracotta armchair',
        caption: 'Generous family lounge filled with natural light',
      },
      {
        src: '/src/assets/images/apt4_threebed_bedroom_1795554248350.jpg',
        alt: 'Bedroom in Three Bedroom Apartment in Surulere with oak bed, olive bedding, and built in wardrobes',
        caption: 'Restful bedroom with ample wardrobe storage',
      },
      {
        src: '/src/assets/images/apt4_threebed_dining_1795554321043.jpg',
        alt: 'Six seater wooden dining table and open kitchen in Three Bedroom Apartment in Surulere',
        caption: 'Six seater dining room and fully equipped kitchen',
      },
    ],
  },
  {
    id: 'luxury-serviced-vi',
    slug: 'luxury-serviced-apartment-victoria-island',
    name: 'Luxury Serviced Apartment',
    location: 'Victoria Island, Lagos',
    neighbourhood: 'Victoria Island',
    pricePerNight: 180000,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    featured: true,
    shortDescription:
      'Refined Victoria Island residence featuring elegant interiors, a limestone island kitchen, parking, and sample housekeeping.',
    fullDescription:
      'Positioned in the heart of Victoria Island, this demonstration Luxury Serviced Apartment balances metropolitan energy with quiet residential comfort. Crisp textures, warm walnut panelling, a fully equipped designer kitchen, private balcony views, parking, and sample housekeeping service make longer executive or leisure stays effortless.',
    amenities: [
      'WiFi',
      'Air conditioning',
      'Elegant interiors',
      'Equipped kitchen',
      'Smart TV',
      'Parking',
      'Housekeeping (sample service)',
    ],
    images: [
      {
        src: '/src/assets/images/apt5_vi_living_1795554306983.jpg',
        alt: 'Luxury Serviced Apartment living room in Victoria Island with curved sofa, travertine table, and skyline view',
        caption: 'Elegant lounge opening onto city balcony views',
      },
      {
        src: '/src/assets/images/apt5_vi_bedroom_1795554320965.jpg',
        alt: 'Master bedroom in Victoria Island Luxury Serviced Apartment with walnut panelling and brass sconces',
        caption: 'Serene master bedroom with warm walnut finishes',
      },
      {
        src: '/src/assets/images/apt5_vi_kitchen_1795554306274.jpg',
        alt: 'Designer kitchen in Victoria Island Luxury Serviced Apartment with stone island and warm wood cabinetry',
        caption: 'Equipped stone island kitchen',
      },
    ],
  },
  {
    id: 'premium-shortlet-ikoyi',
    slug: 'premium-short-let-apartment-ikoyi',
    name: 'Premium Short Let Apartment',
    location: 'Ikoyi, Lagos',
    neighbourhood: 'Ikoyi',
    pricePerNight: 220000,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    featured: false,
    shortDescription:
      'A tranquil Ikoyi apartment offering tall leafy views, premium furniture, spacious living quarters, and private terrace dining.',
    fullDescription:
      'Tucked among mature trees in Ikoyi, this demonstration Premium Short Let Apartment delivers understated luxury and unhurried stillness. High windows fill the spacious living area with soft light, complemented by bespoke furniture, an equipped kitchen, secure parking, and a private dining salon overlooking a lush terrace.',
    amenities: [
      'WiFi',
      'Air conditioning',
      'Premium furniture',
      'Equipped kitchen',
      'Smart TV',
      'Parking',
      'Spacious living area',
    ],
    images: [
      {
        src: '/src/assets/images/apt6_ikoyi_living_1795554322266.jpg',
        alt: 'Premium Short Let Apartment living area in Ikoyi with linen sofas, West African artwork, and tall tree lined windows',
        caption: 'Spacious living room framed by tall leafy windows',
      },
      {
        src: '/src/assets/images/apt6_ikoyi_bedroom_1795554322043.jpg',
        alt: 'Master bedroom in Ikoyi Premium Short Let Apartment with solid oak bed, organic ivory linen, and terracotta throw',
        caption: 'Quiet master suite in natural oak and linen',
      },
      {
        src: '/src/assets/images/apt6_ikoyi_terrace_1795554247349.jpg',
        alt: 'Dining room and planted balcony terrace in Ikoyi Premium Short Let Apartment at golden hour',
        caption: 'Dining salon and sunlit balcony terrace',
      },
    ],
  },
];

export const SAMPLE_TESTIMONIALS: Testimonial[] = [
  {
    id: 'sample-1',
    label: 'Sample Testimonial · Demonstration Only',
    guestProfile: 'Solo Business Traveller',
    apartmentType: 'Studio Apartment, Yaba',
    quote:
      'Having a quiet, clean space in Yaba with steady WiFi and a small kitchenette made my four night Lagos work trip feel calm from the very first evening.',
    note: 'Simulated sample review representing a typical studio guest experience.',
  },
  {
    id: 'sample-2',
    label: 'Sample Testimonial · Demonstration Only',
    guestProfile: 'Visiting Couple',
    apartmentType: 'One Bedroom Apartment, Ikeja',
    quote:
      'We loved having separate living and sleeping rooms, an easy workspace during the day, and a welcoming kitchen so we did not have to eat out for every meal.',
    note: 'Simulated sample review representing a couple stay.',
  },
  {
    id: 'sample-3',
    label: 'Sample Testimonial · Demonstration Only',
    guestProfile: 'Visiting Family',
    apartmentType: 'Three Bedroom Apartment, Surulere',
    quote:
      'Staying together under one roof made our family visit to Lagos effortless. The spacious living room and dining table gave everyone space to unwind comfortably.',
    note: 'Simulated sample review representing a family or group stay.',
  },
];

export const FAQS: FaqItem[] = [
  {
    id: 'how-to-book',
    question: 'How do I book an apartment?',
    answer:
      'Browse our apartments, select your preferred apartment, choose your arrival and departure dates in the booking calculator to preview your estimated cost, and either send your enquiry directly through WhatsApp or complete the Booking Enquiry form. Our team will review availability and reply with confirmation steps.',
  },
  {
    id: 'prices-per-night',
    question: 'Are the listed prices per night?',
    answer:
      'Yes. All listed rates are demonstration nightly prices in Nigerian Naira (₦). Please note that displayed prices and listings are sample figures and final rates are confirmed when your reservation availability is verified.',
  },
  {
    id: 'choose-dates',
    question: 'Can I choose my check in and check out dates?',
    answer:
      'Yes. You can pick any arrival date from today onward and any departure date after your arrival date. The calculator automatically counts the number of nights and updates your estimated cost.',
  },
  {
    id: 'cost-final',
    question: 'Is the displayed cost final?',
    answer:
      'No. The figure shown by the calculator is an accommodation estimate calculated as Number of Nights multiplied by Price Per Night. Final booking details and total confirmation are provided by Vvichelae once availability is verified.',
  },
  {
    id: 'confirm-availability',
    question: 'How do I confirm apartment availability?',
    answer:
      'After you send your booking enquiry via our online form or WhatsApp (08144084281), Vvichelae checks the calendar for your chosen apartment and dates and contacts you directly to confirm availability and next steps.',
  },
  {
    id: 'wifi-parking',
    question: 'Are WiFi and parking available?',
    answer:
      'Every listed apartment includes WiFi and air conditioning, and our One Bedroom, Two Bedroom, Three Bedroom, Luxury Serviced, and Premium Short Let apartments include parking. Always review each individual apartment page for its exact amenity list.',
  },
  {
    id: 'multiple-nights',
    question: 'Can I book for more than one night?',
    answer:
      'Yes. Whether you are visiting Lagos for two nights, a full week, or an extended short term stay, you can select your desired duration in the booking calculator and submit an enquiry.',
  },
  {
    id: 'contact-vvichelae',
    question: 'How do I contact Vvichelae?',
    answer:
      'You can reach Vvichelae directly on WhatsApp at 08144084281, send an email to vvichelae@gmail.com, or submit a message through our Contact and Booking Enquiry pages.',
  },
];
