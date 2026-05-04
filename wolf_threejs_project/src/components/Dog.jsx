import React from "react";
import { useThree } from "@react-three/fiber";
const Dog = () => {
  useThree(({ camera, scene, gl }) => {
    console.log(camera.position);
  });
  return (
    <mesh>
      <meshBasicMaterial color={0x00ff00} />
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
};

export default Dog;
