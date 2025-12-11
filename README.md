# AquaFresh Hydroponics Website

A modern, premium website for AquaFresh Hydroponics - showcasing innovative hydroponic solutions for sustainable agriculture.

## Features

✨ **Modern Design**

- Clean green-aqua color theme
- Smooth gradients and animations
- Rounded cards with shadow effects
- Premium professional layout

🎨 **Sections Included**

- Hero Section with CTA buttons
- Services showcase (6 services)
- Who We Are / About section
- Indian Market Statistics
- Latest News & Updates
- Contact Form
- Footer with social links

📱 **Responsive Design**

- Mobile-friendly navigation
- Hamburger menu for small screens
- Optimized for all device sizes
- Touch-friendly interface

⚡ **Interactive Features**

- Sticky navigation bar
- Smooth scroll animations
- Animated counters for statistics
- Hover effects on cards
- Form validation
- Parallax effects

🎯 **Technical Features**

- Semantic HTML5
- CSS3 with custom properties
- Vanilla JavaScript (no dependencies)
- Intersection Observer for animations
- Lazy loading images
- SEO-friendly structure

## How to Use

1. **Replace the Logo**:

   - Add your `logo.png` file to the root directory
   - The logo should be approximately 200x200px with transparent background

2. **Update Contact Information**:

   - Edit email, phone, and address in the HTML file
   - Update social media links

3. **Customize Images**:

   - Replace placeholder images with your actual hydroponic facility photos
   - Recommended size: 1920x1080px for best quality

4. **Update Content**:
   - Modify service descriptions
   - Update news articles
   - Customize market statistics

## File Structure

```
aqua_website/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # Interactive features
├── logo.png            # Your company logo
└── README.md           # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Customization

### Colors

Edit CSS variables in `styles.css`:

```css
:root {
  --primary-green: #4caf50;
  --aqua: #00bcd4;
  --dark-aqua: #0097a7;
  --light-green: #81c784;
}
```

### Fonts

Currently using system fonts. To add custom fonts:

1. Add Google Fonts link in HTML `<head>`
2. Update `font-family` in CSS

## Contact Form

The contact form currently logs to console. To make it functional:

1. Uncomment the fetch() code in `script.js`
2. Set up a backend API endpoint
3. Or use a service like Formspree, EmailJS, or Netlify Forms

## Deployment

### Option 1: GitHub Pages

1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select main branch as source

### Option 2: Netlify

1. Drag and drop the folder to Netlify
2. Or connect your Git repository

### Option 3: Traditional Hosting

1. Upload all files to your web server
2. Ensure index.html is in the root directory

## Performance Tips

- Optimize images (use WebP format)
- Enable GZIP compression on server
- Use CDN for Font Awesome icons
- Minify CSS and JavaScript for production

## Credits

- Icons: Font Awesome 6.4.0
- Images: Unsplash (placeholder images)
- Design: Custom modern premium design
- Inspired by: FarmCult website structure

## License

This website template is created for AquaFresh Hydroponics.
Modify and use as needed for your business.

---

**AquaFresh Hydroponics** - Cultivating Tomorrow 🌱💧
