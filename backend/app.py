from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from keras.models import load_model
from keras.utils import img_to_array
import numpy as np
from PIL import Image
import io

app = FastAPI()


origins = [
    "http://localhost:5173",
    "https://brain-tumor-vq4i.onrender.com/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = 'brain_tumor_classifier.h5'
model = load_model(MODEL_PATH)
CLASS_NAMES = ['glioma', 'meningioma', 'notumor', 'pituitary']
IMG_SIZE = 224

@app.get("/")
def root():
    return {"message": "Brain Tumor Classifier API is running."}

@app.post("https://brain-tumor-vq4i.onrender.com/api/predict")
async def predict(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")
    
    try:
        contents = await file.read()
        img = Image.open(io.BytesIO(contents)).convert('RGB')
        img = img.resize((IMG_SIZE, IMG_SIZE))
        img_array = img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = img_array / 255.0

        preds = model.predict(img_array)
        pred_class = CLASS_NAMES[np.argmax(preds[0])]

        return {"prediction": pred_class}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
