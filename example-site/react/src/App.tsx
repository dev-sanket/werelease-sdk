import { useEffect, useState, useRef } from 'react'
import { WeRelease } from '@werelease/sdk'
import type { WeReleasePublicAPI, WeReleaseUser } from '@werelease/sdk'
import './App.css'

function App() {
  const [werelease, setWerelease] = useState<WeReleasePublicAPI | null>(null)
  const [user, setUser] = useState<WeReleaseUser | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const initRef = useRef(false)

  useEffect(() => {
    // Prevent multiple initializations using ref
    if (initRef.current) return
    initRef.current = true


    // Initialize WeRelease SDK when component mounts

    initWeRelease()
  }, [])

  const initWeRelease = async () => {
    try {
      console.log('Initializing WeRelease SDK...')

      const instance = await WeRelease.init({
        projectId: '4f3bbcb8-6aeb-4d3a-8c17-72d5796474e7', // Demo project ID
        target: '#changelog-banner',
        options: {
          showDismissButton: true,
          makeBannerClickable: true,
          dismissFeedbackModal: true,
          feedbackType: 'both',
        }
      })

      console.log('WeRelease SDK initialized successfully')
      setWerelease(instance)
      setIsInitialized(true)
      setError(null)
    } catch (err) {
      console.error('Failed to initialize WeRelease:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }
  // Handle user login
  const handleUserLogin = () => {
    if (!werelease) return

    const demoUser: WeReleaseUser = {
      id: 'user-123',
      email: 'demo@example.com',
      name: 'Demo User',
      role: 'developer'
    }

    try {
      werelease.identify(demoUser)
      setUser(demoUser)
      console.log('User identified:', demoUser)
    } catch (err) {
      console.error('Failed to identify user:', err)
    }
  }

  // Handle feedback request
  const handleFeedback = (type: 'emoji' | 'text' | 'both' = 'both') => {
    if (!werelease) return

    try {
      werelease.askForFeedback({
        type,
        dismiss: false,
      })
      console.log('Feedback requested with type:', type)
    } catch (err) {
      console.error('Failed to request feedback:', err)
    }
  }

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1>WeRelease SDK React Example</h1>
          <p>Demonstrating changelog banners, feedback collection, and user identification</p>
        </header>

        <main className="app-main">
          {/* Status Section */}
          <section className="status-section">
            <h2>SDK Status</h2>
            <div className="status-grid">
              <div className="status-item">
                <span className="status-label">Initialized:</span>
                <span className={`status-value ${isInitialized ? 'success' : 'pending'}`}>
                  {isInitialized ? '✅ Yes' : '⏳ No'}
                </span>
              </div>
              <div className="status-item">
                <span className="status-label">User:</span>
                <span className={`status-value ${user ? 'success' : 'pending'}`}>
                  {user ? `✅ ${user.name}` : '⏳ Not logged in'}
                </span>
              </div>
              {error && (
                <div className="status-item">
                  <span className="status-label">Error:</span>
                  <span className="status-value error">❌ {error}</span>
                </div>
              )}
            </div>
          </section>

          {/* Controls Section */}
          <section className="controls-section">
            <h2>SDK Controls</h2>
            <div className="controls-grid">
              <div className="control-group">
                <h3>User Management</h3>
                <div className="button-group">
                  {!user ? (
                    <button
                      onClick={handleUserLogin}
                      disabled={!isInitialized}
                      className="btn btn-primary"
                    >
                      Login User
                    </button>
                  ) : (
                    <button
                      className="btn btn-secondary"
                    >
                      Logout User
                    </button>
                  )}
                </div>
              </div>

              <div className="control-group">
                <h3>Feedback Collection</h3>
                <div className="button-group">
                  <button
                    onClick={() => handleFeedback('both')}
                    disabled={!isInitialized}
                    className="btn btn-success"
                  >
                    Request Feedback (Both)
                  </button>
                  <button
                    onClick={() => handleFeedback('emoji')}
                    disabled={!isInitialized}
                    className="btn btn-info"
                  >
                    Request Feedback (Emoji)
                  </button>
                  <button
                    onClick={() => handleFeedback('text')}
                    disabled={!isInitialized}
                    className="btn btn-warning"
                  >
                    Request Feedback (Text)
                  </button>
                </div>
              </div>

              <div className="control-group">
                <h3>Banner Management</h3>
                <div className="button-group">
                  <button
                    onClick={() => werelease?.showBanner()}
                    disabled={!isInitialized}
                    className="btn btn-success"
                  >
                    Show Banner
                  </button>

                </div>
              </div>
            </div>
          </section>

          {/* WeRelease Banner Target */}
          <section className="banner-section">
            <h2>Changelog Banner</h2>
            <p>WeRelease will automatically display the changelog banner here:</p>
            <div id="changelog-banner">
              {!isInitialized && (
                <div className="banner-placeholder">
                  <p>Initializing WeRelease SDK...</p>
                </div>
              )}
            </div>
          </section>

          {/* Information Section */}
          <section className="info-section">
            <h2>How It Works</h2>
            <div className="info-grid">
              <div className="info-item">
                <h3>🚀 Changelog Banners</h3>
                <p>Automatically displays release updates with customizable themes (Basic & Premium)</p>
              </div>
              <div className="info-item">
                <h3>💬 Feedback Collection</h3>
                <p>Gather user feedback through emoji reactions and text comments</p>
              </div>
              <div className="info-item">
                <h3>👤 User Identification</h3>
                <p>Map anonymous sessions to authenticated users for better analytics</p>
              </div>
              <div className="info-item">
                <h3>🎨 Customizable UI</h3>
                <p>Support for both basic and premium themes with custom styling</p>
              </div>
            </div>
          </section>
        </main>

        <footer className="app-footer">
          <p>This is a demo of the <strong>WeRelease SDK</strong> - The official SDK for changelog banners and feedback collection</p>
          <p>Visit <a href="https://werelease.app" target="_blank" rel="noopener noreferrer">werelease.app</a> for more information</p>
        </footer>
      </div>
    </div>
  )
}

export default App
