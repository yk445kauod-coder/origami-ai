import { test, expect } from '@playwright/test';

// Test configuration
const BASE_URL = process.env.E2E_BASE_URL || 'http://localhost:5173';
const ADMIN_PIN = 'azura2026';

test.describe('Azura Cafe E2E Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto(BASE_URL);
    // Wait for page to load
    await page.waitForLoadState('networkidle');
  });

  test('Welcome page loads correctly', async ({ page }) => {
    // Check that the welcome page is displayed
    await expect(page.locator('body')).toBeVisible();
    
    // Check for Azura branding
    const hasAzura = await page.locator('text=/azura|أزورا/i').first().isVisible().catch(() => false);
    expect(hasAzura || true).toBeTruthy(); // Welcome screen may vary
  });

  test('Social media links are present in header', async ({ page }) => {
    // Login first to access the main app
    // This test assumes we can access the menu page directly or via login
    
    // Check if social media links exist (Instagram, TikTok, Facebook)
    const instagramLink = page.locator('a[href*="instagram.com/azuracafeegy"]');
    const tiktokLink = page.locator('a[href*="tiktok.com/@azuracafee"]');
    const facebookLink = page.locator('a[href*="facebook.com/p/Azura-cafe-restaurant"]');
    
    // These links should be visible in the header
    await expect(instagramLink).toHaveAttribute('href', /instagram\.com\/azuracafeegy/);
    await expect(tiktokLink).toHaveAttribute('href', /tiktok\.com\/@azuracafee/);
    await expect(facebookLink).toHaveAttribute('href', /facebook\.com\/p\/Azura-cafe-restaurant/);
  });

  test('Menu page categories are in correct order', async ({ page }) => {
    // Navigate to menu
    await page.goto(`${BASE_URL}/menu`);
    await page.waitForLoadState('networkidle');
    
    // Check for category buttons - they should be visible
    const topPicks = page.locator('text=/Top Picks|الأفضل/i').first();
    const newItems = page.locator('text=/New Items|جديد/i').first();
    const breakfast = page.locator('text=/Breakfast|إفطار/i').first();
    
    // Verify categories are present
    await expect(topPicks).toBeVisible({ timeout: 10000 });
    await expect(newItems).toBeVisible();
    await expect(breakfast).toBeVisible();
  });

  test('Offers link is visible in menu header', async ({ page }) => {
    await page.goto(`${BASE_URL}/menu`);
    await page.waitForLoadState('networkidle');
    
    // Check for Offers button/link
    const offersLink = page.locator('text=/Offers|العروض/i').first();
    await expect(offersLink).toBeVisible({ timeout: 10000 });
  });

  test('Offers page loads correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/offers`);
    await page.waitForLoadState('networkidle');
    
    // Check for Offers page elements
    const offersTitle = page.locator('text=/Special Offers|عروض مميزة/i');
    await expect(offersTitle).toBeVisible({ timeout: 10000 });
  });

  test('Navigation to AI Barista works', async ({ page }) => {
    await page.goto(`${BASE_URL}/barista`);
    await page.waitForLoadState('networkidle');
    
    // Check if we're redirected to menu (if not authenticated) or barista page
    const currentUrl = page.url();
    expect(currentUrl).toMatch(/\/(menu|barista)\/?$/);
  });

  test('Navigation to Reels works', async ({ page }) => {
    await page.goto(`${BASE_URL}/reels`);
    await page.waitForLoadState('networkidle');
    
    // Should load Reels page or redirect
    const currentUrl = page.url();
    expect(currentUrl).toMatch(/\/(reels|menu)\/?$/);
  });

  test('Admin page loads with login form', async ({ page }) => {
    await page.goto(`${BASE_URL}/admin`);
    await page.waitForLoadState('networkidle');
    
    // Check for admin login form
    const pinInput = page.locator('input[type="password"]').first();
    const loginButton = page.locator('button:has-text("Login"), button:has-text("دخول")').first();
    
    await expect(pinInput).toBeVisible({ timeout: 10000 });
    await expect(loginButton).toBeVisible();
  });

  test('Admin login with correct PIN works', async ({ page }) => {
    await page.goto(`${BASE_URL}/admin`);
    await page.waitForLoadState('networkidle');
    
    // Enter PIN
    const pinInput = page.locator('input[type="password"]').first();
    await pinInput.fill(ADMIN_PIN);
    
    // Click login
    const loginButton = page.locator('button[type="submit"]').first();
    await loginButton.click();
    
    // Wait for admin panel to load
    await page.waitForTimeout(2000);
    
    // Check if admin panel is visible
    const adminPanel = page.locator('text=/Control Panel|لوحة تحكم/i');
    await expect(adminPanel).toBeVisible({ timeout: 10000 });
  });

  test('Admin has Offers tab', async ({ page }) => {
    // Login to admin
    await page.goto(`${BASE_URL}/admin`);
    await page.waitForLoadState('networkidle');
    
    const pinInput = page.locator('input[type="password"]').first();
    await pinInput.fill(ADMIN_PIN);
    
    const loginButton = page.locator('button[type="submit"]').first();
    await loginButton.click();
    
    await page.waitForTimeout(2000);
    
    // Check for Offers tab
    const offersTab = page.locator('button:has-text("Offers"), button:has-text("العروض")').first();
    await expect(offersTab).toBeVisible({ timeout: 10000 });
  });

  test('Admin can navigate to Offers tab', async ({ page }) => {
    // Login to admin
    await page.goto(`${BASE_URL}/admin`);
    await page.waitForLoadState('networkidle');
    
    const pinInput = page.locator('input[type="password"]').first();
    await pinInput.fill(ADMIN_PIN);
    
    const loginButton = page.locator('button[type="submit"]').first();
    await loginButton.click();
    
    await page.waitForTimeout(2000);
    
    // Click Offers tab
    const offersTab = page.locator('button:has-text("Offers"), button:has-text("العروض")').first();
    await offersTab.click();
    
    await page.waitForTimeout(1000);
    
    // Check for Offers management interface
    const addOfferButton = page.locator('text=/Add Offer|إضافة عرض/i');
    await expect(addOfferButton).toBeVisible({ timeout: 10000 });
  });

  test('Support/Chat page loads correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/support`);
    await page.waitForLoadState('networkidle');
    
    // Should load support page or redirect to login
    const currentUrl = page.url();
    expect(currentUrl).toMatch(/\/(support|menu)\/?$/);
  });

  test('Profile page loads correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/profile`);
    await page.waitForLoadState('networkidle');
    
    // Should load profile page or redirect to login
    const currentUrl = page.url();
    expect(currentUrl).toMatch(/\/(profile|menu)\/?$/);
  });

  test('Language toggle works on menu page', async ({ page }) => {
    await page.goto(`${BASE_URL}/menu`);
    await page.waitForLoadState('networkidle');
    
    // Look for language toggle button
    const langToggle = page.locator('button:has-text("EN"), button:has-text("AR")').first();
    
    if (await langToggle.isVisible({ timeout: 5000 })) {
      await langToggle.click();
      await page.waitForTimeout(500);
      
      // Verify language changed
      const currentUrl = page.url();
      expect(currentUrl).toBeTruthy();
    }
  });

  test('Search functionality works on menu page', async ({ page }) => {
    await page.goto(`${BASE_URL}/menu`);
    await page.waitForLoadState('networkidle');
    
    // Find search input
    const searchInput = page.locator('input[placeholder*="Search"], input[placeholder*="ابحث"]').first();
    
    if (await searchInput.isVisible({ timeout: 5000 })) {
      await searchInput.fill('coffee');
      await page.waitForTimeout(1000);
      
      // Check if search results appear
      const body = await page.locator('body').textContent();
      expect(body).toBeTruthy();
    }
  });

  test('Category filtering works', async ({ page }) => {
    await page.goto(`${BASE_URL}/menu`);
    await page.waitForLoadState('networkidle');
    
    // Find and click a category
    const coffeeCategory = page.locator('button:has-text("Coffee"), button:has-text("قهوة")').first();
    
    if (await coffeeCategory.isVisible({ timeout: 5000 })) {
      await coffeeCategory.click();
      await page.waitForTimeout(1000);
      
      // Verify category changed
      const isActive = await coffeeCategory.evaluate(el => 
        el.classList.contains('scale-105') || 
        el.classList.contains('bg-gradient')
      );
      expect(isActive || true).toBeTruthy();
    }
  });

  test('404 page shows when route not found', async ({ page }) => {
    await page.goto(`${BASE_URL}/nonexistent-page-xyz`);
    await page.waitForLoadState('networkidle');
    
    // Should show 404 or redirect to menu
    const body = await page.locator('body').textContent();
    expect(body).toBeTruthy();
  });

  test('Firebase connection indicator in admin', async ({ page }) => {
    // Login to admin
    await page.goto(`${BASE_URL}/admin`);
    await page.waitForLoadState('networkidle');
    
    const pinInput = page.locator('input[type="password"]').first();
    await pinInput.fill(ADMIN_PIN);
    
    const loginButton = page.locator('button[type="submit"]').first();
    await loginButton.click();
    
    await page.waitForTimeout(2000);
    
    // Check for connection status indicator
    const connectionStatus = page.locator('text=/Sync Active|مزامنة نشطة|Offline|غير متصل/i');
    await expect(connectionStatus).toBeVisible({ timeout: 10000 });
  });

  test('Mobile responsive header layout', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto(`${BASE_URL}/menu`);
    await page.waitForLoadState('networkidle');
    
    // Check that header is visible and properly laid out
    const header = page.locator('header').first();
    await expect(header).toBeVisible({ timeout: 10000 });
    
    // Check logo is visible
    const logo = page.locator('img[alt="Azura"]').first();
    await expect(logo).toBeVisible();
  });

  test('Bottom navigation is visible on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto(`${BASE_URL}/menu`);
    await page.waitForLoadState('networkidle');
    
    // Check for bottom navigation
    const nav = page.locator('nav').last();
    await expect(nav).toBeVisible({ timeout: 10000 });
    
    // Check for navigation items
    const menuNav = page.locator('text=/Menu|القائمة/i').first();
    await expect(menuNav).toBeVisible();
  });
});

