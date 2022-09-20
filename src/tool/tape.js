/* eslint-disable no-undef */
var filePath = "record.wav";
var media;
const StartRecording = function () {
  media = new Media(
    filePath,
    function () {
      console.log("start," + filePath);
    },
    function (err) {
      console.log("start error" + err.code);
    }
  );
  media.startRecord();
};
const StopRecording = function () {
  media.stopRecord();
};

export { StartRecording, StopRecording };
