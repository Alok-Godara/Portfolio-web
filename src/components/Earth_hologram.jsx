import React, { useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model(props) {
  const group = React.useRef()
  const { nodes, materials, animations } = useGLTF('/earth_hologram.glb')
  const { actions,names } = useAnimations(animations, group)
  useEffect(() => {
    console.log(actions,names);
    actions[names[0]].reset().fadeIn(0.5).play();
  }, [actions, names]);
  // console.log(actions,names);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.007}>
          <group name="b10b0b2d3f0741fa8ef24abb7586b618fbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="earth" position={[0, 88.768, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                  <mesh name="earth_Material001_0" geometry={nodes.earth_Material001_0.geometry} material={materials['Material.001']} />
                </group>
                <group name="boards" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                  <mesh name="boards_metal_0" geometry={nodes.boards_metal_0.geometry} material={materials.metal} />
                  <mesh name="boards_Blue_Emission_0" geometry={nodes.boards_Blue_Emission_0.geometry} material={materials.Blue_Emission} />
                </group>
                <group name="rings" position={[0, 88.768, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={172.427}>
                  <mesh name="rings_Material006_0" geometry={nodes.rings_Material006_0.geometry} material={materials['Material.006']} />
                </group>
                <group name="Camera" position={[866.735, 607.999, -990.066]} rotation={[-Math.PI, -0.852, 2.709]} scale={100}>
                  <group name="Object_7" />
                </group>
                <group name="holo_room" position={[0, -66.659, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 40]}>
                  <mesh name="holo_room_metal4_0" geometry={nodes.holo_room_metal4_0.geometry} material={materials.metal4} />
                  <mesh name="holo_room_Purple_Emission_0" geometry={nodes.holo_room_Purple_Emission_0.geometry} material={materials.Purple_Emission} />
                  <mesh name="holo_room_Blue_Emission_0" geometry={nodes.holo_room_Blue_Emission_0.geometry} material={materials.Blue_Emission} />
                  <mesh name="holo_room_Orange_Emission_0" geometry={nodes.holo_room_Orange_Emission_0.geometry} material={materials.Orange_Emission} />
                  <mesh name="holo_room_Yellow_Emission_0" geometry={nodes.holo_room_Yellow_Emission_0.geometry} material={materials.Yellow_Emission} />
                  <mesh name="holo_room_metal_0" geometry={nodes.holo_room_metal_0.geometry} material={materials.metal} />
                  <mesh name="holo_room_metal2_0" geometry={nodes.holo_room_metal2_0.geometry} material={materials.metal2} />
                  <mesh name="holo_room_metal3_0" geometry={nodes.holo_room_metal3_0.geometry} material={materials.metal3} />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/earth_hologram.glb')
