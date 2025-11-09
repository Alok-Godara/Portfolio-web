import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"

useGLTF.preload("/robot_playground.glb");

export default function Model() {
  const group =useRef(null)
  const { nodes, materials, animations, scene } = useGLTF(
    "/robot_playground.glb"
  )
  const { actions, clips } = useAnimations(animations, scene)
  const scroll = useScroll()

  useEffect(() => {
    console.log(actions)
    console.log(clips)
    // clips[0].play().paused=false
    actions["Experiment"].play().paused = false
  }, [actions])
  // useFrame(() => {
  //   const scrollY = window.scrollY; // Get the current scroll position
  //   const maxScroll = document.body.scrollHeight - window.innerHeight; // Total scrollable height
  //   const scrollPercentage = Math.min(scrollY / maxScroll, 1); // Calculate scroll percentage (0 to 1)

  //   // Adjust the animation time based on scroll percentage
  //   if (actions['Experiment']) {
  //     actions['Experiment'].time = scrollPercentage * actions['Experiment'].getClip().duration;
  //   }
  // });
  // useFrame(() => {
  //   console.log(scroll.offset);
  //   actions["Experiment"].time = (actions["Experiment"].getClip().duration * scroll?.offset) / 4
  // })

  return (
    <group 
    ref={group} 
     scale={[1, 1, 1]}
    >
      <primitive object={scene} scale={0.5} />
    </group>
  )
}
