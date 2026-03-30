# Changelog

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-03-30

### Added

- `enforce_custom_field_mapping` optional field on `AWeberMoveSubscriberDto`. When `true`, AWeber maps custom fields by name during a move instead of by position, avoiding misalignment when source and destination lists order fields differently.

### Changed

- **`SubscribersService.moveSubscriber`** return type is `Promise<AWeberSubscriber | null>`. The previous public contract used `AWeberMoveSubscriberResponse` (`{ self_link }` only), then briefly `AWeberSubscriber`. Successful moves typically return `200` with an **empty body** — that case resolves to `null` instead of throwing.
- **`moveSubscriber` HTTP request** uses `application/x-www-form-urlencoded` and `URLSearchParams` for the body, matching AWeber’s documented move operation. JSON bodies were accepted for basic moves but **`enforce_custom_field_mapping` was ignored**.

### Removed

- **`AWeberMoveSubscriberResponse`** — removed from `subscribers.types.ts` and from public exports in `src/index.ts`. Use `AWeberSubscriber | null` with `moveSubscriber`.

### Fixed

- Successful subscriber moves no longer throw `Move Subscriber API Call returned empty response` when AWeber returns an empty success body.
- Custom field mapping option is applied correctly when sent as form-encoded data.

### Migration

1. Treat `null` from `moveSubscriber` as a normal success when you only need to confirm the move; fetch the subscriber on the destination list (e.g. by email) if you need the full record.
2. Remove any imports of `AWeberMoveSubscriberResponse`; type results as `AWeberSubscriber | null`.
3. For moves between lists with custom fields, pass `enforce_custom_field_mapping: true` in the DTO.

See also the **Migration** section in [README.md](./README.md).

[Unreleased]: https://github.com/juicyllama/nestjs-aweber/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/juicyllama/nestjs-aweber/compare/v0.12.8...v1.0.0
