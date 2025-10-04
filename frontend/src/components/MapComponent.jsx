import { useEffect, useRef } from 'react'

function MapComponent({ coordinates, onLocationSelect }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markerRef = useRef(null)

  useEffect(() => {
    // Cargar Leaflet CSS y JS
    const loadLeaflet = async () => {
      // Cargar CSS
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link')
        link.id = 'leaflet-css'
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        document.head.appendChild(link)
      }

      // Cargar JS
      if (!window.L) {
        const script = document.createElement('script')
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
        script.onload = initMap
        document.head.appendChild(script)
      } else {
        initMap()
      }
    }

    const initMap = () => {
      if (!mapRef.current || mapInstanceRef.current) return

      const defaultCenter = coordinates 
        ? [coordinates.lat, coordinates.lng] 
        : [-34.6037, -58.3816] // Buenos Aires por defecto

      // Crear mapa
      const map = window.L.map(mapRef.current).setView(defaultCenter, 12)

      // Agregar tiles de OpenStreetMap con estilo oscuro
      window.L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors © CARTO',
        maxZoom: 19
      }).addTo(map)

      // Crear icono personalizado
      const customIcon = window.L.divIcon({
        className: 'custom-marker',
        html: '<div style="background: #00ffff; width: 20px; height: 20px; border-radius: 50%; border: 3px solid #ff00ff; box-shadow: 0 0 10px rgba(0,255,255,0.8);"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      })

      // Agregar marcador
      const marker = window.L.marker(defaultCenter, {
        draggable: true,
        icon: customIcon
      }).addTo(map)

      mapInstanceRef.current = map
      markerRef.current = marker

      // Evento cuando se arrastra el marcador
      marker.on('dragend', (event) => {
        const position = event.target.getLatLng()
        onLocationSelect({
          lat: position.lat,
          lng: position.lng
        })
      })

      // Click en el mapa para mover el marcador
      map.on('click', (event) => {
        const { lat, lng } = event.latlng
        marker.setLatLng([lat, lng])
        onLocationSelect({ lat, lng })
      })
    }

    loadLeaflet()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Actualizar posición cuando cambian las coordenadas
  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current && coordinates) {
      const newPosition = [coordinates.lat, coordinates.lng]
      markerRef.current.setLatLng(newPosition)
      mapInstanceRef.current.setView(newPosition, 12)
    }
  }, [coordinates])

  return (
    <div 
      ref={mapRef} 
      className="w-full rounded border-2 border-pink-500/30"
      style={{ height: '300px' }}
    />
  )
}

export default MapComponent
