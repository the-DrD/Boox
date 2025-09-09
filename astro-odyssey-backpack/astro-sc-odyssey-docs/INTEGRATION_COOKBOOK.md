# Astro Odyssey Theme - Integration Cookbook

## 🍳 Business Integration Recipes

This cookbook provides practical, step-by-step integrations for common business needs when using the Astro Odyssey Theme. Each recipe includes complete code examples and configuration instructions.

## 📊 Analytics Integration

### Google Analytics 4

#### Setup
```bash
npm install gtag
```

#### Implementation
```astro
---
// src/components/analytics/GoogleAnalytics.astro
export interface Props {
  measurementId: string;
}

const { measurementId } = Astro.props;
const isProduction = import.meta.env.PROD;
---

{isProduction && measurementId && (
  <>
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}></script>
    <script define:vars={{ measurementId }}>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', measurementId, {
        page_title: document.title,
        page_location: window.location.href,
        custom_map: {
          custom_parameter_1: 'theme_name'
        }
      });
      
      // Track theme changes
      document.addEventListener('theme-changed', (event) => {
        gtag('event', 'theme_switch', {
          event_category: 'engagement',
          event_label: event.detail.theme,
          custom_parameter_1: event.detail.theme
        });
      });
      
      // Track form submissions
      document.addEventListener('form-submitted', (event) => {
        gtag('event', 'form_submit', {
          event_category: 'engagement',
          event_label: event.detail.formName
        });
      });
    </script>
  </>
)}
```

#### Usage in Layout
```astro
---
// src/layouts/Base.astro
import GoogleAnalytics from '@components/analytics/GoogleAnalytics.astro';

const analyticsId = import.meta.env.PUBLIC_GOOGLE_ANALYTICS_ID;
---

<html>
  <head>
    <!-- other head content -->
    <GoogleAnalytics measurementId={analyticsId} />
  </head>
  <!-- body content -->
</html>
```

#### Environment Configuration
```bash
# .env
PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### Plausible Analytics

#### Implementation
```astro
---
// src/components/analytics/PlausibleAnalytics.astro
export interface Props {
  domain: string;
  apiHost?: string;
}

const { domain, apiHost = "https://plausible.io" } = Astro.props;
const isProduction = import.meta.env.PROD;
---

{isProduction && domain && (
  <>
    <script 
      defer 
      data-domain={domain}
      data-api={`${apiHost}/api/event`}
      src={`${apiHost}/js/script.js`}
    ></script>
    
    <script define:vars={{ domain }}>
      // Custom event tracking
      window.plausible = window.plausible || function() {
        (window.plausible.q = window.plausible.q || []).push(arguments);
      };
      
      // Track theme changes
      document.addEventListener('theme-changed', (event) => {
        window.plausible('Theme Switch', {
          props: { theme: event.detail.theme }
        });
      });
      
      // Track downloads
      document.addEventListener('click', (event) => {
        const link = event.target.closest('a[href$=".pdf"], a[href$=".zip"], a[href$=".doc"]');
        if (link) {
          window.plausible('Download', {
            props: { file: link.href.split('/').pop() }
          });
        }
      });
    </script>
  </>
)}
```

## 📧 Email Marketing Integration

### Mailchimp Newsletter Signup

#### Implementation
```astro
---
// src/components/integrations/MailchimpForm.astro
export interface Props {
  listId: string;
  apiKey: string;
  serverPrefix: string;
  title?: string;
  description?: string;
}

const { 
  listId, 
  apiKey, 
  serverPrefix,
  title = "Subscribe to Our Newsletter",
  description = "Get the latest updates delivered to your inbox"
} = Astro.props;
---

<div class="mailchimp-form">
  <h3>{title}</h3>
  {description && <p class="description">{description}</p>}
  
  <form 
    id="mailchimp-form"
    action={`https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members`}
    method="POST"
    class="newsletter-form"
  >
    <div class="form-group">
      <input 
        type="email" 
        name="email_address" 
        placeholder="Enter your email"
        required
        class="email-input"
      />
    </div>
    
    <div class="form-group">
      <input 
        type="text" 
        name="FNAME" 
        placeholder="First Name (optional)"
        class="name-input"
      />
    </div>
    
    <button type="submit" class="submit-button">Subscribe</button>
    
    <div id="response-message" class="response-message"></div>
  </form>
</div>

