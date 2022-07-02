function CameraTakePicture(){
    navigator.camera.getPicture(OnSuccess, OnFail, {
        quality: 50,                                            // 相片质量是50
        sourceType: Camera.PictureSourceType.CAMERA,            // 设置从摄像头拍照获取
        destinationType: Camera.DestinationType.DATA_URL,  
    })
    function OnSuccess(imageInfo) {
         return "data:image/jpeg;base64,"+imageInfo;
    }
    function OnFail(msg) {
        console.log(msg);
    }
}
export { CameraTakePicture };