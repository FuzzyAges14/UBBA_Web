---
name: source-date-image-search
description: >-
  Source- and date-verified image search via SerpApi (google_images_light /
  google_images). Collect topic, result count, approved sources, date range,
  and date meaning before searching. Verify provenance for each pick; separate
  confirmed matches from uncertain candidates. Use when the user wants images
  with citation-grade source/date evidence (not generic web_search).
compatibility: >-
  Requires SerpApi: MCP search tool (mcp.serpapi.com), serpapi CLI, SDK, or
  curl with SERPAPI_KEY. See docs/api-key-setup.md.
license: MIT (adapted from serpapi/skills; see LICENSE-serpapi-skills.txt)
---

# Source-date image search

Adapt SerpApi image engines for **provenance-first** image gathering. Prefer
`google_images_light` (cheaper/faster); use full `google_images` when you need
richer metadata fields.

Supporting files from upstream [serpapi/skills](https://github.com/serpapi/skills)
are preserved under `rules/`, `docs/`, `LESSONS.md`, and `serpapi.yaml`.

## Gate: collect brief before any search

**Do not call SerpApi until these are clear.** Ask **only** for missing items;
if the user already supplied a field in this conversation, do not re-ask.

| Field | Required? | Notes |
|---|---|---|
| **Topic** | Yes | What the images must depict (subject, org, event, location). |
| **Desired result count** | Yes | Total or per-topic (e.g. 12 total, or 3 per category). |
| **Approved websites / orgs** | Yes | Domains, handles, or named orgs only (e.g. `facebook.com/ubbaad`, `@ubbatkd`). |
| **Start date + end date** | Yes | ISO `YYYY-MM-DD` or clear year/month bounds. |
| **Date meaning** | Yes | Exactly one of: **taken** (capture date), **event depicted**, or **published** (page/post date). |
| Resolution / orientation | Optional | e.g. landscape, min width 1280px. |
| Reuse / license | Optional | e.g. academy-owned only; Creative Commons; commercial OK. |

If several topics are in scope, confirm whether one multi-query search plan or
separate briefs apply — still do not search until the table above is filled.

## SerpApi setup (required)

1. Create a key at [serpapi.com/dashboard](https://serpapi.com/dashboard).
2. Export locally (never commit): `export SERPAPI_KEY=your_key_here`
3. **Cursor MCP** — add to `.cursor/mcp.json` (or user MCP settings):

```json
{
  "mcpServers": {
    "serpapi": {
      "type": "http",
      "url": "https://mcp.serpapi.com/YOUR_SERPAPI_API_KEY/mcp"
    }
  }
}
```

4. Or CLI: `brew install serpapi/tap/serpapi-cli` then `serpapi login`
5. Or curl: `curl -G "https://serpapi.com/search.json" --data-urlencode "engine=google_images_light" --data-urlencode "q=..." --data-urlencode "api_key=${SERPAPI_KEY}"`

Auth check: `serpapi account` → expect Active. On 401, fix the key; do not retry loops.
Full setup notes: [docs/api-key-setup.md](docs/api-key-setup.md). Engine list: [rules/ENGINES.md](rules/ENGINES.md).

## Search procedure (after gate passes)

1. **Build queries** from topic + `site:` / org filters for each approved source.
2. **Invoke** (MCP or CLI), default engine `google_images_light`:

```
search(params={"engine": "google_images_light", "q": "<topic> site:<approved>", "num": <count>}, mode="compact")
```

CLI: `serpapi search engine=google_images_light q="..." num=20`

3. Apply time filters when they match **date meaning**:
   - Published-ish web freshness: `tbs=qdr:y` / custom `tbs` when available
   - Do **not** treat SERP freshness as camera EXIF “taken” date — verify on the source page
4. **Fan out** across approved domains in parallel when useful (see LESSONS.md).
5. Prefer `_light` engines; reduce `num` if quota is low (LESSONS.md).

## Verification (per selected image)

For each candidate you might return:

1. Open / fetch the **source page** (not only the CDN thumb).
2. Confirm the page is on an **approved** domain/org.
3. Extract **date evidence** matching the agreed date meaning (post timestamp,
   caption, EXIF if trusted, event announcement, etc.).
4. Note **credit** (photographer, page, handle) and **license** if stated
   (or “rights not stated — academy page / unknown”).
5. Check resolution / orientation if required.

### Buckets

- **Confirmed matches** — approved source + date evidence fits meaning + topic match.
- **Uncertain candidates** — topic-plausible but weak/missing date, ambiguous rights,
  or source only partially approved. Never mix these into the confirmed list.

## Return format

For each image (confirmed and uncertain separately):

- Preview / thumbnail URL
- Original image URL
- Source-page link
- Date + what the date means (taken / event / published) + evidence snippet
- Credit
- License / reuse notes
- Why confirmed or why uncertain

Cap each list to the requested result count (confirmed first).

## Gotchas

- Image SERPs often lack reliable capture dates — **source page wins**.
- `site:facebook.com/...` / Instagram may be sparse in Google Images; supplement
  with direct page scrapes when the user already authenticated those sessions.
- Shopping/stock engines are wrong for provenance work — stay on image/web engines.
- Empty `images_results` ≠ hard failure; widen query or try `google_images`.

## Upstream reference

Parameter tables, SDKs, response keys, and use-cases live in `rules/` and
`LESSONS.md` (copied from serpapi-web-search). Prefer those over inventing params.
