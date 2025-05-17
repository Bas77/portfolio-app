"use client"
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import Head from 'next/head'

function MiyuModel() {
  const { scene } = useGLTF('/model/miyu/scene.gltf')
  return <primitive object={scene} scale={0.5} />
}

export default function MiyuPage() {
  return (
    <>
      <Head>
        <title>Miyu 3D Model</title>
      </Head>
      <div className="h-screen w-screen cursor-grab">
        <Canvas camera={{ position: [0, 1, 1], fov: 60 }}>
          <ambientLight />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <MiyuModel />
          <OrbitControls />
        </Canvas>
      </div>
    </>
  )
}
