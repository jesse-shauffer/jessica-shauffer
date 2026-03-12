import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'zrerdn9o',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const reviews = [
  {
    author: 'Hayley McLeod',
    role: 'First-Time Home Buyer',
    rating: 5,
    text: 'I would give Jess 10 stars if I could! As first time homebuyers, the process seemed SUPER daunting at first. After connecting with Jess, the home buying process was extremely easy for us. From day one, she has been kind, reassuring, and incredibly knowledgeable. If we had questions or didn\'t fully understand something within the process, Jess always took the time to explain things in a way that made sense. We went into every decision feeling informed and confident! Jess always made us feel like a priority- she was on top of every detail, super responsive/highly communicative, and she also cared that we got the right home for us. We are incredibly grateful for Jess with her support with buying our first home. SERIOUSLY, THE BEST REALTOR EVER!!',
    date: '2026-03-03',
    source: 'google',
  },
  {
    author: 'Justin Smith',
    role: 'Home Buyer',
    rating: 5,
    text: 'Very knowledgeable and experienced realtor. Great home buying experience.',
    date: '2026-03-03',
    source: 'google',
  },
  {
    author: 'Ellen Roche',
    role: 'Home Buyer',
    rating: 5,
    text: 'Jessica was an absolute pleasure to work with in looking for a new home. She is very thorough and knowledgeable in her craft. The Bristol County MA market is very competitive and she worked tirelessly for nearly six months to procure the right property at the right price. I\'m thrilled with my new home.',
    date: '2026-03-03',
    source: 'google',
  },
  {
    author: 'Faride Muawad',
    role: 'Relocation Buyer',
    rating: 5,
    text: 'Jessica was a great realtor. We are new to the area and she patiently took us to different towns until we found a neighborhood we loved and eventually a home that was ment for us! Friendly, caring, and understanding. We couldn\'t have gotten in our home if it wasn\'t for her!!!',
    date: '2025-06-10',
    source: 'google',
  },
  {
    author: 'Kaitlyn Stone',
    role: 'First-Time Home Buyer',
    rating: 5,
    text: 'Jessica was a tremendous help in buying our home! Especially as first time home buyers in this market, her expertise and advice helped us navigate an otherwise stressful process. Jessica helped us talk through each decision to make sure that we felt comfortable and knew exactly what we were doing, and ultimately ended up in a home that is perfect for us at this point in our lives! We will not hesitate to reach out to Jessica in the future!',
    date: '2025-03-10',
    source: 'google',
  },
  {
    author: 'Dianna Abrams',
    role: 'Buy & Sell Client',
    rating: 5,
    text: 'We used Jessica for the sale of our first home and the purchase of our second home. Jess was phenomenal when it came to navigating the ever changing market. For the purchase of our second home, she was incredible in negotiating not only the price but throughout the entire inspection process. We had an accepted offer without even having our house on the market, which is unprecedented in these real estate times. With interest rates rising, she guided us to trustworthy lenders and always answered any questions we had. It made this complicated process smooth and seamless. For the sale of our home, she was knowledgeable, strategic and professional. She had an incredible marketing strategy and team that guided us on the best way to prep our house to be put on the market. She didn\'t miss a single detail and our house sold extremely fast. We cannot recommend her enough for all your real estate needs.',
    date: '2024-03-10',
    source: 'google',
  },
  {
    author: 'J Furst',
    role: 'Buy & Sell Client',
    rating: 5,
    text: 'We absolutely loved working with Jess Shauffer and fully recommend her. We worked with Jess on the purchase of our new home and the sale of our old townhouse. This has been a multi year process with the state of the housing market. Jess has been knowledgeable, engaged, kind and patient from the beginning. We made several offers and Jess worked closely with us on all of them to help us navigate the individual circumstances for each home. Her expertise and knowledge made all the difference on more than one occasion. Similarly, her network and knowledge made the sale of our current home a breeze and a resounding success. We can\'t recommend Jess enough.',
    date: '2024-03-10',
    source: 'google',
  },
  {
    author: 'Taryn Beuttler',
    role: 'Home Seller',
    rating: 5,
    text: 'Jessica Shauffer single handedly made the experience of selling our home seamless, streamlined, and stress free. Her experience and expertise enabled us to hone in on the best areas to improve to make sure our home was show ready. Her vast connections in the industry meant that we didn\'t have to look far for recommendations and services. Her knowledge of the market and timelines are unparalleled. She was attentive and organized and guided us through the process every step of the way. We recommend her wholeheartedly to anyone who is in the market to buy or sell. Thank you so very much!!',
    date: '2024-03-10',
    source: 'google',
  },
  {
    author: 'Jim Shaughnessy',
    role: 'First-Time Home Buyer',
    rating: 5,
    text: 'Jessica is great. She helped me find my first home and was extremely helpful during the whole process. She is hardworking, honest, and reliable. Even after the close she continues to help and check in on how we are doing. I highly recommend working with her',
    date: '2024-03-10',
    source: 'google',
  },
  {
    author: 'Aileen Costello',
    role: 'Buy & Sell Client',
    rating: 5,
    text: 'My husband and I really can\'t say enough good things about Jessica. She was incredibly knowledgable about the home buying/home sale process, while also very understanding of our needs as buyers/sellers. After several months of searching, Jessica was able to help us secure an off-market home before it hit the market. She also helped us to get multiple offers for our home we were selling, and we ended up selling it for $80,000 over asking price. I would not hesitate to recommend Jessica as a realtor to anyone.',
    date: '2023-03-10',
    source: 'google',
  },
  {
    author: 'Janine Colombo',
    role: 'Buy & Sell Client',
    rating: 5,
    text: 'Jessica Shauffer went above and beyond for myself and my mother by coordinating the sale of 2 homes and purchase of another all within the same time frame. Extremely professional, punctual, and came with excellent referrals (for example lawyer, electrician), to help make the whole process as stress free as possible! She had many challenges to overcome working with 2 families and she did not disappoint! The best by far tho was her advice on the way we submit the offer to purchase. She structured our offer in such a way that put us as the most competitive with the peace of mind that we weren\'t over bidding. We\'re in the house of our dreams and it\'s all thanks to Jess!',
    date: '2023-03-10',
    source: 'google',
  },
  {
    author: 'Kirill Bumin',
    role: 'Relocation Buyer',
    rating: 5,
    text: 'We connected with Jessica through pure luck, by posting in a local FB group. From the moment that we connected, Jessica proved to be a huge asset. Neither I or my wife have ever lived in MA, and had very limited time to schedule viewings, and work out inspections and other logistics. Jessica provided the kind of steady hand that we genuinely needed. In just 3 short days, we found a home that we liked and put an offer on it. Jessica was a real trooper, giving us her undivided attention, chauffeuring us around, and explaining to us the lay of the land. She remained a fantastic agent throughout the remainder of the process. She was always so kind - she even bought our kids Valentine\'s Day gifts! We recommend her wholeheartedly and without a single reservation!',
    date: '2023-03-10',
    source: 'google',
  },
  {
    author: 'Sookie Noh',
    role: 'Home Buyer',
    rating: 5,
    text: 'If you are looking for responsive, kind, knowledgeable agent that can negotiate things you didn\'t even know were possible to negotiate, you need Jessica. We purchase our home in the middle of pandemic and in the middle of historically low inventory. Not only did Jessica find the most perfect home at well negotiated price, her broad knowledge of all things real-estate related including financing helped us save even more money. I cannot recommend her highly enough.',
    date: '2023-03-10',
    source: 'google',
  },
  {
    author: 'Kristi Marsh',
    role: 'Home Seller',
    rating: 5,
    text: 'I knew that it was time to sell the family home but as a single mom I kept imagining the process to be overwhelming. I needed someone I felt like I could trust, share my emotions with, and reach out to with the tiniest of questions. Jess was there for me and made it seamless. She went up and above to get me to the finish line and settled into my new home. I am incredibly excited to start this new chapter in my life and am grateful that this process was 10 times easier than I thought it would be.',
    date: '2023-03-10',
    source: 'google',
  },
  {
    author: 'Arian Azevedo',
    role: 'First-Time Home Buyer',
    rating: 5,
    text: 'Jessica went above and beyond! Being a first time home buyer I knew NOTHING about the process. She made everything seamless and was responsive with any questions I had. Not only did I get the home I was hoping for but I also took alot of knowledge with me for future purchases. She has a life long client with me',
    date: '2023-03-10',
    source: 'google',
  },
  {
    author: 'Adina Preiss',
    role: 'Buy & Sell Client',
    rating: 5,
    text: "Jessica Shauffer was wonderful to work with - she sold our house for above asking in just a few days, and got us into the first home we wanted, with the terms we wanted. She's patient, upfront and honest and knows the business inside and out. Highly recommend.",
    date: '2023-03-10',
    source: 'google',
  },
  {
    author: 'Michael Wilson',
    role: 'Home Buyer',
    rating: 5,
    text: 'Jess is awesome! She is great to work with. Very knowledgeable every step of the way, including connecting with high quality, local professionals for renovation work. Highly recommend!',
    date: '2023-03-10',
    source: 'google',
  },
  {
    author: 'Joy Johnson Myatt',
    role: 'Home Buyer',
    rating: 5,
    text: 'Jessica was very helpful and attentive during our home buying process. We found her to be very professional and easy to work with.',
    date: '2023-03-10',
    source: 'google',
  },
];

async function seed() {
  console.log(`Seeding ${reviews.length} reviews into Sanity...`);

  // Delete existing reviews first to avoid duplicates
  const existing = await client.fetch('*[_type == "review"]._id');
  if (existing.length > 0) {
    console.log(`Deleting ${existing.length} existing reviews...`);
    for (const id of existing) {
      await client.delete(id);
    }
  }

  for (const review of reviews) {
    const doc = await client.create({ _type: 'review', ...review });
    console.log(`  ✓ Created: ${review.author} (${doc._id})`);
  }

  console.log(`\nDone! ${reviews.length} reviews seeded.`);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
