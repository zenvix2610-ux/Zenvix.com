<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- All business contact values (WhatsApp, phone, email, location) live in src/config/business.ts — single place for owner configuration.
- Enquiry form has no backend; it hands off to WhatsApp or clipboard via src/lib/enquiry.ts (tested in src/test/enquiry.test.ts).
- WhatsApp enquiry clicks use native anchors with synchronous validation; keyboard form submissions catch popup failures and retain a top-level same-tab fallback to avoid popup and embedded-frame restrictions.
- The brand mark is the owner's uploaded artwork served from CDN pointers in src/assets/*.asset.json (header = emblem + name crop, footer = full lockup, favicon = public/favicon.png); never reintroduce a hand-drawn monogram or repeat the name/tagline as text beside it.
