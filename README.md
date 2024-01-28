# DumbHooks

DumbHooks is a TypeScript-based library that provides a collection of React hooks for state management. The main goal of this library is to simplify the process of managing state in your React applications.

## Features

- TypeScript support: This library is written in TypeScript, providing type safety and autocompletion out of the box.
- React Hooks: DumbHooks leverages the power of React Hooks for state management.

## Installation

You can install DumbHooks using either npm or yarn:

```sh
npm install dumbhooks
```

or

```sh
yarn add dumbhooks
```

## Usage

Here is an example of how to use the `useUrlState` hook:

```ts
import { useUrlState } from 'dumbhooks';

// usage within a component
const [search, setSearch] = useUrlState("search");
```
