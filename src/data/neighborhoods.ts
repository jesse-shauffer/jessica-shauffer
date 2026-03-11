export interface Neighborhood {
  slug: string;
  name: string;
  zipCode?: string;
  tagline: string;
  heroTitle: string;
  heroDesc: string;
  heroImage: string;
  description: string[];
  highlights: { icon: string; title: string; description: string }[];
  otherNeighborhoods: { slug: string; name: string; tagline: string; image: string }[];
  metaTitle: string;
  metaDescription: string;
}

const allNeighborhoods = [
  { slug: 'north-easton', name: 'North Easton', tagline: 'Historic village, Richardson architecture', image: '/assets/north-easton.webp' },
  { slug: 'south-easton', name: 'South Easton', tagline: 'Family neighborhoods, new construction', image: '/assets/south-easton.webp' },
  { slug: 'five-corners', name: 'Five Corners', tagline: 'Commercial hub, restaurants, shops', image: '/assets/hero.webp' },
  { slug: 'furnace-village', name: 'Furnace Village', tagline: 'Colonial historic district, NRHP listed', image: '/assets/park.webp' },
  { slug: 'eastondale', name: 'Eastondale', tagline: "Family-friendly, Ali's Park", image: '/assets/interior.webp' },
  { slug: 'unionville', name: 'Unionville', tagline: "Monte's Pond, quiet residential", image: '/assets/market-aerial.webp' },
];

