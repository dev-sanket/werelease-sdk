(function (exports, dateFns, axios) {
  'use strict';

  // Core constants for WeRelease SDK
  // API Configuration
  const WERELEASE_BASE_URL = process.env.NODE_ENV === 'production' ? 'https://werelease.app' : 'http://localhost:3000';
  const API_BASE_URL = process.env.NODE_ENV === 'production' ? `${WERELEASE_BASE_URL}/api/sdk` : `${WERELEASE_BASE_URL}/api/sdk`;
  // Storage Configuration
  const STORAGE_KEYS = {
      ANONYMOUS_ID: 'wrls.anonymous_id',
      BANNER_DISMISSED: 'wrls.banner_dismissed',
      FEEDBACK_SUBMITTED: 'wrls.feedback_submitted'
  };
  // Default Configuration
  const DEFAULT_OPTIONS = {
      showDismissButton: true,
      makeBannerClickable: true,
      dismissFeedbackModal: true,
      feedbackType: 'both',
      styles: {},
      className: '',
      onBannerClick: undefined
  };
  const DEFAULT_CHANGELOG_DATA = {
      id: 1,
      title: 'Test',
      subtitle: 'Test',
      version: '1.0.0',
      tags: 'Test',
      description: 'Test',
      releaseDate: '2025-01-01',
      metaData: {
          test: 'test'
      }
  };

  // API Service for WeRelease SDK
  class APIService {
      /*
     * Fetch Project Data with current settings and subscription status
     */ async init(projectId, anonymousId) {
          try {
              const response = await this.axiosInstance.post(`/projects/${projectId}/init`, {
                  anonymousId
              });
              if (response.status !== 200) {
                  console.warn('[WeRelease] Failed to init');
              }
              return response.data;
          } catch (error) {
              console.error('[WeRelease] Failed to init:', error);
              return null;
          }
      }
      async fetchProjectDetails(projectId) {
          if (!projectId) {
              console.warn('[WeRelease] No project ID provided');
              return null;
          }
          try {
              const response = await this.axiosInstance.get(`/projects/${projectId}`);
              if (response.status !== 200) {
                  console.warn('[WeRelease] No published changelog found');
                  return null;
              }
              return response.data;
          } catch (error) {
              console.error('[WeRelease] Failed to fetch project:', error);
              return null;
          }
      }
      /**
     * Fetch the latest published changelog for a project
     */ async fetchLatest(projectId) {
          if (!projectId) {
              console.warn('[WeRelease] No project ID provided');
              return null;
          }
          try {
              const response = await this.axiosInstance.get(`/projects/${projectId}/changelog?latest=true`);
              if (response.status !== 200) {
                  console.warn('[WeRelease] No published changelog found');
                  return null;
              }
              return response.data;
          } catch (error) {
              console.error('[WeRelease] Failed to fetch changelog:', error);
              return null;
          }
      }
      /**
     * Identify a user (map anonymous ID to user ID)
     */ async identifyUser(projectId, anonymousId, user) {
          try {
              const response = await this.axiosInstance.post(`/projects/${projectId}/users/identify`, {
                  user,
                  projectId,
                  anonymousId
              });
              if (response.status !== 200) {
                  console.warn('[WeRelease] Failed to identify user');
              }
          } catch (error) {
              console.error('[WeRelease] Error identifying user:', error);
          }
      }
      /**
     * Submit user feedback
     */ async submitFeedback(data) {
          try {
              const response = await this.axiosInstance.post(`/projects/${data.projectId}/feedback`, {
                  ...data,
                  meta: {
                      ...data.meta,
                      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                      device: this.getDeviceInfo(),
                      browser: this.getBrowserInfo(),
                      os: this.getOSInfo(),
                      pageUrl: window.location.href,
                      referrer: document.referrer,
                      screenSize: `${window.innerWidth}x${window.innerHeight}`,
                      userAgent: navigator.userAgent
                  }
              });
              if (response.status !== 200) {
                  console.warn('[WeRelease] Failed to submit feedback');
              }
          } catch (error) {
              console.error('[WeRelease] Error submitting feedback:', error);
          }
      }
      // /**
      //  * Track banner impression
      //  */
      // async trackImpression(data: {
      //   projectId: string;
      //   anonymousId?: string;
      // }): Promise<void> {
      //   try {
      //     const response = await this.axiosInstance.post('/impression', {
      //       ...data,
      //       timestamp: Date.now(),
      //     });
      //     if (response.status !== 200) {
      //       console.warn('[WeRelease] Failed to track impression');
      //     }
      //   } catch (error) {
      //     console.error('[WeRelease] Error tracking impression:', error);
      //   }
      // }
      /**
     * Extract device information from user agent
     */ getDeviceInfo() {
          const userAgent = navigator.userAgent;
          if (/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
              if (/iPad/i.test(userAgent)) return 'Tablet';
              return 'Mobile';
          }
          return 'Desktop';
      }
      /**
     * Extract browser information from user agent
     */ getBrowserInfo() {
          const userAgent = navigator.userAgent;
          if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) return 'Chrome';
          if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
          if (userAgent.includes('Firefox')) return 'Firefox';
          if (userAgent.includes('Edg')) return 'Edge';
          if (userAgent.includes('Opera') || userAgent.includes('OPR')) return 'Opera';
          return 'Unknown';
      }
      /**
     * Extract operating system information from user agent
     */ getOSInfo() {
          const userAgent = navigator.userAgent;
          if (userAgent.includes('Windows')) return 'Windows';
          if (userAgent.includes('Mac OS')) return 'macOS';
          if (userAgent.includes('Linux')) return 'Linux';
          if (userAgent.includes('Android')) return 'Android';
          if (userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
          return 'Unknown';
      }
      constructor(){
          this.axiosInstance = axios.create({
              baseURL: API_BASE_URL,
              timeout: 10000,
              headers: {
                  'Content-Type': 'application/json'
              }
          });
      }
  }

  // Storage Service for WeRelease SDK
  class LocalStorageService {
      /**
     * Get or create anonymous user ID
     */ getAnonymousId() {
          try {
              return localStorage.getItem(STORAGE_KEYS.ANONYMOUS_ID);
          } catch (error) {
              console.warn('[WeRelease] Failed to access localStorage:', error);
              return null;
          }
      }
      /**
     * Set anonymous user ID
     */ setAnonymousId(id) {
          try {
              localStorage.setItem(STORAGE_KEYS.ANONYMOUS_ID, id);
          } catch (error) {
              console.warn('[WeRelease] Failed to set anonymous ID:', error);
          }
      }
      /**
     * Check if banner has been dismissed
     */ isBannerDismissed() {
          try {
              return localStorage.getItem(STORAGE_KEYS.BANNER_DISMISSED) !== null;
          } catch (error) {
              console.warn('[WeRelease] Failed to check banner dismissed state:', error);
              return false;
          }
      }
      /**
     * Mark banner as dismissed
     */ setBannerDismissed() {
          try {
              localStorage.setItem(STORAGE_KEYS.BANNER_DISMISSED, Date.now().toString());
          } catch (error) {
              console.warn('[WeRelease] Failed to set banner dismissed:', error);
          }
      }
      /**
     * Get item from localStorage
     */ getItem(key) {
          try {
              return localStorage.getItem(key);
          } catch (error) {
              console.warn('[WeRelease] Failed to get item from storage:', error);
              return null;
          }
      }
      /**
     * Set item in localStorage
     */ setItem(key, value) {
          try {
              localStorage.setItem(key, value);
          } catch (error) {
              console.warn('[WeRelease] Failed to set item in storage:', error);
          }
      }
      /**
     * Clear banner dismissed state
     */ removeItem(key) {
          localStorage.removeItem(key);
      }
      /**
     * Clear all WeRelease storage
     */ clear() {
          try {
              Object.values(STORAGE_KEYS).forEach((key)=>{
                  localStorage.removeItem(key);
              });
          } catch (error) {
              console.warn('[WeRelease] Failed to clear storage:', error);
          }
      }
  }
  /**
   * Generate a random anonymous ID
   */ function generateAnonymousId() {
      return 'anon_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }
  /**
   * Get or create anonymous ID with fallback
   */ function getOrCreateAnonymousId() {
      const storage = new LocalStorageService();
      let anonymousId = storage.getAnonymousId();
      if (!anonymousId) {
          anonymousId = generateAnonymousId();
          storage.setAnonymousId(anonymousId);
      }
      return anonymousId;
  }

  const renderBasicBannerTemplate = (redirectUrl)=>{
      return `<span class="werelease-banner-text">🎉 <strong>New features just dropped!</strong> See what's new and give us your feedback</span> <a href='${redirectUrl}' target='_blank' style='color: #0066cc; text-decoration: underline;'>🚀 Explore Now</a>`;
  };
  const applyBasicBannerStyles = (banner)=>{
      banner.style.padding = '12px 16px';
      banner.style.margin = '0';
      banner.style.border = '1px solid #ddd';
      banner.style.backgroundColor = '#f9f9f9';
      banner.style.color = '#333';
      banner.style.fontSize = '14px';
      banner.style.fontFamily = 'Arial, sans-serif';
      banner.style.lineHeight = '1.4';
      // Add responsive layout without changing styling
      const style = document.createElement('style');
      style.textContent = `
    @media (max-width: 640px) {
      #werelease-banner {
        display: flex !important;
        flex-direction: column !important;
        gap: 8px !important;
      }
      
      #werelease-banner .werelease-banner-text {
        display: block !important;
      }
      
      #werelease-banner a {
        display: block !important;
        align-self: flex-start !important;
      }
    }
  `;
      // Add the styles to the document head
      if (!document.querySelector('#werelease-basic-banner-styles')) {
          style.id = 'werelease-basic-banner-styles';
          document.head.appendChild(style);
      }
  };

  const renderPremiumBannerTemplate = (config)=>{
      const { showDismissButton = true, makeBannerClickable = true, releaseTime = '', changelog = {} } = config;
      const { title = 'New Release Available', subtitle = '', version = '', tags = '' } = changelog;
      return `
    <div style="position: relative;">
      <div class="werelease-banner-content" style="display: flex; align-items: flex-start; gap: 16px; cursor: pointer; padding: 20px;" ${makeBannerClickable ? 'data-clickable="true"' : ''}>
        
        <!-- Icon and NEW badge -->
        <div style="
          width: 48px; 
          height: 48px; 
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          flex-shrink: 0;
          position: relative;
        ">
          🚀
          ${releaseTime ? `
            <span style="
              position: absolute;
              top: -6px;
              right: -6px;
              background: #ef4444;
              color: white;
              font-size: 10px;
              font-weight: 700;
              padding: 3px 6px;
              border-radius: 10px;
              line-height: 1;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            ">NEW</span>
          ` : ''}
        </div>
        
        <!-- Main content area -->
        <div style="flex: 1; min-width: 0;">
          <!-- 1st row: Title with version number -->
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
            <span style="font-weight: 700; color: inherit; font-size: 16px;">${title}</span>
            ${version ? `<span style="font-size: 11px; color:#a7a7a7; background: #83899245; padding: 3px 8px; border-radius: 12px; font-weight: 600;">${version}</span>` : ''}
          </div>
          
          <!-- 2nd row: Subtitle -->
          ${subtitle ? `
            <div style="margin-bottom: 8px;">
              <span style="font-size: 13px; color: #6b7280; opacity: 0.8;">${subtitle}</span>
            </div>
          ` : ''}
          
          <!-- 3rd row: Release date as "3 days ago" and tags -->
          ${releaseTime ? `
            <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 8px; flex-direction: row; flex-wrap: wrap;">
              <span style="
                font-size: 12px;
                color: #9ca3af;
                background: rgba(156, 163, 175, 0.1);
                padding: 4px 8px;
                border-radius: 12px;
                font-weight: 500;
              ">${releaseTime}</span>
              ${tags ? tags.split(',').map((tag)=>`
                    <span style="font-size: 11px; color: #6b7280; background: rgba(107, 114, 128, 0.1); padding: 3px 8px; border-radius: 12px;">${tag.trim()}</span>
                  `).join('') : ''}
            </div>
          ` : ''}
        </div>
        
        <!-- Action buttons -->
        <div style="display: flex; flex-direction: row; gap: 8px; flex-shrink: 0; align-items: center;">
          <a href="#" class="werelease-view-changes" style="
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.2s ease;
            border: none;
            cursor: pointer;
            white-space: nowrap;
            text-align: center;
            display: block;
            box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
          " onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(102, 126, 234, 0.4)';" 
             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(102, 126, 234, 0.3)';">
            View Changes
          </a>
          ${showDismissButton ? `
            <button class="werelease-dismiss-banner" style="
              background: rgba(107, 114, 128, 0.1);
              color: #6b7280;
              text-decoration: none;
              padding: 8px 16px;
              border: 1px solid rgba(107, 114, 128, 0.2);
              border-radius: 20px;
              font-size: 13px;
              font-weight: 500;
              cursor: pointer;
              white-space: nowrap;
              text-align: center;
              transition: all 0.2s ease;
            " onmouseover="this.style.background='rgba(107, 114, 128, 0.2)'" 
               onmouseout="this.style.background='rgba(107, 114, 128, 0.1)'">
              Remind Later
            </button>
          ` : ''}
        </div>
      </div>
    </div>
  `;
  };
  const applyPremiumBannerStyles = (banner)=>{
      // Premium container styles
      banner.style.padding = '20px';
      banner.style.margin = '16px 0';
      banner.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)';
      banner.style.border = '1px solid rgba(102, 126, 234, 0.1)';
      banner.style.borderRadius = '16px';
      banner.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
      banner.style.color = '#1a202c';
      banner.style.fontSize = '14px';
      banner.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
      banner.style.lineHeight = '1.5';
      banner.style.transition = 'all 0.3s ease';
      banner.style.position = 'relative';
      banner.style.overflow = 'hidden';
      // Add subtle animation
      banner.style.animation = 'weReleaseSlideIn 0.4s ease-out';
      // Add class for dark mode support and interactions
      banner.className = (banner.className || '') + ' werelease-banner-premium';
  };
  const addPremiumBannerCSS = ()=>{
      // Add CSS keyframes for animation and hover effects
      if (!document.getElementById('weRelease-styles')) {
          const style = document.createElement('style');
          style.id = 'weRelease-styles';
          style.textContent = `
      @keyframes weReleaseSlideIn {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .werelease-banner-premium:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 25px rgba(0, 0, 0, 0.12) !important;
      }
      
      /* Fix icon positioning and alignment */
      .werelease-banner-content {
        display: flex !important;
        align-items: flex-start !important;
        gap: 16px !important;
      }
      
      .werelease-banner-content > div:first-child {
        flex-shrink: 0 !important;
        position: relative !important;
      }
      
      .werelease-banner-content > div:nth-child(2) {
        flex: 1 !important;
        min-width: 0 !important;
      }
      
      /* Desktop: Buttons stacked vertically (column-wise) */
      .werelease-banner-content > div:last-child {
        flex-shrink: 0 !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 8px !important;
        align-items: stretch !important;
      }
      
      /* Mobile responsive styles */
      @media (max-width: 768px) {
        .werelease-banner-content {
          flex-direction: column !important;
          gap: 12px !important;
          padding: 16px !important;
        }
        
        .werelease-banner-content > div:first-child {
          align-self: flex-start !important;
        }
        
        .werelease-banner-content > div:nth-child(2) {
          margin-bottom: 8px !important;
        }
        
        /* Mobile: Buttons side by side (row-wise) */
        .werelease-banner-content > div:last-child {
          width: 100% !important;
          flex-direction: row !important;
          justify-content: flex-start !important;
        }
      }
      
      /* Small mobile styles */
      @media (max-width: 480px) {
        .werelease-banner-content {
          padding: 12px !important;
        }
        
        .werelease-banner-content > div:last-child {
          flex-direction: row !important;
          gap: 8px !important;
          width: 100% !important;
        }
        
        .werelease-banner-content > div:last-child > * {
          flex: 1 !important;
        }
      }
      
      @media (prefers-color-scheme: dark) {
        .werelease-banner-premium {
          background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%) !important;
          border-color: rgba(102, 126, 234, 0.2) !important;
          color: #e2e8f0 !important;
        }
      }
    `;
          document.head.appendChild(style);
      }
  };

  // Date Utilities for WeRelease SDK
  /**
   * Format a date for display in the banner
   */ function formatReleaseDate(dateString) {
      if (!dateString) {
          return '';
      }
      try {
          const date = new Date(dateString);
          if (!dateFns.isValid(date)) {
              return '';
          }
          const daysSince = dateFns.differenceInDays(new Date(), date);
          if (daysSince === 0) {
              return 'Today';
          } else if (daysSince === 1) {
              return 'Yesterday';
          } else if (daysSince < 7) {
              return `${daysSince} days ago`;
          } else if (daysSince < 30) {
              const weeks = Math.floor(daysSince / 7);
              return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
          } else {
              return dateFns.format(date, 'MMM d');
          }
      } catch (error) {
          console.warn('[WeRelease] Failed to format release date:', error);
          return '';
      }
  }

  // DOM Utilities for WeRelease SDK
  /**
   * Append element to target
   */ function appendToTarget(element, target) {
      const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
      if (targetElement) {
          targetElement.appendChild(element);
      } else {
          console.warn('[WeRelease] Target element not found:', target);
      }
  }
  /**
   * Remove element from DOM
   */ function removeElement(element) {
      if (element.parentNode) {
          element.parentNode.removeChild(element);
      }
  }
  /**
   * Add CSS class to element
   */ function addClass(element, className) {
      element.classList.add(className);
  }
  /**
   * Remove CSS class from element
   */ function removeClass(element, className) {
      element.classList.remove(className);
  }
  /**
   * Get viewport dimensions
   */ function getViewportDimensions() {
      return {
          width: window.innerWidth,
          height: window.innerHeight
      };
  }

  // Banner Manager for WeRelease SDK
  class BannerManager {
      /**
     * Render banner based on configuration
     */ render(config) {
          // Remove existing banner if any
          if (this.currentBanner) {
              this.destroy(this.currentBanner);
          }
          const banner = document.createElement('div');
          banner.id = 'werelease-banner';
          if (config.theme === 'premium') {
              this.renderPremiumBanner(banner, config);
          } else {
              this.renderBasicBanner(banner, config);
          }
          // Append to target
          appendToTarget(banner, config.target);
          this.currentBanner = banner;
          return banner;
      }
      /**
     * Update banner with new data
     */ update(element, data) {
          // Update banner content with new changelog data
          const config = this.getBannerConfig(element);
          if (config) {
              config.changelogData = data;
              this.render(config);
          }
      }
      /**
     * Destroy banner and clean up
     */ destroy(element) {
          if (element && element.parentNode) {
              removeElement(element);
              this.currentBanner = null;
          }
      }
      /**
     * Render basic banner
     */ renderBasicBanner(banner, config) {
          const redirectUrl = `${WERELEASE_BASE_URL}/changelog/${config.projectId}`;
          const template = renderBasicBannerTemplate(redirectUrl);
          banner.innerHTML = template;
          applyBasicBannerStyles(banner);
          if (config.options.className) {
              addClass(banner, config.options.className);
          }
      // Basic banner doesn't need event listeners - it just redirects
      // this.attachEventListeners(banner, config);
      }
      /**
     * Render premium banner
     */ renderPremiumBanner(banner, config) {
          const template = renderPremiumBannerTemplate({
              showDismissButton: config.options.showDismissButton,
              makeBannerClickable: config.options.makeBannerClickable,
              releaseTime: config.changelogData?.releaseDate ? formatReleaseDate(config.changelogData.releaseDate) : '',
              changelog: {
                  title: config.changelogData?.title || 'New Release Available',
                  subtitle: config.changelogData?.subtitle || '',
                  version: config.changelogData?.version || '',
                  tags: config.changelogData?.tags || ''
              }
          });
          banner.innerHTML = template;
          applyPremiumBannerStyles(banner);
          addPremiumBannerCSS();
          if (config.options.className) {
              addClass(banner, config.options.className);
          }
          this.attachEventListeners(banner, config);
      }
      attachEventListeners(banner, config) {
          // Handle banner click
          if (config.options.makeBannerClickable) {
              banner.addEventListener('click', (event)=>{
                  if (event.target === banner || banner.querySelector('.werelease-banner-content')) {
                      this.handleBannerClick(event, config);
                  }
              });
          }
          // Handle dismiss button click
          const dismissButton = banner.querySelector('.werelease-dismiss-banner');
          if (dismissButton && config.options.showDismissButton) {
              dismissButton.addEventListener('click', (event)=>{
                  event.stopPropagation();
                  this.handleDismissClick(event, config);
              });
          }
          // Handle view changes button click
          const viewChangesButton = banner.querySelector('.werelease-view-changes');
          if (viewChangesButton) {
              viewChangesButton.addEventListener('click', (event)=>{
                  event.stopPropagation();
                  this.handleViewChangesClick(event, config);
              });
          }
      }
      handleBannerClick(event, config) {
          if (config.onBannerClick) {
              config.onBannerClick(event, {
                  projectId: config.projectId,
                  releaseDate: config.changelogData?.releaseDate
              });
          }
      }
      handleDismissClick(event, config) {
          if (config.onDismiss) {
              config.onDismiss(event);
          }
      }
      handleViewChangesClick(event, config) {
          if (config.onViewChanges) {
              config.onViewChanges(event);
          }
      }
      /**
     * Handle emoji reaction
     */ handleEmojiReaction(emoji, banner) {
          // Add visual feedback
          const emojiButton = banner.querySelector(`[data-emoji="${emoji}"]`);
          if (emojiButton) {
              addClass(emojiButton, 'reacted');
              setTimeout(()=>removeClass(emojiButton, 'reacted'), 1000);
          }
          // Track reaction
          const projectId = banner.getAttribute('data-project-id');
          if (projectId) {
              // Send analytics event
              this.trackEmojiReaction(projectId, emoji);
          }
      }
      /**
     * Track emoji reaction for analytics
     */ trackEmojiReaction(_projectId, _emoji) {
      // This would integrate with your analytics service
      // Track emoji reaction
      }
      /**
     * Get banner configuration from element
     */ getBannerConfig(element) {
          const projectId = element.getAttribute('data-project-id');
          const target = element.getAttribute('data-target');
          const theme = element.getAttribute('data-theme');
          if (!projectId || !target) return null;
          return {
              projectId,
              target,
              theme: theme || 'basic',
              options: {
                  makeBannerClickable: true
              }
          };
      }
      constructor(){
          this.currentBanner = null;
      }
  }

  // Simple markdown to HTML converter for basic formatting
  const convertMarkdownToHTML = (markdown)=>{
      return markdown// Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>').replace(/^## (.*$)/gim, '<h2>$1</h2>').replace(/^# (.*$)/gim, '<h1>$1</h1>')// Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')// Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')// Code
      .replace(/`(.*?)`/g, '<code>$1</code>')// Lists
      .replace(/^- (.*$)/gim, '<li>$1</li>').replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')// Line breaks
      .replace(/\n/g, '<br/>');
  };
  // Extract key features from markdown description
  const extractFeatures = (description, tags)=>{
      const tagList = tags ? tags.split(',').map((t)=>t.trim()) : [];
      const lines = description.split('\n').filter((line)=>line.trim());
      // Try to extract bullet points or features from description
      const bulletPoints = lines.filter((line)=>line.trim().startsWith('-') || line.trim().startsWith('*') || line.trim().startsWith('•'));
      const features = [];
      // If we have bullet points, use them
      if (bulletPoints.length > 0) {
          bulletPoints.slice(0, 4).forEach((point, index)=>{
              const text = point.replace(/^[-*•]\s*/, '').trim();
              const icons = [
                  '✨',
                  '⚡',
                  '🚀',
                  '🎯',
                  '💡',
                  '🔥'
              ];
              features.push({
                  icon: icons[index] || '✨',
                  title: text.length > 30 ? text.substring(0, 30) + '...' : text,
                  detail: text.length > 30 ? text.substring(30) : 'New improvement'
              });
          });
      } else {
          // Fallback: use tags and description
          tagList.slice(0, 4).forEach((tag, index)=>{
              const icons = [
                  '✨',
                  '⚡',
                  '🚀',
                  '🎯'
              ];
              features.push({
                  icon: icons[index] || '✨',
                  title: tag.charAt(0).toUpperCase() + tag.slice(1),
                  detail: 'Enhanced functionality'
              });
          });
          // If no tags, create generic features
          if (features.length === 0) {
              features.push({
                  icon: '✨',
                  title: 'New Features',
                  detail: 'Latest improvements'
              }, {
                  icon: '⚡',
                  title: 'Performance',
                  detail: 'Faster experience'
              }, {
                  icon: '🚀',
                  title: 'Enhancements',
                  detail: 'Better usability'
              }, {
                  icon: '🎯',
                  title: 'Bug Fixes',
                  detail: 'Stability improvements'
              });
          }
      }
      return features;
  };
  const renderChangesPopoverTemplate = (changelogData)=>{
      // Use real data or fallback to defaults
      const title = changelogData?.title || "What's New";
      const subtitle = changelogData?.subtitle;
      const version = changelogData?.version || 'v1.0.0';
      const description = changelogData?.description || 'Check out our latest improvements and features.';
      const tags = changelogData?.tags || '';
      const features = extractFeatures(description, tags);
      return `
    <div class="werelease-popover-overlay werelease-modal-close">
      <div class="werelease-popover-content" onclick="event.stopPropagation()">
        <div class="werelease-popover-arrow"></div>
        
        <div class="werelease-popover-header">
          <div class="werelease-header-content">
            <span class="werelease-rocket-icon">🚀</span>
            <h3>${title}</h3>
            <span class="werelease-version-badge">${version}</span>
          </div>
          <button class="werelease-popover-close werelease-modal-close">×</button>
        </div>
        
        <div class="werelease-popover-body">
          ${subtitle ? `<div class="werelease-subtitle">${subtitle}</div>` : ''}
          
          <div class="werelease-features-grid">
            ${features.map((feature, index)=>`
              <div class="werelease-feature-card" data-feature="feature-${index}">
                <div class="werelease-feature-icon">${feature.icon}</div>
                <div class="werelease-feature-content">
                  <h4>${feature.title}</h4>
                  <p>${feature.detail}</p>
                </div>
              </div>
            `).join('')}
          </div>
          
          ${description.length > 200 ? `
            <div class="werelease-highlight-feature">
              <div class="werelease-highlight-icon">📝</div>
              <div class="werelease-highlight-content">
                <h4>Full Release Notes</h4>
                <div class="werelease-description-content">
                  ${convertMarkdownToHTML(description)}
                </div>
              </div>
            </div>
          ` : ''}
          
          <div class="werelease-action-bar">
            <button class="werelease-btn-secondary werelease-modal-close">
              Show me later
            </button>
            <button class="werelease-btn-primary werelease-submit-feedback">
              Awesome! 🎉
            </button>
            <div class="werelease-feedback-loader" style="display: none;">
              <div class="werelease-spinner"></div>
              <span>Saving your feedback...</span>
            </div>
            <div class="werelease-feedback-success" style="display: none;">
              <div class="werelease-checkmark">
                <svg class="werelease-checkmark-circle" viewBox="0 0 52 52">
                  <circle class="werelease-checkmark-circle-bg" cx="26" cy="26" r="25" fill="none"/>
                  <path class="werelease-checkmark-check" fill="none" d="m14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
              </div>
              <span>Thank you for your feedback!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  };
  const addChangesPopoverCSS = ()=>{
      // Check if CSS already added
      if (document.getElementById('werelease-popover-styles')) return;
      const style = document.createElement('style');
      style.id = 'werelease-popover-styles';
      style.textContent = `
    .werelease-popover-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: transparent;
      z-index: 10000;
      opacity: 0;
      transition: opacity 0.3s ease;
      overflow: hidden;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: 20vh;
      box-sizing: border-box;
    }
    
    .werelease-popover-content {
      position: relative;
      transform: translateY(-20px) scale(0.95);
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05);
      max-width: 420px;
      width: 90%;
      max-height: 80vh;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-sizing: border-box;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .werelease-popover-arrow {
      position: absolute;
      top: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 16px;
      height: 16px;
      background: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.05);
      border-bottom: none;
      border-right: none;
      transform: translateX(-50%) rotate(45deg);
      z-index: 1;
    }
    
    .werelease-popover-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 24px 16px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      position: relative;
    }
    
    .werelease-header-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .werelease-rocket-icon {
      font-size: 24px;
      animation: rocket-bounce 2s ease-in-out infinite;
    }
    
    @keyframes rocket-bounce {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-3px); }
    }
    
    .werelease-popover-header h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: white;
    }
    
    .werelease-version-badge {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    
    .werelease-popover-close {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      font-size: 18px;
      cursor: pointer;
      padding: 8px;
      border-radius: 8px;
      transition: all 0.2s ease;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .werelease-popover-close:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.05);
    }
    
    .werelease-popover-body {
      padding: 24px;
      max-height: 450px;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: rgba(102, 126, 234, 0.3) transparent;
    }
    
    .werelease-popover-body::-webkit-scrollbar {
      width: 6px;
    }
    
    .werelease-popover-body::-webkit-scrollbar-track {
      background: transparent;
    }
    
    .werelease-popover-body::-webkit-scrollbar-thumb {
      background: rgba(102, 126, 234, 0.3);
      border-radius: 3px;
    }
    
    .werelease-popover-body::-webkit-scrollbar-thumb:hover {
      background: rgba(102, 126, 234, 0.5);
    }
    
    .werelease-subtitle {
      font-size: 14px;
      color: #64748b;
      margin-bottom: 16px;
      font-style: italic;
      text-align: center;
      line-height: 1.4;
    }
    
    .werelease-description-content {
      font-size: 13px;
      color: #475569;
      line-height: 1.5;
      max-height: 120px;
      overflow-y: auto;
      padding: 8px 0;
    }
    
    .werelease-description-content h1,
    .werelease-description-content h2,
    .werelease-description-content h3 {
      font-size: 14px;
      font-weight: 600;
      margin: 8px 0 4px 0;
      color: #1e293b;
    }
    
    .werelease-description-content ul {
      margin: 8px 0;
      padding-left: 16px;
    }
    
    .werelease-description-content li {
      margin: 4px 0;
    }
    
    .werelease-description-content code {
      background: rgba(102, 126, 234, 0.1);
      padding: 2px 4px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 12px;
    }
    
    .werelease-features-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 24px;
    }
    
    .werelease-feature-card {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 16px;
      border-radius: 12px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
      overflow: hidden;
    }
    
    .werelease-feature-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
      border-color: #667eea;
    }
    
    .werelease-feature-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #667eea, #764ba2);
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }
    
    .werelease-feature-card:hover::before {
      transform: scaleX(1);
    }
    
    .werelease-feature-icon {
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      flex-shrink: 0;
    }
    
    .werelease-feature-content h4 {
      margin: 0 0 4px 0;
      font-size: 14px;
      font-weight: 600;
      color: #1e293b;
    }
    
    .werelease-feature-content p {
      margin: 0 0 6px 0;
      font-size: 12px;
      color: #64748b;
      line-height: 1.4;
    }
    
    .werelease-feature-stat {
      font-size: 10px;
      color: #667eea;
      font-weight: 600;
      background: rgba(102, 126, 234, 0.1);
      padding: 3px 6px;
      border-radius: 8px;
      display: inline-block;
      margin-top: 4px;
    }
    
    .werelease-highlight-feature {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 16px;
      margin: 16px 0;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
      border: 1px solid rgba(102, 126, 234, 0.2);
      border-radius: 12px;
      position: relative;
      overflow: hidden;
    }
    
    .werelease-highlight-feature::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, #667eea, #764ba2);
    }
    
    .werelease-highlight-icon {
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      flex-shrink: 0;
      animation: pulse 2s ease-in-out infinite;
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    .werelease-highlight-content h4 {
      margin: 0 0 4px 0;
      font-size: 13px;
      font-weight: 600;
      color: #1e293b;
      line-height: 1.3;
    }
    
    .werelease-highlight-content p {
      margin: 0;
      font-size: 11px;
      color: #64748b;
      line-height: 1.4;
    }
    
    .werelease-action-bar {
      display: flex;
      gap: 12px;
      position: relative;
      align-items: center;
      min-height: 48px;
    }
    
    .werelease-btn-secondary {
      background: transparent;
      color: #64748b;
      border: 1px solid #e2e8f0;
      padding: 12px 20px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      flex: 1;
    }
    
    .werelease-btn-secondary:hover {
      background: #f1f5f9;
      border-color: #cbd5e1;
    }
    
    .werelease-btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      flex: 1;
      position: relative;
      overflow: hidden;
    }
    
    .werelease-btn-primary::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s ease;
    }
    
    .werelease-btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }
    
    .werelease-btn-primary:hover::before {
      left: 100%;
    }
    
    /* Loading Animation */
    .werelease-feedback-loader {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(8px);
      padding: 12px 20px;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(102, 126, 234, 0.2);
      z-index: 10;
      opacity: 0;
      animation: fadeInLoader 0.3s ease forwards;
    }
    
    @keyframes fadeInLoader {
      to {
        opacity: 1;
      }
    }
    
    .werelease-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid #e2e8f0;
      border-top: 2px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .werelease-feedback-loader span {
      font-size: 14px;
      color: #1e293b;
      font-weight: 500;
    }
    
    /* Success Animation */
    .werelease-feedback-success {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(8px);
      padding: 12px 20px;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(34, 197, 94, 0.3);
      z-index: 10;
      opacity: 0;
      animation: slideUpSuccess 0.5s ease forwards;
    }
    
    @keyframes slideUpSuccess {
      0% {
        opacity: 0;
        transform: translate(-50%, -40%);
      }
      100% {
        opacity: 1;
        transform: translate(-50%, -50%);
      }
    }
    
    .werelease-checkmark {
      width: 24px;
      height: 24px;
    }
    
    .werelease-checkmark-circle {
      width: 24px;
      height: 24px;
    }
    
    .werelease-checkmark-circle-bg {
      stroke: #22c55e;
      stroke-width: 2;
      stroke-dasharray: 166;
      stroke-dashoffset: 166;
      animation: drawCircle 0.6s ease-in-out forwards;
    }
    
    .werelease-checkmark-check {
      stroke: #22c55e;
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: 48;
      stroke-dashoffset: 48;
      animation: drawCheck 0.4s ease-in-out 0.3s forwards;
    }
    
    @keyframes drawCircle {
      to {
        stroke-dashoffset: 0;
      }
    }
    
    @keyframes drawCheck {
      to {
        stroke-dashoffset: 0;
      }
    }
    
    .werelease-feedback-success span {
      font-size: 14px;
      color: #22c55e;
      font-weight: 600;
    }
    
    /* Button state transitions */
    .werelease-action-bar.loading .werelease-btn-primary,
    .werelease-action-bar.loading .werelease-btn-secondary {
      opacity: 0.3;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }
    
    .werelease-action-bar.success .werelease-btn-primary,
    .werelease-action-bar.success .werelease-btn-secondary {
      opacity: 0.3;
      transition: opacity 0.3s ease;
    }
    
    /* Tablet Styles */
    @media (max-width: 768px) and (min-width: 641px) {
      .werelease-popover-overlay {
        padding: 20px;
      }
      
      .werelease-popover-content {
        width: 100%;
        max-width: 500px;
        border-radius: 16px;
      }
      
      .werelease-features-grid {
        grid-template-columns: 1fr 1fr;
        gap: 14px;
      }
      
      .werelease-feature-card {
        padding: 14px;
      }
      
      .werelease-action-bar {
        gap: 16px;
      }
      
      .werelease-btn-primary,
      .werelease-btn-secondary {
        padding: 14px 24px;
        font-size: 15px;
      }
    }
    
    /* Mobile Styles */
    @media (max-width: 640px) {
      .werelease-popover-overlay {
        padding: 16px;
        align-items: flex-start !important;
        justify-content: center !important;
      }
      
      .werelease-popover-content {
        width: 100% !important;
        max-width: calc(100vw - 32px) !important;
        position: relative !important;
        left: auto !important;
        top: auto !important;
        transform: none !important;
        margin-top: 20px;
        border-radius: 16px;
        max-height: calc(100vh - 80px);
        overflow-y: auto;
      }
      
      .werelease-popover-arrow {
        display: none !important;
      }
      
      .werelease-popover-header {
        padding: 20px 20px 16px;
      }
      
      .werelease-header-content h3 {
        font-size: 18px;
      }
      
      .werelease-version-badge {
        font-size: 11px;
        padding: 4px 8px;
      }
      
      .werelease-popover-body {
        padding: 16px 20px 20px;
        max-height: none;
        overflow-y: visible;
      }
      
      .werelease-subtitle {
        font-size: 13px;
        margin-bottom: 12px;
      }
      
      .werelease-features-grid {
        grid-template-columns: 1fr;
        gap: 12px;
        margin-bottom: 20px;
      }
      
      .werelease-feature-card {
        padding: 16px;
        border-radius: 12px;
      }
      
      .werelease-feature-icon {
        width: 36px;
        height: 36px;
        font-size: 18px;
      }
      
      .werelease-feature-content h4 {
        font-size: 15px;
        margin-bottom: 4px;
      }
      
      .werelease-feature-content p {
        font-size: 13px;
        line-height: 1.4;
      }
      
      .werelease-highlight-feature {
        padding: 16px;
        margin: 16px 0;
        border-radius: 12px;
      }
      
      .werelease-highlight-icon {
        width: 32px;
        height: 32px;
        font-size: 16px;
      }
      
      .werelease-highlight-content h4 {
        font-size: 14px;
        line-height: 1.3;
      }
      
      .werelease-highlight-content p {
        font-size: 12px;
      }
      
      .werelease-description-content {
        max-height: 100px;
        font-size: 13px;
      }
      
      .werelease-action-bar {
        flex-direction: column;
        gap: 12px;
        margin-top: 20px;
      }
      
      .werelease-btn-primary,
      .werelease-btn-secondary {
        width: 100%;
        padding: 16px 20px;
        font-size: 16px;
        font-weight: 500;
        border-radius: 12px;
        justify-content: center;
      }
      
      .werelease-btn-primary {
        order: 1;
      }
      
      .werelease-btn-secondary {
        order: 2;
      }
      
      /* Mobile loading and success animations */
      .werelease-feedback-loader,
      .werelease-feedback-success {
        padding: 16px 24px;
        border-radius: 12px;
      }
      
      .werelease-feedback-loader span,
      .werelease-feedback-success span {
        font-size: 16px;
      }
      
      .werelease-spinner {
        width: 24px;
        height: 24px;
      }
      
      .werelease-checkmark {
        width: 28px;
        height: 28px;
      }
      
      .werelease-checkmark-circle {
        width: 28px;
        height: 28px;
      }
    }
    
    /* Very small screens */
    @media (max-width: 480px) {
      .werelease-popover-overlay {
        padding: 12px;
      }
      
      .werelease-popover-content {
        max-width: calc(100vw - 24px) !important;
        margin-top: 10px;
        border-radius: 14px;
      }
      
      .werelease-popover-header {
        padding: 16px 16px 12px;
      }
      
      .werelease-header-content h3 {
        font-size: 16px;
      }
      
      .werelease-popover-body {
        padding: 12px 16px 16px;
      }
      
      .werelease-feature-card {
        padding: 14px;
      }
      
      .werelease-highlight-feature {
        padding: 14px;
      }
    }
    
    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .werelease-popover-content {
        background: #1e293b;
        border-color: #334155;
      }
      
      .werelease-popover-arrow {
        background: #1e293b;
        border-color: #334155;
      }
      
      .werelease-feature-card {
        background: #334155;
        border-color: #475569;
      }
      
      .werelease-feature-card:hover {
        border-color: #667eea;
      }
      
      .werelease-feature-icon {
        background: #475569;
      }
      
      .werelease-feature-content h4 {
        color: #f1f5f9;
      }
      
      .werelease-feature-content p {
        color: #94a3b8;
      }
      
      .werelease-feature-stat {
        color: #667eea;
        background: rgba(102, 126, 234, 0.2);
      }
      
      .werelease-highlight-feature {
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
        border-color: rgba(102, 126, 234, 0.3);
      }
      
      .werelease-highlight-content h4 {
        color: #f1f5f9;
      }
      
      .werelease-highlight-content p {
        color: #94a3b8;
      }
      
      .werelease-btn-secondary {
        color: #94a3b8;
        border-color: #475569;
      }
      
      .werelease-btn-secondary:hover {
        background: #475569;
        border-color: #64748b;
      }
      
      .werelease-subtitle {
        color: #94a3b8;
      }
      
      .werelease-description-content {
        color: #cbd5e1;
      }
      
      .werelease-description-content h1,
      .werelease-description-content h2,
      .werelease-description-content h3 {
        color: #f1f5f9;
      }
      
      .werelease-description-content code {
        background: rgba(102, 126, 234, 0.2);
        color: #e2e8f0;
      }
      
      .werelease-popover-body::-webkit-scrollbar-thumb {
        background: rgba(102, 126, 234, 0.4);
      }
      
      .werelease-popover-body::-webkit-scrollbar-thumb:hover {
        background: rgba(102, 126, 234, 0.6);
      }
      
      /* Dark mode for loading and success animations */
      .werelease-feedback-loader {
        background: rgba(30, 41, 59, 0.95);
        border-color: rgba(102, 126, 234, 0.3);
      }
      
      .werelease-feedback-loader span {
        color: #f1f5f9;
      }
      
      .werelease-spinner {
        border-color: #475569;
        border-top-color: #667eea;
      }
      
      .werelease-feedback-success {
        background: rgba(30, 41, 59, 0.95);
        border-color: rgba(34, 197, 94, 0.4);
      }
      
      /* Dark mode mobile adjustments */
      @media (max-width: 640px) {
        .werelease-popover-content {
          background: #1e293b !important;
          border-color: #334155 !important;
        }
        
        .werelease-feature-card {
          background: #334155 !important;
          border-color: #475569 !important;
        }
        
        .werelease-highlight-feature {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%) !important;
          border-color: rgba(102, 126, 234, 0.3) !important;
        }
      }
    }
    
    /* Entrance Animation */
    .werelease-popover-overlay.werelease-entering {
      opacity: 1;
    }
    
    .werelease-popover-overlay.werelease-entering .werelease-popover-content {
      transform: translateY(0) scale(1);
    }
    
    /* Stagger animation for feature cards */
    .werelease-feature-card {
      animation: slideInUp 0.5s ease forwards;
      opacity: 0;
      transform: translateY(20px);
    }
    
    .werelease-feature-card:nth-child(1) { animation-delay: 0.1s; }
    .werelease-feature-card:nth-child(2) { animation-delay: 0.2s; }
    .werelease-feature-card:nth-child(3) { animation-delay: 0.3s; }
    .werelease-feature-card:nth-child(4) { animation-delay: 0.4s; }
    
    @keyframes slideInUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
      document.head.appendChild(style);
  };

  const renderFeedbackModalTemplate = (canDismiss = true, feedbackType = 'both')=>{
      return `
    <div class="werelease-feedback-overlay werelease-modal-close">
      <div class="werelease-feedback-content" onclick="event.stopPropagation()">
        <div class="werelease-feedback-header">
          <h2>💬 Share Your Feedback</h2>
          ${canDismiss ? '<button class="werelease-feedback-close werelease-modal-close">×</button>' : ''}
        </div>
        
        <div class="werelease-feedback-body">
          ${feedbackType === 'emoji' || feedbackType === 'both' ? `
          <div class="werelease-rating-section">
            <label class="werelease-rating-label">How do you feel about our latest updates?</label>
            <div class="werelease-emoji-buttons">
              <button class="werelease-emoji-btn werelease-emoji-reaction" data-emoji="😡" data-rating="1">😡</button>
              <button class="werelease-emoji-btn werelease-emoji-reaction" data-emoji="😞" data-rating="2">😞</button>
              <button class="werelease-emoji-btn werelease-emoji-reaction" data-emoji="😐" data-rating="3">😐</button>
              <button class="werelease-emoji-btn werelease-emoji-reaction" data-emoji="😊" data-rating="4">😊</button>
              <button class="werelease-emoji-btn werelease-emoji-reaction" data-emoji="🤩" data-rating="5">🤩</button>
            </div>
          </div>
          ` : ''}
          
          ${feedbackType === 'text' || feedbackType === 'both' ? `
          <div class="werelease-comment-section">
            <label for="werelease-feedback-comment">${feedbackType === 'both' ? 'Tell us more (optional):' : 'Share your thoughts:'}</label>
            <textarea id="werelease-feedback-comment" placeholder="${feedbackType === 'both' ? 'What would you like to see improved or what do you love about the updates?' : 'What are your thoughts about our latest updates? What would you like to see improved?'}"></textarea>
          </div>
          ` : ''}
        </div>
        
        <div class="werelease-feedback-footer">
          ${canDismiss ? '<button class="werelease-btn-secondary werelease-modal-close">Maybe Later</button>' : ''}
          <button class="werelease-btn-primary werelease-submit-feedback">Send Feedback</button>
          <div class="werelease-feedback-loader" style="display: none;">
            <div class="werelease-spinner"></div>
            <span>Saving your feedback...</span>
          </div>
          <div class="werelease-feedback-success" style="display: none;">
            <div class="werelease-checkmark">
              <svg class="werelease-checkmark-circle" viewBox="0 0 52 52">
                <circle class="werelease-checkmark-circle-bg" cx="26" cy="26" r="25" fill="none"/>
                <path class="werelease-checkmark-check" fill="none" d="m14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
            </div>
            <span>Thank you for your feedback!</span>
          </div>
        </div>
      </div>
    </div>
  `;
  };
  const addFeedbackModalCSS = ()=>{
      // Check if CSS already added
      if (document.getElementById('werelease-feedback-styles')) return;
      const style = document.createElement('style');
      style.id = 'werelease-feedback-styles';
      style.textContent = `
    .werelease-feedback-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      z-index: 10001;
      opacity: 0;
      transition: opacity 0.2s ease;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      box-sizing: border-box;
    }
    
    .werelease-feedback-content {
      position: relative;
      transform: scale(0.95);
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
      max-width: 480px;
      width: 100%;
      max-height: calc(100vh - 32px);
      overflow: hidden;
      transition: transform 0.2s ease;
      box-sizing: border-box;
    }
    
    .werelease-feedback-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 24px 16px;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .werelease-feedback-header h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      color: #111827;
    }
    
    .werelease-feedback-close {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
      color: #6b7280;
      transition: background-color 0.2s ease;
    }
    
    .werelease-feedback-close:hover {
      background: rgba(107, 114, 128, 0.1);
    }
    
    .werelease-feedback-body {
      padding: 24px;
      max-height: calc(100vh - 200px);
      overflow-y: auto;
      overflow-x: hidden;
      box-sizing: border-box;
    }
    
    .werelease-rating-section {
      margin-bottom: 24px;
    }
    
    .werelease-rating-label {
      display: block;
      font-size: 16px;
      font-weight: 500;
      color: #374151;
      margin-bottom: 16px;
      text-align: center;
    }
    
    .werelease-emoji-buttons {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .werelease-emoji-btn {
      background: none;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      padding: 12px 16px;
      font-size: 24px;
      cursor: pointer;
      transition: all 0.2s ease;
      min-width: 56px;
      min-height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    
    .werelease-emoji-btn:hover {
      border-color: #667eea;
      transform: scale(1.1);
      background: rgba(102, 126, 234, 0.05);
    }
    
    .werelease-emoji-btn.selected {
      border-color: #667eea;
      background: rgba(102, 126, 234, 0.1);
      transform: scale(1.05);
    }
    
    .werelease-emoji-btn.werelease-required {
      border-color: #ef4444;
      background: rgba(239, 68, 68, 0.1);
      animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-4px); }
      75% { transform: translateX(4px); }
    }
    
    .werelease-comment-section label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      color: #374151;
      margin-bottom: 8px;
    }
    
    .werelease-comment-section textarea {
      width: 100%;
      min-height: 100px;
      padding: 12px;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 14px;
      font-family: inherit;
      resize: vertical;
      transition: border-color 0.2s ease;
      box-sizing: border-box;
      max-width: 100%;
      overflow-wrap: break-word;
      word-wrap: break-word;
    }
    
    .werelease-comment-section textarea:focus {
      outline: none;
      border-color: #667eea;
    }
    
    .werelease-feedback-footer {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      padding: 16px 24px 24px;
      border-top: 1px solid #e5e7eb;
      position: relative;
      align-items: center;
      min-height: 72px;
    }
    
    .werelease-btn-secondary {
      background: transparent;
      color: #6b7280;
      border: 1px solid #d1d5db;
      padding: 10px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      flex: 1;
    }
    
    .werelease-btn-secondary:hover {
      background: #f9fafb;
    }
    
    .werelease-btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 10px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      flex: 1;
    }
    
    .werelease-btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }
    
    .werelease-success-message {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #059669;
      font-weight: 500;
      font-size: 16px;
      padding: 16px;
    }
    
    .werelease-error-message {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #dc2626;
      font-weight: 500;
      font-size: 16px;
      padding: 16px;
    }

    /* Loading Animation */
    .werelease-feedback-loader {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(8px);
      padding: 12px 20px;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(102, 126, 234, 0.2);
      z-index: 10;
      opacity: 0;
      animation: fadeInLoader 0.3s ease forwards;
    }
    
    @keyframes fadeInLoader {
      to {
        opacity: 1;
      }
    }
    
    .werelease-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid #e2e8f0;
      border-top: 2px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .werelease-feedback-loader span {
      font-size: 14px;
      color: #1e293b;
      font-weight: 500;
    }
    
    /* Success Animation */
    .werelease-feedback-success {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(8px);
      padding: 12px 20px;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(34, 197, 94, 0.3);
      z-index: 10;
      opacity: 0;
      animation: slideUpSuccess 0.5s ease forwards;
    }
    
    @keyframes slideUpSuccess {
      0% {
        opacity: 0;
        transform: translate(-50%, -40%);
      }
      100% {
        opacity: 1;
        transform: translate(-50%, -50%);
      }
    }
    
    .werelease-checkmark {
      width: 24px;
      height: 24px;
    }
    
    .werelease-checkmark-circle {
      width: 24px;
      height: 24px;
    }
    
    .werelease-checkmark-circle-bg {
      stroke: #22c55e;
      stroke-width: 2;
      stroke-dasharray: 166;
      stroke-dashoffset: 166;
      animation: drawCircle 0.6s ease-in-out forwards;
    }
    
    .werelease-checkmark-check {
      stroke: #22c55e;
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: 48;
      stroke-dashoffset: 48;
      animation: drawCheck 0.4s ease-in-out 0.3s forwards;
    }
    
    @keyframes drawCircle {
      to {
        stroke-dashoffset: 0;
      }
    }
    
    @keyframes drawCheck {
      to {
        stroke-dashoffset: 0;
      }
    }
    
    .werelease-feedback-success span {
      font-size: 14px;
      color: #22c55e;
      font-weight: 600;
    }
    
    /* Button state transitions for feedback modal */
    .werelease-feedback-footer.loading .werelease-btn-primary,
    .werelease-feedback-footer.loading .werelease-btn-secondary {
      opacity: 0.3;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }
    
    .werelease-feedback-footer.success .werelease-btn-primary,
    .werelease-feedback-footer.success .werelease-btn-secondary {
      opacity: 0.3;
      transition: opacity 0.3s ease;
    }
    
    @media (max-width: 768px) {
      .werelease-feedback-overlay {
        padding: 12px;
      }
      
      .werelease-feedback-content {
        max-height: calc(100vh - 24px);
        border-radius: 12px;
      }
      
      .werelease-feedback-header,
      .werelease-feedback-footer {
        padding-left: 20px;
        padding-right: 20px;
      }
      
      .werelease-feedback-body {
        padding: 20px;
        max-height: calc(100vh - 160px);
      }
      
      .werelease-feedback-header h2 {
        font-size: 18px;
      }
      
      .werelease-feedback-close {
        font-size: 22px;
        padding: 8px;
        min-width: 44px;
        min-height: 44px;
      }
      
      .werelease-emoji-buttons {
        gap: 8px;
      }
      
      .werelease-emoji-btn {
        min-width: 52px;
        min-height: 52px;
        font-size: 20px;
      }
      
      .werelease-comment-section textarea {
        min-height: 120px;
        font-size: 16px;
      }
      
      .werelease-feedback-footer {
        flex-direction: column;
        gap: 8px;
      }
      
      .werelease-btn-primary,
      .werelease-btn-secondary {
        width: 100%;
        padding: 12px 16px;
        font-size: 16px;
        min-height: 48px;
      }
      
      /* Mobile loading and success animations */
      .werelease-feedback-loader,
      .werelease-feedback-success {
        padding: 16px 24px;
        border-radius: 12px;
      }
      
      .werelease-feedback-loader span,
      .werelease-feedback-success span {
        font-size: 16px;
      }
      
      .werelease-spinner {
        width: 24px;
        height: 24px;
      }
      
      .werelease-checkmark {
        width: 28px;
        height: 28px;
      }
      
      .werelease-checkmark-circle {
        width: 28px;
        height: 28px;
      }
    }
    
    @media (max-width: 480px) {
      .werelease-feedback-overlay {
        padding: 8px;
      }
      
      .werelease-feedback-content {
        border-radius: 8px;
      }
      
      .werelease-feedback-header,
      .werelease-feedback-body,
      .werelease-feedback-footer {
        padding-left: 16px;
        padding-right: 16px;
      }
      
      .werelease-feedback-body {
        padding-top: 16px;
        padding-bottom: 16px;
      }
      
      .werelease-rating-label {
        font-size: 15px;
      }
      
      .werelease-emoji-btn {
        min-width: 48px;
        min-height: 48px;
        font-size: 18px;
      }
    }
    
    /* Entrance Animation */
    .werelease-feedback-overlay.werelease-entering {
      opacity: 1;
    }
    
    .werelease-feedback-overlay.werelease-entering .werelease-feedback-content {
      transform: scale(1);
    }
    
    /* Exit Animation */
    .werelease-feedback-overlay.werelease-exiting {
      opacity: 0;
    }
    
    .werelease-feedback-overlay.werelease-exiting .werelease-feedback-content {
      transform: scale(0.95);
    }
    
    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .werelease-feedback-content {
        background: #1f2937;
        color: #f9fafb;
      }
      
      .werelease-feedback-header {
        border-bottom-color: #374151;
      }
      
      .werelease-feedback-header h2 {
        color: #f9fafb;
      }
      
      .werelease-rating-label,
      .werelease-comment-section label {
        color: #e5e7eb;
      }
      
      .werelease-emoji-btn {
        border-color: #4b5563;
        background: #374151;
      }
      
      .werelease-emoji-btn:hover {
        border-color: #667eea;
        background: #4b5563;
      }
      
      .werelease-emoji-btn.selected {
        border-color: #667eea;
        background: #4b5563;
      }
      
      .werelease-comment-section textarea {
        background: #374151;
        border-color: #4b5563;
        color: #f9fafb;
      }
      
      .werelease-comment-section textarea:focus {
        border-color: #667eea;
      }
      
      .werelease-feedback-footer {
        border-top-color: #374151;
      }
      
      .werelease-btn-secondary {
        color: #d1d5db;
        border-color: #4b5563;
      }
      
      .werelease-btn-secondary:hover {
        background: #374151;
      }
      
      /* Dark mode for feedback modal loading and success animations */
      .werelease-feedback-loader {
        background: rgba(30, 41, 59, 0.95);
        border-color: rgba(102, 126, 234, 0.3);
      }
      
      .werelease-feedback-loader span {
        color: #f1f5f9;
      }
      
      .werelease-spinner {
        border-color: #475569;
        border-top-color: #667eea;
      }
      
      .werelease-feedback-success {
        background: rgba(30, 41, 59, 0.95);
        border-color: rgba(34, 197, 94, 0.4);
      }
    }
  `;
      document.head.appendChild(style);
  };

  // Modal Manager for WeRelease SDK
  class ModalManagerImpl {
      /**
     * Set callback for feedback submission
     */ setFeedbackCallback(callback) {
          this.feedbackSubmissionCallback = callback;
      }
      /**
     * Show changes modal/popover
     */ showChangesModal(triggerElement, changelogData) {
          // Close existing modal
          this.closeModal();
          // Create modal overlay
          const overlay = document.createElement('div');
          overlay.id = 'werelease-changes-modal';
          overlay.innerHTML = renderChangesPopoverTemplate(changelogData);
          // Add CSS
          addChangesPopoverCSS();
          // Append to body
          document.body.appendChild(overlay);
          this.currentModal = overlay;
          // Position popover if trigger element provided
          if (triggerElement) {
              this.positionPopover(overlay, triggerElement);
          }
          // Add entrance animation
          requestAnimationFrame(()=>{
              const overlayEl = overlay.querySelector('.werelease-popover-overlay');
              if (overlayEl) {
                  overlayEl.classList.add('werelease-entering');
              }
          });
          // Add event listeners for close buttons
          this.attachChangesModalEventListeners(overlay);
          // Add click outside to close
          overlay.addEventListener('click', (event)=>{
              if (event.target === overlay) {
                  this.closeModal();
              }
          });
          // Prevent body scroll
          document.body.style.overflow = 'hidden';
      }
      /**
     * Show feedback modal
     */ showFeedbackModal(canDismiss = true, feedbackType = 'both') {
          // Close existing modal
          this.closeModal();
          // Create modal overlay
          const overlay = document.createElement('div');
          overlay.id = 'werelease-feedback-modal';
          overlay.innerHTML = renderFeedbackModalTemplate(canDismiss, feedbackType);
          // Add CSS
          addFeedbackModalCSS();
          // Append to body
          document.body.appendChild(overlay);
          this.currentModal = overlay;
          // Add entrance animation
          requestAnimationFrame(()=>{
              const overlayEl = overlay.querySelector('.werelease-feedback-overlay');
              if (overlayEl) {
                  overlayEl.classList.add('werelease-entering');
              }
          });
          // Add event listeners with a small delay to ensure DOM is ready
          setTimeout(()=>{
              this.attachFeedbackEventListeners(overlay, canDismiss, feedbackType);
          }, 10);
          // Prevent body scroll
          document.body.style.overflow = 'hidden';
      }
      /**
     * Show thank you modal for users who already submitted feedback
     */ showThankYouModal() {
          // Close existing modal
          this.closeModal();
          // Create modal overlay
          const overlay = document.createElement('div');
          overlay.id = 'werelease-thankyou-modal';
          overlay.innerHTML = this.renderThankYouTemplate();
          // Add CSS (reuse feedback modal CSS)
          addFeedbackModalCSS();
          // Append to body
          document.body.appendChild(overlay);
          this.currentModal = overlay;
          // Add entrance animation
          requestAnimationFrame(()=>{
              const overlayEl = overlay.querySelector('.werelease-feedback-overlay');
              if (overlayEl) {
                  overlayEl.classList.add('werelease-entering');
              }
          });
          // Add close event listeners
          setTimeout(()=>{
              this.attachThankYouEventListeners(overlay);
          }, 10);
          // Prevent body scroll
          document.body.style.overflow = 'hidden';
      }
      /**
     * Close current modal
     */ closeModal() {
          if (this.currentModal) {
              // Add exit animation
              const overlayEl = this.currentModal.querySelector('.werelease-modal, .werelease-popover-overlay, .werelease-feedback-overlay');
              if (overlayEl) {
                  overlayEl.classList.add('werelease-exiting');
                  setTimeout(()=>{
                      removeElement(this.currentModal);
                      this.currentModal = null;
                      // Restore body scroll
                      document.body.style.overflow = '';
                  }, 300);
              } else {
                  removeElement(this.currentModal);
                  this.currentModal = null;
                  document.body.style.overflow = '';
              }
          }
      }
      /**
     * Position popover relative to trigger element
     */ positionPopover(overlay, triggerElement) {
          const overlayEl = overlay.querySelector('.werelease-popover-overlay');
          const contentEl = overlay.querySelector('.werelease-popover-content');
          const arrowEl = overlay.querySelector('.werelease-popover-arrow');
          // Get trigger button position
          const triggerRect = triggerElement.getBoundingClientRect();
          const { width: viewportWidth, height: viewportHeight } = getViewportDimensions();
          // Check if we're on mobile (below 640px)
          const isMobile = viewportWidth <= 640;
          if (isMobile) {
              // On mobile, use simpler centered positioning
              overlayEl.style.alignItems = 'flex-start';
              overlayEl.style.justifyContent = 'center';
              overlayEl.style.paddingTop = '20px';
              overlayEl.style.paddingLeft = '16px';
              overlayEl.style.paddingRight = '16px';
              contentEl.style.position = 'relative';
              contentEl.style.left = 'auto';
              contentEl.style.top = 'auto';
              contentEl.style.transform = 'scale(0.95)';
              contentEl.style.width = '100%';
              contentEl.style.maxWidth = 'calc(100vw - 32px)';
              // Hide arrow on mobile for cleaner look
              if (arrowEl) {
                  arrowEl.style.display = 'none';
              }
              return;
          }
          // Desktop positioning logic
          const popoverWidth = 420;
          const popoverHeight = 480;
          // Determine if we should show above or below
          const spaceBelow = viewportHeight - (triggerRect.bottom + 16);
          const spaceAbove = triggerRect.top - 16;
          const showBelow = spaceBelow >= popoverHeight || spaceBelow > spaceAbove;
          // Calculate horizontal position (center on button, but keep in viewport)
          let leftPos = triggerRect.left + triggerRect.width / 2 - popoverWidth / 2;
          leftPos = Math.max(16, Math.min(leftPos, viewportWidth - popoverWidth - 16));
          // Calculate vertical position
          let topPos;
          let arrowTop = '0px';
          let arrowTransform = 'translateX(-50%) rotate(45deg)';
          if (showBelow) {
              topPos = triggerRect.bottom + 16;
              arrowTop = '-8px';
              arrowTransform = 'translateX(-50%) rotate(45deg)';
          } else {
              topPos = triggerRect.top - popoverHeight - 16;
              arrowTop = 'calc(100% - 8px)';
              arrowTransform = 'translateX(-50%) rotate(225deg)';
          }
          // Apply positioning
          overlayEl.style.alignItems = 'flex-start';
          overlayEl.style.justifyContent = 'flex-start';
          overlayEl.style.paddingTop = '0';
          contentEl.style.position = 'absolute';
          contentEl.style.left = `${leftPos}px`;
          contentEl.style.top = `${topPos}px`;
          contentEl.style.transform = 'scale(0.95)';
          contentEl.style.width = 'auto';
          contentEl.style.maxWidth = 'auto';
          // Position and rotate arrow
          if (arrowEl) {
              arrowEl.style.display = 'block';
              arrowEl.style.top = arrowTop;
              arrowEl.style.left = `${triggerRect.left + triggerRect.width / 2 - leftPos}px`;
              arrowEl.style.transform = arrowTransform;
          }
      }
      /**
     * Attach event listeners to changes modal
     */ attachChangesModalEventListeners(overlay) {
          // Close buttons (close button and "Show me later")
          const closeButtons = overlay.querySelectorAll('.werelease-modal-close');
          closeButtons.forEach((button)=>{
              button.addEventListener('click', ()=>this.closeModal());
          });
          // Submit feedback button (the "Awesome! 🎉" button)
          const submitButton = overlay.querySelector('.werelease-submit-feedback');
          if (submitButton) {
              submitButton.addEventListener('click', ()=>{
                  this.handleChangesModalFeedback(overlay);
              });
          }
      }
      /**
     * Attach event listeners to feedback modal
     */ attachFeedbackEventListeners(overlay, canDismiss, feedbackType) {
          // Close buttons (close button and "Maybe Later" button) - only if dismiss is allowed
          if (canDismiss) {
              const closeButtons = overlay.querySelectorAll('.werelease-modal-close');
              closeButtons.forEach((button)=>{
                  button.addEventListener('click', ()=>{
                      this.closeModal();
                  });
              });
          }
          // Emoji reaction buttons - only if emoji feedback is enabled
          if (feedbackType === 'emoji' || feedbackType === 'both') {
              const emojiButtons = overlay.querySelectorAll('.werelease-emoji-reaction');
              emojiButtons.forEach((button)=>{
                  button.addEventListener('click', (event)=>{
                      event.stopPropagation();
                      const emoji = button.getAttribute('data-emoji');
                      if (emoji) {
                          this.handleModalEmojiReaction(emoji);
                      }
                  });
              });
          }
          // Submit feedback button
          const submitButton = overlay.querySelector('.werelease-submit-feedback');
          if (submitButton) {
              submitButton.addEventListener('click', (event)=>{
                  event.stopPropagation();
                  this.submitFeedback(feedbackType);
              });
          }
          // Click outside to close - only if dismiss is allowed
          if (canDismiss) {
              overlay.addEventListener('click', (event)=>{
                  if (event.target === overlay) {
                      this.closeModal();
                  }
              });
          }
      }
      /**
     * Handle emoji reaction in modal
     */ handleModalEmojiReaction(emoji) {
          // Remove previous selections
          const allEmojiButtons = document.querySelectorAll('.werelease-emoji-btn');
          allEmojiButtons.forEach((btn)=>btn.classList.remove('selected'));
          // Add visual feedback to selected button
          const emojiButton = document.querySelector(`[data-emoji="${emoji}"]`);
          if (emojiButton) {
              emojiButton.classList.add('selected');
              // Get the rating from data attribute
              const rating = emojiButton.getAttribute('data-rating');
              this.selectedRating = rating ? parseInt(rating) : null;
          }
      }
      /**
     * Submit feedback
     */ async submitFeedback(feedbackType) {
          // Get comment input early for validation
          const commentInput = document.querySelector('#werelease-feedback-comment');
          const comment = commentInput?.value || '';
          // Validate based on feedback type
          if (feedbackType === 'emoji' || feedbackType === 'both') {
              if (!this.selectedRating) {
                  // Highlight emoji buttons to indicate selection is required
                  const emojiButtons = document.querySelectorAll('.werelease-emoji-btn');
                  emojiButtons.forEach((btn)=>{
                      btn.classList.add('werelease-required');
                      setTimeout(()=>btn.classList.remove('werelease-required'), 1000);
                  });
                  return;
              }
          }
          if (feedbackType === 'text' || feedbackType === 'both') {
              if (!comment.trim()) {
                  // Show error for empty text feedback
                  // You could add visual feedback here
                  return;
              }
          }
          const footer = document.querySelector('.werelease-feedback-footer');
          const loader = document.querySelector('.werelease-feedback-loader');
          const success = document.querySelector('.werelease-feedback-success');
          if (!footer || !loader || !success) return;
          // Show loading state
          footer.classList.add('loading');
          loader.style.display = 'flex';
          // Prepare feedback data based on type
          let feedbackData;
          if (feedbackType === 'emoji') {
              feedbackData = {
                  feedback: {
                      type: 'emoji',
                      emojiRating: this.selectedRating,
                      textComment: undefined,
                      source: 'modal'
                  },
                  meta: {}
              };
          } else if (feedbackType === 'text') {
              feedbackData = {
                  feedback: {
                      type: 'text',
                      emojiRating: undefined,
                      textComment: comment,
                      source: 'modal'
                  },
                  meta: {}
              };
          } else {
              // 'both'
              feedbackData = {
                  feedback: {
                      type: 'both',
                      emojiRating: this.selectedRating,
                      textComment: comment || undefined,
                      source: 'modal'
                  },
                  meta: {}
              };
          }
          // Submit feedback
          if (this.feedbackSubmissionCallback) {
              try {
                  await this.feedbackSubmissionCallback(feedbackData);
                  // Hide loader and show success
                  loader.style.display = 'none';
                  success.style.display = 'flex';
                  footer.classList.remove('loading');
                  footer.classList.add('success');
                  // Reset selection
                  this.selectedRating = null;
                  // Close modal after showing success
                  setTimeout(()=>{
                      this.closeModal();
                  }, 2000);
              } catch  {
                  // Hide loader and show error message
                  loader.style.display = 'none';
                  footer.classList.remove('loading');
                  this.showErrorMessage();
                  setTimeout(()=>{
                      this.closeModal();
                  }, 1500);
              }
          } else {
              // No callback available, just show success animation
              loader.style.display = 'none';
              success.style.display = 'flex';
              footer.classList.remove('loading');
              footer.classList.add('success');
              // Reset selection
              this.selectedRating = null;
              setTimeout(()=>{
                  this.closeModal();
              }, 2000);
          }
      }
      /**
     * Handle feedback submission from changes modal
     */ async handleChangesModalFeedback(overlay) {
          const actionBar = overlay.querySelector('.werelease-action-bar');
          const loader = overlay.querySelector('.werelease-feedback-loader');
          const success = overlay.querySelector('.werelease-feedback-success');
          if (!actionBar || !loader || !success) return;
          // Show loading state
          actionBar.classList.add('loading');
          loader.style.display = 'flex';
          // Prepare positive feedback data (since they clicked "Awesome! 🎉")
          const feedbackData = {
              feedback: {
                  type: 'emoji',
                  emojiRating: 5,
                  textComment: undefined,
                  source: 'banner'
              },
              meta: {}
          };
          // Submit feedback
          if (this.feedbackSubmissionCallback) {
              try {
                  await this.feedbackSubmissionCallback(feedbackData);
                  // Hide loader and show success
                  loader.style.display = 'none';
                  success.style.display = 'flex';
                  actionBar.classList.remove('loading');
                  actionBar.classList.add('success');
                  // Close modal after showing success
                  setTimeout(()=>{
                      this.closeModal();
                  }, 2000);
              } catch  {
                  // Hide loader and show error (fall back to closing)
                  loader.style.display = 'none';
                  actionBar.classList.remove('loading');
                  // Could add error message here
                  setTimeout(()=>{
                      this.closeModal();
                  }, 500);
              }
          } else {
              // No callback available, just show success animation
              loader.style.display = 'none';
              success.style.display = 'flex';
              actionBar.classList.remove('loading');
              actionBar.classList.add('success');
              setTimeout(()=>{
                  this.closeModal();
              }, 2000);
          }
      }
      /**
     * Show success message in modal
     */ showSuccessMessage() {
          const feedbackBody = document.querySelector('.werelease-feedback-body');
          if (feedbackBody) {
              feedbackBody.innerHTML = `
        <div class="werelease-success-message">
          ✅ Thank you for your feedback!
        </div>
      `;
          }
      }
      /**
     * Show error message in modal
     */ showErrorMessage() {
          const feedbackBody = document.querySelector('.werelease-feedback-body');
          if (feedbackBody) {
              feedbackBody.innerHTML = `
        <div class="werelease-error-message">
          ❌ Something went wrong. Please try again.
        </div>
      `;
          }
      }
      /**
     * Get rating value from emoji (legacy method, kept for compatibility)
     */ getEmojiRating(emoji) {
          const ratings = {
              '👍': 5,
              '❤️': 5,
              '😊': 4,
              '😐': 3,
              '😕': 2,
              '👎': 1
          };
          return ratings[emoji] || 3;
      }
      /**
     * Render thank you modal template
     */ renderThankYouTemplate() {
          return `
      <div class="werelease-feedback-overlay werelease-modal-close">
        <div class="werelease-feedback-content" onclick="event.stopPropagation()">
          <div class="werelease-feedback-header">
            <h2>🙏 Thank You!</h2>
            <button class="werelease-feedback-close werelease-modal-close">×</button>
          </div>
          
          <div class="werelease-feedback-body">
            <div class="werelease-success-message">
              <p>Thank you for your feedback! We've already received your input for this update.</p>
              <p>Your feedback helps us improve and we truly appreciate it.</p>
            </div>
          </div>
          
          <div class="werelease-feedback-footer">
            <button class="werelease-btn-primary werelease-modal-close">Close</button>
          </div>
        </div>
      </div>
    `;
      }
      /**
     * Attach event listeners to thank you modal
     */ attachThankYouEventListeners(overlay) {
          // Close modal on close button clicks
          const closeButtons = overlay.querySelectorAll('.werelease-modal-close');
          closeButtons.forEach((button)=>{
              button.addEventListener('click', ()=>{
                  this.closeModal();
              });
          });
          // Click outside to close
          overlay.addEventListener('click', (event)=>{
              if (event.target === overlay) {
                  this.closeModal();
              }
          });
      }
      constructor(){
          this.currentModal = null;
          this.selectedRating = null;
      }
  }

  /**
   * WeRelease SDK Instance Class
   * Provides methods for managing changelog banners, feedback, and user identification
   */ class WeReleaseInstance {
      /**
     * Initialize the WeRelease SDK instance with configuration
     * @param config - Configuration object containing projectId and optional settings
     * @returns Promise that resolves when initialization is complete
     */ async init(config) {
          try {
              // Check if banner has been dismissed
              if (this.storageService.isBannerDismissed()) {
                  // Check the timestamp of the dismissed banner
                  const dismissedTimestamp = this.storageService.getItem(STORAGE_KEYS.BANNER_DISMISSED);
                  if (!dismissedTimestamp) {
                      return;
                  }
                  const dismissedTime = new Date(parseInt(dismissedTimestamp, 10));
                  const currentTime = new Date();
                  const timeSinceDismissed = dateFns.differenceInHours(currentTime, dismissedTime);
                  if (timeSinceDismissed < 24) {
                      // Banner is still dismissed within the 24-hour period
                      throw new Error('Banner dismissed by user.');
                  }
                  // Clear the dismissed state since timeout has expired
                  this.storageService.removeItem(STORAGE_KEYS.BANNER_DISMISSED);
              }
              this.projectId = config.projectId;
              this.user = config.user || null;
              this.target = config.target || 'body';
              this.options = {
                  ...DEFAULT_OPTIONS,
                  ...config.options,
                  styles: config.options?.styles || DEFAULT_OPTIONS.styles
              };
              // Get or create anonymous ID
              this.anonymousId = getOrCreateAnonymousId();
              // Identify user if provided
              if (this.user) {
                  await this.apiService.identifyUser(this.projectId, this.anonymousId, this.user);
              }
              // Fetch project data
              try {
                  const projectDetails = await this.apiService.init(this.projectId, this.anonymousId);
                  if (projectDetails) {
                      this.projectData = projectDetails.project;
                      this.theme = this.projectData.uiVariant || 'basic';
                  } else {
                      this.theme = 'basic';
                  }
              } catch  {
                  console.warn('[WeRelease] Could not fetch project data, using default theme');
                  this.theme = 'basic';
              }
              // Fetch changelog data
              try {
                  const latestChangelog = await this.apiService.fetchLatest(this.projectId);
                  if (latestChangelog && latestChangelog.length > 0) {
                      this.changelogData = latestChangelog[0];
                  } else {
                      this.changelogData = DEFAULT_CHANGELOG_DATA;
                  }
              } catch  {
                  console.warn('[WeRelease] Could not fetch changelog data, using default');
                  this.changelogData = DEFAULT_CHANGELOG_DATA;
              }
              // Check feedback status after initialization
              this.checkFeedbackStatus();
          } catch (error) {
              console.error('[WeRelease] Error during initialization:', error);
              throw error;
          }
      }
      /**
     * Show the changelog banner in the configured target
     */ showBanner() {
          if (!this.projectId) {
              console.error('[WeRelease] SDK not initialized. Call init() first.');
              return;
          }
          const bannerConfig = {
              projectId: this.projectId,
              target: this.target,
              options: this.options,
              theme: this.theme,
              changelogData: this.changelogData,
              onBannerClick: this.handleBannerClick.bind(this),
              onViewChanges: this.handleViewChangesClick.bind(this),
              onDismiss: this.handleDismissClick.bind(this)
          };
          this.bannerManager.render(bannerConfig);
      }
      /**
     * Trigger the feedback UI modal
     * @param feedbackOptions - Optional feedback configuration
     */ askForFeedback(feedbackOptions) {
          try {
              // Check if feedback has already been submitted
              this.checkFeedbackStatus();
              if (this.hasFeedbackSubmitted) {
                  // Show a "Thank you" message instead of the feedback form
                  this.modalManager.showThankYouModal();
              } else {
                  // Show the regular feedback modal with options
                  const canDismiss = feedbackOptions?.dismiss !== undefined ? feedbackOptions.dismiss : this.options?.dismissFeedbackModal ?? true;
                  const type = feedbackOptions?.type || this.options?.feedbackType || 'both';
                  this.modalManager.showFeedbackModal(canDismiss, type);
              }
          } catch (error) {
              console.error('[WeRelease] Error in askForFeedback:', error);
          }
      }
      /**
     * Map current anonymous session to the provided user
     * @param userData - User identification data
     */ async identify(userData) {
          if (!this.projectId || !this.anonymousId) {
              throw new Error('WeRelease not properly initialized');
          }
          this.user = userData;
          await this.apiService.identifyUser(this.projectId, this.anonymousId, userData);
      }
      /**
     * Check if user has already submitted feedback for current changelog
     * @returns boolean indicating if feedback was submitted
     */ hasFeedbackBeenSubmitted() {
          this.checkFeedbackStatus();
          return this.hasFeedbackSubmitted;
      }
      /**
     * Reset feedback status (useful for testing or admin functions)
     * @returns boolean indicating if reset was successful
     */ resetFeedbackStatus() {
          if (!this.projectId) return false;
          const feedbackKey = `${STORAGE_KEYS.FEEDBACK_SUBMITTED}_${this.projectId}_${this.changelogData?.id || 'general'}`;
          this.storageService.setItem(feedbackKey, '');
          this.hasFeedbackSubmitted = false;
          return true;
      }
      /**
     * Capture feedback (backward compatibility method)
     */ captureFeedback() {
          this.modalManager.setFeedbackCallback((data)=>{
              this.apiService.submitFeedback(data);
          });
      }
      /**
     * Get current project ID
     * @returns current project ID or undefined if not initialized
     */ getProjectId() {
          return this.projectId;
      }
      /**
     * Get current user data
     * @returns current user data or null if not set
     */ getUser() {
          return this.user;
      }
      /**
     * Get current target element
     * @returns current target selector
     */ getTarget() {
          return this.target;
      }
      /**
     * Get current options
     * @returns current options object
     */ getOptions() {
          return {
              ...this.options
          };
      }
      // Private methods
      checkFeedbackStatus() {
          if (!this.projectId) return false;
          const feedbackKey = `${STORAGE_KEYS.FEEDBACK_SUBMITTED}_${this.projectId}_${this.changelogData?.id || 'general'}`;
          const feedbackStatus = this.storageService.getItem(feedbackKey);
          this.hasFeedbackSubmitted = feedbackStatus === 'submitted';
          return this.hasFeedbackSubmitted;
      }
      handleBannerClick(event) {
          if (this.options.onBannerClick) {
              this.options.onBannerClick(event, {
                  projectId: this.projectId,
                  releaseDate: this.changelogData?.releaseDate
              });
          }
      }
      handleViewChangesClick() {
          // Handle view changes click - open the changelog modal/popover
          // Get the banner element to position the popover correctly
          const banner = document.querySelector('#werelease-banner');
          const triggerElement = banner ? banner.querySelector('.werelease-view-changes') : undefined;
          // Show the changes modal/popover
          this.modalManager.showChangesModal(triggerElement, this.changelogData);
      }
      handleDismissClick() {
          // Handle dismiss click - store in localStorage and hide the banner
          if (this.projectId) {
              // const dismissKey = `${STORAGE_KEYS.BANNER_DISMISSED}_${this.projectId}`;
              this.storageService.setBannerDismissed();
              // Actually hide the banner from the UI
              const banner = document.querySelector('#werelease-banner');
              if (banner && banner.parentNode) {
                  banner.parentNode.removeChild(banner);
              }
          }
      }
      constructor(){
          this.user = null;
          this.target = 'body';
          this.options = {
              ...DEFAULT_OPTIONS
          };
          this.changelogData = DEFAULT_CHANGELOG_DATA;
          this.projectData = null;
          this.theme = 'basic';
          this.hasFeedbackSubmitted = false;
          this.apiService = new APIService();
          this.storageService = new LocalStorageService();
          this.bannerManager = new BannerManager();
          this.modalManager = new ModalManagerImpl();
          // Set up feedback callback for modal manager
          this.modalManager.setFeedbackCallback(async (feedbackData)=>{
              if (!this.projectId || !this.anonymousId) {
                  throw new Error('WeRelease not properly initialized');
              }
              // Transform modal data structure to API structure
              const fullFeedbackData = {
                  projectId: this.projectId,
                  anonymousId: this.anonymousId,
                  changeLogId: this.changelogData?.id || 0,
                  feedback: {
                      type: feedbackData.feedback?.type || 'both',
                      emojiRating: feedbackData.feedback?.emojiRating,
                      textComment: feedbackData.feedback?.textComment,
                      source: feedbackData.feedback?.source || 'modal'
                  },
                  meta: feedbackData.meta || {}
              };
              try {
                  await this.apiService.submitFeedback(fullFeedbackData);
                  // Mark feedback as submitted and store in localStorage
                  this.hasFeedbackSubmitted = true;
                  const feedbackKey = `${STORAGE_KEYS.FEEDBACK_SUBMITTED}_${this.projectId}_${this.changelogData?.id || 'general'}`;
                  this.storageService.setItem(feedbackKey, 'submitted');
              } catch (error) {
                  console.error('[WeRelease] Failed to submit feedback:', error);
                  throw error; // Re-throw so modal can handle error state
              }
          });
      }
  }
  /**
   * WeRelease SDK Class
   * Only exposes the init method - all other functionality is available on instances
   */ class WeRelease {
      /**
     * Initialize WeRelease SDK
     * @param config - Configuration object
     * @returns WeReleaseInstance with all available methods
     */ static async init(config) {
          // Create new instance
          const instance = new WeReleaseInstance();
          // Initialize asynchronously but don't wait
          await instance.init(config).catch((error)=>{
              console.error('[WeRelease] Initialization failed:', error);
          });
          return instance;
      }
  }

  // Main entry point for WeRelease SDK
  // Import WeRelease for global assignment
  // For IIFE builds, ensure WeRelease is globally available
  if (typeof window !== 'undefined') {
      // @ts-ignore
      window.WeRelease = WeRelease;
  }

  exports.WeRelease = WeRelease;

})(this.WeRelease = this.WeRelease || {}, dateFns, axios);
