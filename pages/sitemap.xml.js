
const EXTERNAL_DATA_URL = 'https://www.nisargtrivedi.com';

function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${EXTERNAL_DATA_URL}</loc>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/about</loc>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/blogs</loc>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/reading-list</loc>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/goods</loc>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/newsletters</loc>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/youtube-channels</loc>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/subscribe</loc>
     </url>
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap();

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
