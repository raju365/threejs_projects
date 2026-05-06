import { useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Dog = () => {
  const { scene } = useGLTF("/models/dog.drc.glb");
  useThree(({ camera, scene, gl })=>{
    camera.position.z = 2;
    
  });
  return (
    <>
      <primitive object={scene} position={[0, 0, 0]}  />
      <directionalLight position={[0, 5, 5]} color={0xffffff} intensity={10} />
      <OrbitControls />
    </>
  );
};

export default Dog;
