import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  useTexture,
  useAnimations,
} from "@react-three/drei";
import { useEffect } from "react";

const Dog = () => {
  const model  = useGLTF("/models/dog.drc.glb");

  useThree(({ camera, scene, gl }) => {
    camera.position.z = 1;
    gl.toneMapping = THREE.ReinhardToneMapping;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  });
  const { actions } = useAnimations(model.animations, model.scene);

  useEffect(() => {
    actions[ "Take 001" ].play()
  }, [actions]);

  

  const [normalMap, sampleCap] = useTexture([
    "/dog_normals.jpg",
    "/matcap/mat-2.png",
  ]).map((texture) => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });

  model.scene.traverse((child) => {
    if (child.name.includes("DOG")) {
      child.material = new THREE.MeshMatcapMaterial({
        normalMap: normalMap,
        matcap: sampleCap,
      });
    }
  });

  return (
    <>
      <primitive
        object={model.scene}
        position={[0.25, -0.4, 0]}
        rotation={[0, Math.PI / 3.5, 0]}
      />
      <directionalLight position={[0, 2, 2]} color={0xffffff} intensity={10} />
      <OrbitControls />
    </>
  );
};

export default Dog;
