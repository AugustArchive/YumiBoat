/**
  * @file Some utilities.
  * @author August (Chris | https://ohlookitsaugust.space | [YumiBoat] August#1793 (Discord))
**/
class Utility {
   static duration(ms) {
    const sec = Math.floor((ms / 1000) % 60);
		const min = Math.floor((ms / (1000 * 60)) % 60);
		const hrs = Math.floor(ms / (1000 * 60 * 60));
   return {
			hours: hrs,
			minutes: min,
			seconds: sec,
			format: () => `${hrs < 10 ? `0${hrs}` : hrs}:${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`
     }
   } /* Promt: {{hrs}}:{{min}}:{{sec}} */
}
