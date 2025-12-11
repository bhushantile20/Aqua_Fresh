# JavaScript Quick Reference Guide

## File: `script.js` (851 lines)

### How to Debug

Open the browser DevTools console (F12) and look for `[AquaFresh]` prefixed messages:

```javascript
[AquaFresh] Mobile menu opened
[AquaFresh] Form submission initiated
[AquaFresh] ✅ Form submitted successfully
```

---

## Form Validation Rules

### Email

```javascript
Pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
Examples: ✅ user@example.com, john@test.co.uk
```

### Phone

```javascript
Pattern: /^[\d+\-\(\)\s]{10,}$/
Examples: ✅ +1-234-567-8900, (123) 456-7890
```

### Name

```javascript
Minimum length: 3 characters
Examples: ✅ John, Alice, Bob
```

### Message

```javascript
Minimum length: 10 characters
Examples: ✅ "I'd like to learn more"
```

---

## HTML Requirements

### For Form Validation

```html
<form name="contact-form">
  <input name="email" type="email" required />
  <input name="phone" required />
  <input name="name" required />
  <textarea name="message" required></textarea>
  <select name="service" required>
    <option value="">Select...</option>
  </select>
  <button type="submit">Submit</button>
</form>
```

### For Lazy Loading

```html
<img src="placeholder.jpg" data-src="actual-image.jpg" alt="Description" />
```

### For Statistics Counter

```html
<div class="hero-stats">
  <span class="stat-value">50+</span>
  <span class="stat-label">Countries</span>
</div>
```

### For Testimonials Carousel

```html
<section id="testimonials">
  <div class="testimonial-card">Testimonial 1</div>
  <div class="testimonial-card">Testimonial 2</div>
  <div class="testimonial-card">Testimonial 3</div>
</section>
```

---

## Class Methods Reference

### NavigationManager

```javascript
toggleMenu(); // Toggle hamburger menu
closeMenu(); // Close menu programmatically
onScroll(); // Handle scroll events
updateActiveLink(); // Update active nav link
setupSmoothScroll(); // Enable smooth scrolling
```

### FormManager

```javascript
validateField(field)           // Validate single field
displayFieldError(...)         // Show/hide error message
handleSubmit(e)                // Process form submission
submitForm(data)               // Send form data
showMessage(msg, type)         // Display success/error message
logFormSubmission(data)        // Log for analytics
```

### TestimonialCarousel

```javascript
startAutoRotate(); // Begin auto-rotation
pauseAutoRotate(); // Pause auto-rotation
next(); // Show next testimonial
prev(); // Show previous testimonial
updateCarousel(); // Update carousel display
```

### StatisticsCounter

```javascript
observeStats(); // Setup Intersection Observer
animateCounters(); // Start all counter animations
countUp(el, target); // Animate single counter
```

### LazyLoadManager

```javascript
init(); // Initialize lazy loading
setupIntersectionObserver(); // Setup image observer
loadAllImages(); // Fallback: load all images at once
```

### BackToTopButton

```javascript
createButton(); // Create button element
toggleVisibility(); // Show/hide button on scroll
scrollToTop(); // Scroll to page top
```

### ScrollAnimationObserver

```javascript
init(); // Setup scroll animations
```

### PerformanceMonitor

```javascript
logPageMetrics(); // Log page load metrics
```

---

## Logger Usage

```javascript
logger.log("Message"); // Standard log
logger.warn("Warning message"); // Warning with ⚠️
logger.error("Error message", errorObj); // Error with ❌
logger.success("Success message"); // Success with ✅

// Example with data
logger.log("Form data", { name: "John", email: "john@test.com" });
```

---

## Throttle & Debounce

```javascript
// Throttle: Limit calls to every 100ms
window.addEventListener(
  "scroll",
  utils.throttle(() => {
    console.log("Scroll event (max every 100ms)");
  }, 100)
);

// Debounce: Delay execution by 300ms
const debouncedResize = utils.debounce(() => {
  console.log("Window resized");
}, 300);
window.addEventListener("resize", debouncedResize);
```

---

## Common Patterns

### Listening for Form Submission

```javascript
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Form validation happens in FormManager
});
```

### Smooth Scroll to Section

```javascript
const link = document.querySelector('a[href="#features"]');
link.click(); // Triggers smooth scroll
```

### Check Form Field Value

```javascript
const email = document.querySelector('input[name="email"]').value;
if (utils.emailRegex.test(email)) {
  console.log("Valid email");
}
```

### Manually Trigger Carousel

```javascript
const carousel = window.carouselInstance; // Set during init
carousel.next(); // Next testimonial
carousel.prev(); // Previous testimonial
```

---

## CSS Classes Used by JavaScript

