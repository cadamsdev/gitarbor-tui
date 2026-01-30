# Changesets

This folder contains changeset files that track changes to packages in this repository.

## What is a changeset?

A changeset is a file that describes changes made to one or more packages. It includes:
- Which packages were changed
- The type of change (feat, fix, chore, etc.)
- Whether it's a breaking change
- A description of the change

## How to create a changeset

Run the following command and follow the prompts:

```bash
changeset
```

This will:
1. Ask which packages were affected
2. Ask for the type of change
3. Ask if it's a breaking change (if applicable)
4. Ask for a description of the change

The changeset file will be created in this directory with a randomly generated name.

## How to version packages

When you're ready to release, run:

```bash
changeset version
```

This will:
- Update package versions based on all changesets
- Update CHANGELOG.md files
- Delete consumed changeset files

## How to publish packages

After versioning, you can publish with:

```bash
changeset publish
```

This will:
- Publish packages to npm
- Create GitHub releases with changelogs

## Configuration

Edit `config.json` in this directory to customize changeset behavior.
