import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

// Suivi Umami des clics sur les liens sortants et des téléchargements de fichiers.
// Un écouteur global évite d'annoter chaque lien (data-umami-event) dans le MDX.

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string>) => void };
  }
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
  // Phase de capture : le clic est enregistré avant toute navigation.
  document.addEventListener("click", onClick, { capture: true });
}
