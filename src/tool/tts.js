/* eslint-disable no-undef */
const speech = function (text) {
  TTS.speak({
    text: text,
    locale: "zh-CN",
  }).then(
    function (res) {
      return res;
    },
    function (reason) {
      alert(reason);
    },
    false
  );
};
export { speech };
/* import Speech from "speak-tts";
const speech = new Speech();
speech.init({
  lang: "zh-CN",
  rate: 1,
});
const HelpRead = function (text) {
  if (speech.speaking()) {
    if (speech.paused()) {
      speech.resume();
    } else {
      speech.pause();
    }
  } else {
    speech.speak({
      text: text,
      queue: false,
    });
  }
};
const ReadTag = function (text) {
  speech.speak({
    text: text,
    queue: false,
  });
};
export { HelpRead, speech, ReadTag }; */
