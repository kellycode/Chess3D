//import * as THREE from 'three';
import { GLTFLoader } from "./lib/threes/r170/loaders/GLTFLoader.js";
import * as THREE from "three";

class Loading {
    constructor(THREE) {
        console.log("In constructor");
    }

    static init() {
        console.log("Loading inited");
        this.newLoadResources();
    }

    static newLoadResources() {
        let M_PRELOADS = [
            "3D/glb/knight.glb",
            "3D/glb/king.glb",
            "3D/glb/queen.glb",
            "3D/glb/bishop.glb",
            "3D/glb/rook.glb",
            "3D/glb/pawn.glb",
            "3D/glb/board.glb",
            "3D/glb/innerBoard.glb",
        ];

        let T_PRELOADS = [
            "texture/wood-0.jpg",
            "texture/wood-1.jpg",
            "texture/wood_N.jpg",
            "texture/wood_S.jpg",
            "texture/knight-ao.jpg",
            "texture/rook-ao.jpg",
            "texture/king-ao.jpg",
            "texture/bishop-ao.jpg",
            "texture/queen-ao.jpg",
            "texture/pawn-ao.jpg",
            "texture/floor.jpg",
            "texture/floor_N.jpg",
            "texture/floor_S.jpg",
            "texture/fakeShadow.jpg",
        ];
        // counter
        let loaded = 0;

        function setModelPreloadCompletions(result, index) {
            //set the path as user data
            result.userData["path"] = M_PRELOADS[index];
            loaded++;
            checkLoad(M_PRELOADS[index]);
        }

        function setTexturePreloadCompletions(result, index) {
            //set the path as user data
            result.userData["path"] = T_PRELOADS[index];
            loaded++;
            checkLoad(T_PRELOADS[index]);
        }

        function doSomething(t) {
            console.log(t);
        }

        function preloadModels() {
            let gltfLoader = new GLTFLoader();
            let modelPromises = [];

            M_PRELOADS.forEach((path) => {
                modelPromises.push(gltfLoader.loadAsync(path));
            });

            Promise.all(modelPromises)
                .then((results) => {
                    // models returned in same order as requested
                    results.forEach(function(result, index) {
                        setModelPreloadCompletions(result, index)
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        function preloadTextures() {
            let textureLoader = new THREE.TextureLoader();
            let texturePromises = [];

            T_PRELOADS.forEach((path) => {
                texturePromises.push(textureLoader.load(path));
            });

            Promise.all(texturePromises)
                .then((results) => {
                    // models returned in same order as requested
                    results.forEach(setTexturePreloadCompletions);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        preloadModels();
        preloadTextures();

        // control the progressBar
        function checkLoad(url) {
            let resourceCount = T_PRELOADS.length + M_PRELOADS.length;
            console.log("checkLoad " + url + " loaded");
            console.log(loaded + " : " + resourceCount);
            if (loaded === resourceCount) {
                console.log("Done loading " + loaded + " resources");
                //setTimeout(onLoaded,0.1);
            }
        }
    }
}

export { Loading };
