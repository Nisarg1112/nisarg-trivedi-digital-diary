# Nisarg Trivedi's Digital Diary

A modern, theme-aware personal website built with Next.js featuring blogs, reading lists, favourite youtube channels, newsletters, and more.

## Features
- 📦 Built with Next.js
- 🌓 Light/Dark/Auto theme switching
- 📱 Responsive design with mobile-first approach
- ⌨️ Keyboard accessibility for desktop users
- 🔄 Dynamic content with Sanity CMS
- 📰 Substack integration for newsletter section
- 🔍 SEO-optimized with Open Graph meta tags
- 📊 Analytics with Vercel and Google Analytics
- 🖼️ Image optimization

## Tech Stack
- Next.js
- Sanity CMS
- Vercel

## Prerequisites
- Git
- Node Version Manager (nvm)
- Node.js 20.17.0
- npm 10.8.2
- Setup Sanity CMS [Follow This Guide](#setup-sanity-cms)

## Setup Sanity CMS
1. Clone [This Repository](https://github.com/Nisarg1112/studio-nisarg-digital-diary)
```
git clone https://github.com/Nisarg1112/studio-nisarg-digital-diary.git
```
2. Follow the instructions in the [README.md](https://github.com/Nisarg1112/studio-nisarg-digital-diary/blob/main/README.md) file of the cloned repository to set up the Sanity CMS.

## Getting Started

### 1. Repository Setup
```
# Clone the repository
git clone https://github.com/Nisarg1112/nisarg-trivedi-digital-diary.git

# Navigate to project directory
cd nisarg-trivedi-digital-diary
```

### 2. Node.js Setup
```
# Install Node.js using nvm
nvm install 20.17.0

# Verify npm version
npm -v  # Should show 10.8.2
```

### 3. Installl dependencies
```bash
npm install --legacy-peer-deps
```

### 4. Environment Variables
- I've already added all the required environment variables in the `.env.sample` file.
- Or else Create a `.env` file in the root directory and add the following environment variables:
```bash
NEXT_PUBLIC_DOMAIN = "your-public-domain" // For SEO purposes
NEXT_PUBLIC_GTAG_MEASUREMENT_ID = "your-gtag-measurement-id" // For google analytics not needed necessarily
NEXT_PUBLIC_PERSONAL_EMAIL = "your-personal-email"
NEXT_PUBLIC_CALENDER_LINK = "your-calender-link" // (https://cal.com/)
NEXT_PUBLIC_SANITY_PROJECT_ID = "your-sanity-project-id" // (https://www.sanity.io/)
NODE_ENV = "development"
```

### 5. Start the development server:
```bash
npm run dev
```
After successful installation, Sanity Studio will be available at `http://localhost:3000`

## Deployment

### Deploy to Vercel
1. Fork this repository to your GitHub account
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your forked repository
4. Vercel will automatically detect Next.js and configure the build settings
5. Add required environment variables from `.env.sample`
6. Click "Deploy".

Your site will be live at a `.vercel.app` domain within minutes.

### Custom Domain Setup

#### Option 1: Using Vercel as Name Servers (Recommended)
1. Go to your project on Vercel dashboard
2. Navigate to "Settings" → "Domains"
3. Add your domain name
4. Vercel will provide you with name servers (usually 4)
5. Go to your domain registrar's dashboard
6. Replace existing name servers with Vercel's name servers
7. Wait for DNS propagation (can take up to 48 hours)

Vercel's name servers typically look like:
```bash
ns1.vercel-dns.com
ns2.vercel-dns.com
```

#### Option 2: Using A and CNAME Records
1. Go to your project on Vercel dashboard
2. Navigate to "Settings" → "Domains"
3. Add your domain name
4. Keep your existing name servers
5. Add these DNS records at your domain registrar:
6. A Record: Point @ to 76.76.21.21
7. CNAME Record: Point www to cname.vercel-dns.com

Both methods will:

- Automatically configure SSL certificates
- Enable automatic domain security
- Provide DDoS protection
- Enable Vercel's global CDN

You can verify the setup by checking the domain status in your Vercel dashboard.

## Help & Support
Need help? Feel free to reach out:

- LinkedIn: [Nisarg Trivedi](https://www.linkedin.com/in/nisargtrivedi1112/)
- Email: nisargtrivedi054@gmail.com

## Contributing
Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit a Pull Request
4. pen issues for bugs or feature requests

## License

This project is licensed under Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0).

This means you are free to:
- Share — copy and redistribute the material in any medium or format
- Adapt — remix, transform, and build upon the material

Under the following terms:
- **Attribution** — You must give appropriate credit to [Nisarg Trivedi](https://www.linkedin.com/in/nisargtrivedi1112/), provide a link to the original repository (https://github.com/Nisarg1112/nisarg-trivedi-digital-diary), and indicate if changes were made.
- **NonCommercial** — You may not use the material (especially theme and styling) for commercial purposes.
- **No additional restrictions** — You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.

### Additional Information
- For full license details, see [Creative Commons License](https://creativecommons.org/licenses/by-nc/4.0/).
- For the customized license, refer to [license.md](license.md).
- For the complete text of the license, view [LICENSE](LICENSE).


