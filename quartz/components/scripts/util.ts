export function registerEscapeHandler(outsideContainer: HTMLElement | null, cb: () => void) {
  if (!outsideContainer) return
  function click(this: HTMLElement, e: HTMLElementEventMap["click"]) {
    if (e.target !== this) return
    e.preventDefault()
    cb()
  }

  function esc(e: HTMLElementEventMap["keydown"]) {
    if (!e.key.startsWith("Esc")) return
    e.preventDefault()
    cb()
  }

  outsideContainer?.addEventListener("click", click)
  window.addCleanup(() => outsideContainer?.removeEventListener("click", click))
  document.addEventListener("keydown", esc)
  window.addCleanup(() => document.removeEventListener("keydown", esc))
}

export function removeAllChildren(node: HTMLElement) {
  while (node.firstChild) {
    node.removeChild(node.firstChild)
  }
}

export function extractFilename(mediaEntry: string | string[]): string {
  const toKebabCase = (str: string) =>
    str
      //.toLowerCase()
      //.replace(/[^\w\s-]/g, '') // Remove non-alphanumeric characters (except spaces and hyphens)
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      //.replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen

  const mediaArray = Array.isArray(mediaEntry) ? mediaEntry : [mediaEntry];
  const entry = mediaArray[0].trim(); // Use the first available entry

  // Regex pattern to extract the filename, handling wiki links and aliases
  const wikiLinkPattern = /^\[\[([^\]|]+)(?:\|[^\]]+)?\]\]$/;
  const match = entry.match(wikiLinkPattern);
  
  let filename = match ? match[1].trim() : entry.split('|')[0].trim();
  filename = toKebabCase(filename);

  return filename;
}