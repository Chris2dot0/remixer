import { useState } from 'react'

function App() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleRemix = async () => {
    if (!inputText.trim()) return

    setIsLoading(true)
    try {
      // TODO: Implement API call to remix content
      // For now, we'll just reverse the text as a placeholder
      const remixedText = inputText.split('').reverse().join('')
      setOutputText(remixedText)
    } catch (error) {
      console.error('Error remixing content:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Content Remixer</h1>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-2">
              Original Content
            </label>
            <textarea
              id="input"
              className="w-full h-48 p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your content here..."
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleRemix}
              disabled={isLoading || !inputText.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Remixing...' : 'Remix Content'}
            </button>
          </div>

          {outputText && (
            <div>
              <label htmlFor="output" className="block text-sm font-medium text-gray-700 mb-2">
                Remixed Content
              </label>
              <textarea
                id="output"
                className="w-full h-48 p-4 border border-gray-300 rounded-lg shadow-sm bg-white"
                value={outputText}
                readOnly
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App 