# Astro Odyssey Theme - Complete API Documentation

## Table of Contents

1. [Configuration System](#configuration-system)
2. [Core Components](#core-components)
3. [Section Components](#section-components)
4. [Form Components](#form-components)
5. [Blog Components](#blog-components)
6. [UI Elements](#ui-elements)
7. [Integration Patterns](#integration-patterns)
8. [Custom CSS Variables](#custom-css-variables)

---

## Configuration System

The theme uses three main configuration files that control site behavior:

### `/src/config/settings.js`

**Purpose**: Global site settings and theme configuration

```javascript
export default {
  title: string,                    // Page title for SEO
  description: string,              // Meta description
  url: string,                      // Base URL (no trailing slash)
  name: string,                     // Brand/business name
  enableThemeSwitcher: boolean,     // Enable/disable theme switching
  showPlug: boolean                 // Show/hide footer plug
}
```

**Example Configuration**:
```javascript
export default {
  title: "My Business | Professional Services",
  description: "Expert solutions for modern businesses",
  url: "https://mybusiness.com",
  name: "My Business",
  enableThemeSwitcher: true,
  showPlug: false
}
```

### `/src/config/nav.js`

**Purpose**: Navigation menu configuration

```javascript
export const nav = [
  {
    title: string,    // Display text
    slug: string      // URL path
  }
]
```

### `/src/config/footer.js`

**Purpose**: Footer links and social media configuration

```javascript
export const footerSocials = [
  {
    name: string,     // Platform name
    url: string,      // Profile URL
    icon: string      // Icon name (from Iconify)
  }
]

export const footerLists = [
  {
    title: string,    // Section title
    items: [
      {
        title: string,  // Link text
        slug: string    // URL path
      }
    ]
  }
]
```

---

## Core Components

### Container

**File**: `/src/components/core/Container.astro`

**Purpose**: Provides consistent content width and padding throughout the site

**Props**:
- `narrow?: boolean` - Use narrow container width

**Slots**:
- Default slot - Content to be contained

**Usage**:
```astro
<Container>
  <p>Full width container content</p>
</Container>

<Container narrow>
  <p>Narrow container content</p>
</Container>
```

### Header

**File**: `/src/components/core/Header.astro`

**Purpose**: Site header with responsive navigation

**Props**:
- `navData?: Array` - Navigation items array
- `rightMenu?: boolean` - Position menu on the right

**Slots**:
- `logo` - Logo/brand element
- `nav` - Custom navigation (overrides navData)
- `action-item` - Action button or element

**Usage**:
```astro
---
import { nav } from '../config/nav.js';
---

<Header navData={nav}>
  <Logo slot="logo" />
  <Button slot="action-item" href="/contact">Contact</Button>
</Header>
```

### Footer

**File**: `/src/components/core/Footer.astro`

**Purpose**: Site footer with links and social media

**Props**:
- `footerSocials: Array` - Social media links
- `footerLists: Array` - Footer link sections
- `copyrightName: string` - Copyright holder name
- `background?: string` - Custom background color
- `color?: string` - Custom text color
- `showPlug?: boolean` - Show/hide theme plug (default: true)

**Slots**:
- `logo` - Footer logo

**Usage**:
```astro
---
import { footerSocials, footerLists } from '../config/footer.js';
---

<Footer 
  {footerSocials} 
  {footerLists} 
  copyrightName="My Company"
  background="#1a1a1a"
  color="#ffffff"
>
  <Logo slot="logo" />
</Footer>
```

---

## Section Components

### Hero Sections

#### HeroSection

**File**: `/src/components/sections/heros/HeroSection.astro`

**Purpose**: Generic two-column hero layout

**Props**: None

**Slots**:
- `text-container` - Hero text content
- `image-container` - Hero image content

**Usage**:
```astro
<HeroSection>
  <div slot="text-container">
    <h1>Welcome to Our Platform</h1>
    <p>Revolutionary solutions for modern businesses</p>
    <Button href="/get-started">Get Started</Button>
  </div>
  <div slot="image-container">
    <img src="/hero-image.jpg" alt="Hero" />
  </div>
</HeroSection>
```

#### TextAndImageHero

**File**: `/src/components/sections/heros/TextAndImageHero.astro`

**Purpose**: Two-column hero with optional reverse layout

**Props**:
- `reversed?: boolean` - Reverse text/image order

**Slots**:
- `text-container` - Text content
- `btns-container` - Button group
- `image-container` - Image content

**Usage**:
```astro
<TextAndImageHero reversed>
  <div slot="text-container">
    <h1>Innovation Starts Here</h1>
    <p>Cutting-edge technology meets user-friendly design</p>
  </div>
  <div slot="btns-container">
    <Button href="/demo">View Demo</Button>
    <Button href="/pricing" outlined>See Pricing</Button>
  </div>
  <div slot="image-container">
    <img src="/product-image.jpg" alt="Product" />
  </div>
</TextAndImageHero>
```

### Content Sections

#### TextSection

**File**: `/src/components/sections/TextSection.astro`

**Purpose**: Simple text content section with optional narrow width

**Props**:
- `narrow?: boolean` - Use narrow container

**Slots**:
- Default slot - Text content

**Usage**:
```astro
<TextSection narrow>
  <h2>About Our Mission</h2>
  <p>We believe in creating solutions that make a difference...</p>
</TextSection>
```

#### TextCardSection

**File**: `/src/components/sections/TextCardSection.astro`

**Purpose**: Elevated text section with card styling

**Props**:
- `surfaceNumber?: number` - Surface theme number (default: 1)

**Slots**:
- Default slot - Card content

**Usage**:
```astro
<TextCardSection surfaceNumber={2}>
  <h2>Featured Content</h2>
  <p>This content appears in an elevated card style</p>
</TextCardSection>
```

#### ThreeColumnTextSection

**File**: `/src/components/sections/ThreeColumnTextSection.astro`

**Purpose**: Three-column responsive layout for features or services

**Props**: None

**Slots**:
- `column-1-body` - First column content
- `column-1-cta` - First column CTA
- `column-2-body` - Second column content  
- `column-2-cta` - Second column CTA
- `column-3-body` - Third column content
- `column-3-cta` - Third column CTA

**Usage**:
```astro
<ThreeColumnTextSection>
  <div slot="column-1-body">
    <h3>Feature 1</h3>
    <p>Description of first feature</p>
  </div>
  <Button slot="column-1-cta" href="/feature-1">Learn More</Button>
  
  <div slot="column-2-body">
    <h3>Feature 2</h3>
    <p>Description of second feature</p>
  </div>
  <Button slot="column-2-cta" href="/feature-2">Learn More</Button>
  
  <div slot="column-3-body">
    <h3>Feature 3</h3>
    <p>Description of third feature</p>
  </div>
  <Button slot="column-3-cta" href="/feature-3">Learn More</Button>
</ThreeColumnTextSection>
```

#### StickyTextImageSection

**File**: `/src/components/sections/StickyTextImageSection.astro`

**Purpose**: Text and image layout with sticky image behavior

**Props**:
- `reversed?: boolean` - Reverse text/image positions

**Slots**:
- `text-container` - Text content (can be long)
- `image-container` - Image that becomes sticky

**Usage**:
```astro
<StickyTextImageSection>
  <div slot="text-container">
    <h2>Detailed Feature Overview</h2>
    <p>Long form content that scrolls while image stays in view...</p>
    <!-- More content... -->
  </div>
  <div slot="image-container">
    <img src="/sticky-image.jpg" alt="Feature" />
  </div>
</StickyTextImageSection>
```

#### CtaCardSection

**File**: `/src/components/sections/CtaCardSection.astro`

**Purpose**: Call-to-action section with card styling

**Props**:
- `background?: string` - Custom background color
- `color?: string` - Custom text color

**Slots**:
- Default slot - CTA content

**Usage**:
```astro
<CtaCardSection background="#0066cc" color="#ffffff">
  <h2>Ready to Get Started?</h2>
  <p>Join thousands of satisfied customers today</p>
  <Button href="/signup" onPrimary>Sign Up Now</Button>
</CtaCardSection>
```

#### CustomerQuoteSection

**File**: `/src/components/sections/CustomerQuoteSection.astro`

**Purpose**: Customer testimonial with quote styling

**Props**:
- `quoteText: string` - The testimonial quote
- `customerName: string` - Customer name for attribution

**Usage**:
```astro
<CustomerQuoteSection 
  quoteText="This product transformed our business operations completely"
  customerName="Sarah Johnson, CEO of TechCorp"
/>
```

#### YouTubeEmbedSection

**File**: `/src/components/sections/YouTubeEmbedSection.astro`

**Purpose**: YouTube video embed with responsive container

**Props**:
- `url: string` - YouTube video URL
- `rounded?: boolean` - Apply rounded corners

**Usage**:
```astro
<YouTubeEmbedSection 
  url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
  rounded 
/>
```

---

## Form Components

### Form Fields

#### FormInput

**File**: `/src/components/form-fields/FormInput.astro`

**Purpose**: Input field with consistent styling

**Props**:
- `type?: string` - Input type (default: "text")
- `label?: string` - Field label
- `name: string` - Input name attribute
- `placeholder?: string` - Placeholder text
- `required?: boolean` - Required field validation

**Usage**:
```astro
<FormInput 
  type="email"
  label="Email Address"
  name="email"
  placeholder="your@email.com"
  required
/>
```

#### FormSelect

**File**: `/src/components/form-fields/FormSelect.astro`

**Purpose**: Select dropdown with consistent styling

**Props**:
- `label?: string` - Field label
- `name: string` - Select name attribute
- `options: Array<string>` - Option values and labels
- `required?: boolean` - Required field validation

**Usage**:
```astro
<FormSelect
  label="How did you hear about us?"
  name="source"
  options={["Google", "Social Media", "Referral"]}
  required
/>
```

#### FormTextarea

**File**: `/src/components/form-fields/FormTextarea.astro`

**Purpose**: Textarea field with consistent styling

**Props**:
- `label?: string` - Field label
- `name: string` - Textarea name attribute
- `placeholder?: string` - Placeholder text
- `rows?: number` - Number of visible rows (default: 4)
- `required?: boolean` - Required field validation

**Usage**:
```astro
<FormTextarea
  label="Message"
  name="message"
  placeholder="Tell us about your project..."
  rows={6}
  required
/>
```

### Complete Forms

#### ContactForm

**File**: `/src/components/forms/ContactForm.astro`

**Purpose**: Ready-to-use contact form with all standard fields

**Props**: None (uses internal configuration)

**Usage**:
```astro
<ContactForm />
```

**Form Fields**:
- Name (text input)
- Email (email input) 
- Source (select dropdown)
- Message (textarea)
- Submit button

#### NewsletterForm

**File**: `/src/components/forms/NewsletterForm.astro`

**Purpose**: Simple email collection form

**Props**: None

**Usage**:
```astro
<NewsletterForm />
```

---

## Blog Components

#### BlogPostsList

**File**: `/src/components/blog/BlogPostsList.astro`

**Purpose**: Grid layout for blog post previews

**Props**:
- `posts: Array` - Array of post objects

**Post Object Structure**:
```typescript
{
  href: string,           // Post URL
  title: string,          // Post title
  featuredImage: string,  // Image URL
  excerpt?: string        // Optional excerpt
}
```

**Usage**:
```astro
---
const posts = [
  {
    href: "/blog/post-1",
    title: "First Blog Post", 
    featuredImage: "/images/post1.jpg",
    excerpt: "Brief description..."
  }
];
---

<BlogPostsList {posts} />
```

#### BlogPostPreview

**File**: `/src/components/blog/BlogPostPreview.astro`

**Purpose**: Individual blog post preview card (used internally by BlogPostsList)

**Props**:
- `post: Object` - Post data object

---

## UI Elements

### Button

**File**: `/src/components/buttons/Button.astro`

**Purpose**: Versatile button component with multiple variants

**Props**:
- `href?: string` - Link URL (renders as `<a>` instead of `<button>`)
- `unelevated?: boolean` - Flat button style
- `outlined?: boolean` - Outlined button style  
- `customIcon?: boolean` - Enable custom icon slot
- `onPrimary?: boolean` - Style for use on primary backgrounds
- `newTab?: boolean` - Open link in new tab

**Slots**:
- Default slot - Button text
- `icon` - Custom icon (when `customIcon` is true)

**Button Variants**:
```astro
<!-- Standard filled button -->
<Button href="/signup">Sign Up</Button>

<!-- Outlined button -->
<Button href="/learn-more" outlined>Learn More</Button>

<!-- Flat/text button -->
<Button href="/cancel" unelevated>Cancel</Button>

<!-- Button for primary backgrounds -->
<Button href="/get-started" onPrimary>Get Started</Button>

<!-- Button with custom icon -->
<Button href="/download" customIcon>
  Download
  <Icon slot="icon" name="ic:baseline-download" />
</Button>

<!-- Form submit button -->
<Button>Submit Form</Button>
```

### FeatureCard

**File**: `/src/components/cards/FeatureCard.astro`

**Purpose**: Card component for showcasing features or products

**Props**:
- `href: string` - Link destination
- `imgSrc: string` - Image path (without extension)
- `title: string` - Card title

**Usage**:
```astro
<FeatureCard 
  href="/features/analytics"
  imgSrc="/assets/features/analytics"
  title="Advanced Analytics"
/>
```

**Note**: Component automatically handles WebP/PNG fallbacks by appending `.webp` and `.png` extensions.

### YouTubeEmbed

**File**: `/src/components/core/YouTubeEmbed.astro`

**Purpose**: Responsive YouTube video embed

**Props**:
- `url: string` - YouTube video URL
- `rounded?: boolean` - Apply rounded corners
- `loading?: string` - Loading strategy (default: "lazy")

**Usage**:
```astro
<YouTubeEmbed 
  url="https://www.youtube.com/watch?v=VIDEO_ID"
  rounded
  loading="eager"
/>
```

### Logo

**File**: `/src/components/Logo.astro`

**Purpose**: Simple text-based logo component

**Props**: None

**Usage**:
```astro
<Logo />
```

**Customization**: Edit the component file to replace with your own logo design.

---

## Integration Patterns

### Common Layout Patterns

#### Basic Page Layout
```astro
---
import { Container, Header, Footer } from '@components/odyssey-theme';
import { nav } from '../config/nav.js';
import { footerSocials, footerLists } from '../config/footer.js';
---

<Header navData={nav}>
  <Logo slot="logo" />
</Header>

<main>
  <Container>
    <!-- Page content -->
  </Container>
</main>

<Footer {footerSocials} {footerLists} copyrightName="My Company">
  <Logo slot="logo" />
</Footer>
```

#### Landing Page Pattern
```astro
<HomeHeroSection />
<TextSection narrow>
  <h2>Why Choose Us</h2>
  <p>Compelling value proposition...</p>
</TextSection>
<ThreeColumnTextSection>
  <!-- Feature columns -->
</ThreeColumnTextSection>
<CustomerQuoteSection 
  quoteText="Amazing results!"
  customerName="Happy Customer"
/>
<CtaCardSection>
  <h2>Ready to Start?</h2>
  <Button href="/signup">Get Started Today</Button>
</CtaCardSection>
```

### Form Integration
```astro
<CtaCardSection>
  <h2>Contact Us</h2>
  <ContactForm />
</CtaCardSection>

<!-- Or custom form -->
<form method="POST" action="/submit">
  <FormInput type="text" label="Name" name="name" required />
  <FormInput type="email" label="Email" name="email" required />
  <FormTextarea label="Message" name="message" />
  <Button>Send Message</Button>
</form>
```

### Theme Switching Integration
```astro
---
import { ThemeSwitcher } from '../components/theme-switcher/theme-switcher';
import settings from '../config/settings.js';
---

{settings.enableThemeSwitcher && (
  <ThemeSwitcher client:only />
)}
```

---

## Custom CSS Variables

The theme uses CSS custom properties for consistent theming:

### Layout Variables
```css
--container-max-width
--container-max-width-narrow  
--container-padding
--section-margin
--navbar-height
```

### Theme Colors
```css
--theme-primary
--theme-primary-hover
--theme-on-primary
--theme-bg
--theme-on-bg
--theme-surface-1
--theme-on-surface-1
```

### Typography
```css
--theme-font-family-sans
--theme-font-family-serif
--font-size-sm
--font-size-md
--font-size-lg
```

### Form Styling
```css
--form-field-border-color
--form-field-border-focus-color
--form-field-input-color
--form-field-border-radius
```

### Component Styling
```css
--theme-shape-radius
--theme-button-border-radius
--theme-transition
```

### Using Custom Variables
```astro
<style>
  .custom-section {
    background-color: var(--theme-surface-1);
    padding: var(--section-margin);
    border-radius: var(--theme-shape-radius);
  }
</style>
```

---

## Dependencies

The theme requires these packages:

- **Astro**: `^4.15.9` - Core framework
- **astro-icon**: `^1.1.0` - Icon system using Iconify
- **@iconify-json/ic**: `^1.1.17` - Material Design icons
- **@iconify-json/mdi**: `^1.1.64` - Material Design icons
- **@astrojs/lit**: `^4.0.1` - Lit components support
- **@astrojs/mdx**: `^2.1.1` - MDX support
- **lit**: `^3.1.2` - Web components

### Icon Usage
Icons use the Iconify system. Common icon patterns:
```astro
---
import { Icon } from 'astro-icon/components';
---

<Icon name="ic:baseline-menu" width="24" height="24" />
<Icon name="mdi:github" />
<Icon name="ic:baseline-chevron-right" />
```

---

This documentation covers all components in the Astro Odyssey Theme. Each component is designed to be composable and customizable through props and slots, following Astro's component patterns for maximum flexibility and reusability.