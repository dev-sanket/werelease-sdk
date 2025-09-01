# WeRelease SDK React Example

This is a comprehensive React example that demonstrates how to integrate the **WeRelease SDK** into a React application. The example showcases all major features including changelog banners, feedback collection, and user identification.

## 🚀 Features Demonstrated

- **SDK Initialization**: Proper setup and configuration
- **Changelog Banners**: Automatic display of release updates
- **Feedback Collection**: Multiple feedback types (emoji, text, both)
- **User Identification**: Login/logout functionality
- **Real-time Status**: Live SDK status monitoring
- **Error Handling**: Comprehensive error handling and display
- **Responsive Design**: Mobile-friendly interface

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **WeRelease SDK** (local package)
- **Modern CSS** with CSS variables and responsive design
- **Dark Mode Support** (system preference)

## 📦 Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Install local WeRelease SDK**:
   ```bash
   npm install ../../../packages/sdk
   ```

## 🚀 Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 📱 How to Use

### 1. SDK Initialization
The SDK automatically initializes when the component mounts with a demo project ID:

```typescript
const instance = await WeRelease.init({
  projectId: 'demo-project-123',
  target: '#changelog-banner',
  options: {
    showDismissButton: true,
    makeBannerClickable: true,
    dismissFeedbackModal: true,
    feedbackType: 'both',
    styles: {
      '--werelease-primary-color': '#3b82f6',
      '--werelease-secondary-color': '#1e40af',
    }
  }
});
```

### 2. User Management
- Click "Login User" to simulate user authentication
- Click "Logout User" to clear user session
- User data is automatically sent to WeRelease for analytics

### 3. Feedback Collection
- **Request Feedback (Both)**: Collects both emoji reactions and text comments
- **Request Feedback (Emoji)**: Only collects emoji reactions
- **Request Feedback (Text)**: Only collects text comments

### 4. Banner Management
- The changelog banner automatically appears in the designated area
- Use "Refresh Banner" to force a banner refresh
- Banner dismissal is handled automatically

## 🎨 Customization

### Colors
The example uses CSS variables for easy customization:

```css
:root {
  --primary-color: #3b82f6;
  --primary-dark: #1e40af;
  --secondary-color: #64748b;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
  --info-color: #06b6d4;
}
```

### SDK Styling
Customize the WeRelease banner appearance:

```typescript
options: {
  styles: {
    '--werelease-primary-color': '#your-color',
    '--werelease-secondary-color': '#your-secondary-color',
  }
}
```

## 🔧 Troubleshooting

### Common Issues

1. **SDK not initializing**:
   - Check browser console for errors
   - Verify the local SDK package is installed
   - Ensure the project ID is valid

2. **TypeScript errors**:
   - The example includes type definitions in `src/types/werelease.d.ts`
   - Make sure TypeScript is properly configured

3. **Styling issues**:
   - Check if CSS variables are supported
   - Verify the target element exists in the DOM

### Debug Mode
Enable console logging to see detailed SDK operations:

```typescript
console.log('Initializing WeRelease SDK...');
console.log('WeRelease SDK initialized successfully:', instance);
```

## 📚 API Reference

The example demonstrates these WeRelease SDK methods:

- `WeRelease.init(config)` - Initialize the SDK
- `instance.identify(user)` - Set user information
- `instance.askForFeedback(options)` - Request user feedback
- `instance.refresh()` - Refresh the banner

## 🌐 Integration with Your App

To integrate WeRelease SDK into your React app:

1. **Install the package**:
   ```bash
   npm install @werelease/sdk
   ```

2. **Import and initialize**:
   ```typescript
   import { WeRelease } from '@werelease/sdk';
   
   const instance = await WeRelease.init({
     projectId: 'your-project-id',
     target: '#your-banner-target'
   });
   ```

3. **Use the instance methods**:
   ```typescript
   instance.identify(userData);
   instance.askForFeedback();
   ```

## 📄 License

This example is part of the WeRelease SDK project. See the main project for license information.

## 🤝 Support

For support and questions:
- Visit [werelease.app](https://werelease.app)
- Check the main SDK documentation
- Review the source code for implementation details

---

**Happy coding! 🎉**
