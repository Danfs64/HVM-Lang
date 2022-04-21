# Changelog

This changelog format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and its versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- Check edge-cases for matches that don't use `\b` as delimiters;
- Modularize the grammar in multiple files;
- Make highlighting togglable by category (Constructors, Operators);
  - If I can make that, put back variables, with highlighting disabled by default;

## [0.3.0] - 2022-04-21

### Added

- Matching Operators, such as `=` and `>>`. If they are highlighted or not will depend on the theme you're using;
- Matching Keywords `dup`, `@` and `λ`;
- Matching Characters - any single character enclosed by single quotes

### Changed

- Constructor matching will match a full constructor name even if it is divided by dots;
- Variables are no longer matched;

## [0.2.0] - 2022-04-20

### Added

- Matching:
  - Constructors;
  - Line comments;
  - Strings;
  - Numerals;
  - Keywords (`let`);
  - Variables;

## [0.1.0] - 2022-04-19 - [Uncommited]

- Initial release, freshly generated from Yeoman;
