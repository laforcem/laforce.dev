# laforce.dev

Source for my personal site, [laforce.dev](https://laforce.dev). Built with [Hugo](https://gohugo.io/) and the [Blowfish](https://blowfish.page/) theme, deployed on Netlify.

## Run locally

Requires Hugo, Go, and Git. Blowfish loads as a Hugo module. Pinned versions are in [`netlify.toml`](netlify.toml) and [`.hvm`](.hvm).

```sh
hugo server   # dev server at http://localhost:1313
hugo          # production build into public/
```

## Editing content

- Posts: `content/posts/<yyyy-mm-dd-slug>/index.md`. Set `draft: false` to publish.
- Pages: `content/about.md` and `content/projects/`.
- CMS: `/admin/` ([Sveltia CMS](https://sveltiacms.app/)); sign in with a GitHub token. The post form knows title, summary, date, last updated, draft, layout and body; other front matter keys are dropped when it saves, so edit those in the file.

## Notes

- Blowfish supports a range of Hugo versions. If a build breaks after a Hugo upgrade, check that range first.
- Site overrides live in `assets/css/custom.css` and `layouts/`. The theme comes in as a module and stays untouched.
