import { createClient } from '@sanity/client';
import { createReadStream } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'zrerdn9o',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Upload the placeholder hero image once and reuse the asset reference
async function uploadPlaceholderImage() {
  const imagePath = resolve(__dirname, '../public/assets/hero.webp');
  console.log('Uploading placeholder hero image...');
  const asset = await client.assets.upload('image', createReadStream(imagePath), {
    filename: 'hero-placeholder.webp',
    contentType: 'image/webp',
  });
  console.log(`  ✓ Image uploaded: ${asset._id}`);
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
}

const towns = [
  {
    slug: 'easton',
    name: 'Easton',
    zipCode: '02356',
    tagline: 'Historic charm meets suburban convenience',
    heroTitle: 'Living in Easton, MA',
    heroDesc: 'Discover homes for sale, market trends, and local lifestyle in Easton, MA — one of Bristol County\'s most sought-after communities.',
    description: [
      'Easton is a highly sought-after community in Bristol County, Massachusetts, known for its stunning collection of H.H. Richardson-designed buildings, excellent public schools, and strong sense of community. The town offers a perfect blend of suburban tranquility and convenient access to Boston and Providence.',
      'The Easton real estate market features a diverse range of properties, from historic colonial homes to new construction developments. With top-rated schools, beautiful parks including Borderland State Park, and a vibrant town center, Easton continues to attract families and professionals seeking the best of South Shore living.',
    ],
    highlights: [
      { icon: 'ph-graduation-cap', title: 'Top-Rated Schools', description: 'Oliver Ames High School consistently ranks among the top public schools in Massachusetts.' },
      { icon: 'ph-tree', title: 'Borderland State Park', description: '1,800 acres of trails, ponds, and natural beauty right in the heart of town.' },
      { icon: 'ph-buildings', title: 'Richardson Architecture', description: 'A unique collection of H.H. Richardson-designed buildings found nowhere else in the world.' },
      { icon: 'ph-train', title: 'Commuter Access', description: 'Easy access to Route 138, Route 106, and Route 24 for Boston and Providence commuters.' },
    ],
    metaTitle: 'Easton, MA Real Estate & Homes for Sale | Jessica Shauffer',
    metaDescription: 'Explore real estate in Easton, MA. Find homes for sale, market data, school info, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.',
    county: 'bristol-county',
  },
  {
    slug: 'north-easton',
    name: 'North Easton',
    zipCode: '02356',
    tagline: 'Historic village, Richardson architecture',
    heroTitle: 'Living in North Easton, MA',
    heroDesc: 'Discover the charm of North Easton — a historic village with world-class architecture, excellent schools, and a vibrant community.',
    description: [
      'North Easton is a charming village within Easton, MA, renowned for its stunning collection of H.H. Richardson-designed buildings including the Ames Free Library, Oakes Ames Memorial Hall, and the Old Colony Railroad Station. The village center offers a walkable, historic atmosphere unlike anywhere else in New England.',
      'The North Easton real estate market offers a mix of historic homes and updated properties in one of the most architecturally significant villages in Massachusetts. Its walkable village center, strong community ties, and proximity to top employers make it one of the most desirable addresses on the South Shore.',
    ],
    highlights: [
      { icon: 'ph-buildings', title: 'Richardson Architecture', description: 'Five major H.H. Richardson buildings in the village center — a National Historic Landmark District.' },
      { icon: 'ph-book-open', title: 'Ames Free Library', description: 'A beloved community institution in a stunning Richardson-designed building.' },
      { icon: 'ph-graduation-cap', title: 'Excellent Schools', description: 'Part of the highly-rated Easton Public Schools district with Oliver Ames High School.' },
      { icon: 'ph-coffee', title: 'Walkable Village', description: 'A charming walkable village center with local dining, shops, and community events.' },
    ],
    metaTitle: 'North Easton, MA Real Estate & Homes for Sale | Jessica Shauffer',
    metaDescription: 'Explore real estate in North Easton, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.',
    county: 'bristol-county',
  },
  {
    slug: 'south-easton',
    name: 'South Easton',
    zipCode: '02375',
    tagline: 'Family neighborhoods, new construction',
    heroTitle: 'Living in South Easton, MA',
    heroDesc: 'South Easton offers family-friendly neighborhoods, newer construction, and convenient access to Route 138 and major commuter routes.',
    description: [
      'South Easton offers a quieter, more residential feel within the town of Easton. Known for its family-friendly neighborhoods and newer construction developments, South Easton is a popular choice for buyers seeking modern homes with excellent schools and easy highway access.',
      'The South Easton real estate market features a range of single-family homes and newer subdivisions at competitive price points. With easy access to Route 138 and Route 106, residents enjoy convenient connections to Boston, Providence, and the broader South Shore employment corridor.',
    ],
    highlights: [
      { icon: 'ph-house', title: 'New Construction', description: 'A range of newer construction developments offering modern amenities and energy efficiency.' },
      { icon: 'ph-graduation-cap', title: 'Top Schools', description: 'Part of the highly-rated Easton Public Schools district.' },
      { icon: 'ph-car', title: 'Highway Access', description: 'Direct access to Route 138 and Route 106 for easy commuting throughout the region.' },
      { icon: 'ph-tree', title: 'Natural Setting', description: 'Beautiful conservation land and open spaces throughout the neighborhood.' },
    ],
    metaTitle: 'South Easton, MA Real Estate & Homes for Sale | Jessica Shauffer',
    metaDescription: 'Explore real estate in South Easton, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.',
    county: 'bristol-county',
  },
  {
    slug: 'canton',
    name: 'Canton',
    zipCode: '02021',
    tagline: 'Top-rated schools, strong appreciation',
    heroTitle: 'Living in Canton, MA',
    heroDesc: 'Canton offers top-ranked schools, Blue Hills Reservation, and convenient Route 128 access — one of Norfolk County\'s most desirable communities.',
    description: [
      'Canton is one of Norfolk County\'s most desirable communities, consistently ranked among the top towns in Massachusetts for its excellent public schools, strong community programs, and beautiful natural surroundings including the Blue Hills Reservation. The town offers the perfect blend of suburban living and outdoor recreation.',
      'The Canton real estate market has seen strong appreciation, driven by demand from Boston-area professionals seeking top-rated schools and convenient commuter access via Route 128 and the Canton Junction commuter rail station. Properties range from classic New England colonials to newer executive homes.',
    ],
    highlights: [
      { icon: 'ph-graduation-cap', title: 'Top-Ranked Schools', description: 'Canton Public Schools consistently rank among the best in Massachusetts.' },
      { icon: 'ph-mountains', title: 'Blue Hills Reservation', description: 'Over 7,000 acres of trails, skiing, and outdoor recreation right at your doorstep.' },
      { icon: 'ph-train', title: 'Canton Junction', description: 'Direct commuter rail service to Boston South Station in under 30 minutes.' },
      { icon: 'ph-trend-up', title: 'Strong Appreciation', description: 'Consistent year-over-year home value appreciation driven by strong demand.' },
    ],
    metaTitle: 'Canton, MA Real Estate & Homes for Sale | Jessica Shauffer',
    metaDescription: 'Explore real estate in Canton, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.',
    county: 'norfolk-county',
  },
  {
    slug: 'sharon',
    name: 'Sharon',
    zipCode: '02067',
    tagline: 'Lake living, award-winning schools',
    heroTitle: 'Living in Sharon, MA',
    heroDesc: 'Sharon offers beautiful lake living on Massapoag Lake, award-winning schools, and direct commuter rail access to Boston.',
    description: [
      'Sharon is a picturesque town in Norfolk County known for its beautiful Massapoag Lake, award-winning public schools, and strong community spirit. The town offers a peaceful, nature-rich environment while maintaining easy access to Boston via the commuter rail at Sharon Station.',
      'Sharon real estate offers a diverse range of properties from lakefront homes to classic New England colonials. The town\'s top-rated schools, low crime rate, and natural beauty make it especially popular with families seeking a high quality of life within commuting distance of Boston.',
    ],
    highlights: [
      { icon: 'ph-waves', title: 'Massapoag Lake', description: 'Beautiful 390-acre lake offering swimming, boating, and year-round recreation.' },
      { icon: 'ph-graduation-cap', title: 'Award-Winning Schools', description: 'Sharon Public Schools are consistently recognized as among the best in the state.' },
      { icon: 'ph-train', title: 'Commuter Rail', description: 'Sharon Station provides direct service to Boston South Station.' },
      { icon: 'ph-tree', title: 'Conservation Land', description: 'Over 2,000 acres of protected conservation land and trails throughout the town.' },
    ],
    metaTitle: 'Sharon, MA Real Estate & Homes for Sale | Jessica Shauffer',
    metaDescription: 'Explore real estate in Sharon, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.',
    county: 'norfolk-county',
  },
  {
    slug: 'stoughton',
    name: 'Stoughton',
    zipCode: '02072',
    tagline: 'Affordable entry point, great commuter access',
    heroTitle: 'Living in Stoughton, MA',
    heroDesc: 'Stoughton offers an affordable entry into the South Shore market with direct commuter rail access to Boston and a strong local economy.',
    description: [
      'Stoughton is a welcoming community in Norfolk County offering an affordable entry point into the South Shore real estate market. With direct commuter rail access to Boston and a strong local economy anchored by healthcare and retail, Stoughton is an attractive option for first-time buyers and investors.',
      'The Stoughton real estate market features a mix of single-family homes, condominiums, and multi-family properties at competitive price points. The town\'s ongoing revitalization, strong community programs, and improving school system continue to drive demand and appreciation.',
    ],
    highlights: [
      { icon: 'ph-train', title: 'Commuter Rail', description: 'Stoughton Station offers direct service to Boston South Station on the Stoughton Line.' },
      { icon: 'ph-currency-dollar', title: 'Affordable Market', description: 'One of the most affordable entry points in the South Shore real estate market.' },
      { icon: 'ph-shopping-bag', title: 'Retail Hub', description: 'Strong local retail and dining scene with easy access to major shopping centers.' },
      { icon: 'ph-heart', title: 'Community Programs', description: 'Active community programs and events that foster a strong neighborhood spirit.' },
    ],
    metaTitle: 'Stoughton, MA Real Estate & Homes for Sale | Jessica Shauffer',
    metaDescription: 'Explore real estate in Stoughton, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.',
    county: 'norfolk-county',
  },
  {
    slug: 'norwood',
    name: 'Norwood',
    zipCode: '02062',
    tagline: 'Thriving downtown, excellent highway access',
    heroTitle: 'Living in Norwood, MA',
    heroDesc: 'Norwood offers a thriving downtown, excellent Route 1 and I-95 access, and strong value in the Norfolk County real estate market.',
    description: [
      'Norwood is a vibrant town in Norfolk County with a thriving downtown, excellent highway access via Route 1 and I-95, and a strong local business community. The town offers a diverse range of housing options and a welcoming community atmosphere that has attracted residents for generations.',
      'Norwood real estate is known for its value relative to neighboring towns, making it an attractive option for buyers seeking convenient access to Boston and Providence without the premium price tag of some surrounding communities. The town\'s strong rental market also makes it popular with investors.',
    ],
    highlights: [
      { icon: 'ph-storefront', title: 'Thriving Downtown', description: 'A vibrant downtown with local restaurants, shops, and community events year-round.' },
      { icon: 'ph-car', title: 'Highway Access', description: 'Excellent access to Route 1, I-95, and Route 128 for easy regional commuting.' },
      { icon: 'ph-currency-dollar', title: 'Strong Value', description: 'Competitive pricing relative to neighboring Norfolk County communities.' },
      { icon: 'ph-train', title: 'Commuter Rail', description: 'Norwood Central and Norwood Depot stations on the Franklin Line.' },
    ],
    metaTitle: 'Norwood, MA Real Estate & Homes for Sale | Jessica Shauffer',
    metaDescription: 'Explore real estate in Norwood, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.',
    county: 'norfolk-county',
  },
  {
    slug: 'westwood',
    name: 'Westwood',
    zipCode: '02090',
    tagline: 'Prestigious address, top schools',
    heroTitle: 'Living in Westwood, MA',
    heroDesc: 'Westwood is one of Norfolk County\'s most prestigious communities, known for exceptional schools, beautiful neighborhoods, and Route 128 convenience.',
    description: [
      'Westwood is one of Norfolk County\'s most prestigious communities, known for its exceptional public schools, beautiful neighborhoods, and convenient location along Route 128. The town consistently ranks among the best places to live in Massachusetts and commands premium real estate prices reflecting its desirability.',
      'Westwood real estate features classic New England colonials, luxury estates, and newer executive homes at premium prices. The town\'s top-ranked schools, low crime rate, and desirable location between Boston and Providence make it one of the most sought-after addresses in Eastern Massachusetts.',
    ],
    highlights: [
      { icon: 'ph-graduation-cap', title: 'Top-Ranked Schools', description: 'Westwood Public Schools are consistently ranked among the very best in Massachusetts.' },
      { icon: 'ph-buildings', title: 'University Station', description: 'The University Station development brings premier shopping and dining to Westwood.' },
      { icon: 'ph-car', title: 'Route 128 Access', description: 'Prime location along Route 128 with easy access to major employment centers.' },
      { icon: 'ph-shield-check', title: 'Low Crime Rate', description: 'One of the safest communities in Norfolk County with an excellent quality of life.' },
    ],
    metaTitle: 'Westwood, MA Real Estate & Homes for Sale | Jessica Shauffer',
    metaDescription: 'Explore real estate in Westwood, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.',
    county: 'norfolk-county',
  },
  {
    slug: 'foxborough',
    name: 'Foxborough',
    zipCode: '02035',
    tagline: 'Home of Gillette Stadium, growing market',
    heroTitle: 'Living in Foxborough, MA',
    heroDesc: 'Foxborough is home to Gillette Stadium and the New England Patriots — and a thriving residential community with excellent schools and strong real estate values.',
    description: [
      'Foxborough is best known as the home of Gillette Stadium and the New England Patriots, but it is also a thriving residential community with excellent schools, beautiful conservation land, and a growing real estate market. The town offers a unique combination of world-class entertainment and suburban family living.',
      'Foxborough real estate offers excellent value with a mix of single-family homes, new construction, and condominiums. The town\'s strong school system, convenient highway access via I-95 and Route 1, and proximity to both Boston and Providence make it a popular choice for families and commuters alike.',
    ],
    highlights: [
      { icon: 'ph-trophy', title: 'Gillette Stadium', description: 'Home of the New England Patriots and world-class entertainment events year-round.' },
      { icon: 'ph-graduation-cap', title: 'Strong Schools', description: 'Foxborough Regional Charter School and Foxborough High School offer excellent education.' },
      { icon: 'ph-tree', title: 'Conservation Land', description: 'Extensive conservation land and trails including the beautiful Foxborough State Forest.' },
      { icon: 'ph-car', title: 'Highway Access', description: 'Excellent I-95 and Route 1 access for easy commuting to Boston and Providence.' },
    ],
    metaTitle: 'Foxborough, MA Real Estate & Homes for Sale | Jessica Shauffer',
    metaDescription: 'Explore real estate in Foxborough, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.',
    county: 'norfolk-county',
  },
  {
    slug: 'mansfield',
    name: 'Mansfield',
    zipCode: '02048',
    tagline: 'Growing market with excellent highway access',
    heroTitle: 'Living in Mansfield, MA',
    heroDesc: 'Mansfield sits at the crossroads of I-95 and I-495 — making it one of the most accessible and fastest-growing communities in Eastern Massachusetts.',
    description: [
      'Mansfield is a dynamic community in Bristol County at the intersection of I-95 and I-495, making it one of the most accessible towns in Eastern Massachusetts. The town offers excellent schools, a vibrant town center, and a growing real estate market driven by its strategic location and strong employment base.',
      'Mansfield real estate has seen strong appreciation driven by its strategic location and excellent quality of life. The town offers a range of housing options from starter homes to executive properties, and its direct commuter rail service to Boston makes it especially popular with professionals.',
    ],
    highlights: [
      { icon: 'ph-intersect', title: 'I-95 & I-495 Crossroads', description: 'Unmatched highway access at the intersection of two major interstates.' },
      { icon: 'ph-train', title: 'Commuter Rail', description: 'Mansfield Station on the Providence/Stoughton Line offers direct service to Boston.' },
      { icon: 'ph-graduation-cap', title: 'Strong Schools', description: 'Mansfield Public Schools are consistently well-regarded in Bristol County.' },
      { icon: 'ph-trend-up', title: 'Growing Market', description: 'Strong appreciation driven by strategic location and growing employment base.' },
    ],
    metaTitle: 'Mansfield, MA Real Estate & Homes for Sale | Jessica Shauffer',
    metaDescription: 'Explore real estate in Mansfield, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.',
    county: 'bristol-county',
  },
  {
    slug: 'norton',
    name: 'Norton',
    zipCode: '02766',
    tagline: 'Affordable homes near Wheaton College',
    heroTitle: 'Living in Norton, MA',
    heroDesc: 'Norton is a welcoming Bristol County community home to Wheaton College, offering affordable real estate and convenient highway access.',
    description: [
      'Norton is a welcoming community in Bristol County home to Wheaton College and offering an affordable entry into the South Shore real estate market. The town features beautiful natural areas including Norton Reservoir, strong community programs, and convenient access to Route 123 and I-495.',
      'Norton real estate offers excellent value with a range of single-family homes and newer developments at competitive prices. The town\'s growing popularity, improving amenities, and proximity to major employment centers continue to drive appreciation and attract buyers from throughout the region.',
    ],
    highlights: [
      { icon: 'ph-graduation-cap', title: 'Wheaton College', description: 'Home to Wheaton College, bringing cultural events and community vitality to Norton.' },
      { icon: 'ph-waves', title: 'Norton Reservoir', description: 'Beautiful reservoir offering fishing, kayaking, and scenic recreation.' },
      { icon: 'ph-currency-dollar', title: 'Affordable Market', description: 'One of the most affordable communities in the South Shore real estate market.' },
      { icon: 'ph-car', title: 'Highway Access', description: 'Convenient access to I-495 and Route 123 for regional commuting.' },
    ],
    metaTitle: 'Norton, MA Real Estate & Homes for Sale | Jessica Shauffer',
    metaDescription: 'Explore real estate in Norton, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.',
    county: 'bristol-county',
  },
  {
    slug: 'raynham',
    name: 'Raynham',
    zipCode: '02767',
    tagline: 'Family-friendly with strong value',
    heroTitle: 'Living in Raynham, MA',
    heroDesc: 'Raynham is a family-friendly Bristol County community offering strong real estate value, excellent schools, and convenient Route 44 access.',
    description: [
      'Raynham is a family-friendly community in Bristol County offering strong value in the South Shore real estate market. The town features excellent schools, beautiful conservation land along the Taunton River, and convenient access to Route 44 and I-495.',
      'Raynham real estate offers a mix of single-family homes at competitive price points. The town\'s strong community spirit, improving amenities, and strategic location between Taunton and Bridgewater make it an increasingly popular choice for buyers seeking value and quality of life.',
    ],
    highlights: [
      { icon: 'ph-house', title: 'Family Neighborhoods', description: 'Well-established family neighborhoods with strong community ties and safety.' },
      { icon: 'ph-graduation-cap', title: 'Good Schools', description: 'Raynham Public Schools offer a solid education in a supportive community environment.' },
      { icon: 'ph-currency-dollar', title: 'Strong Value', description: 'Competitive pricing offering excellent value in the Bristol County market.' },
      { icon: 'ph-tree', title: 'Taunton River', description: 'Beautiful Taunton River frontage offering fishing, kayaking, and natural beauty.' },
    ],
    metaTitle: 'Raynham, MA Real Estate & Homes for Sale | Jessica Shauffer',
    metaDescription: 'Explore real estate in Raynham, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.',
    county: 'bristol-county',
  },
  {
    slug: 'bridgewater',
    name: 'Bridgewater',
    zipCode: '02324',
    tagline: 'College town with broad appeal',
    heroTitle: 'Living in Bridgewater, MA',
    heroDesc: 'Bridgewater is a vibrant Plymouth County community home to Bridgewater State University, offering diverse housing and strong Route 24 access to Boston.',
    description: [
      'Bridgewater is a vibrant community in Plymouth County home to Bridgewater State University. The town offers a diverse range of housing options, excellent recreational amenities, and convenient access to Boston via Route 24. The university brings cultural vitality and a strong rental market to the community.',
      'Bridgewater real estate offers excellent value with strong rental demand driven by the university. The town\'s growing economy, improving infrastructure, and diverse housing stock continue to attract buyers and investors seeking strong returns in the Plymouth County market.',
    ],
    highlights: [
      { icon: 'ph-graduation-cap', title: 'Bridgewater State University', description: 'A major state university bringing cultural events, employment, and community vitality.' },
      { icon: 'ph-car', title: 'Route 24 Access', description: 'Direct Route 24 access providing fast connections to Boston and Providence.' },
      { icon: 'ph-currency-dollar', title: 'Investment Opportunity', description: 'Strong rental demand driven by the university creates excellent investment potential.' },
      { icon: 'ph-tree', title: 'Recreational Amenities', description: 'Beautiful parks, conservation land, and the Taunton River for outdoor recreation.' },
    ],
    metaTitle: 'Bridgewater, MA Real Estate & Homes for Sale | Jessica Shauffer',
    metaDescription: 'Explore real estate in Bridgewater, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.',
    county: 'plymouth-county',
  },
  {
    slug: 'west-bridgewater',
    name: 'West Bridgewater',
    zipCode: '02379',
    tagline: 'Small-town feel, big opportunity',
    heroTitle: 'Living in West Bridgewater, MA',
    heroDesc: 'West Bridgewater offers a peaceful small-town lifestyle in Plymouth County with convenient Route 24 access and excellent value in the real estate market.',
    description: [
      'West Bridgewater is a charming small town in Plymouth County offering a peaceful residential environment with convenient access to major employment centers. The town features excellent schools, beautiful conservation land, and a strong sense of community that has made it a beloved home for generations of families.',
      'West Bridgewater real estate offers excellent value with a range of single-family homes on generous lots. The town\'s low density, rural character, and convenient Route 24 access appeal to buyers seeking a quieter lifestyle without sacrificing convenience to Boston and the broader South Shore.',
    ],
    highlights: [
      { icon: 'ph-house', title: 'Spacious Lots', description: 'Generous lot sizes offering privacy and space uncommon in more densely developed towns.' },
      { icon: 'ph-graduation-cap', title: 'Good Schools', description: 'West Bridgewater Public Schools offer quality education in a small-town environment.' },
      { icon: 'ph-currency-dollar', title: 'Excellent Value', description: 'Competitive pricing with larger lots than comparable communities in the region.' },
      { icon: 'ph-tree', title: 'Conservation Land', description: 'Extensive conservation land and trails offering beautiful outdoor recreation.' },
    ],
    metaTitle: 'West Bridgewater, MA Real Estate & Homes for Sale | Jessica Shauffer',
    metaDescription: 'Explore real estate in West Bridgewater, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.',
    county: 'plymouth-county',
  },
  {
    slug: 'east-bridgewater',
    name: 'East Bridgewater',
    zipCode: '02333',
    tagline: 'Quiet residential with growing demand',
    heroTitle: 'Living in East Bridgewater, MA',
    heroDesc: 'East Bridgewater is a quiet Plymouth County community offering a peaceful suburban lifestyle with growing demand from Boston-area buyers seeking space and value.',
    description: [
      'East Bridgewater is a quiet residential community in Plymouth County offering a peaceful suburban lifestyle with convenient access to Route 18 and Route 106. The town features excellent schools, a strong sense of community, and beautiful natural surroundings that attract families seeking a quieter pace of life.',
      'East Bridgewater real estate offers competitive pricing with a range of single-family homes. Growing demand from Boston-area buyers seeking more space and value continues to drive appreciation, making it an increasingly attractive option for both buyers and investors.',
    ],
    highlights: [
      { icon: 'ph-house', title: 'Quiet Neighborhoods', description: 'Peaceful residential neighborhoods with low traffic and a strong community feel.' },
      { icon: 'ph-graduation-cap', title: 'Good Schools', description: 'East Bridgewater Public Schools offer quality education in a supportive environment.' },
      { icon: 'ph-currency-dollar', title: 'Growing Value', description: 'Increasing demand from Boston-area buyers driving strong appreciation.' },
      { icon: 'ph-tree', title: 'Natural Beauty', description: 'Beautiful conservation land and the Satucket River for outdoor recreation.' },
    ],
    metaTitle: 'East Bridgewater, MA Real Estate & Homes for Sale | Jessica Shauffer',
    metaDescription: 'Explore real estate in East Bridgewater, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.',
    county: 'plymouth-county',
  },
  {
    slug: 'taunton',
    name: 'Taunton',
    zipCode: '02780',
    tagline: 'The Silver City — diverse and growing',
    heroTitle: 'Living in Taunton, MA',
    heroDesc: 'Taunton — the Silver City — is Bristol County\'s county seat, offering excellent real estate value and strong appreciation driven by ongoing revitalization.',
    description: [
      'Taunton, known as the Silver City, is Bristol County\'s county seat and a growing urban center with a rich history and diverse community. The city offers excellent value in the real estate market with strong appreciation driven by ongoing revitalization efforts and major economic development projects.',
      'Taunton real estate offers a wide range of properties at competitive prices, from historic downtown buildings to suburban single-family homes. The city\'s strategic location at the intersection of Routes 44, 138, and 140, combined with its direct commuter rail access to Boston, makes it highly accessible and increasingly desirable.',
    ],
    highlights: [
      { icon: 'ph-train', title: 'Commuter Rail', description: 'Taunton Station on the Middleborough/Lakeville Line offers direct service to Boston.' },
      { icon: 'ph-buildings', title: 'Historic Downtown', description: 'A rich historic downtown with beautiful architecture and ongoing revitalization.' },
      { icon: 'ph-currency-dollar', title: 'Excellent Value', description: 'Some of the most competitive real estate pricing in Bristol County.' },
      { icon: 'ph-trend-up', title: 'Growing Economy', description: 'Major economic development projects driving job growth and real estate appreciation.' },
    ],
    metaTitle: 'Taunton, MA Real Estate & Homes for Sale | Jessica Shauffer',
    metaDescription: 'Explore real estate in Taunton, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.',
    county: 'bristol-county',
  },
  {
    slug: 'attleboro',
    name: 'Attleboro',
    zipCode: '02703',
    tagline: 'Commuter-friendly with urban amenities',
    heroTitle: 'Living in Attleboro, MA',
    heroDesc: 'Attleboro offers direct commuter rail access to both Boston and Providence, diverse housing options, and a growing economy in Bristol County.',
    description: [
      'Attleboro is a thriving city in Bristol County with direct commuter rail access to both Boston and Providence. The city offers a diverse range of housing options, excellent shopping and dining, and a growing economy driven by healthcare, manufacturing, and retail sectors.',
      'Attleboro real estate offers excellent value with strong rental demand and consistent appreciation. The city\'s commuter rail station and highway access make it attractive to Boston-area buyers seeking affordability, while its urban amenities appeal to those wanting walkable convenience.',
    ],
    highlights: [
      { icon: 'ph-train', title: 'Dual City Access', description: 'Direct commuter rail service to both Boston and Providence — unique in the region.' },
      { icon: 'ph-storefront', title: 'Urban Amenities', description: 'A thriving downtown with diverse dining, shopping, and entertainment options.' },
      { icon: 'ph-currency-dollar', title: 'Affordable Market', description: 'Competitive pricing with strong rental demand and appreciation potential.' },
      { icon: 'ph-factory', title: 'Growing Economy', description: 'Diverse economic base in healthcare, manufacturing, and retail driving job growth.' },
    ],
    metaTitle: 'Attleboro, MA Real Estate & Homes for Sale | Jessica Shauffer',
    metaDescription: 'Explore real estate in Attleboro, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.',
    county: 'bristol-county',
  },
  {
    slug: 'north-attleborough',
    name: 'North Attleborough',
    zipCode: '02760',
    tagline: 'Strong schools and community feel',
    heroTitle: 'Living in North Attleborough, MA',
    heroDesc: 'North Attleborough offers excellent schools, a strong community, and convenient I-95 access near the Rhode Island border in Bristol County.',
    description: [
      'North Attleborough is a welcoming community in Bristol County known for its excellent schools, strong community programs, and convenient location near the Rhode Island border. The town offers a range of housing options at competitive prices with easy access to both Boston and Providence.',
      'North Attleborough real estate has seen consistent appreciation driven by its strong school system, quality of life, and strategic location. The town\'s proximity to Providence and Boston via I-95 makes it an attractive option for commuters, while its suburban character appeals to families.',
    ],
    highlights: [
      { icon: 'ph-graduation-cap', title: 'Strong Schools', description: 'North Attleborough Public Schools are well-regarded in Bristol County.' },
      { icon: 'ph-car', title: 'I-95 Access', description: 'Direct I-95 access providing fast connections to Boston and Providence.' },
      { icon: 'ph-heart', title: 'Community Spirit', description: 'Active community programs and events that foster strong neighborhood bonds.' },
      { icon: 'ph-currency-dollar', title: 'Competitive Pricing', description: 'Solid value in a well-established community with consistent appreciation.' },
    ],
    metaTitle: 'North Attleborough, MA Real Estate & Homes for Sale | Jessica Shauffer',
    metaDescription: 'Explore real estate in North Attleborough, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.',
    county: 'bristol-county',
  },
  {
    slug: 'hingham',
    name: 'Hingham',
    zipCode: '02043',
    tagline: 'Coastal elegance, top-tier schools',
    heroTitle: 'Living in Hingham, MA',
    heroDesc: 'Hingham is one of the South Shore\'s most prestigious coastal communities, offering stunning harbor views, a historic downtown, and top-ranked schools.',
    description: [
      'Hingham is one of the South Shore\'s most prestigious coastal communities, offering stunning harbor views, a charming historic downtown, and some of the region\'s top-rated public schools. The town\'s ferry service to Boston makes it especially popular with professionals seeking a coastal lifestyle with urban convenience.',
      'Hingham real estate commands premium prices reflecting the town\'s exceptional quality of life, waterfront properties, and top-ranked schools. The market features everything from historic colonials in the town center to luxury waterfront estates along the harbor, attracting discerning buyers from throughout the region.',
    ],
    highlights: [
      { icon: 'ph-boat', title: 'Harbor Ferry', description: 'Direct ferry service to Boston\'s Long Wharf — a commuter\'s dream on the South Shore.' },
      { icon: 'ph-graduation-cap', title: 'Top-Ranked Schools', description: 'Hingham Public Schools consistently rank among the very best in Massachusetts.' },
      { icon: 'ph-anchor', title: 'Harbor & Waterfront', description: 'Stunning Hingham Harbor with marinas, restaurants, and beautiful waterfront living.' },
      { icon: 'ph-buildings', title: 'Historic Downtown', description: 'A beautifully preserved historic downtown with boutique shops and fine dining.' },
    ],
    metaTitle: 'Hingham, MA Real Estate & Homes for Sale | Jessica Shauffer',
    metaDescription: 'Explore real estate in Hingham, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.',
    county: 'plymouth-county',
  },
  {
    slug: 'plymouth',
    name: 'Plymouth',
    zipCode: '02360',
    tagline: "America's Hometown — coastal living",
    heroTitle: 'Living in Plymouth, MA',
    heroDesc: "Plymouth — America's Hometown — offers a unique blend of rich history, beautiful coastline, and a growing real estate market in Plymouth County.",
    description: [
      "Plymouth, America's Hometown, is Plymouth County's largest town offering a unique blend of rich history, beautiful coastline, and a growing real estate market. The town features stunning ocean views, excellent golf courses, a vibrant downtown waterfront, and world-famous historical sites.",
      "Plymouth real estate offers diverse options from oceanfront estates to affordable single-family homes and new construction communities. The town's growing popularity with retirees, remote workers, and families seeking coastal living continues to drive strong appreciation across all price points.",
    ],
    highlights: [
      { icon: 'ph-anchor', title: 'Coastal Living', description: 'Miles of beautiful coastline, beaches, and Plymouth Harbor for waterfront living.' },
      { icon: 'ph-landmark', title: "America's Hometown", description: 'Rich historical heritage including Plymouth Rock, Plimoth Patuxent, and the Mayflower.' },
      { icon: 'ph-golf', title: 'Golf & Recreation', description: 'World-class golf courses and extensive recreational amenities throughout the town.' },
      { icon: 'ph-trend-up', title: 'Growing Market', description: 'Strong appreciation driven by growing demand for coastal living and remote work flexibility.' },
    ],
    metaTitle: 'Plymouth, MA Real Estate & Homes for Sale | Jessica Shauffer',
    metaDescription: "Explore real estate in Plymouth, MA — America's Hometown. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.",
    county: 'plymouth-county',
  },
  {
    slug: 'kingston',
    name: 'Kingston',
    zipCode: '02364',
    tagline: 'Coastal town with growing appeal',
    heroTitle: 'Living in Kingston, MA',
    heroDesc: 'Kingston is a charming coastal town in Plymouth County with beautiful waterfront areas, excellent schools, and direct commuter rail access to Boston.',
    description: [
      'Kingston is a charming coastal town in Plymouth County offering beautiful waterfront areas along Kingston Bay, excellent schools, and a growing real estate market. The town\'s commuter rail station provides convenient access to Boston, making it popular with professionals seeking a coastal lifestyle.',
      'Kingston real estate offers a mix of waterfront properties, single-family homes, and new construction at competitive prices. The town\'s natural beauty, improving amenities, and strong school system continue to attract buyers from throughout the region seeking coastal living at accessible price points.',
    ],
    highlights: [
      { icon: 'ph-waves', title: 'Kingston Bay', description: 'Beautiful Kingston Bay offering boating, fishing, and stunning coastal scenery.' },
      { icon: 'ph-train', title: 'Commuter Rail', description: 'Kingston/Route 3 Station provides direct service to Boston South Station.' },
      { icon: 'ph-graduation-cap', title: 'Good Schools', description: 'Silver Lake Regional School District serves Kingston with strong academic programs.' },
      { icon: 'ph-shopping-bag', title: 'Kingston Collection', description: 'The Kingston Collection offers premier shopping and dining right in town.' },
    ],
    metaTitle: 'Kingston, MA Real Estate & Homes for Sale | Jessica Shauffer',
    metaDescription: 'Explore real estate in Kingston, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.',
    county: 'plymouth-county',
  },
  {
    slug: 'halifax',
    name: 'Halifax',
    zipCode: '02338',
    tagline: 'Rural character, strong value',
    heroTitle: 'Living in Halifax, MA',
    heroDesc: 'Halifax offers a peaceful rural lifestyle in Plymouth County with excellent value, Silver Lake schools, and beautiful conservation land.',
    description: [
      'Halifax is a quiet rural community in Plymouth County offering a peaceful lifestyle with excellent value in the real estate market. The town features beautiful conservation land, the Silver Lake Regional School District, and a strong sense of community that has defined the town for generations.',
      'Halifax real estate offers competitive pricing with a range of single-family homes on larger lots. Buyers seeking more space and a rural character without sacrificing convenience to Route 106 and Route 58 find Halifax an attractive and affordable option in the Plymouth County market.',
    ],
    highlights: [
      { icon: 'ph-tree', title: 'Rural Character', description: 'Beautiful rural landscape with conservation land, farms, and natural open spaces.' },
      { icon: 'ph-graduation-cap', title: 'Silver Lake Schools', description: 'Silver Lake Regional School District serves Halifax with strong academic programs.' },
      { icon: 'ph-currency-dollar', title: 'Excellent Value', description: 'Some of the most competitive pricing in Plymouth County with generous lot sizes.' },
      { icon: 'ph-waves', title: 'Monponsett Pond', description: 'Beautiful Monponsett Pond offering swimming, fishing, and summer recreation.' },
    ],
    metaTitle: 'Halifax, MA Real Estate & Homes for Sale | Jessica Shauffer',
    metaDescription: 'Explore real estate in Halifax, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.',
    county: 'plymouth-county',
  },
  {
    slug: 'lakeville',
    name: 'Lakeville',
    zipCode: '02347',
    tagline: 'Lakefront living, rural charm',
    heroTitle: 'Living in Lakeville, MA',
    heroDesc: 'Lakeville offers stunning lakefront living on Long Pond and Assawompset Pond — the largest freshwater ponds in Massachusetts — with rural charm and strong value.',
    description: [
      'Lakeville is a scenic community in Plymouth County known for its beautiful Long Pond and Assawompset Pond, which together form one of the largest freshwater ponds in Massachusetts. The town offers a peaceful rural lifestyle with convenient highway access via I-495 and Route 44.',
      'Lakeville real estate features a mix of lakefront properties, rural estates, and single-family homes at competitive prices. The town\'s natural beauty, low density, and convenient access to Middleborough and Taunton appeal to buyers seeking a quieter lifestyle with room to breathe.',
    ],
    highlights: [
      { icon: 'ph-waves', title: 'Long Pond', description: 'Stunning Long Pond and Assawompset Pond — among the largest freshwater ponds in MA.' },
      { icon: 'ph-house', title: 'Lakefront Properties', description: 'Beautiful lakefront homes offering direct water access and stunning views.' },
      { icon: 'ph-tree', title: 'Rural Landscape', description: 'Expansive rural landscape with conservation land, farms, and natural beauty.' },
      { icon: 'ph-car', title: 'I-495 Access', description: 'Convenient I-495 access for regional commuting while maintaining rural character.' },
    ],
    metaTitle: 'Lakeville, MA Real Estate & Homes for Sale | Jessica Shauffer',
    metaDescription: 'Explore real estate in Lakeville, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.',
    county: 'plymouth-county',
  },
  {
    slug: 'middleborough',
    name: 'Middleborough',
    zipCode: '02346',
    tagline: 'Growing community, commuter-friendly',
    heroTitle: 'Living in Middleborough, MA',
    heroDesc: 'Middleborough is one of Plymouth County\'s largest and fastest-growing towns, offering a vibrant downtown, commuter rail access, and excellent real estate value.',
    description: [
      'Middleborough is one of Plymouth County\'s largest towns by area, offering a mix of rural character and growing suburban amenities. The town features a vibrant downtown, commuter rail access to Boston, and excellent value in the real estate market driven by ongoing growth and development.',
      'Middleborough real estate offers competitive pricing with a range of single-family homes, new construction, and rural properties. The town\'s ongoing growth, improving infrastructure, and direct commuter rail service continue to drive appreciation and attract buyers seeking value in Plymouth County.',
    ],
    highlights: [
      { icon: 'ph-train', title: 'Commuter Rail', description: 'Middleborough/Lakeville Station on the Old Colony Line offers direct service to Boston.' },
      { icon: 'ph-storefront', title: 'Growing Downtown', description: 'A revitalizing downtown with local dining, shops, and community events.' },
      { icon: 'ph-currency-dollar', title: 'Excellent Value', description: 'Competitive pricing with a range of property types at accessible price points.' },
      { icon: 'ph-tree', title: 'Natural Beauty', description: 'Extensive conservation land, cranberry bogs, and the Nemasket River.' },
    ],
    metaTitle: 'Middleborough, MA Real Estate & Homes for Sale | Jessica Shauffer',
    metaDescription: 'Explore real estate in Middleborough, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.',
    county: 'plymouth-county',
  },
  {
    slug: 'weston',
    name: 'Weston',
    zipCode: '02493',
    tagline: 'Top-ranked schools, luxury estates',
    heroTitle: 'Living in Weston, MA',
    heroDesc: 'Weston is consistently ranked among the wealthiest and most desirable communities in Massachusetts, known for exceptional schools and stunning estates.',
    description: [
      'Weston is consistently ranked among the wealthiest and most desirable communities in Massachusetts, known for its exceptional public schools, stunning estates, and beautiful conservation land. The town offers an exclusive residential environment with convenient access to Boston via Route 128.',
      'Weston real estate features luxury estates, historic properties, and high-end new construction at premium prices. The town\'s top-ranked schools, prestigious reputation, and beautiful natural surroundings make it one of the most sought-after addresses in Eastern Massachusetts for discerning buyers.',
    ],
    highlights: [
      { icon: 'ph-graduation-cap', title: 'Top-Ranked Schools', description: 'Weston Public Schools consistently rank #1 or #2 in Massachusetts.' },
      { icon: 'ph-house', title: 'Luxury Estates', description: 'Stunning luxury estates and executive homes on expansive, beautifully landscaped lots.' },
      { icon: 'ph-tree', title: 'Conservation Land', description: 'Over 2,000 acres of protected conservation land with extensive trail networks.' },
      { icon: 'ph-car', title: 'Route 128 Access', description: 'Prime Route 128 location with easy access to Boston and major employment centers.' },
    ],
    metaTitle: 'Weston, MA Real Estate & Homes for Sale | Jessica Shauffer',
    metaDescription: 'Explore real estate in Weston, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.',
    county: 'norfolk-county',
  },
];