<script define:vars={{ apiKey, listId, serverPrefix }}>
  document.getElementById('mailchimp-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const responseEl = document.getElementById('response-message');
    
    const data = {
      email_address: formData.get('email_address'),
      status: 'subscribed',
      merge_fields: {
        FNAME: formData.get('FNAME') || ''
      }
    };
    
    try {
      const response = await fetch(`https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        responseEl.innerHTML = '<p class="success">Successfully subscribed!</p>';
        e.target.reset();
        
        // Track with analytics
        if (window.gtag) {
          gtag('event', 'newsletter_signup', { event_category: 'engagement' });
        }
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      responseEl.innerHTML = '<p class="error">Subscription failed. Please try again.</p>';
    }
  });
</script>

<style>
  .mailchimp-form {
    background: var(--theme-surface-1);
    padding: 2rem;
    border-radius: var(--theme-shape-radius);
    text-align: center;
  }
  
  .description {
    margin-bottom: 1.5rem;
    color: var(--theme-on-surface-1);
    opacity: 0.8;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .email-input, .name-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--theme-surface-2);
    border-radius: calc(var(--theme-shape-radius) / 2);
    background: var(--theme-bg);
    color: var(--theme-on-bg);
  }
  
  .submit-button {
    background: var(--theme-primary);
    color: var(--theme-on-primary);
    border: none;
    padding: 0.75rem 2rem;
    border-radius: var(--theme-button-border-radius);
    cursor: pointer;
    transition: var(--theme-transition);
  }
  
  .submit-button:hover {
    background: var(--theme-primary-hover);
  }
  
  .response-message .success {
    color: green;
    background: rgba(0, 255, 0, 0.1);
    padding: 1rem;
    border-radius: var(--theme-shape-radius);
  }
  
  .response-message .error {
    color: red;
    background: rgba(255, 0, 0, 0.1);
    padding: 1rem;
    border-radius: var(--theme-shape-radius);
  }
</style>
```

### ConvertKit Integration

#### Implementation
```astro
---
// src/components/integrations/ConvertKitForm.astro
export interface Props {
  formId: string;
  apiKey: string;
  title?: string;
}

const { formId, apiKey, title = "Join Our Community" } = Astro.props;
---

<div class="convertkit-form">
  <h3>{title}</h3>
  
  <form id="convertkit-form" class="newsletter-form">
    <input 
      type="email" 
      name="email" 
      placeholder="Your email address"
      required
      class="email-input"
    />
    
    <input 
      type="text" 
      name="first_name" 
      placeholder="First name"
      class="name-input"
    />
    
    <button type="submit" class="submit-button">Subscribe</button>
    
    <div id="ck-response" class="response-message"></div>
  </form>
</div>

<script define:vars={{ formId, apiKey }}>
  document.getElementById('convertkit-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const responseEl = document.getElementById('ck-response');
    
    const data = {
      api_key: apiKey,
      email: formData.get('email'),
      first_name: formData.get('first_name')
    };
    
    try {
      const response = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        responseEl.innerHTML = '<p class="success">Welcome to our community!</p>';
        e.target.reset();
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      responseEl.innerHTML = '<p class="error">Something went wrong. Please try again.</p>';
    }
  });
</script>
```

## 💳 E-commerce Integration

### Stripe Payment Button

#### Setup
```bash
npm install @stripe/stripe-js
```

#### Implementation
```astro
---
// src/components/ecommerce/StripePaymentButton.astro
export interface Props {
  productName: string;
  price: number;
  currency?: string;
  stripePublicKey: string;
  successUrl: string;
  cancelUrl: string;
}

const { 
  productName, 
  price, 
  currency = 'usd',
  stripePublicKey,
  successUrl,
  cancelUrl
} = Astro.props;
---

<div class="stripe-payment">
  <div class="product-info">
    <h3>{productName}</h3>
    <p class="price">${(price / 100).toFixed(2)} {currency.toUpperCase()}</p>
  </div>
  
  <button id="stripe-payment-button" class="payment-button">
    Buy Now
  </button>
  
  <div id="payment-status" class="payment-status"></div>
</div>

<script define:vars={{ stripePublicKey, productName, price, currency, successUrl, cancelUrl }}>
  import('https://js.stripe.com/v3/').then(({ loadStripe }) => {
    loadStripe(stripePublicKey).then(stripe => {
      document.getElementById('stripe-payment-button').addEventListener('click', async () => {
        const statusEl = document.getElementById('payment-status');
        statusEl.innerHTML = 'Processing...';
        
        try {
          // Create checkout session
          const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              productName,
              price,
              currency,
              successUrl,
              cancelUrl
            })
          });
          
          const { sessionId } = await response.json();
          
          // Redirect to checkout
          const { error } = await stripe.redirectToCheckout({ sessionId });
          
          if (error) {
            statusEl.innerHTML = '<p class="error">Payment failed. Please try again.</p>';
          }
        } catch (error) {
          statusEl.innerHTML = '<p class="error">Payment initialization failed.</p>';
        }
      });
    });
  });
</script>

<style>
  .stripe-payment {
    background: var(--theme-surface-1);
    padding: 2rem;
    border-radius: var(--theme-shape-radius);
    text-align: center;
  }
  
  .product-info h3 {
    margin-bottom: 0.5rem;
  }
  
  .price {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--theme-primary);
    margin-bottom: 1.5rem;
  }
  
  .payment-button {
    background: var(--theme-primary);
    color: var(--theme-on-primary);
    border: none;
    padding: 1rem 2rem;
    border-radius: var(--theme-button-border-radius);
    font-size: 1.1rem;
    cursor: pointer;
    transition: var(--theme-transition);
  }
  
  .payment-button:hover {
    background: var(--theme-primary-hover);
  }
  
  .payment-status {
    margin-top: 1rem;
  }
</style>
```

#### API Endpoint for Stripe
```javascript
// src/pages/api/create-checkout-session.js
import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);

export async function post({ request }) {
  const { productName, price, currency, successUrl, cancelUrl } = await request.json();
  
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency,
          product_data: { name: productName },
          unit_amount: price,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
    
    return new Response(JSON.stringify({ sessionId: session.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
```

## 📝 CMS Integration

### Contentful Integration

#### Setup
```bash
npm install contentful
```

#### Content Fetching
```typescript
// src/lib/contentful.ts
import { createClient } from 'contentful';

const client = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
});

export interface BlogPost {
  fields: {
    title: string;
    slug: string;
    content: any;
    publishDate: string;
    tags: string[];
    featuredImage?: any;
  };
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    order: '-fields.publishDate',
  });
  
  return entries.items as BlogPost[];
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  });
  
  return entries.items[0] as BlogPost || null;
}

export async function getPages() {
  const entries = await client.getEntries({
    content_type: 'page'
  });
  
  return entries.items;
}
```

#### Dynamic Blog Pages
```astro
---
// src/pages/blog/[slug].astro
import { getBlogPost, getBlogPosts } from '@lib/contentful';
import Layout from '@layouts/Post.astro';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export async function getStaticPaths() {
  const posts = await getBlogPosts();
  
  return posts.map(post => ({
    params: { slug: post.fields.slug },
    props: { post }
  }));
}

const { post } = Astro.props;
const content = documentToHtmlString(post.fields.content);

const seo = {
  title: `${post.fields.title} | Your Blog`,
  description: post.fields.content.content[0]?.content[0]?.value.substring(0, 160),
  image: post.fields.featuredImage?.fields.file.url
};
---

<Layout {seo}>
  <article class="blog-post">
    {post.fields.featuredImage && (
      <img 
        src={post.fields.featuredImage.fields.file.url}
        alt={post.fields.title}
        class="featured-image"
      />
    )}
    
    <header>
      <h1>{post.fields.title}</h1>
      <time datetime={post.fields.publishDate}>
        {new Date(post.fields.publishDate).toLocaleDateString()}
      </time>
      
      {post.fields.tags && (
        <div class="tags">
          {post.fields.tags.map(tag => (
            <span class="tag">#{tag}</span>
          ))}
        </div>
      )}
    </header>
    
    <div class="content" set:html={content} />
  </article>
</Layout>

<style>
  .blog-post {
    max-width: var(--theme-blog-post-header-width);
    margin: 0 auto;
    padding: var(--section-margin);
  }
  
  .featured-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: var(--theme-shape-radius);
    margin-bottom: 2rem;
  }
  
  .tags {
    margin-top: 1rem;
  }
  
  .tag {
    background: var(--theme-surface-2);
    color: var(--theme-on-surface-2);
    padding: 0.25rem 0.5rem;
    border-radius: calc(var(--theme-shape-radius) / 4);
    font-size: var(--font-size-sm);
    margin-right: 0.5rem;
  }
  
  .content {
    margin-top: 2rem;
    line-height: 1.8;
  }
</style>
```

### Sanity Integration

#### Setup
```bash
npm install @sanity/client
```

#### Client Configuration
```typescript
// src/lib/sanity.ts
import { createClient } from '@sanity/client';

export const sanity = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET,
  useCdn: true,
  apiVersion: '2023-01-01',
});

export async function getPosts() {
  return await sanity.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage {
        asset -> {
          url,
          alt
        }
      },
      author -> {
        name,
        image {
          asset -> {
            url
          }
        }
      }
    }
  `);
}

export async function getPost(slug: string) {
  return await sanity.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      body,
      publishedAt,
      excerpt,
      mainImage {
        asset -> {
          url,
          alt
        }
      },
      author -> {
        name,
        bio,
        image {
          asset -> {
            url
          }
        }
      }
    }
  `, { slug });
}
```

## 🔐 Authentication Integration

### Auth0 Integration

#### Setup
```bash
npm install @auth0/auth0-spa-js
```

#### Auth Service
```typescript
// src/lib/auth0.ts
import { createAuth0Client } from '@auth0/auth0-spa-js';

const auth0Config = {
  domain: import.meta.env.PUBLIC_AUTH0_DOMAIN,
  clientId: import.meta.env.PUBLIC_AUTH0_CLIENT_ID,
  authorizationParams: {
    redirect_uri: window.location.origin + '/callback'
  }
};

let auth0Client: any = null;

export async function initAuth0() {
  auth0Client = await createAuth0Client(auth0Config);
  
  // Handle redirect callback
  if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, '/');
  }
  
  return auth0Client;
}

export async function login() {
  if (!auth0Client) auth0Client = await initAuth0();
  await auth0Client.loginWithRedirect();
}

export async function logout() {
  if (!auth0Client) auth0Client = await initAuth0();
  auth0Client.logout({
    logoutParams: {
      returnTo: window.location.origin
    }
  });
}

export async function getUser() {
  if (!auth0Client) auth0Client = await initAuth0();
  return await auth0Client.getUser();
}

export async function isAuthenticated() {
  if (!auth0Client) auth0Client = await initAuth0();
  return await auth0Client.isAuthenticated();
}
```

#### Login Component
```astro
---
// src/components/auth/LoginButton.astro
---

<div class="auth-component">
  <button id="login-button" class="auth-button" style="display: none;">
    Login
  </button>
  
  <div id="user-profile" class="user-profile" style="display: none;">
    <img id="user-avatar" class="avatar" alt="User avatar" />
    <span id="user-name"></span>
    <button id="logout-button" class="auth-button">Logout</button>
  </div>
</div>

<script>
  import { initAuth0, login, logout, getUser, isAuthenticated } from '@lib/auth0';
  
  async function updateAuthUI() {
    const loginButton = document.getElementById('login-button');
    const userProfile = document.getElementById('user-profile');
    const userAvatar = document.getElementById('user-avatar');
    const userName = document.getElementById('user-name');
    const logoutButton = document.getElementById('logout-button');
    
    const authenticated = await isAuthenticated();
    
    if (authenticated) {
      const user = await getUser();
      loginButton.style.display = 'none';
      userProfile.style.display = 'flex';
      userAvatar.src = user.picture;
      userName.textContent = user.name;
    } else {
      loginButton.style.display = 'block';
      userProfile.style.display = 'none';
    }
  }
  
  document.addEventListener('DOMContentLoaded', async () => {
    await initAuth0();
    await updateAuthUI();
    
    document.getElementById('login-button')?.addEventListener('click', login);
    document.getElementById('logout-button')?.addEventListener('click', logout);
  });
</script>

<style>
  .auth-component {
    display: flex;
    align-items: center;
  }
  
  .auth-button {
    background: var(--theme-primary);
    color: var(--theme-on-primary);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: var(--theme-button-border-radius);
    cursor: pointer;
    transition: var(--theme-transition);
  }
  
  .auth-button:hover {
    background: var(--theme-primary-hover);
  }
  
  .user-profile {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
</style>
```

## 🔍 SEO & Search Integration

### Google Search Console Setup

#### Sitemap Configuration
```javascript
// astro.config.mjs
export default defineConfig({
  site: 'https://yourdomain.com',
  integrations: [
    sitemap({
      customPages: [
        'https://yourdomain.com/special-page',
      ],
      filter: (page) => !page.includes('/admin/'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    })
  ]
});
```

#### Structured Data Component
```astro
---
// src/components/seo/StructuredData.astro
export interface Props {
  type: 'Organization' | 'BlogPosting' | 'Product' | 'LocalBusiness';
  data: any;
}

const { type, data } = Astro.props;

const generateStructuredData = (type: string, data: any) => {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  };
  
  return JSON.stringify(baseSchema);
};
---

<script type="application/ld+json" set:html={generateStructuredData(type, data)}></script>
```

#### Usage Example
```astro
---
// src/pages/blog/[slug].astro
import StructuredData from '@components/seo/StructuredData.astro';

const blogPostSchema = {
  headline: post.title,
  image: post.featuredImage?.url,
  datePublished: post.publishDate,
  dateModified: post.updatedAt,
  author: {
    '@type': 'Person',
    name: post.author.name
  },
  publisher: {
    '@type': 'Organization',
    name: 'Your Organization',
    logo: {
      '@type': 'ImageObject',
      url: 'https://yourdomain.com/logo.png'
    }
  }
};
---

<Layout>
  <StructuredData type="BlogPosting" data={blogPostSchema} />
  <!-- blog content -->
</Layout>
```

## 📱 Social Media Integration

### Social Sharing Component

```astro
---
// src/components/social/SocialShare.astro
export interface Props {
  url: string;
  title: string;
  description?: string;
  hashtags?: string[];
}

const { url, title, description = '', hashtags = [] } = Astro.props;

const encodedUrl = encodeURIComponent(url);
const encodedTitle = encodeURIComponent(title);
const encodedDescription = encodeURIComponent(description);
const encodedHashtags = hashtags.map(tag => encodeURIComponent(tag)).join(',');

const shareLinks = {
  twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${encodedHashtags}`,
  facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`
};
---

<div class="social-share">
  <h4>Share this:</h4>
  <div class="share-buttons">
    <a href={shareLinks.twitter} target="_blank" rel="noopener" class="share-button twitter">
      <Icon name="mdi:twitter" />
      Twitter
    </a>
    
    <a href={shareLinks.facebook} target="_blank" rel="noopener" class="share-button facebook">
      <Icon name="mdi:facebook" />
      Facebook
    </a>
    
    <a href={shareLinks.linkedin} target="_blank" rel="noopener" class="share-button linkedin">
      <Icon name="mdi:linkedin" />
      LinkedIn
    </a>
    
    <a href={shareLinks.email} class="share-button email">
      <Icon name="mdi:email" />
      Email
    </a>
    
    <button id="copy-link" class="share-button copy">
      <Icon name="mdi:link" />
      Copy Link
    </button>
  </div>
</div>

<script define:vars={{ url }}>
  document.getElementById('copy-link')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(url);
      const button = document.getElementById('copy-link');
      const originalText = button.innerHTML;
      button.innerHTML = '<span>Copied!</span>';
      setTimeout(() => {
        button.innerHTML = originalText;
      }, 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  });
</script>

<style>
  .social-share {
    margin: 2rem 0;
    padding: 1.5rem;
    background: var(--theme-surface-1);
    border-radius: var(--theme-shape-radius);
  }
  
  .share-buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-top: 1rem;
  }
  
  .share-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: var(--theme-button-border-radius);
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: var(--theme-transition);
    font-size: 0.9rem;
  }
  
  .share-button.twitter { background: #1da1f2; color: white; }
  .share-button.facebook { background: #4267b2; color: white; }
  .share-button.linkedin { background: #0077b5; color: white; }
  .share-button.email { background: var(--theme-surface-2); color: var(--theme-on-surface-2); }
  .share-button.copy { background: var(--theme-primary); color: var(--theme-on-primary); }
  
  .share-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
</style>
```

## 🎯 Marketing Tools Integration

### Hotjar Analytics
```astro
---
// src/components/analytics/Hotjar.astro
export interface Props {
  siteId: string;
}

const { siteId } = Astro.props;
const isProduction = import.meta.env.PROD;
---

{isProduction && siteId && (
  <script define:vars={{ siteId }}>
    (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid: siteId, hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  </script>
)}
```

This integration cookbook provides practical, production-ready examples for the most common business integrations needed when deploying the Astro Odyssey Theme. Each recipe includes complete implementation details and can be adapted to specific business requirements.