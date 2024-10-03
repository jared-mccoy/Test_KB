import micromorph from "micromorph"
import { FullSlug, RelativeURL, getFullSlug, normalizeRelativeURLs } from "../../util/path"

// adapted from `micromorph`
// https://github.com/natemoo-re/micromorph
const NODE_TYPE_ELEMENT = 1
let announcer = document.createElement("route-announcer")
const isElement = (target: EventTarget | null): target is Element =>
  (target as Node)?.nodeType === NODE_TYPE_ELEMENT
const isLocalUrl = (href: string) => {
  try {
    const url = new URL(href)
    if (window.location.origin === url.origin) {
      return true
    }
  } catch (e) {}
  return false
}

// Helper to detect if the URL is the homepage
const isHomePage = (url: URL) => {
  const isHome =  url.pathname === "/" || url.pathname === "/index.html";
  console.log("isHomePage", isHome)
  return isHome
};

const isSamePage = (url: URL): boolean => {
  const sameOrigin = url.origin === window.location.origin
  const samePath = url.pathname === window.location.pathname
  return sameOrigin && samePath
}

const getOpts = ({ target }: Event): { url: URL; scroll?: boolean } | undefined => {
  if (!isElement(target)) return
  if (target.attributes.getNamedItem("target")?.value === "_blank") return
  const a = target.closest("a")
  if (!a) return
  if ("routerIgnore" in a.dataset) return
  const { href } = a
  if (!isLocalUrl(href)) return
  return { url: new URL(href), scroll: "routerNoscroll" in a.dataset ? false : undefined }
}

function notifyNav(url: FullSlug) {
  const event: CustomEventMap["nav"] = new CustomEvent("nav", { detail: { url } })
  document.dispatchEvent(event)
}

const cleanupFns: Set<(...args: any[]) => void> = new Set()
window.addCleanup = (fn) => cleanupFns.add(fn)

let p: DOMParser

async function navigate(url: URL, isBack: boolean = false) {
  const currentUrl = new URL(window.location.toString());

  // If navigating from the homepage to any other page, perform a full reload
  if (isHomePage(currentUrl) && !isHomePage(url)) {
    window.location.assign(url); // Full reload when navigating away from the homepage
    return;
  }

  // If navigating to the homepage, perform a full reload
  if (isHomePage(url)) {
    window.location.assign(url); // Full reload when navigating to the homepage
    return;
  }

  // Otherwise, proceed with the regular SPA navigation
  let p = new DOMParser();
  const contents = await fetch(`${url}`)
    .then((res) => {
      const contentType = res.headers.get("content-type");
      if (contentType?.startsWith("text/html")) {
        return res.text();
      } else {
        window.location.assign(url); // Fallback to a full reload if content type isn't HTML
      }
    })
    .catch(() => {
      window.location.assign(url); // Fallback in case of error
    });

  if (!contents) return;

  // Cleanup and proceed with SPA page update
  cleanupFns.forEach((fn) => fn());
  cleanupFns.clear();

  const html = p.parseFromString(contents, "text/html");
  normalizeRelativeURLs(html, url);

  let title = html.querySelector("title")?.textContent || url.pathname;
  document.title = title;

  if (announcer.textContent !== title) {
    announcer.textContent = title;
  }
  announcer.dataset.persist = "";
  html.body.appendChild(announcer);

  // Morph the body
  micromorph(document.body, html.body);

  // Scroll behavior: Delayed to ensure layout is fully stable
  if (!isBack) {
    if (url.hash) {
      setTimeout(() => {
        const el = document.getElementById(decodeURIComponent(url.hash.substring(1)));
        if (el) el.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the element
      }, 50); // Adjust delay if necessary
    } else {
      window.scrollTo({ top: 0 });
    }
  }

  // Update the head elements (remove and add new elements)
  const elementsToRemove = document.head.querySelectorAll(":not([spa-preserve])");
  elementsToRemove.forEach((el) => el.remove());
  const elementsToAdd = html.head.querySelectorAll(":not([spa-preserve])");
  elementsToAdd.forEach((el) => document.head.appendChild(el));

  // Update the URL in history
  if (!isBack) {
    history.pushState({}, "", url);
  }
  notifyNav(getFullSlug(window));
  delete announcer.dataset.persist;
}

window.spaNavigate = navigate

function createRouter() {
  if (typeof window !== "undefined") {
    window.addEventListener("click", async (event) => {
      const { url } = getOpts(event) ?? {};
      if (!url || event.ctrlKey || event.metaKey) return; // Ignore Ctrl or Meta key clicks (open in new tab)
      event.preventDefault();

      // Handle same-page navigation with hash anchors
      if (isSamePage(url) && url.hash) {
        const el = document.getElementById(decodeURIComponent(url.hash.substring(1)));
        el?.scrollIntoView();
        history.pushState({}, "", url);
        return;
      }

      // Perform SPA navigation unless it's the homepage or navigating from the homepage
      try {
        await navigate(url, false);
      } catch (e) {
        window.location.assign(url); // Fallback to full page reload in case of an error
      }
    });

    window.addEventListener("popstate", (event) => {
      try {
        const currentUrl = new URL(window.location.toString());
        if (!isHomePage(currentUrl)) {
          navigate(currentUrl, true);
        } else {
          window.location.reload(); // Reload if navigating to the homepage
        }
      } catch (e) {
        window.location.reload(); // Full page reload as a fallback
      }
    });
  }
  return new (class Router {
    go(pathname: RelativeURL) {
      const url = new URL(pathname, window.location.toString());
      return navigate(url, false);
    }
    back() {
      return window.history.back();
    }
    forward() {
      return window.history.forward();
    }
  })();
}

createRouter()
notifyNav(getFullSlug(window))

if (!customElements.get("route-announcer")) {
  const attrs = {
    "aria-live": "assertive",
    "aria-atomic": "true",
    style:
      "position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px",
  }

  customElements.define(
    "route-announcer",
    class RouteAnnouncer extends HTMLElement {
      constructor() {
        super()
      }
      connectedCallback() {
        for (const [key, value] of Object.entries(attrs)) {
          this.setAttribute(key, value)
        }
      }
    },
  )
}
