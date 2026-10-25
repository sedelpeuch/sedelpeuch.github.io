import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

// Suivi Umami des clics sur les liens sortants et des téléchargements de fichiers.
// Un écouteur global évite d'annoter chaque lien (data-umami-event) dans le MDX.
// Filtre aussi les navigateurs automatisés (data-before-send dans docusaurus.config.ts).

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string>) => void };
    umamiBeforeSend?: (type: string, payload: unknown) => unknown;
  }
}

// Les robots qui pilotent un Chrome sans interface (Puppeteer, Selenium, Playwright)
// exposent navigator.webdriver ; renvoyer null annule l'envoi. Le traceur lit cette
// fonction à chaque envoi et attend document.readyState === "complete" pour la
// première page vue, donc après l'exécution de ce module.
function beforeSend(_type: string, payload: unknown): unknown {
  return navigator.webdriver ? null : payload;
}

const FILE_EXTENSIONS = /\.(pdf|zip|tar|gz|tex|docx?|pptx?|xlsx?|csv|stl|step)$/i;

function track(event: string, data: Record<string, string>): void {
  window.umami?.track(event, data);
}

function onClick(e: MouseEvent): void {
  const link = (e.target as Element | null)?.closest?.("a[href]");
  if (!(link instanceof HTMLAnchorElement)) return;

  let url: URL;
  try {
    url = new URL(link.href, window.location.href);
  } catch {
    return;
  }

  if (url.protocol === "mailto:") {
    track("contact-email", { page: window.location.pathname });
    return;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return;

  if (url.host !== window.location.host) {
    track("outbound-link", {
      url: url.href,
      host: url.host,
      page: window.location.pathname,
    });
  } else if (FILE_EXTENSIONS.test(url.pathname)) {
    track("file-download", {
      file: url.pathname.split("/").pop() ?? url.pathname,
      page: window.location.pathname,
    });
  }
}

if (ExecutionEnvironment.canUseDOM) {
  window.umamiBeforeSend = beforeSend;
  // Phase de capture : le clic est enregistré avant toute navigation.
  document.addEventListener("click", onClick, { capture: true });
}
