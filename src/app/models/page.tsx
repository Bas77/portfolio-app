'use client'
import { useState, Suspense, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import Head from "next/head"

function Model({
  modelPath,
  onLoad,
}: {
  modelPath: string
  onLoad: () => void
}) {
  const { scene } = useGLTF(modelPath)

  useEffect(() => {
    if (scene) {
      onLoad()
    }
  }, [scene, onLoad])

  return <primitive object={scene} scale={0.5} />
}

function LoaderOverlay() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 text-white">
      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function MiyuPage() {
  const models = [
    {
      name: "Miyu",
      path: "/model/miyu/scene.gltf",
      credit: "Miyu Model by MOMO_RUI",
      creditUrl: "https://sketchfab.com/3d-models/blue-archivekasumizawa-miyu-108d81dfd5a44dab92e4dccf0cc51a02",
    },
    {
      name: "Problem Solver 68",
      path: "/model/p68/scene.gltf",
      credit: "Problem Solver 68 by chained_tan",
      creditUrl: "https://sketchfab.com/3d-models/blue-archive-problem-solver-68-c54a20dc43404c0492362d192d2da96f",
    },
    {
      name: "Knight",
      path: "/model/knight/scene.gltf",
      credit: "The Forgotten Knight by dark_igorek",
      creditUrl: "https://sketchfab.com/3d-models/the-forgotten-knight-d14eb14d83bd4e7ba7cbe443d76a10fd",
    },
  ]

  const [selectedModel, setSelectedModel] = useState(models[0])
  const [loading, setLoading] = useState(true)

  return (
    <>
      <Head>
        <title>3D Model Viewer</title>
      </Head>

      {/* Model Switcher */}
      <div className="absolute top-4 left-4 z-50 bg-black/70 p-2 rounded shadow flex gap-2">
        {models.map((model) => (
          <button
            key={model.name}
            onClick={() => {
              setSelectedModel(model)
              setLoading(true)
            }}
            className={`px-3 py-1 rounded text-sm transition ${
              selectedModel.path === model.path
                ? "bg-white text-black"
                : "bg-[#121212] text-white hover:bg-gray-600"
            }`}
          >
            {model.name}
          </button>
        ))}
      </div>

      {/* Canvas */}
      <div className="h-screen w-screen cursor-grab">
        <Canvas camera={{ position: [0, 1, 1], fov: 60 }}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[2, 2, 2]} intensity={2} />
          <Suspense fallback={null}>
            <Model modelPath={selectedModel.path} onLoad={() => setLoading(false)} />
          </Suspense>
          <OrbitControls target={[0, 0.7, 0]} />
        </Canvas>
      </div>

      {/* Loader */}
      {loading && <LoaderOverlay />}

      {/* Credits */}
      <div className="fixed top-16 left-6 text-gray-400 text-sm z-50">
        <a
          href={selectedModel.creditUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {selectedModel.credit}
        </a>
      </div>
    </>
  )
}

