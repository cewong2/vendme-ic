export function resizeImage(imageDataUrl, width, height) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageDataUrl;
  
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
  
        const resizedImageDataUrl = canvas.toDataURL("image/jpeg");
        resolve(resizedImageDataUrl);
      };
  
      img.onerror = (error) => {
        reject(error);
      };
    });
  }
  