import { useState } from 'react'
import { tweetsFromPost } from './claude'

function App() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleRemix = async () => {
    if (!inputText.trim()) return
    setIsLoading(true)
    setError(null)
    try {
      const remixedText = await tweetsFromPost(inputText)
      setOutputText(remixedText)
    } catch (err: any) {
      setError(err.message || 'An error occurred while remixing.')
      setOutputText('')
    } finally {
      setIsLoading(false)
    }
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

      {/* Output Field */}
      {outputText && (
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
              resize: 'none',
              backgroundColor: '#f9f9f9'
            }}
            value={outputText}
            readOnly
            placeholder="Remixed content will appear here..."
          />
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