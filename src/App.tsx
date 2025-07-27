import { useState } from 'react'
import { tweetsFromPost } from './claude'

function App() {
  const [inputText, setInputText] = useState('')
  const [tweets, setTweets] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleRemix = async () => {
    if (!inputText.trim()) return
    setIsLoading(true)
    setError(null)
    try {
      const response = await tweetsFromPost(inputText)
      // Parse the response to extract individual tweets
      const tweetArray = response.split('---TWEET---').map(tweet => tweet.trim()).filter(tweet => tweet.length > 0)
      setTweets(tweetArray)
    } catch (err: any) {
      setError(err.message || 'An error occurred while remixing.')
      setTweets([])
    } finally {
      setIsLoading(false)
    }
  }

  const openTwitterWithTweet = (tweet: string) => {
    const encodedTweet = encodeURIComponent(tweet)
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTweet}`
    window.open(twitterUrl, '_blank')
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'white', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ 
          fontSize: '5rem', 
          fontWeight: 'bold', 
          color: 'black',
          margin: '0 0 10px 0'
        }}>
          Content Remixer
        </h1>
        <p style={{ 
          fontSize: '1rem', 
          color: 'black',
          margin: '0'
        }}>
          Transform your content with AI-powered remixing
        </p>
      </div>

      {/* Input Field */}
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto 30px auto',
        textAlign: 'center'
      }}>
        <textarea
          style={{
            width: '100%',
            height: '120px',
            padding: '15px',
            border: '1px solid #333',
            borderRadius: '0',
            fontSize: '16px',
            fontFamily: 'Arial, sans-serif',
            resize: 'none'
          }}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your content here..."
        />
      </div>

      {/* Remix Button */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <button
          onClick={handleRemix}
          disabled={isLoading || !inputText.trim()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            color: '#333',
            fontSize: '16px',
            cursor: 'pointer',
            fontFamily: 'Arial, sans-serif'
          }}
        >
          {isLoading ? 'Remixing...' : 'Remix Content'}
        </button>
      </div>

      {/* Large Lightning Bolt Icon */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '30px'
      }}>
        <svg 
          width="200" 
          height="200" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#ccc" 
          strokeWidth="1"
          style={{ margin: '0 auto' }}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M13 10V3L4 14h7v7l9-11h-7z" 
          />
        </svg>
      </div>

      {/* Tweets Display */}
      {tweets.length > 0 && (
        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto 30px auto'
        }}>
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '1.5rem', 
            marginBottom: '20px',
            color: 'black'
          }}>
            Generated Tweets
          </h2>
          <div style={{ display: 'grid', gap: '15px' }}>
            {tweets.map((tweet, index) => (
              <div
                key={index}
                style={{
                  padding: '15px',
                  border: '1px solid #ddd',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '5px',
                  fontSize: '16px',
                  lineHeight: '1.4',
                  fontFamily: 'Arial, sans-serif',
                  position: 'relative'
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '10px'
                }}>
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#666', 
                    fontWeight: 'bold'
                  }}>
                    Tweet {index + 1}
                  </div>
                  <button
                    onClick={() => openTwitterWithTweet(tweet)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#1DA1F2',
                      border: '1px solid #1DA1F2',
                      borderRadius: '3px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      color: 'white',
                      fontFamily: 'Arial, sans-serif'
                    }}
                  >
                    Tweet
                  </button>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  {tweet}
                </div>
                <div style={{ 
                  fontSize: '11px', 
                  color: '#999',
                  textAlign: 'right'
                }}>
                  {tweet.length} characters
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div style={{ 
          textAlign: 'center', 
          color: 'red',
          fontSize: '14px',
          marginTop: '20px'
        }}>
          {error}
        </div>
      )}
    </div>
  )
}

export default App 