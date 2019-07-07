declare var gtag: any;

document.addEventListener("DOMContentLoaded", () => {
  const links = document.getElementsByTagName("a");
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    const target: string = link.getAttribute("href");

    // 外部リンクを雑に抽出
    if (
      target.indexOf("http") === 0 &&
      target.indexOf("https://feedal.com") < 0
    ) {
      console.log(links[i], target);
      link.addEventListener("click", () => {
        gtag("event", "click", {
          event_category: "outbound",
          event_label: target,
          transport_type: "beacon",
          event_callback: () => {
            document.location.href = target;
          }
        });
      });
    }
  }
});
