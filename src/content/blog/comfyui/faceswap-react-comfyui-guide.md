---
title: 'Simple Guide to Face Swap in ComfyUI Using ReActor Node'
description: 'Learn how to install and use ReActor Node in ComfyUI for face swapping without complex Visual Studio setup'
pubDate: 'Apr 16 2025'
heroImage: '/images/blog/comfyui/faceswap/comfyui-faceswap-react.png'
featured: true
authors: ['Amal']
---


> For face swapping in ComfyUI, one of the most popular techniques is using the ReActor node. It's accurate, powerful, and helpful. However, face swapping means impersonating someone else's identity, so please use it responsibly. Unfortunately, many used it improperly, leading to its removal from the official GitHub repo. It later came back with a SFW checker. That works, but I had issues using it, so I prefer the original version available on Codeberg.

You can find the official guide online, but here's a simpler version to run it locally.

## Simple Guide to Installing ReActor Node in ComfyUI (Precompiled Insightface Method)

### What is ReActor Node?

ReActor Node is a tool for face swapping in ComfyUI, a node-based interface for Stable Diffusion. It allows face swaps in images or videos using AI. This guide avoids installing Visual Studio by using a precompiled Insightface package.

### Prerequisites

- Windows PC with a decent GPU
- ComfyUI installed (portable version preferred)
- Basic knowledge of files and Command Prompt
- Internet connection

### Step-by-Step Installation Guide

#### Step 1: Set Up ComfyUI

1. Download ComfyUI portable version from GitHub
2. Extract to a folder like `C:\ComfyUI`
3. Run `run_nvidia_gpu.bat` to check

#### Step 2: Install ReActor Node

1. Open Command Prompt
2. Navigate to: `cd C:\ComfyUI\ComfyUI\custom_nodes`
3. Clone repo: `git clone https://codeberg.org/Gourieff/comfyui-reactor-node`
4. Go into the folder: `cd comfyui-reactor-node`

#### Step 3: Install Precompiled Insightface

1. Check Python version: `C:\ComfyUI\python_embeded\python.exe -V`
2. Download matching `.whl` file for Insightface:
   - [For Python 3.10](https://github.com/Gourieff/Assets/raw/main/Insightface/insightface-0.7.3-cp310-cp310-win_amd64.whl)
   - [For Python 3.11](https://github.com/Gourieff/Assets/raw/main/Insightface/insightface-0.7.3-cp311-cp311-win_amd64.whl) 
   - [For Python 3.12](https://github.com/Gourieff/Assets/raw/main/Insightface/insightface-0.7.3-cp312-cp312-win_amd64.whl)
3. Update pip: `python_embeded\python.exe -m pip install -U pip`
4. Install Insightface with: 
   ```
   python_embeded\python.exe -m pip install insightface-0.7.3-cp310-cp310-win_amd64.whl
   ```
   (adjust the filename based on your Python version)

#### Step 4: Install ReActor Dependencies

Run the script: `python.exe install.py` from the `comfyui-reactor-node` folder.

#### Step 5: Download Required Models

- **Face restoration models**: Download to `C:\ComfyUI\ComfyUI\models\facerestore_models`
  - You can find models like GFPGAN, CodeFormer, etc. from [Gourieff ReActor face restoration models](https://huggingface.co/datasets/Gourieff/ReActor/tree/main/models/facerestore_models)

- **Face detection and landmark models**: Download to `C:\ComfyUI\ComfyUI\models\ultralytics\bbox`
  - Download [face_yolov8m.pt](https://huggingface.co/Bingsu/adetailer/blob/main/face_yolov8m.pt) (improved face detection model)
  - Download [2d106det.onnx](https://huggingface.co/menglaoda/_insightface/blob/main/2d106det.onnx)
  - Download [genderage.onnx](https://huggingface.co/aigchacker/clay_insightface/blob/main/genderage.onnx) (gender detection model)
<!-- 
- **Face swap model**: Download to `C:\ComfyUI\ComfyUI\models\insightface`
  - Download [inswapper_128.onnx](https://github.com/facefusion/facefusion-assets/releases/download/models/inswapper_128.onnx) -->

- **SAM models (optional for better face segmentation)**: Download to `C:\ComfyUI\ComfyUI\models\sams`
  - Download [sam_vit_l_0b3195.pth](https://huggingface.co/spaces/facebook/ov-seg/blob/f9b1bcfebfafe86b45b0cf16a1797ca5663d81af/sam_vit_l_0b3195.pth) (main SAM model)
  - Additional SAM models are available at [Gourieff ReActor SAM models](https://huggingface.co/datasets/Gourieff/ReActor/tree/main/models/sams)

#### Step 6: Verify Installation

1. Run `run_nvidia_gpu.bat`
2. Open browser: `http://localhost:8188`
3. Check if "ReActor Node is running" appears
4. Search for ReActor nodes in ComfyUI

### Basic Usage Guide

#### Step 1: Create Workflow

- Add ReActorFaceSwap node (found in the "ReActor" category in the node menu)
- Add two Load Image nodes (target and source)
- Add Preview Image node
- Connect nodes as needed

**Basic ReActor Workflow Example:**

![Basic ReActor Face Swap Workflow](/workflows/comfy-react-faceswap.json)

#### Step 2: Configure

- Choose face restoration model (e.g., GFPGANv1.4)
- Set face indexes if multiple faces
- Optional: gender detection

**ReActor Configuration Example:**

![ReActor Configuration Options](/images/blog/comfyui/faceswap/comfyui-faceswap-react.png)

#### Step 3: Run

Click **Queue Prompt** and view result in the Preview node.

**Workflow:**

![Simple Workflow](/images/blog/comfyui/faceswap/albert-neil-react-faceswap-comfy.png)


### Troubleshooting

If you encounter these common issues:

1. **"AttributeError: 'NoneType' object has no attribute 'get'"**: This error may occur if there's something wrong with the model file `inswapper_128.onnx`.

2. **"reactor.execute() got an unexpected keyword argument 'reference_image'"**: This happens when you're using an older workflow with a newer version of ReActor. Create a new workflow or update your existing workflow to match the current version.

### Additional Information

For more detailed instructions and advanced options, refer to the [official ReActor Node repository](https://codeberg.org/Gourieff/comfyui-reactor-node).
