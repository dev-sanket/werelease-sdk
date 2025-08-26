# WeRelease SDK

A lightweight JavaScript SDK for integrating changelog banners and feedback collection into your web applications. Built with TypeScript and designed for modern web development.

## Features

- 🚀 **Changelog Banners**: Display release updates with customizable themes (Basic & Premium)
- 💬 **Feedback Collection**: Gather user feedback through emoji reactions and text comments
- 👤 **User Identification**: Map anonymous sessions to authenticated users
- 🎨 **Customizable UI**: Support for both basic and premium themes with custom styling
- 📱 **Responsive Design**: Works seamlessly across all device sizes
- 🔒 **Privacy First**: Anonymous tracking with optional user identification
- ⚡ **TypeScript Support**: Full type definitions for better developer experience
- 🎯 **Multiple Themes**: Basic banner and Premium banner with rich content display
- 📊 **Analytics Tracking**: Built-in impression and interaction tracking
- 🎭 **Custom Styling**: CSS variables and custom class support
- 🔧 **Utility Functions**: Date formatting, DOM manipulation, and markdown parsing

## Installation

### NPM

```bash
npm install @werelease/sdk
```

### Yarn

```bash
yarn add @werelease/sdk
```

### PNPM

```bash
pnpm add @werelease/sdk
```

### CDN

```html
<script src="https://unpkg.com/@werelease/sdk@latest/dist/widget.min.js"></script>
```

## Quick Start

### Basic Setup

```typescript
import { WeRelease, WeReleaseConfig } from '@werelease/sdk';

// Define your configuration
const config: WeReleaseConfig = {
  projectId: 'your-project-id',
  target: '#changelog-banner',
  options: {
    showDismissButton: true,
    feedbackType: 'both',
    makeBannerClickable: true,
  },
};

// Initialize and get an instance
const werelease = await WeRelease.init(config);

// The banner will automatically show if there's a new changelog
// You can also manually trigger feedback collection
werelease.askForFeedback();

// Or with custom options
werelease.askForFeedback({
  dismiss: false, // Prevent modal dismissal
  type: 'emoji', // Only collect emoji reactions
});
```

### User Identification

```typescript
import { WeReleaseUser } from '@werelease/sdk';

// Define user data
const userData: WeReleaseUser = {
  id: 'user-123',
  email: 'user@example.com',
  name: 'John Doe',
  // Optional custom properties
  role: 'developer',
};

// Identify the current user
werelease.identify(userData);
```

## React Integration

### Simple React Component

Here's a basic example that any developer can understand:

```typescript
import React, { useEffect } from 'react';
import { WeRelease } from '@werelease/sdk';

function ChangelogBanner() {
  useEffect(() => {
    // Initialize WeRelease when component mounts
    const initWeRelease = async () => {
      const werelease = await WeRelease.init({
        projectId: 'your-project-id',
        target: '#changelog-banner',
      });

      // Show feedback button when user clicks
      const feedbackButton = document.getElementById('feedback-btn');
      if (feedbackButton) {
        feedbackButton.onclick = () => {
          // Basic feedback request
          werelease.askForFeedback();

          // Or with custom options
          werelease.askForFeedback({
            dismiss: false, // Prevent modal dismissal
            type: 'emoji', // Only collect emoji reactions
          });
        };
      }
    };

    initWeRelease();
  }, []);

  return (
    <div>
      {/* WeRelease will automatically show the banner here */}
      <div id="changelog-banner" />

      {/* Custom feedback button */}
      <button id="feedback-btn" className="feedback-button">
        Give Feedback
      </button>
    </div>
  );
}

export default ChangelogBanner;
```

### With User Login

If you want to identify users when they log in:

```typescript
import React, { useEffect, useState } from 'react';
import { WeRelease } from '@werelease/sdk';

function ChangelogBanner() {
  const [werelease, setWerelease] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Initialize WeRelease
    const initWeRelease = async () => {
      const instance = await WeRelease.init({
        projectId: 'your-project-id',
        target: '#changelog-banner',
      });

      setWerelease(instance);
    };

    initWeRelease();
  }, []);

  // Call this when user logs in
  const handleUserLogin = (userData) => {
    if (werelease && userData) {
      werelease.identify({
        id: userData.id,
        email: userData.email,
        name: userData.name,
      });
      setUser(userData);
    }
  };

  // Call this when user wants to give feedback
  const handleFeedback = () => {
    if (werelease) {
      // Basic feedback
      werelease.askForFeedback();
    }
  };

  // Call this for custom feedback options
  const handleCustomFeedback = () => {
    if (werelease) {
      werelease.askForFeedback({
        dismiss: false, // Prevent modal dismissal
        type: 'text', // Only collect text feedback
      });
    }
  };

  return (
    <div>
      <div id="changelog-banner" />

      {user ? (
        <div>
          <button onClick={handleFeedback} className="feedback-button">
            Give Feedback
          </button>
          <button onClick={handleCustomFeedback} className="custom-feedback-button">
            Custom Feedback
          </button>
        </div>
      ) : (
        <button onClick={() => handleUserLogin({ id: '123', email: 'test@example.com', name: 'Test User' })}>
          Login
        </button>
      )}
    </div>
  );
}

export default ChangelogBanner;
```

### Simple Hook (Optional)

If you want to use a custom hook, here's a simple one:

