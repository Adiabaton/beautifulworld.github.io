import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'

const GradientEditor = ({ gradient, onChange }) => {
  const [newColor, setNewColor] = useState('#667eea')

  const addColor = () => {
    onChange({ colors: [...gradient.colors, newColor] })
  }

  const removeColor = (index) => {
    onChange({ colors: gradient.colors.filter((_, i) => i !== index) })
  }

  const updateColor = (index, value) => {
    const newColors = [...gradient.colors]
    newColors[index] = value
    onChange({ colors: newColors })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-gray-400 mb-2">Colors</label>
        <div className="space-y-2">
          {gradient.colors.map((color, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="color"
                value={color}
                onChange={(e) => updateColor(index, e.target.value)}
                className="w-12 h-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => updateColor(index, e.target.value)}
                className="flex-1 bg-gray-800 rounded px-3 py-2 text-sm"
              />
              {gradient.colors.length > 2 && (
                <button
                  onClick={() => removeColor(index)}
                  className="p-2 text-red-400 hover:bg-red-400/20 rounded"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <input
            type="color"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            className="w-12 h-10 rounded cursor-pointer"
          />
          <button
            onClick={addColor}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            <Plus size={16} />
            Add Color
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2">Angle: {gradient.angle}°</label>
        <input
          type="range"
          min="0"
          max="360"
          value={gradient.angle}
          onChange={(e) => onChange({ angle: parseInt(e.target.value) })}
          className="w-full"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="animated"
          checked={gradient.animated}
          onChange={(e) => onChange({ animated: e.target.checked })}
          className="w-4 h-4"
        />
        <label htmlFor="animated" className="text-sm text-gray-300">Animated Gradient</label>
      </div>

      <div
        className="h-20 rounded-lg"
        style={{
          background: `linear-gradient(${gradient.angle}deg, ${gradient.colors.join(', ')})`,
          backgroundSize: gradient.animated ? '400% 400%' : '100% 100%',
          animation: gradient.animated ? 'gradientShift 3s ease infinite' : 'none',
        }}
      />
    </div>
  )
}

export default GradientEditor
