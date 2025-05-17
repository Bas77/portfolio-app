'use client'
import { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export default function PreloadModels() {
  useEffect(() => {
    // Safe to preload in the browser only
    useGLTF.preload('/model/miyu/scene.gltf')
  }, [])

  return null 
}