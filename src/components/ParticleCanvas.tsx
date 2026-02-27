import { Canvas } from '@react-three/fiber'
import { ParticleField } from './ParticleField'

interface ParticleCanvasProps {
  mouse: React.MutableRefObject<{ x: number; y: number }>
}

export default function ParticleCanvas({ mouse }: ParticleCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['#0a0a0b']} />
      <fog attach="fog" args={['#0a0a0b', 5, 15]} />
      <ambientLight intensity={0.1} />
      <ParticleField mouse={mouse} />
    </Canvas>
  )
}