```typescript
import { useState, useEffect } from 'react';
import { WeRelease } from '@werelease/sdk';

function useWeRelease(projectId) {
  const [werelease, setWerelease] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const instance = await WeRelease.init({
          projectId,
          target: '#changelog-banner',
        });

        setWerelease(instance);
        setIsReady(true);
      } catch (error) {
        console.error('Failed to initialize WeRelease:', error);
      }
    };

    if (projectId) {
      init();
    }
  }, [projectId]);

  const identify = (userData) => {
    if (werelease) {
      werelease.identify(userData);
    }
  };

  const askForFeedback = (options) => {
    if (werelease) {
      werelease.askForFeedback(options);
    }
  };

  return {
    werelease,
    isReady,
    identify,
    askForFeedback,
  };
}

// Usage in component
function MyComponent() {
  const { isReady, identify, askForFeedback } = useWeRelease('your-project-id');

  if (!isReady) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div id="changelog-banner" />
      <button onClick={() => identify({ id: '123', email: 'test@example.com' })}>
        Login
      </button>
      <button onClick={() => askForFeedback()}>
        Feedback
      </button>
      <button onClick={() => askForFeedback({ type: 'emoji', dismiss: false })}>
        Emoji Only
      </button>
    </div>
  );
}
```

## Banner Themes

The SDK automatically selects the appropriate theme based on your project's subscription status.

### Basic Theme

Automatically applied for basic subscriptions.

```typescript
const config = {
  projectId: 'your-project-id',
  options: {
    // Basic theme is automatically applied
  },
};
```

![Basic Theme](https://ik.imagekit.io/rwnyqcevhi/WeRelease/glowshot-2025-08-25T21-06-12.png)

### Premium Theme

Automatically applied for premium subscriptions.

```typescript
const config = {
  projectId: 'your-project-id',
  options: {
    // Premium theme is automatically applied
  },
};
```

![Premium Theme](https://ik.imagekit.io/rwnyqcevhi/WeRelease/glowshot-2025-08-25T20-57-40.png)

## Configuration Options

### Basic Configuration

```typescript
const config = {
  projectId: 'your-project-id', // Required: Your project ID
  target: '#changelog-banner', // Optional: Where to show the banner (default: 'body')
  user: {
    // Optional: User info
    id: 'user-123',
    email: 'user@example.com',
    name: 'John Doe',
  },
  options: {
    // Optional: Customization
    showDismissButton: true, // Show close button (default: true)
    feedbackType: 'both', // 'emoji', 'text', or 'both' (default: 'both')
    makeBannerClickable: true, // Make banner clickable (default: true)
    dismissFeedbackModal: true, // Allow feedback modal dismissal (default: true)
    styles: {}, // Custom CSS variables
    className: '', // Custom CSS class
    onBannerClick: undefined, // Banner click event handler
  },
};
```

### Feedback Options

When calling `askForFeedback()`, you can pass options to customize the behavior:

```typescript
// Basic feedback (uses default settings)
werelease.askForFeedback();

// Custom feedback options
werelease.askForFeedback({
  dismiss: false, // Prevent modal dismissal (default: true)
  type: 'emoji', // Override feedback type: 'emoji', 'text', or 'both'
});

// Examples
werelease.askForFeedback({ type: 'text' }); // Text feedback only
wererelease.askForFeedback({ dismiss: false }); // Cannot dismiss modal
werelease.askForFeedback({ type: 'emoji', dismiss: false }); // Emoji only, cannot dismiss
```

### Custom Styling

```typescript
const config = {
  projectId: 'your-project-id',
  options: {
    styles: {
      '--werelease-primary-color': '#3b82f6', // Primary color
      '--werelease-border-radius': '8px', // Border radius
      '--werelease-font-family': 'Inter, sans-serif', // Font family
    },
    className: 'my-custom-theme', // Custom CSS class
  },
};
```

### Event Handling

```typescript
const config = {
  projectId: 'your-project-id',
  options: {
    onBannerClick: (event, data) => {
      console.log('Banner clicked!', data);
      // data contains: { projectId, releaseDate }
    },
  },
};
```

## API Reference

### Core Methods

#### `WeRelease.init(config: WeReleaseConfig)`

Initialize the SDK and return a WeRelease instance.

#### `werelease.identify(userData: WeReleaseUser)`

Map anonymous session to authenticated user.

#### `werelease.askForFeedback(options?: WeReleaseFeedbackOptions)`

Show feedback collection modal with optional customization.

#### `werelease.hasFeedbackBeenSubmitted()`

Check if user has already submitted feedback for current changelog.

#### `werelease.resetFeedbackStatus()`

Reset feedback status (useful for testing or admin functions).

#### `werelease.captureFeedback()`

Legacy method for feedback collection (backward compatibility).

### Utility Methods

#### `werelease.getProjectId()`

Get current project ID.

#### `werelease.getUser()`

Get current user data.

#### `werelease.getTarget()`

Get current target element selector.

#### `werelease.getOptions()`

Get current configuration options.

## Data Types

### WeReleaseConfig

```typescript
interface WeReleaseConfig {
  projectId: string;
  user?: WeReleaseUser | null;
  target?: string;
  options?: WeReleaseOptions;
}
```

### WeReleaseUser

```typescript
interface WeReleaseUser {
  id: string;
  email: string;
  name: string;
  role: string; // Optional Field
}
```

### WeReleaseOptions

```typescript
interface WeReleaseOptions {
  showDismissButton?: boolean;
  makeBannerClickable?: boolean;
  dismissFeedbackModal?: boolean;
  feedbackType?: 'emoji' | 'text' | 'both';
  styles?: Record<string, string>;
  className?: string;
  onBannerClick?: (
    event: Event,
    data: { projectId: string; releaseDate?: string }
  ) => void;
}
```

### WeReleaseFeedbackOptions

```typescript
interface WeReleaseFeedbackOptions {
  dismiss?: boolean; // Override dismiss setting
  type?: 'emoji' | 'text' | 'both'; // Override feedback type
}
```

## Support

For support and questions, please visit our [website](https://werelease.app) or contact us at connect@werelease.com.