async function getCountyRefs() {
  const counties = await client.fetch('*[_type == "county"]{ _id, "slug": slug.current }');
  const refs = {};
  for (const c of counties) {
    refs[c.slug] = c._id;
  }
  return refs;
}

async function seed() {
  console.log('Starting neighborhood seed...\n');

  // Upload placeholder image once
  const heroImageRef = await uploadPlaceholderImage();

  // Get county document references
  const countyRefs = await getCountyRefs();
  console.log(`Found ${Object.keys(countyRefs).length} county documents: ${Object.keys(countyRefs).join(', ')}\n`);

  // Check for existing neighborhoods to avoid duplicates
  const existing = await client.fetch('*[_type == "neighborhood"]{ _id, "slug": slug.current }');
  const existingSlugs = new Set(existing.map(n => n.slug));
  console.log(`Found ${existing.length} existing neighborhood documents.\n`);

  let created = 0;
  let skipped = 0;

  for (const town of towns) {
    if (existingSlugs.has(town.slug)) {
      console.log(`  ⏭  Skipping (already exists): ${town.name}`);
      skipped++;
      continue;
    }

    const doc = {
      _type: 'neighborhood',
      name: town.name,
      slug: { _type: 'slug', current: town.slug },
      zipCode: town.zipCode,
      tagline: town.tagline,
      heroTitle: town.heroTitle,
      heroDesc: town.heroDesc,
      heroImage: heroImageRef,
      description: town.description,
      highlights: town.highlights.map(h => ({ _type: 'highlight', ...h, _key: Math.random().toString(36).slice(2) })),
      metaTitle: town.metaTitle,
      metaDescription: town.metaDescription,
      ...(countyRefs[town.county] ? { county: { _type: 'reference', _ref: countyRefs[town.county] } } : {}),
    };

    const result = await client.create(doc);
    console.log(`  ✓ Created: ${town.name} (${result._id})`);
    created++;
  }

  console.log(`\nDone! ${created} neighborhoods created, ${skipped} skipped (already existed).`);
}

seed().catch((err) => {
  console.error('\nSeed failed:', err.message || err);
  process.exit(1);
});
