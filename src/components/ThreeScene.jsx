import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeScene(){
  const mountRef = useRef(null)

  useEffect(()=>{
    // Désactiver sur mobile pour performances
    const isMobile = window.innerWidth <= 768
    if (isMobile) return
    
    const mount = mountRef.current
    if (!mount) return
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true})
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    const geometry = new THREE.BoxGeometry(1,1,1)
    const material = new THREE.MeshBasicMaterial({color:0x33ff33})
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    camera.position.z = 3

    const onResize = ()=>{
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    let raf
    const animate = ()=>{
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }
    animate()

    return ()=>{
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      mount.removeChild(renderer.domElement)
    }
  },[])

  return <div ref={mountRef} style={{width:'100%',height:200}} />
}
