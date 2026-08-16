# Home Logo Navigation Design

**Date:** 2026-08-16  
**Status:** Approved through the user's direct request and standing instruction to proceed.

## Problem

The Simon Host wordmark uses a React Router link to `/`. It works when leaving another page, but when the visitor is already on the homepage React Router does not remount the route, so the existing route-change effect does not scroll back to the beginning.

## Chosen design

Create one shared `HomeLogo` component for the header and footer. It keeps client-side navigation, links to the canonical homepage, and explicitly scrolls to the top on every activation. Smooth scrolling is used normally; visitors who request reduced motion get an immediate jump.

The rejected alternatives are a full browser reload on every click, which is slower, and changing the global router behavior, which would affect unrelated navigation.

## Behavior

- From another page: navigate to `/` and land at the top.
- From a homepage section or scroll position: clear the section URL and return to the top.
- Header and footer wordmarks behave the same way.
- Keyboard activation keeps normal link semantics and the accessible homepage label.

## Verification

- Build and type-check the shared component.
- Run the existing frontend tests and production build.
- Confirm both header and footer render the shared homepage link.
- Deploy and verify the live bundle contains the new behavior.

