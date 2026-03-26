import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const NODES = [
  { id: 'portfolio', label: 'Portfolio', route: 'home', shape: 'knot', color: 0x39ff8d, hub: true },
  { id: 'about', label: 'A Propos', route: 'about', shape: 'icosa', color: 0x62e2ff },
  { id: 'projects', label: 'Projets', route: 'projects', shape: 'box', color: 0x4aa3ff },
  { id: 'tools', label: 'Outils & Jeux', route: 'tools', shape: 'cone', color: 0xffbf47 },
  { id: 'blog', label: 'Blog', route: 'blog', shape: 'octa', color: 0xff79cf },
  { id: 'contact', label: 'Contact', route: 'contact', shape: 'dodeca', color: 0x8cff84 }
]

const SUB_NODES = [
  { id: 'about-a', parent: 'about', color: 0x49d5ff },
  { id: 'about-b', parent: 'about', color: 0x8be8ff },
  { id: 'projects-a', parent: 'projects', color: 0x3c8fff },
  { id: 'projects-b', parent: 'projects', color: 0x6cadff },
  { id: 'tools-a', parent: 'tools', color: 0xffd76d },
  { id: 'tools-b', parent: 'tools', color: 0xfff1a6 },
  { id: 'blog-a', parent: 'blog', color: 0xff94db },
  { id: 'blog-b', parent: 'blog', color: 0xffb6e8 },
  { id: 'contact-a', parent: 'contact', color: 0xa7ff9f },
  { id: 'contact-b', parent: 'contact', color: 0xc8ffc3 }
]

const LINKS = [
  ['portfolio', 'about'],
  ['portfolio', 'projects'],
  ['portfolio', 'tools'],
  ['portfolio', 'blog'],
  ['portfolio', 'contact'],
  ['about', 'contact'],
  ['projects', 'tools'],
  ['projects', 'blog'],
  ['tools', 'contact'],
  ['blog', 'contact']
]

function createNodeGeometry(shape) {
  switch (shape) {
    case 'box':
      return new THREE.BoxGeometry(1.4, 1.4, 1.4)
    case 'cone':
      return new THREE.ConeGeometry(0.95, 1.8, 12)
    case 'tetra':
      return new THREE.TetrahedronGeometry(1.08)
    case 'octa':
      return new THREE.OctahedronGeometry(1)
    case 'icosa':
      return new THREE.IcosahedronGeometry(1.25)
    case 'knot':
      return new THREE.TorusKnotGeometry(0.95, 0.24, 96, 14, 2, 3)
    case 'torus':
      return new THREE.TorusGeometry(0.9, 0.32, 14, 28)
    case 'dodeca':
      return new THREE.DodecahedronGeometry(1)
    case 'sphere':
    default:
      return new THREE.SphereGeometry(1, 20, 20)
  }
}

function createLabelSprite(label) {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 96
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  ctx.fillStyle = 'rgba(0, 0, 0, 0)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#d6ecff'
  ctx.font = 'bold 34px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.shadowColor = 'rgba(33, 123, 226, 0.9)'
  ctx.shadowBlur = 10
  ctx.fillText(label, canvas.width / 2, canvas.height / 2)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false
  })

  const sprite = new THREE.Sprite(material)
  sprite.scale.set(4.2, 1.6, 1)
  return sprite
}

