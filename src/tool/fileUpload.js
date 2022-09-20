/* eslint-disable no-undef */
import { InteractWithVoice } from "@/request/VoiceInteraction";
const UpLoadFile = function () {
  return new Promise((resolve, reject) => {
    window.resolveLocalFileSystemURL(
      cordova.file.externalRootDirectory,
      (entry) => {
        entry.getFile(
          "record.wav",
          {},
          function (fileEntry) {
            fileEntry.file(function (file) {
              var reader = new FileReader();
              reader.onloadend = function () {
                var video = reader.result;
                video.replace("data:audio/wav;base64,", "");
                var keyword;
                InteractWithVoice(video).then((res) => {
                  keyword = res.data.data;
                  resolve(keyword);
                });
              };
              reader.readAsDataURL(file);
            });
          },
          errorHandler
        );
      },
      errorHandler
    );
    function errorHandler(msg) {
      reject(msg);
    }
  });
};

export { UpLoadFile };
