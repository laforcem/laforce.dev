# `laforce.dev`

This is the repo for my personal website, based on [Hugo](https://gohugo.io/) and using the [Congo theme](https://jpanther.github.io/congo/).

## Run locally

- Ensure that you have [`go`](https://go.dev/doc/install) and [`hugo`](https://gohugo.io/installation/linux/) installed. The versions that this site was last compiled with can be found in [`netlify.toml`](netlify.toml).

- Run `hugo server` to start a dev server and `hugo` for a production server.

## Troubleshooting

**Attempting to build the website throws a ton of random errors about CSS. What is this?**

Make sure the versions of Hugo and Go are as-specified in `netlify.toml`. If you're running a newer version of either, you will need to update the Congo theme as well by deleting `go.mod` and `go.sum` and re-initializing the project with `hugo mod init`. Features are regularly deprecated in Hugo, so lifecycle management is unfortunately a constant concern.