export default function ObsidianGraph3D({ onNavigate, isPaused = false }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x1c4f86)

    const camera = new THREE.PerspectiveCamera(58, mount.clientWidth / mount.clientHeight, 0.1, 200)
    camera.position.set(0, 4, 26)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.enablePan = false
    controls.minDistance = 13
    controls.maxDistance = 42
    controls.target.set(0, 0, 0)

    const ambient = new THREE.AmbientLight(0xffffff, 0.38)
    const keyLight = new THREE.PointLight(0x54d9ff, 1.05, 140)
    keyLight.position.set(12, 15, 20)
    const fillLight = new THREE.PointLight(0xff5db9, 0.48, 120)
    fillLight.position.set(-10, -6, -12)
    const warmLight = new THREE.PointLight(0xffc44f, 0.42, 120)
    warmLight.position.set(0, 8, -18)

    scene.add(ambient, keyLight, fillLight, warmLight)

    const group = new THREE.Group()
    scene.add(group)

    const starsGeometry = new THREE.BufferGeometry()
    const starsCount = 1200
    const starPositions = new Float32Array(starsCount * 3)
    for (let i = 0; i < starsCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 120
      starPositions[i + 1] = (Math.random() - 0.5) * 70
      starPositions[i + 2] = (Math.random() - 0.5) * 120
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    const starsMaterial = new THREE.PointsMaterial({ color: 0xaed6ff, size: 0.13, transparent: true, opacity: 0.45 })
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    const nodeMeshes = {}
    const nodeLabels = {}
    const subNodeMeshes = {}

    NODES.forEach((node, index) => {
      const material = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: 0x052314,
        emissiveIntensity: node.hub ? 0.78 : 0.45,
        roughness: 0.35,
        metalness: 0.2
      })

      const mesh = new THREE.Mesh(createNodeGeometry(node.shape), material)
      mesh.userData = { ...node, index, baseScale: 1 }
      group.add(mesh)
      nodeMeshes[node.id] = mesh

      const wire = new THREE.MeshBasicMaterial({ color: node.color, wireframe: true, transparent: true, opacity: 0.5 })
      const wireMesh = new THREE.Mesh(createNodeGeometry(node.shape), wire)
      mesh.add(wireMesh)

      const label = createLabelSprite(node.label)
      if (label) {
        label.userData = { nodeId: node.id }
        scene.add(label)
        nodeLabels[node.id] = label
      }
    })

    SUB_NODES.forEach((node, idx) => {
      const geo = idx % 2 === 0 ? new THREE.TetrahedronGeometry(0.42) : new THREE.SphereGeometry(0.35, 10, 10)
      const mat = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: 0x042810,
        emissiveIntensity: 0.35,
        roughness: 0.45,
        metalness: 0.1
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.userData = { ...node, index: idx }
      group.add(mesh)
      subNodeMeshes[node.id] = mesh
    })

    const edgeMainMaterial = new THREE.LineBasicMaterial({ color: 0x2bcf72, transparent: true, opacity: 0.52 })
    const edgeMainGeometry = new THREE.BufferGeometry()
    const edgeMainPositions = new Float32Array(LINKS.length * 2 * 3)
    edgeMainGeometry.setAttribute('position', new THREE.BufferAttribute(edgeMainPositions, 3))
    const mainEdges = new THREE.LineSegments(edgeMainGeometry, edgeMainMaterial)
    group.add(mainEdges)

    const secondaryLinks = SUB_NODES.map((node) => [node.parent, node.id])
    const edgeSubMaterial = new THREE.LineBasicMaterial({ color: 0x51a7ff, transparent: true, opacity: 0.38 })
    const edgeSubGeometry = new THREE.BufferGeometry()
    const edgeSubPositions = new Float32Array(secondaryLinks.length * 2 * 3)
    edgeSubGeometry.setAttribute('position', new THREE.BufferAttribute(edgeSubPositions, 3))
    const subEdges = new THREE.LineSegments(edgeSubGeometry, edgeSubMaterial)
    group.add(subEdges)

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2(-10, -10)
    let hoveredId = null
    let pointerDown = { x: 0, y: 0 }

    const updatePointer = (event) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    }

    const onPointerMove = (event) => {
      updatePointer(event)
    }

    const onPointerLeave = () => {
      mouse.set(-10, -10)
      hoveredId = null
    }

    const onClick = (event) => {
      const distance = Math.hypot(event.clientX - pointerDown.x, event.clientY - pointerDown.y)
      if (distance > 6) return

      updatePointer(event)
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(Object.values(nodeMeshes), false)
      if (intersects.length > 0) {
        const targetRoute = intersects[0].object.userData.route
        if (targetRoute && onNavigate) {
          onNavigate(targetRoute)
        }
      }
    }

    const onPointerDown = (event) => {
      pointerDown = { x: event.clientX, y: event.clientY }
    }

    renderer.domElement.addEventListener('pointermove', onPointerMove)
    renderer.domElement.addEventListener('pointerleave', onPointerLeave)
    renderer.domElement.addEventListener('pointerdown', onPointerDown)
    renderer.domElement.addEventListener('click', onClick)

    const clock = new THREE.Clock()
    let animationId = 0

    const animate = () => {
      const t = clock.getElapsedTime()

      if (!isPaused) {
        NODES.forEach((node, i) => {
          const mesh = nodeMeshes[node.id]
          if (node.hub) {
            mesh.position.set(
              Math.cos(t * 0.2) * 0.5,
              Math.sin(t * 0.26) * 0.26,
              Math.sin(t * 0.21) * 0.48
            )
          } else {
            const angle = t * 0.1 + (i / NODES.length) * Math.PI * 2
            const orbitalRadius = 10.8 + Math.sin(t * 0.26 + i * 0.8) * 1.2

            mesh.position.set(
              Math.cos(angle) * orbitalRadius,
              Math.sin(t * 0.34 + i * 0.5) * 3.1,
              Math.sin(angle) * (orbitalRadius * 0.7)
            )
          }

          mesh.rotation.x += 0.003 + i * 0.0005
          mesh.rotation.y += 0.0036 + i * 0.0006
        })

        SUB_NODES.forEach((node, idx) => {
          const mesh = subNodeMeshes[node.id]
          const parent = nodeMeshes[node.parent]
          const phase = idx % 2 === 0 ? 0 : Math.PI
          const ringRadius = 2.5 + (idx % 3) * 0.5
          const angle = t * 0.22 + idx * 0.9 + phase

          mesh.position.set(
            parent.position.x + Math.cos(angle) * ringRadius,
            parent.position.y + Math.sin(angle * 1.4) * 0.7,
            parent.position.z + Math.sin(angle) * ringRadius * 0.75
          )

          mesh.rotation.x += 0.01
          mesh.rotation.y += 0.01
        })
      }

      const positions = edgeMainGeometry.attributes.position.array
      LINKS.forEach(([from, to], edgeIndex) => {
        const a = nodeMeshes[from].position
        const b = nodeMeshes[to].position
        const offset = edgeIndex * 6
        positions[offset] = a.x
        positions[offset + 1] = a.y
        positions[offset + 2] = a.z
        positions[offset + 3] = b.x
        positions[offset + 4] = b.y
        positions[offset + 5] = b.z
      })
      edgeMainGeometry.attributes.position.needsUpdate = true

      const subPositions = edgeSubGeometry.attributes.position.array
      secondaryLinks.forEach(([from, to], edgeIndex) => {
        const a = nodeMeshes[from].position
        const b = subNodeMeshes[to].position
        const offset = edgeIndex * 6
        subPositions[offset] = a.x
        subPositions[offset + 1] = a.y
        subPositions[offset + 2] = a.z
        subPositions[offset + 3] = b.x
        subPositions[offset + 4] = b.y
        subPositions[offset + 5] = b.z
      })
      edgeSubGeometry.attributes.position.needsUpdate = true

      Object.entries(nodeLabels).forEach(([nodeId, label]) => {
        const pos = nodeMeshes[nodeId].position
        label.position.set(pos.x, pos.y + 1.9, pos.z)
      })

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(Object.values(nodeMeshes), false)
      const newHoveredId = intersects.length > 0 ? intersects[0].object.userData.id : null

      if (hoveredId !== newHoveredId) {
        hoveredId = newHoveredId
      }

      NODES.forEach((node) => {
        const mesh = nodeMeshes[node.id]
        const isHovered = hoveredId === node.id
        const targetScale = isHovered ? 1.25 : 1
        mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.16)
        mesh.material.emissiveIntensity = isHovered ? 1.05 : node.hub ? 0.78 : 0.45
      })

      if (!isPaused) {
        group.rotation.y = Math.sin(t * 0.1) * 0.24
        stars.rotation.y += 0.00015
        stars.rotation.x += 0.00005
      }

      controls.update()

      renderer.render(scene, camera)
      animationId = requestAnimationFrame(animate)
    }

    animate()

    const onResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      renderer.domElement.removeEventListener('pointermove', onPointerMove)
      renderer.domElement.removeEventListener('pointerleave', onPointerLeave)
      renderer.domElement.removeEventListener('pointerdown', onPointerDown)
      renderer.domElement.removeEventListener('click', onClick)
      cancelAnimationFrame(animationId)
      controls.dispose()

      Object.values(nodeLabels).forEach((sprite) => {
        if (sprite.material.map) sprite.material.map.dispose()
        sprite.material.dispose()
      })

      Object.values(nodeMeshes).forEach((mesh) => {
        mesh.traverse((child) => {
          if (child.geometry) child.geometry.dispose()
          if (child.material) child.material.dispose()
        })
      })

      Object.values(subNodeMeshes).forEach((mesh) => {
        mesh.geometry.dispose()
        mesh.material.dispose()
      })

      starsGeometry.dispose()
      starsMaterial.dispose()
      edgeMainGeometry.dispose()
      edgeMainMaterial.dispose()
      edgeSubGeometry.dispose()
      edgeSubMaterial.dispose()
      renderer.dispose()

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [onNavigate, isPaused])

  return <div className="graph3d-canvas" ref={mountRef} />
}
