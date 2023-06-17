/* eslint-disable import/prefer-default-export */
import { lazy } from 'react';

export const DateInputField = lazy(() => import('components/InputFields/DateInputField'));

export const PasswordInputField = lazy(() => import('components/InputFields/PasswordInputField'));

export const RadioInputField = lazy(() => import('components/InputFields/RadioInputField'));

export const SelectInputField = lazy(() => import('components/InputFields/SelectInputField'));

export const SeparateLabel = lazy(() => import('components/InputFields/SeparateLabel'));

export const SliderInputField = lazy(() => import('components/InputFields/SliderInputField'));

export const SwitchInputField = lazy(() => import('components/InputFields/SwitchInputField'));

/**
 * `TextInputField` is a wrapper component around Material-UI's TextField.
 * It has much more capabilities like integration with `React-Hook-Form`,
 * `custom Error Messages`, `Detached label` from input field and many more.
 *
 * @author Kiran A. Bansode <kiran5120135@gmail.com> <czar.kiran@gmail.com>
 * @return TextField Component of type `text`
 */
export const TextInputField = lazy(() => import('components/InputFields/TextInputField'));