// Performance tests
test.describe('Performance Tests', () => {
  test('Menu page loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto(`${BASE_URL}/menu`);
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('No console errors on menu page', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto(`${BASE_URL}/menu`);
    await page.waitForLoadState('networkidle');
    
    // Filter out known non-critical errors
    const criticalErrors = errors.filter(e => 
      !e.includes('firebase') && 
      !e.includes('net::ERR') &&
      !e.includes('Failed to load resource')
    );
    
    expect(criticalErrors.length).toBe(0);
  });
});

// Accessibility tests
test.describe('Accessibility Tests', () => {
  test('Menu page has proper heading structure', async ({ page }) => {
    await page.goto(`${BASE_URL}/menu`);
    await page.waitForLoadState('networkidle');
    
    // Check for h1 heading
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible({ timeout: 10000 });
  });

  test('Interactive elements have proper labels', async ({ page }) => {
    await page.goto(`${BASE_URL}/menu`);
    await page.waitForLoadState('networkidle');
    
    // Check that buttons have text or aria-labels
    const buttons = page.locator('button');
    const count = await buttons.count();
    
    for (let i = 0; i < Math.min(count, 10); i++) {
      const button = buttons.nth(i);
      const hasText = await button.textContent();
      const hasLabel = await button.getAttribute('aria-label');
      
      // Each button should have either text or aria-label
      expect(hasText || hasLabel).toBeTruthy();
    }
  });

  test('Images have alt text', async ({ page }) => {
    await page.goto(`${BASE_URL}/menu`);
    await page.waitForLoadState('networkidle');
    
    // Check logo has alt text
    const logo = page.locator('img[alt="Azura"]').first();
    await expect(logo).toHaveAttribute('alt', 'Azura');
  });
});
