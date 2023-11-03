<!--
  Please note that this document is adapted from
  https://github.com/meteor/meteor/blob/devel/DEVELOPMENT.md
  which is very well written!
-->
# Development

This document is intended to provide instructions and helpful information for
developers who are contributing pull-requests (or otherwise making changes) to
EPFL Startpage.

As the first suggestion to the reader of this document: If, during the course of
development, a specific process is revealed which is helpful and not documented
here, please consider editing this document and submitting a pull-request.
Another developer will be thankful!


## Running from a Git checkout

If you want to run on the bleeding edge, or [help contribute](CONTRIBUTING.md),
you can run EPFL Startpage directly from a Git checkout using these steps:

1. **Clone from GitHub**

    ```sh
    $ git clone https://github.com/epfl-si/startpage.git
    $ cd startpage
    ```

2. **Run a pnpm command to install dependencies**

    ```sh
    $ pnpm install
    ```
    
    It may work with [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) 
    but [pnpm](https://pnpm.io/) is recommended!

3. **Ready to Go!**

    The setup is done! You can use this `pnpm start` to run the development
    server.


## Running in production

(WIP)


## Tests

(WIP)


## Code style

Please be sure that your editor or IDE respect the [EditorConfig]. EditorConfig
helps maintain consistent coding styles for multiple developers working on the
same project across various editors and IDEs. The EditorConfig project consists
of a file format for defining coding styles and a collection of text editor
plugins that enable editors to read the file format and adhere to defined
styles. EditorConfig files are easily readable and they work nicely with version
control systems.

* New contributions should follow the Style Guide as closely as possible.
* New code should match existing code (in the same vicinity) when the context of
  a change is minimal, but larger amounts of new code should follow the guide.
* Do not change code that doesn't directly relate to the feature/bug that you're
  working on.

```sh
# Check code format
$ pnpm lint

# Fix code format
$ pnpm lint:fix
```


## Commit messages

Good commit messages are very important and you should make sure to explain what
is changing and why. The commit message should include:

* A short and helpful commit title (maximum 80 characters) that include a 
  lowercase "tag" in brackets.
* The `[tag]` should categorize the commit or explain its scope. `[feature]`,
  `[fix]` are probably the most common one. `[revert]`, `[update]`, `[doc]`,
  `[config]`, `[release]` or `[version]`, `[refactor]`, `[test]` etc. are others
  examples. Keep in mind those are used for sorting commits in the
  [CHANGELOG.md].
* A commit description which clearly explains the change if it's not
  super-obvious by the title. Some description always helps!
* Reference related issues and pull-requests by number in the description body 
  (e.g. "#9999").
* Add "Fixes" or "Closes" before the issue number if the addition of that commit
  fully resolves the issue.


[EditorConfig]: https://editorconfig.org/
[CHANGELOG.md]: ./CHANGELOG.md
