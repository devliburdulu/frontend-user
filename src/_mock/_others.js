import { _mock } from './_mock';

// ----------------------------------------------------------------------

export const _carouselsMembers = [...Array(6)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.fullName(index),
  role: _mock.role(index),
  // avatarUrl: _mock.image.portrait(index),
}));

// ----------------------------------------------------------------------

export const _faqs = [...Array(8)].map((_, index) => ({
  id: _mock.id(index),
  value: `panel${index + 1}`,
  heading: `Questions ${index + 1}`,
  detail: _mock.description(index),
}));

// ----------------------------------------------------------------------

export const _addressBooks = [...Array(24)].map((_, index) => ({
  id: _mock.id(index),
  primary: index === 0,
  name: _mock.fullName(index),
  email: _mock.email(index + 1),
  fullAddress: _mock.fullAddress(index),
  phoneNumber: _mock.phoneNumber(index),
  company: _mock.companyName(index + 1),
  addressType: index === 0 ? 'Home' : 'Office',
}));

// ----------------------------------------------------------------------

export const _contacts = [...Array(20)].map((_, index) => {
  const status =
    (index % 2 && 'online') ||
    (index % 3 && 'offline') ||
    (index % 4 && 'alway') ||
    'busy';

  return {
    id: _mock.id(index),
    status,
    role: _mock.role(index),
    email: _mock.email(index),
    name: _mock.fullName(index),
    phoneNumber: _mock.phoneNumber(index),
    lastActivity: _mock.time(index),
    avatarUrl: _mock.image.avatar(index),
    address: _mock.fullAddress(index),
  };
});

// ----------------------------------------------------------------------

export const _notifications = [...Array(9)].map((_, index) => ({
  id: _mock.id(index),
  avatarUrl: [
    _mock.image.avatar(1),
    _mock.image.avatar(2),
    _mock.image.avatar(3),
    _mock.image.avatar(4),
    _mock.image.avatar(5),
    null,
    null,
    null,
    null,
    null,
  ][index],
  type: [
    'friend',
    'project',
    'file',
    'tags',
    'payment',
    'order',
    'chat',
    'mail',
    'delivery',
  ][index],
  category: [
    'Communication',
    'Project UI',
    'File Manager',
    'File Manager',
    'File Manager',
    'Order',
    'Order',
    'Communication',
    'Communication',
  ][index],
  isUnRead: _mock.boolean(index),
  createdAt: _mock.time(index),
  title:
    (index === 0 &&
      `<p><strong>Deja Brady</strong> sent you a friend request</p>`) ||
    (index === 1 &&
      `<p><strong>Jayvon Hull</strong> mentioned you in <strong><a href='#'>Minimal UI</a></strong></p>`) ||
    (index === 2 &&
      `<p><strong>Lainey Davidson</strong> added file to <strong><a href='#'>File Manager</a></strong></p>`) ||
    (index === 3 &&
      `<p><strong>Angelique Morse</strong> added new tags to <strong><a href='#'>File Manager<a/></strong></p>`) ||
    (index === 4 &&
      `<p><strong>Giana Brandt</strong> request a payment of <strong>$200</strong></p>`) ||
    (index === 5 && `<p>Your order is placed waiting for shipping</p>`) ||
    (index === 6 && `<p>Delivery processing your order is being shipped</p>`) ||
    (index === 7 && `<p>You have new message 5 unread messages</p>`) ||
    (index === 8 && `<p>You have new mail`) ||
    '',
}));

// ----------------------------------------------------------------------

export const _mapContact = [
  {
    latlng: [33, 65],
    address: _mock.fullAddress(1),
    phoneNumber: _mock.phoneNumber(1),
  },
  {
    latlng: [-12.5, 18.5],
    address: _mock.fullAddress(2),
    phoneNumber: _mock.phoneNumber(2),
  },
];

// ----------------------------------------------------------------------

export const _socials = [
  {
    value: 'facebook',
    name: 'FaceBook',
    icon: 'eva:facebook-fill',
    color: '#1877F2',
    path: 'https://www.facebook.com/caitlyn.kerluke',
  },
  {
    value: 'instagram',
    name: 'Instagram',
    icon: 'ant-design:instagram-filled',
    color: '#E02D69',
    path: 'https://www.instagram.com/caitlyn.kerluke',
  },
  {
    value: 'linkedin',
    name: 'Linkedin',
    icon: 'eva:linkedin-fill',
    color: '#007EBB',
    path: 'https://www.linkedin.com/caitlyn.kerluke',
  },
  {
    value: 'twitter',
    name: 'Twitter',
    icon: 'eva:twitter-fill',
    color: '#00AAEC',
    path: 'https://www.twitter.com/caitlyn.kerluke',
  },
];

