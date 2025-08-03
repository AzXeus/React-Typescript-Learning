import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react'

const DataVisualizationChallenge: React.FC = () => {
  return (
    <article className="section">
      <div className="challenge">
        <h3>🎯 Advanced Challenge 2: Interactive Data Visualization</h3>
        <p><strong>Your mission:</strong> Build a powerful data visualization dashboard with multiple chart types, real-time filtering, and performance optimization.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', margin: '15px 0' }}>
          <div>
            <h4>Visualization Features:</h4>
            <ul>
              <li>✅ Multiple chart types (bar, line, pie, scatter)</li>
              <li>✅ Interactive chart switching</li>
              <li>✅ Smooth animations between chart types</li>
              <li>✅ Hover tooltips with detailed info</li>
              <li>✅ Click to highlight data points</li>
              <li>✅ Zoom and pan functionality</li>
              <li>✅ Responsive design (adapts to container)</li>
            </ul>
          </div>
          <div>
            <h4>Data Management:</h4>
            <ul>
              <li>✅ Real-time data filtering</li>
              <li>✅ Category-based filtering</li>
              <li>✅ Date range selection</li>
              <li>✅ Multi-column sorting</li>
              <li>✅ Search functionality</li>
              <li>✅ Data export (CSV/JSON)</li>
              <li>✅ Performance optimization for large datasets</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px', border: '2px dashed #ccc', minHeight: '600px' }}>
        <h4>Your Data Visualization Dashboard Goes Here</h4>
        <p style={{ textAlign: 'center', color: '#666', marginTop: '50px' }}>
          📊 Implement interactive charts with SVG/Canvas<br/>
          🎛️ Add filtering and sorting controls<br/>
          📈 Create smooth animations and transitions
        </p>
      </div>

      <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
        <strong>Advanced Concepts to Use:</strong>
        <ul>
          <li><strong>Custom Hooks:</strong> useChart, useDataFilter, useAnimation</li>
          <li><strong>Performance:</strong> useMemo for calculations, virtual scrolling</li>
          <li><strong>SVG/Canvas:</strong> Custom chart rendering</li>
          <li><strong>Complex State:</strong> Chart config, filters, animations</li>
        </ul>
      </div>
    </article>
  )
}

export default DataVisualizationChallenge