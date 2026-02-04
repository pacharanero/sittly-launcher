import { mapExtensionsNoResultItems } from "@/extensions/extension-assembly";
import { getCurrentWindow } from "@tauri-apps/api/window";
import React, { forwardRef, useEffect } from "react";

import sittlyDevtools from "../devtools/index";

const appWindow = getCurrentWindow();
const { components } = sittlyDevtools;
const { Command: SittlyCommand } = components;
export default forwardRef(function (
  {
    children,
  }: {
    children?: React.ReactNode;
  },
  inputRef: React.Ref<HTMLInputElement> | undefined
) {
  const noresult = mapExtensionsNoResultItems();
  useEffect(() => {
    appWindow.onFocusChanged(({ payload: focused }: { payload: boolean }) => {
      if (focused) (inputRef as React.MutableRefObject<HTMLInputElement | null>).current?.focus();
    });
  }, []);
  return (
    <SittlyCommand.Root
      noResultItems={() => noresult}
      className="flex-grow bg-transparent"
    >
      <SittlyCommand.Input
        ref={inputRef}
        autoFocus
        placeholder="Type a command or search..."
      />
      {children}
    </SittlyCommand.Root>
  );
});
