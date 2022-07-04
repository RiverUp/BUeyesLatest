/* eslint-disable no-undef */
const CameraTakePicture = function () {
  return new Promise((resolve, reject) => {
    navigator.camera.getPicture(OnSuccess, OnFail, {
      quality: 50, // 相片质量是50
      sourceType: Camera.PictureSourceType.CAMERA, // 设置从摄像头拍照获取
      destinationType: Camera.DestinationType.DATA_URL,
    });
    function OnSuccess(imageInfo) {
      resolve("data:image/jpeg;base64," + imageInfo);
    }
    function OnFail(msg) {
      reject(msg);
    }
  });
};
export { CameraTakePicture };
