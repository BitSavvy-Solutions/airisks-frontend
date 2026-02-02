import { useState, useEffect } from 'react'
import './App.css'
import { fetchRisks } from './services/api'

function App() {
  const [risks, setRisks] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  // Function to load data
  const loadRisks = async (keyword) => {
    setLoading(true)
    try {
      const data = await fetchRisks(keyword)
      setRisks(data)
    } catch (error) {
      console.error("Error loading risks", error)
    } finally {
      setLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    loadRisks('')
  }, [])

  // Handle Search Input
  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    loadRisks(value) // In a real app, you might want to debounce this
  }

  return (
    <div className="app-container">
      <header>
        <h1>AI Risk Solutions Database</h1>
        <p className="subtitle">Identify the problem. Find the fix.</p>
      </header>

      <div className="search-section">
        <input 
          type="text" 
          placeholder="Search risks (e.g., 'Deepfakes', 'Bias')..." 
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <main>
        {loading ? (
          <div className="loading">Loading risks...</div>
        ) : (
          <div className="risk-grid">
            {risks.length > 0 ? (
              risks.map((risk) => (
                <div key={risk.id} className="risk-card">
                  <div className="card-header">
                    <h3>{risk.title}</h3>
                    <span className={`badge ${risk.severity.toLowerCase()}`}>
                      {risk.severity}
                    </span>
                  </div>
                  <p className="category">{risk.category}</p>
                  <p className="description">{risk.description}</p>
                  <button className="solution-btn">
                    View Solutions &rarr;
                  </button>
                </div>
              ))
            ) : (
              <p>No risks found matching "{searchTerm}"</p>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default App