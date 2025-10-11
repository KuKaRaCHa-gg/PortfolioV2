import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function AdvancedThreeScene() {
  const mountRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    })
    
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.setClearColor(0x000000, 0.5)
    mountRef.current.appendChild(renderer.domElement)

    // Camera position
    camera.position.z = 30

    // Système de particules
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 2000
    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.15,
      color: 0x00FF00,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Torus géométrique principal
    const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100)
    const torusMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00FF00,
      wireframe: true 
    })
    const torus = new THREE.Mesh(torusGeometry, torusMaterial)
    scene.add(torus)

    // Icosaèdre secondaire
    const icoGeometry = new THREE.IcosahedronGeometry(5, 0)
    const icoMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00FF00,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    })
    const ico = new THREE.Mesh(icoGeometry, icoMaterial)
    ico.position.x = 15
    scene.add(ico)

    // Sphère tertiaire
    const sphereGeometry = new THREE.SphereGeometry(4, 32, 32)
    const sphereMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00FF00,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.position.x = -15
    scene.add(sphere)

    // Mouse tracking
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Raycaster pour interactions
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const handleClick = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects([torus, ico, sphere])
      
      if (intersects.length > 0) {
        // Animation de "pulse" sur clic
        const obj = intersects[0].object
        const originalScale = obj.scale.clone()
        obj.scale.set(1.2, 1.2, 1.2)
        setTimeout(() => {
          obj.scale.copy(originalScale)
        }, 200)
      }
    }

    window.addEventListener('click', handleClick)

    // Animation loop
    let animationId
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Rotation des objets principaux
      torus.rotation.x += 0.01
      torus.rotation.y += 0.01
      torus.rotation.z += 0.005

      ico.rotation.x -= 0.008
      ico.rotation.y += 0.012

      sphere.rotation.y += 0.015
      sphere.rotation.z += 0.01

      // Rotation des particules
      particlesMesh.rotation.y += 0.0005
      particlesMesh.rotation.x += 0.0003

      // Effet parallaxe avec la souris
      camera.position.x += (mouseRef.current.x * 5 - camera.position.x) * 0.05
      camera.position.y += (mouseRef.current.y * 5 - camera.position.y) * 0.05
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }

    animate()

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current) return
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
      }
      scene.clear()
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={mountRef} 
      className="three-scene-advanced"
      style={{ width: '100%', height: '500px', position: 'relative' }}
    />
  )
}
