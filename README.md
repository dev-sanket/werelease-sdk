# WeRelease SDK

A lightweight JavaScript SDK for integrating changelog banners and feedback collection into your web applications.

## Features

- 🚀 **Changelog Banners**: Display release updates with customizable themes
- 💬 **Feedback Collection**: Gather user feedback through emoji reactions and text comments
- 👤 **User Identification**: Map anonymous sessions to authenticated users
- 🎨 **Customizable UI**: Support for both basic and premium themes
- 📱 **Responsive Design**: Works seamlessly across all device sizes
- 🔒 **Privacy First**: Anonymous tracking with optional user identification

## Installation

### NPM

```bash
npm install @werelease/sdk
```

### CDN

```html
<script src="https://unpkg.com/@werelease/sdk@latest/dist/widget.min.js"></script>
```

## Quick Start

### Instance-Based API

```javascript
import { WeRelease } from '@werelease/sdk';

// Initialize and get an instance
const werelease = WeRelease.init({
  projectId: 'your-project-id',
  target: '#changelog-banner',
  options: {
    showDismissButton: true,
    feedbackType: 'both',
  },
});

// Show the changelog banner
werelease.showBanner();

// Ask for feedback
werelease.askForFeedback();

// Identify user
werelease.identify({
  id: 'user-123',
  email: 'user@example.com',
  name: 'John Doe',
});
```

### Multiple Instances

```javascript
// Create multiple instances for different projects
const project1 = WeRelease.init({
  projectId: 'project-1',
  target: '#banner-1',
});

const project2 = WeRelease.init({
  projectId: 'project-2',
  target: '#banner-2',
});

// Each instance maintains its own state
project1.showBanner();
project2.askForFeedback();
```

## Configuration

### WeReleaseConfig

| Property    | Type               | Required | Description                                           |
| ----------- | ------------------ | -------- | ----------------------------------------------------- |
| `projectId` | `string`           | ✅       | Your unique project identifier                        |
| `user`      | `WeReleaseUser`    | ❌       | User identification data                              |
| `target`    | `string`           | ❌       | CSS selector for banner placement (default: `'body'`) |
| `options`   | `WeReleaseOptions` | ❌       | Customization options                                 |

### WeReleaseOptions

| Property               | Type                          | Default     | Description                           |
| ---------------------- | ----------------------------- | ----------- | ------------------------------------- |
| `showDismissButton`    | `boolean`                     | `true`      | Show dismiss/close button             |
| `makeBannerClickable`  | `boolean`                     | `true`      | Make entire banner clickable          |
| `dismissFeedbackModal` | `boolean`                     | `true`      | Allow users to dismiss feedback modal |
| `feedbackType`         | `'emoji' \| 'text' \| 'both'` | `'both'`    | Type of feedback to collect           |
| `styles`               | `Record<string, string>`      | `{}`        | Custom CSS styles                     |
| `className`            | `string`                      | `''`        | Additional CSS classes                |
| `onBannerClick`        | `function`                    | `undefined` | Custom banner click handler           |

### WeReleaseUser

| Property | Type     | Required | Description                  |
| -------- | -------- | -------- | ---------------------------- |
| `id`     | `string` | ✅       | Unique user identifier       |
| `email`  | `string` | ❌       | User's email address         |
| `name`   | `string` | ❌       | User's display name          |
| `[key]`  | `any`    | ❌       | Additional custom properties |

## API Reference

### Instance Methods

#### `init(config: WeReleaseConfig): Promise<void>`

Initialize the SDK instance with configuration.

#### `showBanner(): void`

Display the changelog banner in the configured target.

#### `askForFeedback(options?: WeReleaseFeedbackOptions): void`

Trigger the feedback collection modal.

#### `identify(userData: WeReleaseUser): Promise<void>`

Map the current anonymous session to the provided user.

#### `hasFeedbackBeenSubmitted(): boolean`

Check if feedback has already been submitted for the current changelog.

#### `resetFeedbackStatus(): boolean`

Reset the feedback submission status (useful for testing).

#### `getProjectId(): string | undefined`

Get the current project ID.

#### `getUser(): WeReleaseUser | null`

Get the current user data.

#### `getTarget(): string`

Get the current target selector.

#### `getOptions()`

Get a copy of the current options.

### Static Methods

#### `WeRelease.init(config: WeReleaseConfig): WeReleaseInstance`

Initialize the SDK and return an instance. This is the only static method available.

## Advanced Usage

### Multiple Instances

```javascript
import { WeRelease } from '@werelease/sdk';

// Create multiple instances for different projects
const project1 = WeRelease.init({
  projectId: 'project-1',
  target: '#banner-1',
});

const project2 = WeRelease.init({
  projectId: 'project-2',
  target: '#banner-2',
});

// Each instance maintains its own state
project1.showBanner();
project2.askForFeedback();
```

### Custom Event Handlers

```javascript
const werelease = WeRelease.init({
  projectId: 'your-project-id',
  options: {
    onBannerClick: (event, data) => {
      console.log('Banner clicked:', data);
      // Custom logic here
    },
  },
});
```

### Feedback Options

```javascript
// Override default feedback settings
werelease.askForFeedback({
  dismiss: false, // Prevent modal dismissal
  type: 'emoji', // Only collect emoji reactions
});
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Development

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

### Development Server

```bash
npm run dev
```

## License

MIT License - see [LICENSE](LICENSE) for details.

## Support

For support and questions, please visit our [documentation](https://werelease.com/docs) or contact us at support@werelease.com.