| Class       | Applied By                  | Purpose                |
| ----------- | --------------------------- | ---------------------- |
| `.active`   | NavigationManager, Carousel | Mark active element    |
| `.scrolled` | NavigationManager           | Header shadow effect   |
| `.error`    | FormManager                 | Show field error state |
| `.loaded`   | LazyLoadManager             | Mark loaded images     |

---

## Event Listeners Added

| Event              | Element      | Handler                              |
| ------------------ | ------------ | ------------------------------------ |
| `click`            | `#hamburger` | Toggle mobile menu                   |
| `click`            | Nav links    | Close menu, smooth scroll            |
| `scroll`           | `window`     | Update active link, show back-to-top |
| `submit`           | `form`       | Validate and submit form             |
| `blur`             | Form inputs  | Real-time validation                 |
| `change`           | Form inputs  | Real-time validation                 |
| `keydown`          | `document`   | Carousel navigation, Home key        |
| `DOMContentLoaded` | `document`   | Initialize all modules               |
| `visibilitychange` | `document`   | Log page visibility                  |
| `error`            | `window`     | Log JavaScript errors                |

---

## Performance Tips

1. **Scroll Events**: Already throttled (100ms)
2. **Form Validation**: Only runs on blur/change, not every keystroke
3. **Intersection Observer**: Efficiently detects visibility
4. **Lazy Loading**: Images load only when needed
5. **One-time Animations**: Flags prevent redundant animations

---

## Troubleshooting

### Form not submitting?

- Check browser console for validation errors
- Verify all required fields are filled correctly
- Look for `[AquaFresh] Form validation failed` message

### Navigation links not scrolling?

- Ensure target section has an `id` attribute
- Check console for `[AquaFresh] Scrolled to section: #id` message
- Verify smooth scroll CSS rule exists

### Testimonials not auto-rotating?

- Check console for `[AquaFresh] Testimonial Carousel initialized`
- Verify `.testimonial-card` elements exist
- Look for `[AquaFresh] Showing testimonial X of Y` messages

### Counters not animating?

- Ensure `.stat-value` elements exist
- Check console for `[AquaFresh] Statistics Counter initialized`
- Scroll to stats section to trigger animation
- Look for `[AquaFresh] Counter animation complete` message

### Back-to-top button not appearing?

- Scroll down 300px to trigger visibility
- Check CSS for `#back-to-top` styles
- Verify `[AquaFresh] Back-to-Top Button initialized` in console

---

## Modifying Behavior

### Change carousel auto-rotate delay

```javascript
// In TestimonialCarousel constructor
this.autoRotateDelay = 3000; // Change from 5000 to 3000ms
```

### Change counter animation speed

```javascript
// In StatisticsCounter.countUp()
const duration = 1000; // Change from 2000 to 1000ms
```

### Change back-to-top threshold

```javascript
// In BackToTopButton constructor
this.threshold = 500; // Change from 300 to 500px
```

### Add custom validation rule

```javascript
// In FormManager.validateField()
} else if (fieldName === 'customField') {
    if (!customPattern.test(value)) {
        isValid = false;
        errorMessage = 'Custom error message';
    }
}
```

---

## Browser Compatibility

| Feature               | Chrome | Firefox | Safari   | Edge   |
| --------------------- | ------ | ------- | -------- | ------ |
| Intersection Observer | ✅ 51+ | ✅ 55+  | ✅ 12.1+ | ✅ 15+ |
| FormData              | ✅ All | ✅ All  | ✅ All   | ✅ All |
| Smooth Scroll         | ✅ 61+ | ✅ 36+  | ✅ 15.4+ | ✅ 79+ |
| Arrow Keys            | ✅ All | ✅ All  | ✅ All   | ✅ All |

**Note**: For older browsers, JavaScript provides fallbacks (e.g., immediate image loading without Intersection Observer).

---

## Security Notes

- Form validation is **client-side only** - add server-side validation too
- Email and phone patterns are basic - consider stricter patterns for production
- Form submission simulated - implement actual backend endpoint
- User data logged to console - remove in production

---

## Maintenance Checklist

- [ ] Test form validation with various inputs
- [ ] Check console logs for errors on page load
- [ ] Test mobile menu on small screens
- [ ] Verify testimonials carousel works
- [ ] Test smooth scrolling to all sections
- [ ] Check back-to-top button visibility
- [ ] Test lazy loading with slow network
- [ ] Verify performance metrics in console
- [ ] Check accessibility with keyboard navigation

---

## Contact Form Test Data

```
Name: John Smith
Email: john@example.com
Phone: +1-234-567-8900
Service: Greenhouse Installation
Message: I'm interested in learning more about your hydroponic solutions for my farm.
```

All validation should pass with this data. ✅
