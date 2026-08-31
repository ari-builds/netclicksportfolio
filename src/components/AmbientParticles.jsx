import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function Particles({ count = 300 }) {
  const mesh = useRef()
  const light = useRef()

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    const cyan = new THREE.Color("#00F2FF")
    const purple = new THREE.Color("#8B5CF6")
    const pink = new THREE.Color("#F472B6")
    const palette = [cyan, purple, pink]

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10

      const color = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b

      sizes[i] = Math.random() * 3 + 1
    }

    return { positions, colors, sizes }
  }, [count])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (!mesh.current) return

    const pos = mesh.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3 + 1] += Math.sin(t * 0.3 + i * 0.1) * 0.002
      pos[i3] += Math.cos(t * 0.2 + i * 0.05) * 0.001
    }
    mesh.current.geometry.attributes.position.needsUpdate = true

    if (light.current) {
      light.current.position.x = Math.sin(t * 0.5) * 5
      light.current.position.y = Math.cos(t * 0.3) * 3
    }
  })

  return (
    <>
      <pointLight ref={light} color="#8B5CF6" intensity={2} distance={15} />
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count}
            array={particles.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  )
}

export function AmbientParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0" style={{ opacity: 0.4 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Particles count={250} />
      </Canvas>
    </div>
  )
}