export const neighborhoods: Neighborhood[] = [
  {
    slug: 'north-easton',
    name: 'North Easton',
    zipCode: '02356',
    tagline: 'Historic village, H.H. Richardson architecture, Stonehill College',
    heroTitle: 'Living in North Easton Village',
    heroDesc: 'Historic charm, walkable village center, and architectural treasures make North Easton one of the most sought-after neighborhoods in Easton.',
    heroImage: '/assets/north-easton.webp',
    metaTitle: 'North Easton — Easton, MA Homes & Community | Jessica Shauffer',
    metaDescription: 'Explore North Easton Village — historic H.H. Richardson architecture, Stonehill College, walkable village center, and Victorian-era homes. Homes for sale with Jessica Shauffer.',
    description: [
      'North Easton Village is the historic heart of Easton, centered around a walkable village that blends New England charm with architectural significance. The neighborhood is home to the H.H. Richardson Historic District — a National Historic Landmark since 1987 — featuring five buildings designed by the famed architect.',
      "The area's character was shaped by the Ames family, whose shovel manufacturing dynasty left an indelible mark on the community through landmark buildings, Frederick Law Olmsted-designed landscapes, and enduring cultural institutions.",
      "Today, North Easton offers a mix of Victorian-era homes, historic estates, and renovated properties like the Ames Shovel Works apartments. It's a neighborhood where you can walk to local shops, enjoy college-town energy from nearby Stonehill College, and explore Borderland State Park just minutes away.",
    ],
    highlights: [
      { icon: 'ph-bank', title: 'H.H. Richardson Historic District', description: 'National Historic Landmark with five Richardson buildings including Ames Free Library and Oakes Ames Memorial Hall.' },
      { icon: 'ph-graduation-cap', title: 'Stonehill College', description: 'Nationally recognized liberal arts college adding cultural events, dining options, and college-town energy.' },
      { icon: 'ph-tree', title: 'Borderland State Park', description: '1,800+ acres of trails, ponds, and the historic Ames Mansion — right in your backyard.' },
      { icon: 'ph-storefront', title: 'Village Shoppes', description: 'Walkable North Easton Village Shoppes plus the revitalized Ames Shovel Works with shops and restaurants.' },
      { icon: 'ph-house-line', title: 'Historic Homes', description: "Victorian-era homes, worker housing, and historic estates with character you won't find in new construction." },
      { icon: 'ph-park', title: 'Olmsted Landscapes', description: 'Frederick Law Olmsted-designed spaces including "The Rockery" war memorial and scenic green spaces.' },
    ],
    otherNeighborhoods: allNeighborhoods.filter((n) => n.slug !== 'north-easton'),
  },
  {
    slug: 'south-easton',
    name: 'South Easton',
    zipCode: '02375',
    tagline: 'Family neighborhoods, Easton Country Club, new construction',
    heroTitle: 'Living in South Easton',
    heroDesc: 'Family-friendly neighborhoods, modern conveniences, and a welcoming community make South Easton the perfect place to put down roots.',
    heroImage: '/assets/south-easton.webp',
    metaTitle: 'South Easton — Easton, MA Homes & Community | Jessica Shauffer',
    metaDescription: 'Explore South Easton (02375) — family-friendly neighborhoods, Easton Country Club, Sawmill Village new construction, and a strong community. Homes for sale.',
    description: [
      'South Easton is the commercial and residential center of Easton, home to roughly 11,336 residents with a median age of 43.8. With a median household income of $102,161, it\'s an upper-middle-class community that balances suburban comfort with everyday convenience.',
      'The neighborhood offers diverse housing options — from new construction at Sawmill Village ($840K-$895K, featuring geothermal heating) to established communities like Fox Run condominiums and Rolling Pines townhouses. Whistlestop Plaza provides convenient shopping, while Easton Country Club and local parks offer recreation.',
      "South Easton is where you'll find the best of both worlds: a strong community feel with modern amenities, excellent schools, and easy access to Route 24 for commuters.",
    ],
    highlights: [
      { icon: 'ph-house-line', title: 'Sawmill Village', description: "44 new-construction homes with geothermal heating, priced $840K-$895K — Easton's newest premier development." },
      { icon: 'ph-golf', title: 'Easton Country Club', description: 'Full-service country club offering golf, dining, and social events for the whole family.' },
      { icon: 'ph-shopping-bag', title: 'Whistlestop Plaza', description: 'Convenient shopping center with everyday essentials, restaurants, and local services.' },
      { icon: 'ph-users-three', title: 'Family Community', description: 'Upper-middle-class families with a median household income of $102K and a strong sense of community.' },
      { icon: 'ph-buildings', title: 'Diverse Housing', description: 'From condos at Fox Run to townhouses at Rolling Pines to single-family homes on quiet streets.' },
      { icon: 'ph-fork-knife', title: 'Dining & Shops', description: 'Array of restaurants, cafes, and local shops serving the South Easton community.' },
    ],
    otherNeighborhoods: allNeighborhoods.filter((n) => n.slug !== 'south-easton'),
  },
  {
    slug: 'five-corners',
    name: 'Five Corners',
    tagline: 'Commercial hub, restaurants, shops, and Route 138 access',
    heroTitle: 'Living Near Five Corners',
    heroDesc: "Easton's commercial hub where convenience meets community — shops, restaurants, and services all within reach.",
    heroImage: '/assets/hero.webp',
    metaTitle: 'Five Corners — Easton, MA Homes & Community | Jessica Shauffer',
    metaDescription: 'Explore Five Corners in Easton, MA — the commercial hub at Route 138 with restaurants, shops, and family-friendly homes. Real estate guide by Jessica Shauffer.',
    description: [
      "Five Corners is Easton's primary commercial district, located at the intersection of Route 138 and several connecting roads in South Easton. It serves as the town's commercial heartbeat, with a concentration of restaurants, shops, professional services, and everyday conveniences.",
      "For homebuyers, the Five Corners area offers the ultimate in convenience — you're walking distance to dining, shopping, and services while still enjoying quiet residential streets just blocks away. It's the kind of neighborhood where you can grab dinner, pick up groceries, and still be home in minutes.",
      'The area also serves as a gateway to Furnace Village and connects to major routes for easy commuting. Homes near Five Corners range from established single-family properties to updated condominiums.',
    ],
    highlights: [
      { icon: 'ph-fork-knife', title: 'Dining District', description: 'Concentrated selection of restaurants, cafes, and eateries — from casual to upscale dining options.' },
      { icon: 'ph-storefront', title: 'Local Shopping', description: 'Professional services, retail shops, and everyday necessities all within walking distance.' },
      { icon: 'ph-path', title: 'Route 138 Access', description: 'Direct access to Route 138 connects you to neighboring towns and major highways for easy commuting.' },
      { icon: 'ph-house', title: 'Walkable Living', description: 'One of the few areas in Easton where you can walk to shops, restaurants, and services from your front door.' },
      { icon: 'ph-map-trifold', title: 'Central Location', description: "Gateway to Furnace Village and connected to all of Easton's neighborhoods and attractions." },
      { icon: 'ph-house-line', title: 'Mixed Housing', description: 'Single-family homes, condominiums, and updated properties in established residential pockets.' },
    ],
    otherNeighborhoods: allNeighborhoods.filter((n) => n.slug !== 'five-corners'),
  },
  {
    slug: 'furnace-village',
    name: 'Furnace Village',
    tagline: 'Historic colonial district, National Register of Historic Places',
    heroTitle: 'Living in Furnace Village',
    heroDesc: "One of Easton's most historically significant neighborhoods, where colonial-era charm meets modern living.",
    heroImage: '/assets/park.webp',
    metaTitle: 'Furnace Village — Easton, MA Homes & Community | Jessica Shauffer',
    metaDescription: 'Explore Furnace Village in Easton, MA — historic colonial district listed on the National Register of Historic Places. Real estate guide by Jessica Shauffer.',
    description: [
      'Furnace Village is a historic colonial industrial area located at the junction of Foundry Street (Routes 106 & 123) with South Street and Poquanticut Avenue. First settled in 1723 with industrial activity beginning in 1742, this neighborhood is listed on the National Register of Historic Places.',
      "The neighborhood's name comes from its iron and steel manufacturing heritage — furnaces that once powered the local economy have given way to a peaceful, character-rich residential area. Colonial-era houses sit alongside 19th-century worker housing, creating a streetscape unlike anywhere else in town.",
      "For buyers who value history, architecture, and authenticity, Furnace Village offers a rare opportunity to own a piece of Easton's colonial past while enjoying modern conveniences and a close-knit community feel.",
    ],
    highlights: [
      { icon: 'ph-scroll', title: 'NRHP Listed', description: "Listed on the National Register of Historic Places — one of Easton's most historically significant areas." },
      { icon: 'ph-clock-clockwise', title: 'Founded 1723', description: 'Nearly 300 years of history, from colonial settlement to industrial powerhouse to cherished residential neighborhood.' },
      { icon: 'ph-house-line', title: 'Colonial Architecture', description: 'Authentic colonial-era houses and 19th-century worker housing with irreplaceable architectural character.' },
      { icon: 'ph-factory', title: 'Industrial Heritage', description: 'Iron and steel manufacturing legacy dating to 1742 gives the neighborhood its distinctive name and character.' },
      { icon: 'ph-map-pin', title: 'Strategic Location', description: 'At the junction of Routes 106 & 123, connecting to Five Corners and greater Easton.' },
      { icon: 'ph-heart', title: 'Authentic Character', description: "A neighborhood that can't be replicated — genuine New England charm that draws history lovers and families alike." },
    ],
    otherNeighborhoods: allNeighborhoods.filter((n) => n.slug !== 'furnace-village'),
  },
  {
    slug: 'eastondale',
    name: 'Eastondale',
    tagline: "Family-friendly, Ali's Park, quiet residential streets",
    heroTitle: 'Living in Eastondale',
    heroDesc: 'A peaceful, family-friendly neighborhood in southern Easton with great parks and a welcoming community.',
    heroImage: '/assets/interior.webp',
    metaTitle: 'Eastondale — Easton, MA Homes & Community | Jessica Shauffer',
    metaDescription: "Explore Eastondale in Easton, MA — family-friendly neighborhood with Ali's Park, quiet residential streets, and affordable homes. Guide by Jessica Shauffer.",
    description: [
      "Eastondale is a residential neighborhood in the southern portion of Easton, known for its family-friendly atmosphere and quiet, tree-lined streets. The area centers around the Pine Street corridor and offers a mix of single-family homes that appeal to families and first-time buyers alike.",
      "The neighborhood's crown jewel is Ali's Park of Eastondale — a popular community park that hosts family gatherings, youth sports, and neighborhood events throughout the year. It's the kind of place where kids ride bikes down the street and neighbors know each other by name.",
      "Close to South Easton's amenities but with a distinctly quieter, more residential feel, Eastondale offers an affordable entry point into the Easton market without sacrificing the excellent schools and community benefits the town is known for.",
    ],
    highlights: [
      { icon: 'ph-park', title: "Ali's Park", description: 'Popular community park with playgrounds, open fields, and space for family gatherings and youth sports.' },
      { icon: 'ph-baby', title: 'Family-Friendly', description: 'Quiet residential streets, friendly neighbors, and a safe environment where kids can play outside.' },
      { icon: 'ph-currency-dollar', title: 'Affordable Entry', description: 'An accessible entry point to the Easton market with homes that offer great value for families and first-time buyers.' },
      { icon: 'ph-graduation-cap', title: 'Easton Schools', description: "Full access to Easton's top-rated school system including Oliver Ames High School (8/10)." },
      { icon: 'ph-map-pin', title: 'Near South Easton', description: 'Close proximity to Five Corners shopping, restaurants, and South Easton amenities.' },
      { icon: 'ph-tree', title: 'Tree-Lined Streets', description: 'Classic New England residential character with mature trees, spacious lots, and a peaceful atmosphere.' },
    ],
    otherNeighborhoods: allNeighborhoods.filter((n) => n.slug !== 'eastondale'),
  },
  {
    slug: 'unionville',
    name: 'Unionville',
    tagline: "Quiet residential annex, Monte's Pond, historic charm",
    heroTitle: 'Living in Unionville',
    heroDesc: 'A quiet, historic residential neighborhood northwest of North Easton with a rich past and peaceful present.',
    heroImage: '/assets/market-aerial.webp',
    metaTitle: 'Unionville — Easton, MA Homes & Community | Jessica Shauffer',
    metaDescription: "Explore Unionville in Easton, MA — historic residential neighborhood with Monte's Pond, Washington Street corridor, and quiet living. Guide by Jessica Shauffer.",
    description: [
      'Unionville is a historic residential neighborhood located northwest of North Easton Village, named for the "union" school it once shared with neighboring Stoughton. The area runs along the Washington Street corridor and offers a peaceful, tucked-away feel that appeals to buyers seeking tranquility without isolation.',
      "The neighborhood's history runs deep — from the Methodist church established in 1795 to the Easton Grange founded in 1892. Monte's Pond, the site of the last ice-cutting operation in New England, adds a unique historical footnote to this already character-rich area.",
      "Today, Unionville functions as a quiet residential annex to North Easton, with the Dorchester Meadow Brook winding through historic sites and the iconic water tower (1986) serving as a local landmark. It's ideal for buyers who want Easton's excellent schools and community benefits in the quietest possible setting.",
    ],
    highlights: [
      { icon: 'ph-drop', title: "Monte's Pond", description: 'Historic pond and site of the last ice-cutting operation in New England — a unique neighborhood landmark.' },
      { icon: 'ph-path', title: 'Washington Street', description: "The neighborhood's main corridor connecting to North Easton Village and its shops, dining, and attractions." },
      { icon: 'ph-church', title: 'Historic Roots', description: "Methodist church history dating to 1795 and the Easton Grange (1892) reflect the neighborhood's deep heritage." },
      { icon: 'ph-mountains', title: 'Water Tower Landmark', description: 'The 1986 water tower is a recognizable local landmark and a symbol of the Unionville neighborhood.' },
      { icon: 'ph-leaf', title: 'Peaceful Living', description: "Easton's quietest neighborhood — ideal for buyers seeking tranquility, space, and a slower pace of life." },
      { icon: 'ph-bridge', title: 'Dorchester Meadow Brook', description: 'Historic brook winding through the neighborhood past former industrial sites, now scenic green corridors.' },
    ],
    otherNeighborhoods: allNeighborhoods.filter((n) => n.slug !== 'unionville'),
  },
];

export function getNeighborhood(slug: string): Neighborhood | undefined {
  return neighborhoods.find((n) => n.slug === slug);
}

export function getAllSlugs(): string[] {
  return neighborhoods.map((n) => n.slug);
}
