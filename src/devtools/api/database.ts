import { invoke } from "@tauri-apps/api/core";

export const write = (
  key: string,
  value: Record<string, unknown> | unknown[]
): Promise<string | void> => {
  return invoke<string | void>("write_database", {
    key,
    value: JSON.stringify(value),
  });
};

export const read = <T extends Record<string, unknown> | unknown[] | void>(
  key: string
): Promise<T> => {
  return invoke<string>("read_database", {
    key,
  }).then((value: string) => (value ? JSON.parse(value) : value));
};
