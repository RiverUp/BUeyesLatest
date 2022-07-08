/* eslint-disable no-undef */
function CameraTakePicture() {
  return new Promise((resolve, reject) => {
    navigator.camera.getPicture(OnSuccess, OnFail, {
      quality: 50, // 相片质量是50
      sourceType: Camera.PictureSourceType.CAMERA, // 设置从摄像头拍照获取
      destinationType: Camera.DestinationType.DATA_URL,
      cameraDirection: Camera.Direction.BACK,
    });
    function OnSuccess(imageInfo) {
      resolve(imageInfo);
    }
    function OnFail(msg) {
      reject(msg);
    }
  });
}
function GetFacePicture() {
  return new Promise((resolve, reject) => {
    navigator.camera.getPicture(OnSuccess, OnFail, {
      quality: 50, // 相片质量是50
      sourceType: Camera.PictureSourceType.CAMERA, // 设置从摄像头拍照获取
      destinationType: Camera.DestinationType.DATA_URL,
      cameraDirection: Camera.Direction.FRONT,
    });
    function OnSuccess(imageInfo) {
      resolve(imageInfo);
    }
    function OnFail(msg) {
      reject(msg);
    }
  });
}
export { CameraTakePicture, GetFacePicture };