// ----------------------------------------------------------------------

export const _homePlans = [...Array(3)].map((_, index) => ({
  license: ['Standard', 'Standard Plus', 'Extended'][index],
  commons: ['One end products', '12 months updates', '6 months of support'],
  options: [
    'JavaScript version',
    'TypeScript version',
    'Design Resources',
    'Commercial applications',
  ],
  icons: [
    '/assets/icons/platforms/ic_js.svg',
    '/assets/icons/platforms/ic_ts.svg',
    '/assets/icons/platforms/ic_figma.svg',
  ],
}));

// ----------------------------------------------------------------------

export const _pricingPlans = [
  {
    subscription: 'basic',
    price: 0,
    caption: 'Forever',
    lists: ['3 Prototypes', '3 Boards', 'Up To 5 Team Members'],
    labelAction: 'Current Plan',
  },
  {
    subscription: 'starter',
    price: 4.99,
    caption: 'Saving $24 a year',
    lists: [
      '3 Prototypes',
      '3 Boards',
      'Up To 5 Team Members',
      'Advanced Security',
      'Issue Escalation',
    ],
    labelAction: 'Choose Starter',
  },
  {
    subscription: 'premium',
    price: 9.99,
    caption: 'Saving $124 a year',
    lists: [
      '3 Prototypes',
      '3 Boards',
      'Up To 5 Team Members',
      'Advanced Security',
      'Issue Escalation',
      'Issue Development license',
      'Permissions & workflows',
    ],
    labelAction: 'Choose Premium',
  },
];

// ----------------------------------------------------------------------

export const _testimonials = [
  {
    name: `Dwi Septi`,
    ratingNumber: 5,
    avatarUrl: _mock.image.avatar(1),
    content: `Trip kemarin diBromo, happy tenkyuu liburdulu.id, bakal next trip lagi inii 🫶🏻🫶🏻`,
  },
  {
    name: `Dante`,
    ratingNumber: 5,
    avatarUrl: _mock.image.avatar(1),
    content: `Hallo Aku, Happy Banget Deh Ikut Trip Bromo bersama Liburdulu.id. TL dan Teamnya Seruu dan Lucu. MakananNya Enak yg disajikan gak failed. Selama liburan ikut Trip ini jadi ketemu teman baru loh. Yuk jgn Ragu Join Trip di Liburdulu.id, dijamin bakal Repeat deh…🥳🥳`,
  },
  {
    name: `Annisa Rubiani`,
    ratingNumber: 5,
    avatarUrl: _mock.image.avatar(1),
    content: `Trusted banget! Elf nya oke, hotel nya oke, tour leader nya juga oke. Don't hesitate, let's have a fun trip with Libur Dulu!`,
  },
  {
    name: `Meilanih`,
    ratingNumber: 5,
    avatarUrl: _mock.image.avatar(1),
    content: `Liburan paling mengesankan dengan LiburDulu.id Kami ikut open trip Malang-Bromo. Walau sebentar dan tidak saling kenal, tapi waktu 2 hari seakan kita jadi keluarga. Teman rasa saudara. Terimakasih buat team LiburDulu.id Transport, hotel, food, fotografer. Overall oke dengan budget yang sangat terjangkau. You all amazing. Glad to meet you. Next trip we'll join again. Salut & sukses ya 👌👍🙏🏼`,
  },
  {
    name: `Purwanti`,
    ratingNumber: 5,
    avatarUrl: _mock.image.avatar(1),
    content: `Puas dengan service nya, harga terjangkau, pengalaman yang tak terlupakan, terimakasih liburdulu.id`,
  },
  {
    name: `Olivia`,
    ratingNumber: 5,
    avatarUrl: _mock.image.avatar(2),
    content: `Sangat menyenangkan, Tour leader baik baik perhatian semua. Timing pas, dapet cuaca bagus, penginapan bersih, Bus AC baik white horse, full music kekinian.`,
  },
  {
    name: `Ahmad Reski`,
    ratingNumber: 5,
    avatarUrl: _mock.image.avatar(3),
    content: `Pernah ikut sama liburdulu.id ke bromo tumpak sewu, over all pelayanan nya bagus, kakak tour leader nya baik² dan harga trip nya juga murah meriah. Recommended pokoknya. Cocok untuk travel sendiri atau bersama keluarga`,
  },
  {
    name: `Nur Kasanah`,
    ratingNumber: 5,
    avatarUrl: _mock.image.avatar(4),
    content: `Liburan bersama liburdulu.id bahagia, senang, ngetrip bareng2 teman baru seru banget. nanti insyaallah ngetrip Bali, Lombok, Bromo bareng liburdulu.id.`,
  },
];
