// 초대 문구의 링크가 여기로 온다(앱의 InviteShareMessage). 연 순간만 세고 바로 App Store로 넘긴다 —
// 초대를 보냈는데 상대가 안 온 사람이 많은데, 상대가 링크를 열기라도 했는지 볼 방법이 없었다.
// 보내는 건 초대 코드 하나뿐이고, 결과를 기다리지 않는다(sendBeacon은 페이지를 떠나도 전송된다).
(function () {
  var code = (new URLSearchParams(location.search).get("c") || "").trim();
  if (/^[0-9]{6}$/.test(code) && navigator.sendBeacon) {
    try {
      navigator.sendBeacon("https://ebbuloiyjemmyhxazmxh.supabase.co/functions/v1/invite-link-click",
                           new Blob([code], { type: "text/plain" }));
    } catch (e) {}
  }
  location.replace(document.getElementById("store").href);
})();
