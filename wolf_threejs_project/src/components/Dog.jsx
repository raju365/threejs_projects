import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useGLTF, useTexture, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Dog = () => {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
  const model = useGLTF("/models/dog.drc.glb");

  useThree(({ camera, scene, gl }) => {
    camera.position.z = 0.7;
    gl.toneMapping = THREE.ReinhardToneMapping;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  });
  const { actions } = useAnimations(model.animations, model.scene);

  useEffect(() => {
    actions["Take 001"].play();
  }, [actions]);

  const [normalMap] = useTexture(["/dog_normals.jpg"]).map((texture) => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });
  const [branchMap, branchNormalMap] = useTexture([
    "/branches_diffuse.jpeg",
    "/branches_normals.jpeg",
  ]).map((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });
  const [
    mat1,
    mat2,
    mat3,
    mat4,
    mat5,
    mat6,
    mat7,
    mat8,
    mat9,
    mat10,
    mat11,
    mat12,
    mat13,
    mat14,
    mat15,
    mat16,
    mat17,
    mat18,
    mat19,
    mat20,
  ] = useTexture([
    "/matcap/mat-1.png",
    "/matcap/mat-2.png",
    "/matcap/mat-3.png",
    "/matcap/mat-4.png",
    "/matcap/mat-5.png",
    "/matcap/mat-6.png",
    "/matcap/mat-7.png",
    "/matcap/mat-8.png",
    "/matcap/mat-9.png",
    "/matcap/mat-10.png",
    "/matcap/mat-11.png",
    "/matcap/mat-12.png",
    "/matcap/mat-13.png",
    "/matcap/mat-14.png",
    "/matcap/mat-15.png",
    "/matcap/mat-16.png",
    "/matcap/mat-17.png",
    "/matcap/mat-18.png",
    "/matcap/mat-19.png",
    "/matcap/mat-20.png",
  ]).map((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });
  const material = useRef({
    uMatcap1: { value: mat12 },
    uMatcap2: { value: mat19 },
    uProgress: { value: 1.0 },
  });

  const dogMaterial = new THREE.MeshMatcapMaterial({
    normalMap: normalMap,
    matcap: mat2,
  });
  const branchMaterial = new THREE.MeshMatcapMaterial({
    normalMap: branchNormalMap,
    matcap: branchMap,
  });

  function onBeforeCompile(shader) {
    

    shader.uniforms.uMatcapTexture1 = material.current.uMatcap1;
    shader.uniforms.uMatcapTexture2 = material.current.uMatcap2;
    shader.uniforms.uProgress = material.current.uProgress;

    // store reference to shader uniform for GSAP animation
    shader.fragmentShader = shader.fragmentShader.replace(
      "void main() {",
      `
  uniform sampler2D uMatcapTexture1;
  uniform sampler2D uMatcapTexture2;
  uniform float uProgress;

  void main() {
  `,
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      "vec4 matcapColor = texture2D( matcap, uv );",
      `
  vec4 matcapColor1 = texture2D(uMatcapTexture1, uv);
  vec4 matcapColor2 = texture2D(uMatcapTexture2, uv);

  vec4 matcapColor = mix(
    matcapColor1,
    matcapColor2,
    uProgress
  );
  `,
    );
  }

  dogMaterial.onBeforeCompile = onBeforeCompile;

  model.scene.traverse((child) => {
    if (child.name.includes("DOG")) {
      child.material = dogMaterial;
    } else {
      child.material = branchMaterial;
    }
  });

  const dogModel = useRef(model);

  // using gsap here to create a scroll-triggered animation for the dog model
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#section1",
        endTrigger: "#section3",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        markers: true,
      },
    });
    tl.to(dogModel.current.scene.position, {
      z: "-=0.75",
      y: "+=0.1",
    })
      .to(dogModel.current.scene.rotation, {
        y: `+=${Math.PI / 15}`,
      })
      .to(
        dogModel.current.scene.rotation,
        {
          y: `-=${Math.PI}`,
          x: `+=${Math.PI / 15}`,
        },
        "third",
      )
      .to(
        dogModel.current.scene.position,
        {
          x: "-=0.5",
          z: "+=0.6",
          y: "-=0.01",
        },
        "third",
      );
  }, []);
  return (
    <>
      <primitive
        object={model.scene}
        position={[0.25, -0.4, 0]}
        rotation={[0, Math.PI / 3.7, 0]}
      />
      <directionalLight position={[0, 2, 2]} color={0xffffff} intensity={10} />
    </>
  );
};

export default Dog;
