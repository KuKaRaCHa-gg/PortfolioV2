import React, { useState } from 'react'

// Composant galerie d'images pour les projets
export default function ImageGallery({ images = [] }) {
  const [selectedImage, setSelectedImage] = useState(null)

  if (!images || images.length === 0) {
    return (
      <div className="image-gallery-placeholder">
        <p>[ Images à venir ]</p>
      </div>
    )
  }

  return (
    <div className="image-gallery">
      <div className="gallery-grid">
        {images.map((img, i) => (
          <div 
            key={i} 
            className="gallery-thumbnail"
            onClick={() => setSelectedImage(img)}
          >
            <img 
              src={img.url} 
              alt={img.alt || `Screenshot ${i + 1}`}
              loading="lazy"
            />
            <div className="thumbnail-overlay">
              <span>🔍 Voir</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal pour image en grand */}
      {selectedImage && (
        <div className="modal image-modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-inner" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedImage(null)}>×</button>
            <img 
              src={selectedImage.url} 
              alt={selectedImage.alt}
              style={{maxWidth: '100%', maxHeight: '80vh'}}
            />
            {selectedImage.caption && (
              <p className="image-caption">{selectedImage.caption}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
